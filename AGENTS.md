# LinkSentinel — Agent Instructions

## Project Overview

LinkSentinel is a SaaS platform
for marketing link and domain monitoring.

## Repository

This is a pnpm monorepo managed with Turborepo.

## Applications

- apps/web — Next.js frontend.
- apps/api — NestJS backend.

## Technology Stack

- TypeScript
- Next.js
- React
- NestJS
- PostgreSQL
- TypeORM
- pnpm
- Turborepo

## Architecture

- Follow the existing project structure.
- Use the established FSD approach in the frontend.
- Follow NestJS module conventions in the backend.
- Reuse existing abstractions where appropriate.

## General Rules

- Do not introduce dependencies without approval.
- Do not change public API contracts unnecessarily.
- Do not modify environment files.
- Do not expose secrets.
- Avoid unnecessary refactoring.

## Development Workflow

Before implementation:

1. Analyze the relevant code.
2. Identify existing patterns.
3. Create an implementation plan.

After implementation:

1. Run relevant type checks.
2. Run ESLint.
3. Run tests.
4. Review the final diff.

## Git

- Do not create commits unless explicitly requested.
- Do not reset or discard unrelated changes.