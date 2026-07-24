# `common/` — shared UI building blocks

Copied from `nextjs-starterkit-v1/src/components/common` so you have a
reference set of small, reusable components. Everything here compiles and
type-checks in this project, but read "Known gaps" below before using any of
it in a real page — several files render unstyled until you add a couple of
Tailwind tokens.

## Files, what they do, and what they need

**`icon/`** — renders one icon via [Iconify](https://iconify.design/)
(`@iconify/react`). `name` is a `collection:icon-name` id, e.g.
`name="lucide:search"` or `name="mdi:home"` — browse ids at
[icon-sets.iconify.design](https://icon-sets.iconify.design). Iconify fetches
icon data from its public API on demand, so no icon font is needed for this
component. `ToolTip` is the only file in here that depends on it.

**`IconButton/`** — wraps `icon/` in a clickable `<button>`. `name` is the
same Iconify `collection:icon-name` id. Depends on `icon/`.

**`Label/`** — a plain `<label>` with a required-field asterisk. Standalone.

**`spinner/`** — an inline loading spinner (raw SVG, no icon font needed).
Standalone.

**`NoPermission/`** — static "you can't see this page" message. Standalone,
no props.

**`layout/`** — flexbox/grid wrapper `<div>`s so you stop retyping
`className="flex flex-col gap-2"` everywhere:

- `Flex` — column by default, switches to row at `md:` breakpoint if you pass `md`.
- `FlexColumn` — always `flex flex-col`.
- `FlexRow` — always `flex flex-row`.
- `Grid` — CSS grid, `cols` prop sets column count.
- `gap` prop on all of them is a number multiplied by `0.25rem` (so `gap={4}` = `1rem`, i.e. it mimics Tailwind's spacing scale without needing a `gap-4` class).
- `layout/types` holds the shared prop interfaces (`IFlexContainerProps`, `IGridContainerProps`).
- `layout/index.ts` re-exports all four, so elsewhere you write
  `import { FlexRow, Grid } from "@/components/common/layout"`.

**`Modal/`** — the base dialog: backdrop, centered card, header with title/
icon/close button, animated in/out with `react-transition-group`
(`CSSTransition`). Depends on `layout` (`FlexRow`) for the header row and
`icon/` for the header icon and close ("lucide:x") icon — imported as
`IconGlyph`, not `Icon`, because the `Icon` prop on `Modal` itself is a
string (the header's icon id) and would otherwise shadow the component
import. Every other dialog in this app should probably be built on top of
this instead of writing a new backdrop+centering layout from scratch.

**`PromptDialog/`** _(renamed from the original's typo'd `PropmtDialog`)_ — a
thin wrapper around `Modal` that just forces a very high `zIndex` (for
dialogs that must sit above other modals, e.g. a confirm-delete prompt
opened from inside another modal).

**`FormUI/Input/`** — a styled `<input>` (`forwardRef`, so it works with
`react-hook-form`'s `register`). Standalone.

**`FormUI/InputLabel/`** — a form field label with an optional info-icon
tooltip next to it. Depends on `ToolTip`.

**`ToolTip/`** — **not from the original folder.** It wasn't in `common/`
itself, but `InputLabel` imports it, so it's copied in too (from the
starter-kit's `components/ui/tooltip.tsx`) as part of "bring the
dependencies." Important: this project already has its own
`@/components/ui/tooltip.tsx`, built on `@base-ui/react` with a completely
different API (`<Tooltip><TooltipTrigger/><TooltipContent/></Tooltip>`
composition). This copy is a _different_ component with a `name`/`message`
prop API, built on `@radix-ui/react-tooltip`. Both can coexist — just don't
confuse the two imports. Added `@radix-ui/react-tooltip` as a dependency for
this file specifically.

## What was fixed while copying (not a style choice — the code wouldn't build otherwise)

- `@/utils` → `@/lib/utils` (that's where this project's `cn()` helper
  actually lives).
- `@/components/common/Layout/...` (capital `L`) → relative `../types` /
  `@/components/common/layout` (lowercase). The original had a casing bug
  that only worked because some filesystems (macOS/Windows) ignore case;
  Linux doesn't.
- Dropped a stray `: JSX.Element` return-type annotation in `icon/` and
  switched `layout/types` to `import type { JSX } from "react"`. React 19
  removed the old global `JSX` namespace — this is a real breaking change
  in this repo's React version, not a copy artifact.
- Installed the two npm packages this folder actually needs to compile:
  `react-transition-group` (used by `Modal`) and `@radix-ui/react-tooltip`
  (used by `ToolTip`).

## Styling — now wired to this project's shadcn theme

The original starter-kit classes referenced a numbered `grey-*`/`primary-400`
color scale and `text-icon-sm`/`text-icon-md` size tokens that don't exist in
this project's `globals.css` (shadcn's default, oklch-based theme has no
numbered grey/primary scale). Every one of those classes has been swapped for
the equivalent token this project already ships, matched against how the
existing `src/components/ui/*` primitives use them:

| Original (starter-kit)                | Now (this project)                                                            |
| ------------------------------------- | ----------------------------------------------------------------------------- |
| `border-grey-300`                     | `border-input`                                                                |
| `text-grey-700` / `text-grey-800`     | `text-foreground`                                                             |
| `placeholder:text-grey-400`           | `placeholder:text-muted-foreground`                                           |
| `hover:`/`focus:border-primary-400`   | `hover:`/`focus:border-ring`                                                  |
| `fill-primary-400`                    | `fill-primary`                                                                |
| `text-grey-500` / `text-grey-600`     | `text-muted-foreground`                                                       |
| `bg-grey-200` / `hover:bg-grey-200`   | `bg-muted` / `hover:bg-muted`                                                 |
| `bg-grey-700/50` (modal backdrop)     | `bg-black/80` (matches `SheetOverlay`)                                        |
| `bg-white` / `bg-grey-900` (surfaces) | `bg-popover` / `text-popover-foreground` (matches `popover.tsx`, `sheet.tsx`) |
| `text-red-500` (asterisk/error)       | `text-destructive`                                                            |
| `text-icon-sm` / `lg:text-icon-md`    | `text-base` / `lg:text-lg`                                                    |

No new Tailwind theme tokens were added — everything above already existed in
`globals.css` / `src/components/ui/*`.

## Icons — migrated off Material Icons, onto Iconify

`icon/`, `IconButton/`, and `Modal/` originally rendered icon _ligature
names_ (e.g. `"close"`, `"info"`) through a Google Material Icons font. That
font was never loaded in this project, so those names rendered as literal
text. Rather than add the font back, all three were switched to
[`@iconify/react`](https://iconify.design/) (installed): icons are now
identified by a `collection:icon-name` string (e.g. `"lucide:search"`,
`"lucide:x"`) and rendered as inline SVG fetched from Iconify's public API —
no font `<link>` needed, so none was added. `IconButton` dropped its
`iconClassName` prop since Iconify has no font-variant classes to switch
between — pick a different icon id instead (e.g. `"lucide:home"` vs
`"lucide:home-outline"` if that id exists in the target set).

One real bug this surfaced: `InputLabel` → `ToolTip` → `icon/` passed the
bare name `"info"` through the whole chain. That was a valid Material ligature
but isn't a valid Iconify id (needs a collection prefix), so it would've
rendered blank. Fixed at the source: `InputLabel` now passes `"lucide:info"`.
If you add more `ToolTip`/`Icon` usages, remember the `name` always needs a
`collection:` prefix — browse ids at
[icon-sets.iconify.design](https://icon-sets.iconify.design).

## Suggestions (not applied — pick if/when you want them)

- **Delete `PromptDialog/`** and inline its two-line body (`<Modal zIndex={111111}>`) at each call site once you have one — nothing currently imports it, so this is a free choice right now.
- **`Modal`'s `Icon` prop name** collides in spirit with the `icon/` component (already worked around internally via the `IconGlyph` alias) — if this ever gets confusing for callers, rename the prop to `iconName` (matches `PromptDialog`'s own `iconName` prop, so `Icon={iconName}` becomes `iconName={iconName}`).
- **None of these 15 files are imported by any page yet** (checked: no matches outside `common/` itself). Nothing here is exercised by `next build`'s prerender or by any test — the only signal you have that these work is the typecheck. Worth wiring at least one (e.g. `FormUI/Input` + `Label`) into a real form before trusting the rest.
- **`ToolTip`'s `@radix-ui/react-tooltip` vs. this project's `@base-ui/react` tooltip** — two different tooltip primitives now live in the dependency tree for two components that do the same job. Fine short-term (reference/learning), but pick one before this ships anywhere real.
