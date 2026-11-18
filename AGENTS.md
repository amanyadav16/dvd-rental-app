# dvd-rental-app project instructions

## Testing policy

- Do not add, generate, or modify unit test cases for this project unless the user explicitly requests tests.
- Do not add new test fixtures, test utilities, or test dependencies as part of ordinary feature work.
- Existing generated tests may remain untouched.
- Prefer build, type-check, lint, static analysis, and focused manual verification when validation is needed and available.

## Application lifecycle

- If the UI or backend is started for development or verification, terminate the process after verification completes.
- Before launching, check for an existing process/session to avoid leaving duplicate servers running.
- Report any launch that could not be terminated cleanly instead of assuming it stopped.

## Engineering standards

- Before making a file change, explain the intended edit and show the relevant proposed diff or a concise preview. Wait for the user's explicit approval before applying it. Do not treat the assistant's generated change as already accepted.
- Follow the project skills in `skills/angular-ui/SKILL.md` for frontend work and `skills/springboot-backend/SKILL.md` for backend work.
- Use Angular 22 capabilities and current Spring Boot practices where they are supported by the versions actually installed in this repository.
- Update the relevant project skill when a code change establishes a new reusable convention or supersedes an existing one.
- Keep changes focused, preserve existing user work, and do not introduce unrelated architecture or dependencies.

## Database reference

- Before database-related work, read `docs/database-schema.md`.
- Treat `database/schema.sql` as the source of truth for PostgreSQL tables, relationships, and constraints.

## Learning focus and change boundaries

- This project is primarily for learning backend development.
- Make Angular UI changes freely when requested or when needed to support the user's stated UI goal.
- Do not implement backend changes unless the user explicitly mentions backend implementation or asks for backend code changes.
- For backend topics without an explicit implementation request, explain, guide, and provide suggestions while leaving backend files unchanged.
- Ask a concise follow-up question whenever requirements or scope are genuinely unclear before making a potentially divergent change.

## Token efficiency

- Keep responses concise and task-focused.
- Avoid lengthy explanations unless requested.
- Do not repeat code already visible in the editor.
- Read only files relevant to the current task.
- Prefer targeted searches over scanning the repository.
- Do not explore unrelated modules.
- Avoid unnecessary tool calls.
- Reuse existing project context when available.

## Code changes

- Make minimal, targeted changes.
- Do not refactor unrelated code.
- Preserve existing architecture and naming conventions.
- Show only relevant code changes.
- Avoid generating unnecessary documentation.
- Do not create additional files unless required.

## Framework conventions

- Follow existing Angular patterns and use PrimeNG for UI components where appropriate.
- Use standalone components and signals where appropriate.
- Use NgRx for UI state management.
- Prefer signals over Observables when signals fully satisfy the requirement.
- Use RxJS and Observables when signals do not fully satisfy the requirement or when stream-based behavior is appropriate.
- Avoid adding dependencies unnecessarily.
- Modify only affected components, services, and tests.
- For Spring Boot, follow the existing controller-service-repository architecture.
- Reuse existing DTOs, entities, and utilities.
- Use Lombok for backend Java code where appropriate.
- Avoid unnecessary abstractions and preserve existing API contracts.

## Response format

- Provide a brief summary of changes.
- Mention modified files.
- Avoid repeating unchanged code.
