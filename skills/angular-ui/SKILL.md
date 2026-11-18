---
name: angular-ui
description: Build and maintain the dvd-rental-app Angular UI using Angular 22 standalone architecture, signals, signal-based forms where supported, and accessible production practices. Apply for frontend components, routes, forms, state, and styling in dvd-rental-ui.
---

# Angular UI skill

Use this skill for all work under `dvd-rental-ui/`.

## Core conventions

- Target the Angular version installed in `dvd-rental-ui/package.json` (currently Angular 22).
- Prefer standalone components, feature-oriented organization, strict TypeScript, and small cohesive components.
- Prefer signals for local and derived UI state: `signal`, `computed`, and `effect` only when a real synchronization side effect is required. Avoid manually subscribing when a signal/RxJS interop alternative is clearer.
- Prefer Angular's signal-based forms APIs when they are available and appropriate in the installed Angular version. Verify the actual API before using it; do not invent or polyfill unstable APIs. If a requested capability is unavailable, use the narrowest established Angular forms approach and document the compatibility reason.
- Use `input()` and `output()` APIs for component inputs and outputs where compatible with the existing codebase. Keep public component contracts typed and minimal.
- Use `@if`, `@for`, and `@switch` control flow, stable tracking expressions, and `@defer` for genuinely deferrable UI. Avoid unnecessary template work and avoid calling non-trivial methods from templates.
- Keep routing lazy and feature-scoped when the feature size warrants it. Keep HTTP access in typed services, with presentation components focused on user interaction and rendering.
- Model API payloads explicitly. Handle loading, empty, success, and error states rather than relying on implicit undefined behavior.

## Accessibility and UX

- Use semantic HTML, keyboard-operable controls, visible focus, labels, meaningful validation messages, and appropriate ARIA only where native semantics are insufficient.
- Preserve responsive behavior and the existing visual language unless the request calls for a redesign.
- Keep styles component-scoped where possible and avoid broad global selectors.

## Validation and lifecycle

- Do not add or modify unit tests unless the user explicitly asks for tests. Existing generated specs are not a reason to create new cases.
- Validate frontend changes with build/type-check/lint or focused manual checks when appropriate; do not run the test suite by default.
- If starting `ng serve` or another UI process for verification, stop it before handing work back and state the result.

## Skill maintenance

Update this file when a frontend change establishes a reusable Angular convention, changes the supported Angular version, or reveals a compatibility constraint that future UI work must know.
