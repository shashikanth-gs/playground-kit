# Agent guide — http2xx design system

This source kit is extracted from the http2xx.io app. In the full repository, run `npm run kit` and copy from the generated kit when building another app; the reference catalog in `src/app/`, `src/components/docs/`, and `src/lib/docs/` is excluded. In an extracted download, use the provided source directly. Do not restyle primitives, invent colours, or recreate a button, dialog, or list that already exists here.

Read this file first, then `COMPONENTS.md` for the inventory. Open the component file before using it; props in the source are the contract.

## What this is

One visual system for many apps:

- Tokens and global CSS in `src/styles/globals.css`
- Primitives in `src/components/ui/`
- Composed patterns in `src/components/patterns/`
- Light / dark theme in `src/components/theme/`
- Phone chrome in `src/components/navigation/`
- Reference brand mark in `src/components/brand/` and `public/brand/`

Product screens from http2xx.io (projects, experiences, sessions, auth, SEO) are not in this kit. Compose those per app from the patterns below.

## Install into a new app

Host app: Next.js 16, React 19, Tailwind CSS 4, TypeScript. Path alias `@/*` → `./src/*`.

1. Create the app with Tailwind. In the full repository, dependencies are listed in `package.json`. In the extracted kit, run `node install-dependencies.mjs --target /path/to/app` to merge the requirements from `dependencies.json`, then install with the host's package manager.
2. Copy the generated kit's `src/` into the app's `src/`. Copy `public/brand/` into the app's `public/brand/`. Copy `components.json` to the app root. Do not copy the reference catalog into a product app.
3. Replace the root layout with `scaffold/root-layout.tsx` (edit title, description, and `themeColor` for the product).
4. Copy `scaffold/template.tsx` to `src/app/template.tsx`.
5. Import the stylesheet once, from the root layout: `import "@/styles/globals.css"`. Delete any other global CSS so tokens are not duplicated.
6. Rename `THEME_STORAGE_KEY` in `src/components/theme/theme-script.tsx` to a key unique to this product (for example `acme-theme`). The kit value is `http2xx-design-system-theme`.
7. Replace the logomark if this is not an http2xx product. `Logo`, `Logomark`, and `Wordmark` live in `src/components/brand/logo.tsx`. The mobile top bar links home with `aria-label="http2xx.io home"` — change that label with the brand.
8. Preserve `LICENSE`, `BRAND.md`, `THIRD_PARTY_NOTICES.md`, and `licenses/` with redistributed source. Original code is MIT-licensed; upstream components and fonts retain their own licenses. The reference brand artwork has separate terms in `BRAND.md`.

`components.json` is the shadcn config (`style: base-nova`, Base UI, lucide). Adding a missing primitive later:

```bash
npx shadcn@latest add <component>
```

New primitives must use the existing tokens. Do not introduce a second palette.

## Required shell

Every app mounts this once:

- `ThemeScript` in `<head>` (blocks theme flash)
- `ThemeProvider` around the tree
- `TooltipProvider` around the tree (`delay={300}`)
- `Toaster` from `@/components/ui/sonner` (toasts do nothing without it)
- Font variables on `<html>`: `--font-geist-sans`, `--font-geist-mono`, `--font-space-grotesk`

Page titles inside the app use `PageHeader`, which registers the string with `ScreenTitle` so the phone top bar can show it on scroll.

Phone navigation:

```tsx
<MobileTopBar homeHref="/" parentOf={(pathname) => /* parent route or null */} trailing={/* optional */} />
<TabBar items={[{ title: "Home", href: "/", icon: HouseIcon, exact: true }]} />
```

Set `exact` on a root tab so it does not stay active on child paths. Push a screen with `<Link transitionTypes={["nav-forward"]}>`. Pop with `transitionTypes={["nav-back"]}`.

Mark persistent chrome with `data-chrome` so view transitions and text selection skip it. `TabBar` and `MobileTopBar` already do this.

## Rules

1. Colour comes from semantic tokens (`bg-background`, `text-muted-foreground`, `border-border`, `text-brand-text`, `bg-signal`). Never write raw hex, `oklch()`, or Tailwind palette classes (`bg-blue-500`, `text-zinc-400`).
2. Status colour is a `Tone`: `brand | success | warning | danger | info | neutral`. Pass it to `Pill`, `StatusDot`, `Callout`, `Banner`, `ProgressRing`. Do not map a status to a one-off class.
3. Brand blue is for identity, links, and focus. Signal green is for live or healthy state only. Neither is a large page fill.
4. Use the existing component for the job. A second button style, a custom modal, or a hand-rolled switch is a bug.
5. Overlays that can open on a phone go through `ResponsiveDialog` (dialog on desktop, bottom sheet on a phone).
6. Icons are `lucide-react` at `size-4` inside controls (the primitives already size them). Do not mix icon libraries.
7. Type is `font-sans` (Geist) for UI, `font-heading` (Space Grotesk) for page and section titles, `font-mono` for eyebrows, tags, code, and metrics.
8. Surfaces stack: page `bg-background`, wells and inputs `bg-sunken`, cards and panels `bg-card`, menus and dialogs `bg-popover`.
9. Interactive cards use the `cardSurface` class from `@/components/patterns/card-surface`.
10. Support light and dark. Tokens already switch under `.dark`. Do not fork a component per theme.
11. Respect `prefers-reduced-motion`. Motion utilities in the CSS already do. Do not add looping animation except `StatusDot` `live`.
12. Touch targets on phone chrome stay at least 44px. The top bar and tab bar already do. Do not shrink them.
13. Copy text with `CopyButton` or `useCopy`. Confirm with `toast` from `sonner`, not `alert()`.

## Building a screen

```tsx
import { PageHeader, Panel, EmptyState } from "@/components/patterns/layout"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Invoices"
        description="Open and paid invoices for this workspace."
        actions={<Button>New invoice</Button>}
      />
      <Panel title="Recent">
        <EmptyState icon={FileTextIcon} title="No invoices yet" action={<Button variant="outline">Create one</Button>} />
      </Panel>
    </main>
  )
}
```

Width: `Container` with `size` `narrow` (3xl), `default` (6xl), or `wide` (7xl). Marketing sections use `SectionHeader`. App pages use `PageHeader` plus `Panel`.

Settings and menus use `ListGroup` and `ListItem`, not a table. Tables of records use `DataTable` (table on desktop, cards on a phone).

Forms use `Field`, `FieldLabel`, `FieldDescription`, `FieldError` around `Input`, `Textarea`, or `Select`. Errors that are not field-level use `Alert`. Inline notes use `Callout`.

## Choosing a component

| Need | Use |
| --- | --- |
| Primary action | `Button` default |
| Secondary action | `Button` `outline` or `secondary` |
| Quiet action | `Button` `ghost` |
| Destructive action | `Button` `destructive` |
| In-page status | `Pill` or `Badge` |
| Live / healthy | `StatusDot` with `live` and tone `success` |
| Swap a whole panel | `Tabs` |
| Small mode switch (theme, range) | `SegmentedControl` |
| Filters | `FilterChips` |
| Boolean | `Switch` or `Checkbox` |
| One of a short list | `RadioGroup` or `Select` |
| Modal flow | `ResponsiveDialog` |
| Menu | `DropdownMenu` |
| Hover detail | `HoverCard` or `Tooltip` |
| Command palette | `Command` inside `CommandDialog` |
| Toast | `toast()` from `sonner` |
| Empty collection | `EmptyState` |
| Loading row | `ListSkeleton` or `CardSkeleton` or `Skeleton` |
| Metric | `StatTile` |
| Quota | `UsageMeter` or `Progress` or `ProgressRing` |
| Multi-step flow | `Stepper` |
| Code or log | `CodeBlock` or `LogStream` |
| Secret or endpoint | `ValueField` |
| Breadcrumb trail | `Breadcrumbs` |
| Architecture sketch | `ArchitectureDiagram` |
| Generated cover | `ProjectCover` |

## Left in the original app on purpose

These know about http2xx content types and routes. Rebuild them per product with `cardSurface`, `ProjectCover`, `Pill`, and `StatusDot`:

- `ProjectCard`, `ExperienceCard`, `GuideCard`
- Session cards, access gates, launch dialogs, activity lists
- Site header, footer, and the command menu wired to that site's routes

The `/design` catalog in http2xx.io is a viewer for this system. It is not part of the kit.

## When something is missing

Add a pattern in `src/components/patterns/` that composes primitives and tokens. Add a primitive only when no composition can express it, using the same `cva` and `data-slot` style as `src/components/ui/button.tsx`. Then document the export in `COMPONENTS.md`.
