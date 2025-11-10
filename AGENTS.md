# Repository Guidelines

## Project Structure & Module Organization
The Vite + React source lives in `src`: `main.tsx` wires the app, `components/` hosts reusable UI built with Tailwind utility classes, `login/` contains Keycloak form overrides, and `lib/` stores helpers shared between views. Static assets belong in `public/`; Vite copies them as-is. Build outputs land in `dist/`, while Keycloak theme artifacts (the `.jar` you upload to the realm) go to `dist_keycloak/`.

## Build, Test, and Development Commands
Use Yarn (v1) with Node 18+. Key commands:

```bash
yarn dev                 # Vite dev server with React Fast Refresh
yarn build               # Type-check via tsc, then create production bundle
yarn build-keycloak-theme# Full app build + keycloakify packaging into dist_keycloak
yarn storybook           # Component sandbox on http://localhost:6006
yarn format              # Prettier formatting (runs on all staged files)
```

## Coding Style & Naming Conventions
Prettier (two-space indent, single quotes, trailing commas) is the source of truth—run `yarn format` before committing. ESLint (`eslint.config.js`) enforces React hook rules and TypeScript best practices; fix warnings immediately. Name React components and files in PascalCase (`PasswordField.tsx`), hooks in camelCase (`usePasswordToggle.ts`), and keep Tailwind class lists grouped by layout → spacing → color for readability. Favor functional components with top-level `export const Component = () => {}` patterns so keycloakify can tree-shake unused views.

## Testing Guidelines
Vitest + React Testing Library power component tests—mirror the component path when naming specs (`src/components/SocialIcon.test.tsx`). Run `yarn test` in CI, `yarn test:watch` locally, and `yarn test:coverage` when you need V8 reports. Shared matchers live in `src/setupTests.ts`, so add global mocks there. Keep assertions user-facing (rendered text, roles, labels) and pair visual changes with Storybook stories plus screenshots from `dist_keycloak/theme/...` when relevant.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat:`, `fix:`, `chore:`) as seen in the existing history to keep changelogs clean. Each PR should reference any related GitHub issue, include a short summary of the change, list the commands run (e.g., `yarn build-keycloak-theme`), and attach screenshots or Storybook links when altering visuals. Keep PRs focused: prefer several small, reviewable changes over one large drop. Avoid rewriting history—no `git commit --amend` or force-pushes unless a maintainer explicitly requests it.

## Keycloak Theme Delivery Tips
Before publishing, inspect `dist_keycloak/[theme-name].jar` to ensure only the expected resources ship (no `.map` files or secrets). Validate configuration overrides (`kcContext` usage, environment variables) via a local Keycloak container, and note any realm-level steps (Theme selection, cache reset) in release notes so operators can deploy confidently.
