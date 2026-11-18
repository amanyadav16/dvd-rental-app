---
name: springboot-backend
description: Build and maintain the dvd-rental-app Spring Boot backend using layered design, typed boundaries, validation, transactional correctness, and current Spring Boot practices. Apply for Java APIs, persistence, configuration, and backend services in dvd-rental-backend.
---

# Spring Boot backend skill

Use this skill for all work under `dvd-rental-backend/`.

## Change review workflow

- Before editing backend files, present the intended change and a concise proposed diff or preview, then wait for explicit user approval.
- Treat generated edits as proposed until the user approves them; do not assume acceptance merely because the task requests an implementation.

## Core conventions

- Target the Java and Spring Boot versions declared in `dvd-rental-backend/pom.xml` (currently Java 21 and Spring Boot 4.x).
- Keep a clear boundary between web/controllers, application services, persistence/repositories, and domain/persistence models. Use constructor injection and keep controllers thin.
- Use explicit request/response DTOs at the HTTP boundary; do not expose JPA entities directly from public APIs. Prefer Java records for immutable DTOs when they fit the contract.
- Validate request data at the boundary with Jakarta Bean Validation and return consistent, useful errors. Use Spring's `ProblemDetail` or the project's established error representation rather than ad-hoc error bodies.
- Define transaction boundaries in the service layer. Use read-only transactions for queries when appropriate and keep repository queries focused and typed.
- Use pagination and explicit sorting for collection endpoints that can grow. Avoid N+1 queries and accidental eager loading; choose fetch plans deliberately.
- Externalize environment-specific configuration, keep secrets out of source control, and use profiles/configuration properties for typed settings.
- Use structured logging without sensitive data. Map domain/application failures to stable HTTP responses and preserve meaningful server-side diagnostics.
- Prefer current Spring APIs and repository conventions already supported by the declared dependencies. Do not add a library when the platform already provides a suitable capability.

## API and persistence quality

- Keep endpoint naming, status codes, and serialization consistent with neighboring code.
- Make writes idempotent where the domain permits it and enforce invariants in the service/domain layer, not only in controllers.
- Add database constraints and indexes deliberately when persistence behavior requires them; document migration expectations before introducing schema changes.
- Keep entities persistence-focused and avoid leaking lazy-loading behavior across the web boundary.

## Validation and lifecycle

- Do not add or modify unit test cases unless the user explicitly asks for tests. Existing generated tests are not a reason to create new cases.
- Validate backend changes with compilation, static checks, endpoint smoke checks, or focused manual verification as appropriate; do not run the test suite by default.
- If starting Spring Boot, Maven, or another backend process for verification, stop it before handing work back and state the result.

## Skill maintenance

Update this file when a backend change establishes a reusable Spring/Java convention, changes the supported Java or Spring Boot version, or reveals a compatibility constraint that future backend work must know.
