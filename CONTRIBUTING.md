# Contributing

Rules for writing, naming, committing, and shipping code in this repo. Enforced where possible
by ESLint, Prettier, Husky, and commitlint (installed via `bun install`) — the rest is on review.

## 1. Core principles

- **DRY (Don't Repeat Yourself).** If the same logic/markup shows up a 3rd time, extract it —
  a hook (`src/lib`), a service (`src/services`), or a component (`src/components`). Don't
  extract on the 2nd occurrence; a little duplication is cheaper than the wrong abstraction.
- **YAGNI.** Don't build config options, props, or abstractions for a use case that doesn't
  exist yet. Solve the problem in front of you.
- **Single responsibility.** A component, function, or module does one thing. If you're
  reaching for "and" to describe what it does, split it.
- **No dead code.** No commented-out code, no unused exports/imports/variables, no
  `console.log` left behind. If it's not used, delete it — git history remembers it.
- **Readability over cleverness.** Prefer the boring, obvious solution. Optimize for the next
  person reading the diff, not for fewest characters.

## 2. Naming conventions

| What                            | Convention                            | Example                              |
| ------------------------------- | ------------------------------------- | ------------------------------------ |
| Variables, functions            | `camelCase`, descriptive              | `getContactById`, `isLoading`        |
| React components                | `PascalCase`                          | `ContactCard`, `Button`              |
| Component files                 | `PascalCase.tsx` (match export)       | `ContactCard.tsx`                    |
| Non-component files             | `camelCase.ts`                        | `contactService.ts`, `utils.ts`      |
| Types / interfaces              | `PascalCase`, no Hungarian prefix     | `Contact` (not `IContact`)           |
| Constants (module-level, fixed) | `UPPER_SNAKE_CASE`                    | `MAX_RETRIES`, `DEFAULT_PAGE_SIZE`   |
| Booleans                        | prefix `is`/`has`/`should`/`can`      | `isLoading`, `hasError`, `canSubmit` |
| Event handlers                  | prefix `handle` (local) / `on` (prop) | `handleSubmit`, `onSubmit`           |

- No single-letter names except loop indices (`i`, `j`) or well-known math/coordinates (`x`, `y`).
- No abbreviations that aren't universally obvious (`btn`, `cfg`, `usr`) — spell it out.
- Name things for what they _are_, not for their type (`contact`, not `contactObj` or `data`).
- Don't reuse a variable name for a different meaning within the same scope.

### Explanatory variables

Extract expressions into a named variable when the expression's _meaning_ isn't obvious from
reading it, or when it's reused.

```ts
// Avoid — reader has to decode the condition
if (user.age >= 18 && user.country === "NP" && !user.isBanned) { ... }

// Prefer — the name explains the "why"
const isEligibleNepaliAdult = user.age >= 18 && user.country === "NP" && !user.isBanned;
if (isEligibleNepaliAdult) { ... }
```

Same goes for magic numbers/strings — name them as constants instead of inlining:

```ts
// Avoid
if (retries > 3) { ... }

// Prefer
const MAX_RETRIES = 3;
if (retries > MAX_RETRIES) { ... }
```

## 3. Components

- Check `src/components/ui` and existing feature components before writing new markup —
  don't rebuild a button, input, or card that already exists.
- If a piece of UI is used (or will obviously be used) more than once, make it a component with
  props instead of copy-pasting JSX.
- Keep components small and composable: presentation in the component, data-fetching in
  `src/services`, shared logic in `src/lib`, shared types in `src/types`.
- Props should be typed explicitly (no `any`); prefer a narrow, specific prop type over a
  generic `object`/`Record<string, unknown>`.
- Don't add a prop, variant, or config flag for a single call site — inline it until a second
  real use case appears.

## 4. Styling & design tokens

- Design tokens (colors, radius, fonts) live in `src/app/globals.css` under `:root` / `.dark`
  and are exposed to Tailwind via `@theme inline`. Add a token there — never hardcode a hex
  color or one-off `px` value in a component.
- Fonts are loaded once, in `src/lib/fonts.ts` (via `next/font`), and wired to the
  `--font-sans` / `--font-mono` tokens in `globals.css`. To swap or add a family, edit that one
  file — don't call `next/font` from anywhere else.
- A class used the same way in 3+ places becomes a Tailwind v4 `@utility` in `globals.css`
  (not `@layer components`, which is v3 syntax) instead of copy-pasted class strings.
- Always compose classes with `cn()` (`src/lib/utils.ts`), never manual string concatenation.

## 5. TypeScript

- `strict` mode is on — keep it that way. No `any`; use `unknown` and narrow it, or fix the type.
- Prefer `interface` for object shapes that represent entities/props, `type` for unions,
  intersections, and utility aliases.
- Don't disable ESLint/TypeScript rules inline (`// eslint-disable`, `// @ts-ignore`) without a
  comment explaining why — and treat it as a last resort, not a shortcut.

## 6. Formatting & linting

Formatting is automated — don't hand-format or bikeshed it in review.

- `bun run lint` — ESLint (`eslint-config-next` + TypeScript rules)
- `bun run format` — Prettier, writes changes
- `bun run format:check` — Prettier, CI/verification mode

A pre-commit hook (Husky + lint-staged) runs ESLint and Prettier automatically on staged files.
Commits with lint errors are rejected — fix them rather than bypassing the hook.

## 7. Branch naming

```
<type>/<short-kebab-description>
```

Types: `feat`, `fix`, `hotfix`, `build`, `merge`, `docs`, `chores`. Example: `feat/contact-form-validation`.

## 8. Commit rules

Commits must follow [Conventional Commits](https://www.conventionalcommits.org/) style, enforced
by commitlint via a Husky `commit-msg` hook:

```
<type>(<optional scope>): <short summary, imperative mood, no trailing period>

[optional body — the why, not the what]

[optional footer — e.g. Closes #123, BREAKING CHANGE: ...]
```

Allowed types: `feat`, `fix`, `hotfix`, `build`, `merge`, `docs`, `chores`.

| Type     | Use for                                          |
| -------- | ------------------------------------------------ |
| `feat`   | a new feature                                    |
| `fix`    | a bug fix                                        |
| `hotfix` | urgent production fix                            |
| `build`  | build system or dependency changes               |
| `merge`  | merging branches                                 |
| `docs`   | documentation only changes                       |
| `chores` | maintenance work that doesn't touch src or tests |

```
feat(contact): add server-side email validation
fix(button): correct disabled-state contrast in dark mode
chores(deps): bump eslint to v9
```

- One logical change per commit. Don't bundle an unrelated formatting pass into a feature commit.
- Subject line: minimum 10 characters, maximum 100 characters, imperative mood
  ("add", not "added"/"adds").
- Explain _why_ in the body when the change isn't self-evident from the diff.

## 9. Pull request rules

- Keep PRs small and scoped to one concern — easier to review, easier to revert.
- Fill out the [PR template](.github/PULL_REQUEST_TEMPLATE.md) completely; don't delete
  sections instead of answering them.
- PR title follows the same Conventional Commits format as commits (it becomes the squash-merge
  commit message).
- Include screenshots/recordings for any UI-visible change.
- Self-review your own diff before requesting review — catch the obvious stuff yourself.
- CI (lint, format check, build) must pass before requesting review.
- Address review comments with new commits during review; don't force-push until it's approved
  and about to merge, so reviewers can see what changed between passes.
- Squash-merge once approved, using the Conventional Commit title.

## 10. First-time setup

```sh
bun install     # installs deps and activates Husky hooks via the "prepare" script
```

This repo runs on a modified Next.js — read the relevant guide under
`node_modules/next/dist/docs/` before relying on API behavior from memory (see `AGENTS.md`).
