# React Router Demo

A demo app to play around and learn React Router, bootstrapped with Vite. Also used to explore different approaches to forms and search inputs, and to practice testing with Vitest and React Testing Library.

## Stack

- [React](https://react.dev) — UI library
- [Vite](https://vitejs.dev) — build tool and dev server
- [Biome](https://biomejs.dev) — linter and formatter
- [Husky](https://typicode.github.io/husky) — git hooks
- [pnpm](https://pnpm.io) — package manager
- [Vitest](https://vitest.dev) — test runner
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) — component testing utilities

## Features Explored

**Forms** — three different approaches side by side:
- Controlled inputs with manual state
- Uncontrolled inputs with `FormData`
- React 19 form actions with `useActionState`

**Search with debounce** — three implementations:
- Debounce via `useEffect` cleanup
- Debounce via `useRef` timer
- Debounce via a custom `useDebounce` hook

## Testing

Tests are written with Vitest and React Testing Library and cover all components, hooks, and pages. Coverage is enforced at 90% and both tests and coverage run automatically on every commit via a Husky pre-commit hook.

```bash
pnpm test            # run tests in watch mode
pnpm test:coverage   # run tests with coverage report
```

## CI/CD

A GitHub Actions workflow runs on every push. It lints, runs the full test suite, and enforces the 90% coverage threshold — the build fails if any check doesn't pass. Pushes to `master` also trigger a production deploy to Vercel, but only after the test job succeeds.

## Getting Started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview the production build |
| `pnpm lint` | Run Biome linter and formatter |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:coverage` | Run tests with coverage report |
