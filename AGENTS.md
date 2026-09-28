# LinkSentinel — Agent Instructions

## Project Overview

LinkSentinel is a SaaS domain monitoring platform for affiliate
and digital marketing. It is the first product of a larger
marketing automation ecosystem.

Core flow: users add domains → system monitors availability
automatically → alerts are sent when a domain becomes unreachable.

## Repository

pnpm monorepo managed with Turborepo.

## Current Applications

- `apps/web` — Next.js 16 frontend (implemented).
- `apps/api` — NestJS backend (**not yet created**, planned).

## Shared Packages

- `packages/database` (`@shared/database`) — TypeORM DataSource,
  entities, and migrations for PostgreSQL.
- `packages/contracts` (`@shared/contracts`) — Shared TypeScript
  interfaces for API contracts (e.g. `ApiError`).
- `packages/eslint-config` (`@repo/eslint-config`) — Shared ESLint
  configurations.
- `packages/typescript-config` (`@repo/typescript-config`) — Shared
  tsconfig presets.

## Technology Stack

### Frontend (`apps/web`)

- Next.js 16, React 19, TypeScript 6
- Feature-Sliced Design (FSD)
- shadcn/ui (style: `base-nova`, base color: `mauve`)
- Tailwind CSS 4
- i18next / next-i18next (supported languages: `en`, `uk`)
- Vitest (testing)

### Backend (`apps/api` — planned)

- NestJS, TypeScript
- PostgreSQL + TypeORM
- Redis + BullMQ (background workers)
- Vitest (testing)

### Tooling

- pnpm 11, Turborepo 2
- ESLint 10 + Prettier 3
- TypeScript 6 (strict mode, `noUncheckedIndexedAccess: true`)

## Architecture

### Frontend — Feature-Sliced Design

FSD layers in `apps/web/src/` (from top to bottom; imports are
allowed only downward):

```
_pages/   → Page-level components mapped to Next.js routes in app/
widgets/  → Composite UI sections (header, footer, etc.)
features/ → User interactions and business logic slices
entities/ → Business domain objects and their UI representations
shared/   → UI kit, utilities, types, API clients
_app/     → Global styles and providers
```

**Rules:**
- Import only from lower layers
  (`_pages` → `widgets` → `features` → `entities` → `shared`).
- Each slice exposes a public API through `index.ts`.
  Always import through it, never from internal files directly.
- Never import across slices on the same layer.
- The `_pages` prefix avoids naming conflicts with Next.js `app/`.

### TypeScript Path Aliases (`apps/web`)

- `@/*` → `src/*`
- `@ui/*` → `src/shared/components/ui/*`

### Database

- Always use TypeORM migrations. Never enable `synchronize: true`.
- New entities go in `packages/database/src/entities/`.
- New migrations go in `packages/database/src/migrations/`.
- Use `timestamptz` for all timestamp columns.
- Use soft delete (`@DeleteDateColumn`) where appropriate.
- Column naming convention: `snake_case` in the database,
  `camelCase` in TypeScript. Use the `name` option in `@Column`.
- Export new entities and types through
  `packages/database/src/index.ts`.

### i18n

- All user-facing strings must use i18n keys — never hardcode them.
- Locale files: `apps/web/app/i18n/locales/{lng}/{namespace}.json`.
- Namespaces: `common`, `landing`.
  Register new namespaces in `apps/web/i18n.config.ts`.
- Supported languages: `en` (default), `uk`.

### API Contracts

- Shared interfaces between frontend and backend go in
  `packages/contracts/src/`.
- Import with `@shared/contracts/api`.

## Commands

Run from the repository root:

```bash
pnpm dev          # Start all dev servers
pnpm build        # Build all packages
pnpm lint         # Run ESLint across the monorepo
pnpm check-types  # Run TypeScript checks across the monorepo
pnpm test         # Run tests (depends on lint + check-types)
pnpm format       # Format with Prettier
```

Run for a specific package:

```bash
pnpm --filter @apps/web dev
pnpm --filter @apps/api dev
pnpm --filter @shared/database build
```

## General Rules

- Do not introduce new dependencies without approval.
- Do not change public API contracts without discussion.
- Do not modify `.env*` files.
- Do not expose secrets or credentials in code.
- Avoid unnecessary refactoring of unrelated code.
- Never enable `synchronize: true` in TypeORM.
- Always use `import type` for type-only imports
  (enforced by ESLint: `@typescript-eslint/consistent-type-imports`).

## Development Workflow

### General

Use the simplest workflow appropriate for the task.

Before implementation:

1. Analyze the relevant code and identify existing patterns.
2. Identify which FSD layer or NestJS module the change belongs to.
3. Determine the appropriate implementation and testing scope.
4. Avoid unnecessary delegation, planning, or review for trivial changes.

### Small Changes

For isolated and low-risk changes:

- Implement directly.
- Add or update tests when behavior requires coverage.
- Run the most relevant verification commands.
- Review the final diff.

Do not require a separate planning or review phase for trivial changes.

### Medium and Large Changes

For changes involving multiple files, business logic, APIs, database changes, architecture, background jobs, or significant regression risk:

- Create an implementation plan before coding.
- Define the required test coverage.
- Implement incrementally.
- Run relevant tests and type checks.
- Review the final diff.
- Perform an independent code review when appropriate.

### TDD

When TDD is explicitly requested or the change contains substantial business logic:

1. Define expected behavior and edge cases.
2. Write failing tests.
3. Implement the minimum required behavior.
4. Run tests and fix implementation issues.
5. Add missing regression and edge-case coverage.
6. Run the final verification suite.

Tests must not be weakened or removed merely to make the implementation pass.

### Testing

Prefer targeted test execution during development and TDD.

Do not run the complete `pnpm test` workflow after every small change.

Use the narrowest relevant test command first.

Run the full test workflow before completion when the scope warrants it.

when the scope of the change warrants it.

Always review the final diff before completion.

## Git

- Do not create commits unless explicitly requested.
- Do not reset or discard unrelated changes.
- Branch naming: use `feat/`, `fix/`, or `chore/` prefixes.