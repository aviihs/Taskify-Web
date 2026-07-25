# Rules

Architecture, naming, and asset/content-management rules for this codebase. This document
complements **[CONTRIBUTING.md](CONTRIBUTING.md)** (commits, branches, formatting, PR process) —
read both. Where the two ever disagree, this file wins for the topics it covers (naming,
architecture, assets, constants); CONTRIBUTING.md wins for process.

## 1. Clean architecture & separation of concerns

- **Single Responsibility Principle.** A component, hook, or function does one thing. If you
  need "and" to describe it, split it. A component that fetches data, transforms it, _and_
  renders three unrelated UI states is three responsibilities wearing one file.
- **UI is not where state, data-fetching, or domain logic live.**
  - Presentation → `src/components/**`. A component receives data and callbacks via props (or
    reads them from a hook) and renders. It does not call `fetch`, hit a service, or own
    business rules.
  - Stateful/reusable logic → a hook in `src/hooks/**` (cross-cutting) or colocated in the
    component's own file only if it's presentation-adjacent state no other component will ever
    need (e.g. `Text`'s own translation-lookup hook).
  - Data access / business rules → `src/services/**`.
  - Shared, stateless helpers → `src/lib/**`.
- A component may still contain a small colocated hook for logic that is entirely private to it
  (see `Text`'s `useTranslatedText`) — the rule is "don't call a service from JSX," not "every
  `useState` needs its own file."

## 2. DRY — Don't Repeat Yourself

- The **third** time the same logic or markup shows up, extract it. Not the second — a little
  duplication is cheaper than the wrong abstraction (see CONTRIBUTING.md §1). Two similar-looking
  blocks are often not the same rule in disguise; wait for the third to confirm the pattern.
- One source of truth per concept: a value used by more than one file lives in exactly one place
  (a constant, a type, a CSS token) and everything else imports it — never redefined locally.
  Example already in this codebase: `gapToRem()` in `src/lib/utils.ts` replaces the same
  gap→rem calculation that used to be copy-pasted across `Flex`, `FlexRow`, `FlexColumn`, and
  `Grid`.
- Prefer deleting the duplicate over documenting it. "These two functions do the same thing, but
  keep both for clarity" is not an acceptable resolution.

## 3. Descriptive, self-documenting naming

- No cryptic abbreviations (`t`, `btn`, `cfg`, `usr`, `tmp`, `val`, `res`, `req`, `obj`, `arr`,
  `fn`, `cb`). Spell the word out — `theme`, `button`, `config`, `user`, `temporary`, `value`,
  `response`, `request`, `object`, `array`, `handler`, `callback`.
- Exception: universally-understood idioms stay short — `i`/`j` for loop indices, `x`/`y` for
  coordinates, `e` for a DOM/React event, `id`, `ref`.
- Name a thing for **what it is or does**, not its type or shape: `contact`, not `contactObj` or
  `data`; `isLoading`, not `loadingBool`.
- A function name is a promise about what it returns or does. `getContactById` fetches a contact
  by id — nothing more, nothing less. If the implementation grows a second responsibility, the
  name has to grow with it or the logic has to be split back out.

## 4. Asset management — no inline SVG

- **Never write raw `<svg>...</svg>` markup inside a component.** It bloats the component file,
  can't be cached as a separate network resource, and can't be swapped without touching JSX.
- Two supported ways to render an icon or graphic in this codebase, pick based on need:
  1. **Icon needs to inherit text color, be interactive, or come from an icon set** (buttons,
     nav items, status indicators, spinners) → use the existing
     `@/components/common/icon` (`Icon`) component with an Iconify `collection:icon-name` id.
     This is what `IconButton`, `ToolTip`, and `Spinner` already do — don't hand-roll a second
     way to render an icon.
  2. **Static graphic with fixed colors** (illustrations, logos, decorative art) → place the
     `.svg` file under `src/assets/` and import it as a static asset
     (`import logo from "@/assets/logo.svg"`, then `<Image src={logo} alt="..." />` or `<img>`).
     Never inline its markup.
- Don't reach for a new icon library or SVGR/webpack loader to satisfy this — the two options
  above already cover every case in this project (see `components.json`'s `iconLibrary` for the
  icon set already wired in).

## 5. Constants & content management

- **Current focus: UI copy in `src/components/common/**`.** Titles, descriptions, button/label
  text, and `sr-only` strings hardcoded inside a component move to
  `src/constants/common-content.ts` and get imported — see `NO_PERMISSION_MESSAGE`,
  `MODAL_CLOSE_BUTTON_LABEL`, `SPINNER_LOADING_LABEL`, and `INPUT_DEFAULT_PLACEHOLDER` for the
  pattern. This gives copy one source of truth and one place to hook a translation layer into
  later, instead of hunting through JSX for the string that needs to change.
- Config-style values (breakpoints, z-index layers, route paths, feature flags) are **not** in
  scope for `src/constants/` right now — leave numbers like `Modal`'s `zIndex = 1111` or
  `useIsMobile`'s `768` inline where they already are. Revisit once a real cross-file need for
  one shows up; don't extract config speculatively.
- This is not license to extract every literal in the codebase. A string used **exactly once**
  outside `common/`, whose meaning is already obvious from context, doesn't need a constant —
  that's an abstraction with one caller, which YAGNI (CONTRIBUTING.md §1) already forbids.
- Static page/seed **content** (copy blobs, JSON fixtures) stays in `src/data/`, per the existing
  project structure — `constants/` holds the small, reusable UI strings described above; `data/`
  holds larger content payloads.
- Translatable UI copy is the one exception to "no hardcoded strings in components": `Text`
  children are written as literal English strings by design (see `src/lib/i18n/`) — the
  dictionary layer keys off the exact string, so the literal _is_ the source of truth, not a
  violation of this rule.

## 6. Naming conventions

| What                                   | Convention                                    | Example                                                 |
| -------------------------------------- | --------------------------------------------- | ------------------------------------------------------- |
| React components                       | `PascalCase`                                  | `ContactCard`, `Spinner`                                |
| Component files                        | `PascalCase.tsx` or `ComponentName/index.tsx` | `Spinner/index.tsx`                                     |
| Functions, variables                   | `camelCase`, descriptive                      | `getContactById`, `isLoading`                           |
| Constants (module-level, fixed)        | `SCREAMING_SNAKE_CASE`                        | `NO_PERMISSION_MESSAGE`, `SPINNER_LOADING_LABEL`        |
| Utility/helper modules (`lib/`, hooks) | `kebab-case.ts` for multi-word files          | `use-mobile.ts`, `common-content.ts`                    |
| Types / interfaces                     | `PascalCase`, no Hungarian prefix             | `Contact`, `ModalProps` (not `IContact`, `IModalProps`) |
| Booleans                               | prefix `is`/`has`/`should`/`can`              | `isLoading`, `hasError`, `canSubmit`                    |
| Event handlers                         | prefix `handle` (local) / `on` (prop)         | `handleSubmit`, `onSubmit`                              |

- Single-word utility files (`utils.ts`, `fonts.ts`, `themes.ts`) are already
  indistinguishable between camelCase and kebab-case — the kebab-case rule only bites for
  multi-word filenames going forward.
- `src/components/ui/**` (shadcn-generated primitives) is vendored code, managed via the shadcn
  CLI — it's exempt from these naming rules. Don't hand-edit it to match house style; regenerate
  or extend it instead.
- This table supersedes CONTRIBUTING.md's naming table where they overlap (both already agree:
  no Hungarian-notation prefixes on types).

## Essential additions for this project

These aren't in the original request but matter enough here to call out explicitly:

- **Server vs. Client Components (Next.js App Router).** Default to Server Components. Add
  `"use client"` only when a component actually needs state, effects, event handlers, or a
  browser API — not preemptively "in case." Check `LocaleProvider`/`LocaleSwitcher`/`Text` for
  the existing pattern: the provider and anything with interactivity is a client component;
  plain layout/presentation stays server-rendered.
- **No unwired code.** Every component under `src/components/**` should be imported by at least
  one real route, or explicitly marked as a work-in-progress reference (as `common.md` already
  does for the copied starter-kit bundle). A component nothing imports is dead weight — it still
  gets type-checked and read by the next person, for zero runtime benefit. Wire it in or delete
  it; don't let it sit unreferenced indefinitely.
- **Server-only secrets never reach client code.** An env var read for a server-side integration
  (an API key, a DB URL) is only ever imported in a Server Component or a Route Handler — never
  in a file marked `"use client"`, and never passed as a prop down into one.
- **Accessibility baseline for interactive primitives.** Every custom interactive component
  (button, modal, tooltip, form control) ships with the semantic HTML element it corresponds to,
  the ARIA attributes that make it usable with a screen reader, and (for icon-only controls) a
  `sr-only` text label — see `Modal`'s close button or `Spinner`'s status text for the pattern
  already in place.

## Applying these rules — audit summary

This file was authored alongside a project-wide pass that brought the existing code in line with
it:

- Removed every Hungarian-prefixed interface/type (`IContact`, `IModalProps`, `ISpinnerProps`,
  `IIconProps`, `IIconButtonProps`, `ILabelProps`, `IInputLabelProps`, `IInputProps`,
  `IPromptDialogProps`, `IFlexContainerProps`, `IGridContainerProps`) in favor of plain
  `PascalCase` names, matching §6 and CONTRIBUTING.md's existing (until-now unenforced) rule.
- Extracted the gap→rem conversion duplicated across `Flex`, `FlexRow`, `FlexColumn`, and `Grid`
  into one `gapToRem()` helper in `src/lib/utils.ts` (§2, DRY).
- Renamed the single-letter `t` in `Theme` to `theme` (§3).
- Replaced `Spinner`'s 20-line inline `<svg>` with the existing `Icon` component, matching every
  other icon usage in the codebase instead of introducing a second rendering method (§4).
- Introduced `src/constants/common-content.ts` and moved the hardcoded UI copy out of
  `NoPermission`, `Modal`'s close-button label, `Spinner`'s status text, and `FormUI/Input`'s
  default placeholder (§5). Config-style magic numbers (`Modal`'s `zIndex`, `useIsMobile`'s
  breakpoint) were deliberately left inline — out of scope for now, see §5.
- While touching `InputLabel`, dropped an unreachable `|| "tooltip"` fallback: the outer
  `tooltipMessage ?` check already guarantees the value is truthy by the time it reaches
  `ToolTip`, so the fallback could never fire.

Not changed, on purpose:

- `src/components/ui/**` was left untouched — it's shadcn-vendored code (see the naming table's
  exemption).
- Demo/showcase pages (`app/demo`, `app/ocean`) keep their inline variant labels ("Secondary",
  "Outline", …) — extracting one-off labels from a component gallery into `constants/` would be
  the kind of speculative abstraction §5 explicitly warns against.
- The still-unwired `src/components/common/**` bundle (documented in `common.md`) was brought
  into naming/asset compliance but not deleted or force-wired into a page — that's a product
  decision (build a real feature on top of it, or remove it), not a rules-compliance one.
