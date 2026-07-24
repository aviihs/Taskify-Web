# Project Template

A [Next.js](https://nextjs.org) starter template — App Router, TypeScript, Tailwind CSS v4,
and a [shadcn](https://ui.shadcn.com)-based component system — pre-wired with linting,
formatting, and commit/PR conventions so new projects start clean.

> **Note:** This project pins a modified build of Next.js. Before writing code that touches
> Next.js APIs, check `node_modules/next/dist/docs/` — conventions may differ from what you
> expect (see [AGENTS.md](AGENTS.md)).

## Tech stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, React Compiler enabled)
- **UI:** [React 19](https://react.dev), [shadcn](https://ui.shadcn.com) components on
  [Base UI](https://base-ui.com), [Tailwind CSS v4](https://tailwindcss.com)
- **Forms:** [React Hook Form](https://react-hook-form.com)
- **Icons:** [lucide-react](https://lucide.dev)
- **Language:** TypeScript (strict mode)
- **Package manager:** [Bun](https://bun.sh)

## Getting started

```sh
bun install    # installs dependencies and activates Git hooks (Husky)
bun dev        # starts the dev server at http://localhost:3000
```

Other scripts:

| Command                | Purpose                                  |
| ---------------------- | ---------------------------------------- |
| `bun run build`        | Production build                         |
| `bun run start`        | Serve the production build               |
| `bun run lint`         | Run ESLint                               |
| `bun run lint:fix`     | Run ESLint with autofix                  |
| `bun run format`       | Format the codebase with Prettier        |
| `bun run format:check` | Check formatting without writing changes |

## Project structure

```
src/
  app/          # routes, layouts, and global styles (App Router)
  components/
    ui/         # base/shadcn primitives (Button, Input, ...)
  lib/          # shared utilities (cn()) and design-system config (fonts.ts)
  services/     # data-fetching / business logic, decoupled from UI
  types/        # shared TypeScript types
  data/         # static/seed content
public/         # static assets (images, fonts, documents, videos)
```

## Code quality & workflow

This repo enforces its rules automatically rather than relying on review alone:

- **ESLint** (`eslint-config-next`) + **Prettier** for linting and formatting.
- **Husky** git hooks: staged files are linted/formatted on `pre-commit`
  ([lint-staged](https://github.com/okonet/lint-staged)); commit messages are validated on
  `commit-msg` ([commitlint](https://commitlint.js.org)).
- **Conventional commit messages** — only `feat`, `fix`, `hotfix`, `build`, `merge`, `docs`,
  `chores` are allowed, e.g. `fix: correct button contrast in dark mode`.

Full coding standards — naming conventions, DRY/component-reuse rules, branch naming, commit
format, and the PR checklist — live in **[CONTRIBUTING.md](CONTRIBUTING.md)**. Read it before
opening a PR; the [PR template](.github/PULL_REQUEST_TEMPLATE.md) checks against it directly.

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn Documentation](https://ui.shadcn.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
