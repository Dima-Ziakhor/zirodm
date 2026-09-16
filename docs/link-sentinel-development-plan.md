# LinkSentinel — Development Plan

> **Scope:** MVP of the domain monitoring product.
> Full marketing automation is out of scope for this phase.

---

## Etap status legend

| Marker | Meaning |
|---|---|
| 🔴 MVP | Required for the first release |
| 🟡 Post-MVP | Can be implemented later |
| ⚠️ Decision needed | Requires an architectural decision before implementation |

---

## Phase overview

```
Phase 1 — Foundation
  Stage 1.  Requirements clarification        ⚠️ Decision needed
  Stage 2.  Backend bootstrap (apps/api)       🔴 MVP
  Stage 3.  Data model & migrations            🔴 MVP
  Stage 4.  Authentication & users             🔴 MVP

Phase 2 — Monitoring core
  Stage 5.  Domain management (CRUD)           🔴 MVP
  Stage 6.  Domain availability checker        🔴 MVP
  Stage 7.  BullMQ workers                     🔴 MVP
  Stage 8.  Check scheduler                    🔴 MVP

Phase 3 — Notifications & UI
  Stage 9.  Notification system (Telegram)     🔴 MVP
  Stage 10. Frontend dashboard                 🔴 MVP

Phase 4 — Quality & release
  Stage 11. Testing                            🔴 MVP (critical unit tests)
  Stage 12. Deployment preparation             ⚠️ Decision needed
```

---

## Stage 1. Requirements Clarification ⚠️ Decision needed

**Goal:** Align on key technical decisions before implementation begins.

### Open questions

1. **Authentication mechanism**
   `User` entity already has `password_hash` — this implies
   email/password auth. Confirm: JWT (access + refresh tokens)?
   Or OAuth (Google, GitHub)?

2. **Domain check mechanism**
   HTTP HEAD request? DNS lookup? Both?
   What counts as "unavailable": timeout, 5xx, DNS failure?

3. **Check interval**
   Fixed (e.g. every 5 minutes)? User-configurable per domain?

4. **Domain limit per user**
   How many domains can one user monitor in MVP?

5. **Notifications in MVP**
   Telegram only? Also Email?

6. **Incident model**
   Create an `incident` immediately after the first failure?
   Or only after N consecutive failures?

7. **`@shared/database` in `apps/web`**
   The frontend currently depends on `@shared/database`.
   Recommend removing this dependency once the API is created.

---

## Stage 2. Backend Bootstrap (`apps/api`) 🔴 MVP

**Goal:** Create a NestJS application with a sound base structure.

### Proposed directory structure

```
apps/api/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/              ← env validation
│   ├── common/
│   │   ├── filters/         ← GlobalExceptionFilter
│   │   ├── pipes/           ← ValidationPipe
│   │   └── interceptors/    ← LoggingInterceptor
│   └── modules/
│       ├── auth/
│       ├── users/
│       ├── domains/
│       ├── checks/
│       └── notifications/
├── package.json
├── tsconfig.json
└── eslint.config.js
```

### Required packages (need approval before installing)

- `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-fastify` (or express)
- `@nestjs/config` + `class-validator` + `class-transformer`
- `@nestjs/typeorm` + `@shared/database`
- `@nestjs/bull` + `bullmq` + `ioredis`
- `@nestjs/jwt` (or equivalent)

### Completion criteria

- `pnpm --filter @apps/api dev` starts the server
- `GET /health` → `200 OK`
- ESLint and TypeScript pass without errors

---

## Stage 3. Data Model & Migrations 🔴 MVP

**Goal:** Define all database entities and generate migrations.

### Proposed entities

#### `users` (already exists)

```
id             SERIAL PK
email          varchar(320) UNIQUE NOT NULL
password_hash  varchar(255) NOT NULL
username       varchar(255) NOT NULL
first_name     varchar(255) NOT NULL
last_name      varchar(255) NULL
avatar         varchar NULL
created_at     timestamptz NOT NULL DEFAULT now()
updated_at     timestamptz NOT NULL DEFAULT now()
deleted_at     timestamptz NULL
```

#### `domains` (new)

```
id                      SERIAL PK
user_id                 INT FK → users.id NOT NULL
url                     varchar(2048) NOT NULL
name                    varchar(255) NULL
status                  varchar NOT NULL  -- active | paused | archived
check_interval_seconds  INT NOT NULL DEFAULT 300
last_checked_at         timestamptz NULL
current_status          varchar NULL  -- up | down | timeout | error
created_at              timestamptz NOT NULL DEFAULT now()
updated_at              timestamptz NOT NULL DEFAULT now()
deleted_at              timestamptz NULL
```

#### `domain_checks` (new) — check log

```
id               SERIAL PK
domain_id        INT FK → domains.id NOT NULL
status           varchar NOT NULL  -- up | down | timeout | error
http_status_code INT NULL
response_time_ms INT NULL
error_message    varchar NULL
checked_at       timestamptz NOT NULL DEFAULT now()
```

#### `notification_channels` (new)

```
id         SERIAL PK
user_id    INT FK → users.id NOT NULL
type       varchar NOT NULL  -- telegram | email | push
config     jsonb NOT NULL    -- { chatId, ... }
is_active  boolean NOT NULL DEFAULT true
created_at timestamptz NOT NULL DEFAULT now()
updated_at timestamptz NOT NULL DEFAULT now()
```

#### `incidents` (new) — ⚠️ Decision needed on model

```
id           SERIAL PK
domain_id    INT FK → domains.id NOT NULL
started_at   timestamptz NOT NULL
resolved_at  timestamptz NULL
is_resolved  boolean NOT NULL DEFAULT false
```

> [!IMPORTANT]
> The `incidents` entity is proposed. Confirm whether to use it or
> rely solely on `domain_checks` for incident detection.

### Completion criteria

- All entities created in `packages/database/src/entities/`
- All entities registered in `packages/database/src/config/data-source.ts`
- Migrations generated and tested (`up` + `down`)
- New entities and types exported through `packages/database/src/index.ts`
- `packages/database` builds without errors

---

## Stage 4. Authentication & Users 🔴 MVP / ⚠️ Decision needed

**Goal:** Register, log in, protect routes.

### Recommended approach

Email/password + JWT (access token + refresh token).
Aligns with the existing `password_hash` field on `User`.

### API endpoints

```
POST /auth/register     Create a new account
POST /auth/login        Return access + refresh tokens
POST /auth/refresh      Issue a new access token
POST /auth/logout       Invalidate the refresh token
GET  /users/me          Get current user profile (protected)
PATCH /users/me         Update profile (protected)
```

### Validation rules

- `email`: valid format, max 320 chars
- `password`: min 8 chars; stored as bcrypt or argon2 hash
- All inputs: `class-validator` + `ValidationPipe` with `whitelist: true`

### Security requirements

- Refresh token: store in an httpOnly cookie or in the database
  (with rotation on use)
- Rate limiting on `/auth/*` endpoints

### Completion criteria

- All auth endpoints functional
- JWT guard protects private routes
- Validation rejects malformed requests with `400`
- Passwords are never stored in plain text

---

## Stage 5. Domain Management (CRUD) 🔴 MVP

**Goal:** Allow users to add, view, edit, and delete domains.

### API endpoints

```
GET    /domains        List current user's domains
POST   /domains        Add a domain
GET    /domains/:id    Domain details
PATCH  /domains/:id    Update name, interval, or status
DELETE /domains/:id    Soft delete
```

### Business rules

- Users can only access their own domains (application-level check).
- URL must include a protocol (`http://` or `https://`).
- Domain limit per user: **⚠️ Decision needed**.

### Validation rules

- `url`: valid URL format, max 2048 chars
- `name`: optional, max 255 chars
- `checkIntervalSeconds`: **⚠️ Decision needed** (min/max values)
- `status`: enum — `active`, `paused`

### Completion criteria

- Full CRUD functional
- A user cannot access another user's domains (returns `403`)
- Swagger/OpenAPI documentation generated for all endpoints

---

## Stage 6. Domain Availability Checker 🔴 MVP / ⚠️ Decision needed

**Goal:** Implement the logic for checking domain HTTP availability.

### Proposed approach

```
DomainCheckerService
  checkDomain(url: string): Promise<CheckResult>
    1. Send HTTP HEAD request (timeout: 10 s)
    2. If HEAD is not supported → fallback to GET
    3. Determine status:
       2xx / 3xx → 'up'
       4xx / 5xx → 'down'
       timeout   → 'timeout'
       network   → 'error'
    4. Return: { status, httpStatusCode?, responseTimeMs, errorMessage? }
```

### Result persistence

- Every check → insert a row into `domain_checks`
- Update `domains.last_checked_at` and `domains.current_status`
- If status changed from `up` to `down` → trigger notification

### Open question

**Incident creation logic:** Fail immediately on first failure, or
only after N consecutive failures? ⚠️ Decision needed.

### Completion criteria

- `DomainCheckerService` checks a URL and returns a structured result
- Result is persisted in the database
- Unit tests with mocked HTTP calls

---

## Stage 7. BullMQ Workers 🔴 MVP

**Goal:** Move domain checks into background jobs.

### Queues

```
domain-check-queue
  Job payload:  { domainId: number }
  Worker:       DomainCheckWorker
    → DomainCheckerService.checkDomain()
    → Persist result
    → Enqueue notification job if status changed

notification-queue
  Job payload:  { userId: number, channelType: string, message: string }
  Worker:       NotificationWorker
    → Send via Telegram (or other channel)
```

### BullMQ configuration

- Retry: 3 attempts with exponential backoff
- Concurrency: ⚠️ Decision needed (depends on expected domain volume)
- Failed jobs must be logged and not silently dropped

### Post-MVP

- Bull Dashboard / BullMQ Board for queue monitoring

### Completion criteria

- Worker accepts a job and performs the check
- Failed jobs are logged with the error detail
- Integration test: job added → worker runs → result in DB

---

## Stage 8. Check Scheduler 🔴 MVP

**Goal:** Automatically enqueue domain checks on schedule.

### Proposed approach

```typescript
// SchedulerService
@Cron('* * * * *')  // every minute
async scheduleChecks() {
  const due = await domainRepository.find({
    where: {
      status: 'active',
      // last_checked_at IS NULL OR last_checked_at + interval < NOW()
    },
  });
  for (const domain of due) {
    await domainCheckQueue.add('check', { domainId: domain.id });
  }
}
```

> [!NOTE]
> For high-load scenarios (thousands of domains) a distributed
> scheduler would be more appropriate. For MVP, a simple cron is
> sufficient.

### Completion criteria

- Active domains are checked regularly without manual intervention
- No duplicate jobs for the same domain within one check cycle

---

## Stage 9. Notification System 🔴 MVP (Telegram) / 🟡 Post-MVP (others)

**Goal:** Notify users when a domain status changes.

### MVP: Telegram

- Telegram Bot API via `node-telegram-bot-api` or `@telegraf/core`
- User provides their `chat_id` when adding the channel
- Notification channel stored as:
  `{ type: 'telegram', config: { chatId: string }, is_active: true }`

### Event triggers

- `domain.down` — domain stopped responding
- `domain.up` — domain recovered (after a `down` incident)

### Deduplication

- Do not send repeated `down` notifications for the same ongoing incident.
- Send `domain.up` only once when the domain recovers.

### Post-MVP channels

- Email (SMTP or SendGrid)
- Browser Push Notifications
- Webhook

### Completion criteria

- Telegram notification sent when domain status changes
- User can add and remove a Telegram channel
- No duplicate notifications for a single incident

---

## Stage 10. Frontend Dashboard 🔴 MVP

**Goal:** Provide a UI for domain management and status overview.

### Pages

```
/dashboard
  → DomainListPage
    List of domains with current status (up / down / checking)
    "Add domain" button
    Filter by status

/dashboard/domains/new
  → AddDomainPage
    Form: URL, name (optional), check interval

/dashboard/domains/:id
  → DomainDetailPage
    Current status
    List of recent checks
    Actions: pause, delete
    Uptime graph (Post-MVP)

/dashboard/settings/notifications
  → NotificationSettingsPage
    Manage notification channels (add / remove Telegram)
```

### FSD distribution

```
_pages/    domain-list, domain-detail, add-domain, notification-settings
widgets/   domain-list, domain-status-card, domain-check-history
features/  add-domain, pause-domain, delete-domain, connect-telegram
entities/  domain, domain-check, notification-channel
shared/    api/  ← HTTP client + typed API wrappers
```

### API integration

- Shared API client in `apps/web/src/shared/api/`
- Types shared via `@shared/contracts`
- JWT token handling: store access token, refresh on expiry

### Auth flow

- Unauthenticated users are redirected to `/sign-in`
- After login → redirect to `/dashboard`
- All `/dashboard/*` routes are protected

### Completion criteria

- Dashboard lists domains with live status
- Add domain form works end-to-end
- Auth flow: sign in → redirect → protected routes accessible

---

## Stage 11. Testing 🔴 MVP (critical) / 🟡 Post-MVP (full coverage)

**Goal:** Ensure core logic is reliable before release.

### MVP — Unit tests

| Target | What to test |
|---|---|
| `DomainCheckerService` | Status classification, timeout, error handling. Mock HTTP. |
| `NotificationService` | Message dispatching. Mock Telegram API. |
| Auth service | Login, token validation, password hashing. |
| Domain business logic | Status transitions, ownership check. |

### Post-MVP — Integration tests

- API endpoints against a real test database
- BullMQ worker → result persisted in DB

### Post-MVP — E2E tests

- Playwright for critical user flows (sign in, add domain, see status)

### Tools

- `vitest` (already configured in `package.json`)
- `@nestjs/testing` for NestJS unit/integration tests
- `supertest` for HTTP assertions

### Completion criteria

- Key services have unit tests
- `pnpm test` passes

---

## Stage 12. Deployment Preparation ⚠️ Decision needed

**Goal:** Make the project deployable for its first release.

### Open questions

1. **Hosting:** Vercel (web) + Railway/Render (API)?
   VPS? Docker + Kubernetes?
2. **Docker:** `Dockerfile` for `apps/api`?
3. **CI/CD:** GitHub Actions?
4. **Secrets management:** How to pass env variables in production?
5. **Managed PostgreSQL:** Supabase, Neon, AWS RDS?
6. **Managed Redis:** Upstash, Redis Cloud?

### Minimum for MVP deployment

- `Dockerfile` for `apps/api`
- `.env.example` documents all required variables
- Migrations run automatically on deploy (or via a deploy hook)
- `GET /health` endpoint returns `200 OK`

---

## MVP completion checklist

| Stage | Status |
|---|---|
| 1. Requirements clarified | ⚠️ |
| 2. `apps/api` bootstrapped | ⬜ |
| 3. All entities & migrations | ⬜ |
| 4. Auth (register, login, JWT) | ⬜ |
| 5. Domain CRUD | ⬜ |
| 6. Checker service | ⬜ |
| 7. BullMQ workers | ⬜ |
| 8. Scheduler | ⬜ |
| 9. Telegram notifications | ⬜ |
| 10. Basic dashboard | ⬜ |
| 11. Critical unit tests | ⬜ |
| 12. Deployment decided | ⚠️ |

