# Component inventory

Imports use the `@/` alias. Props below are the ones that matter; the file is the full contract.

Tone values: `brand | success | warning | danger | info | neutral` from `@/lib/tone`.

## Theme

| Export | File | Use |
| --- | --- | --- |
| `ThemeScript`, `THEME_STORAGE_KEY` | `src/components/theme/theme-script.tsx` | Inline script in `<head>`. Rename the storage key per product. |
| `ThemeProvider`, `useTheme` | `src/components/theme/theme-provider.tsx` | Preference `light \| dark \| system`. `useTheme()` returns `preference`, `resolvedTheme`, `setPreference`. |
| `ThemeMenu`, `ThemeSegmented`, `themeOptions` | `src/components/theme/theme-toggle.tsx` | Menu item group, or a segmented light/dark/system control. |

## Brand

| Export | File | Use |
| --- | --- | --- |
| `Logomark` | `src/components/brand/logo.tsx` | Mark only. `animated` pulses the status dot. `title` sets an accessible name. |
| `Wordmark` | same | The "http2xx" wordmark. Replace for a new product. |
| `Logo` | same | Mark plus wordmark. |
| SVG kit | `public/brand/` | `mark-*.svg`, `lockup-*.svg`, `app-icon*.svg`, `og-banner.png`. |

## Navigation chrome

| Export | File | Use |
| --- | --- | --- |
| `MobileTopBar` | `src/components/navigation/mobile-top-bar.tsx` | Sticky phone header. `homeHref`, `parentOf(pathname) => Route \| null`, optional `trailing`. Hidden from `md` up. |
| `TabBar` | `src/components/navigation/tab-bar.tsx` | Phone bottom tabs. Items are `NavItem` (`title`, `href`, `icon`, optional `match`, `exact`) or `{ title, icon, onSelect }`. |
| `ScreenTitle`, `useScreenTitle`, `useScrolledPast` | `src/components/navigation/screen-title.tsx` | Registers the large title so the top bar can fade it in. `PageHeader` does this when `title` is a string. |
| `PageTransition` | `src/components/navigation/page-transition.tsx` | Wrap route content from `template.tsx`. |
| `NavItem`, `isActive` | `src/lib/navigation.ts` | Shared by `TabBar`. |

## Layout patterns — `@/components/patterns/layout`

| Export | Props that matter |
| --- | --- |
| `Container` | `size`: `narrow` \| `default` \| `wide` |
| `SectionHeader` | `eyebrow`, `code`, `title`, `description`, `action` — marketing sections |
| `PageHeader` | `title`, `description`, `eyebrow`, `actions`, `children` — app pages |
| `Panel` | `title`, `description`, `action`, `children`, `bodyClassName` |
| `EmptyState` | `icon`, `title`, `description`, `action` |
| `UsageMeter` | `label`, `used`, `limit`, `unit` |
| `DefinitionList` | key/value rows; see the file |

## Status — `@/components/patterns/status`

| Export | Use |
| --- | --- |
| `StatusDot` | `tone`, `live` (pulse). Decorative; `aria-hidden`. |
| `Pill` | Status and enumerations. `tone`, `dot`, `live`, `icon`, children. |
| `Eyebrow` | Mono uppercase label. Optional `code` prefix (for example `200`). |
| `Tag` | Mono meta chip, no tone. |
| `toneText`, `toneBg` | Class maps when a custom element must follow a tone. |

## Actions and forms

| Export | From | Notes |
| --- | --- | --- |
| `Button`, `buttonVariants` | `@/components/ui/button` | Variants: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`. Sizes: `xs`, `sm`, `default`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`. |
| `SegmentedControl` | `@/components/patterns/segmented-control` | `value`, `onValueChange`, `options` (`value`, `label`, optional `icon`, `iconOnly`), `size` `sm`\|`md`, `label`, `stretch`. |
| `FilterChips` | `@/components/patterns/filter-chips` | `options` (`value`, `label`, `count?`), `value: string[]`, `onValueChange`, `multiple`, `label`. |
| `Input` | `@/components/ui/input` | |
| `Textarea` | `@/components/ui/textarea` | |
| `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator` | `@/components/ui/select` | |
| `Checkbox` | `@/components/ui/checkbox` | |
| `RadioGroup`, `RadioGroupItem` | `@/components/ui/radio-group` | |
| `Switch` | `@/components/ui/switch` | |
| `Label` | `@/components/ui/label` | |
| `Field`, `FieldSet`, `FieldLegend`, `FieldGroup`, `FieldContent`, `FieldLabel`, `FieldTitle`, `FieldDescription`, `FieldSeparator`, `FieldError` | `@/components/ui/field` | Wrap controls. Put the message in `FieldError`. |
| `InputGroup`, `InputGroupAddon`, `InputGroupInput`, `InputGroupTextarea`, `InputGroupButton`, `InputGroupText` | `@/components/ui/input-group` | Input with an icon or button inside. |
| `Toggle`, `toggleVariants` | `@/components/ui/toggle` | |
| `ToggleGroup`, `ToggleGroupItem` | `@/components/ui/toggle-group` | |

## Data display

| Export | From | Notes |
| --- | --- | --- |
| `Badge`, `badgeVariants` | `@/components/ui/badge` | Variants: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`. |
| `StatTile` | `@/components/patterns/data-display` | `label`, `value`, `unit`, `delta`, `deltaIntent` `up-good`\|`up-bad`, `trend?: number[]`, `icon`. |
| `Sparkline` | same | `data: number[]`. |
| `ProgressRing` | same | `value` 0–1, `size`, `stroke`, `tone`, `label`. |
| `Progress`, `ProgressTrack`, `ProgressIndicator`, `ProgressLabel`, `ProgressValue` | `@/components/ui/progress` | Linear progress. |
| `Callout` | `@/components/patterns/data-display` | `tone`, `icon`, `title`, `children`, `action`. |
| `Banner` | same | Full-width announcement strip. `tone`, `children`, `action`. |
| `Stepper` | same | `steps: { title, description?, state }[]`, `orientation` `horizontal`\|`vertical`. `StepState`: `complete` \| `current` \| `upcoming` \| `error`. |
| `Countdown`, `RelativeTime`, `ClockTime`, `formatRelative`, `useRemaining` | `@/components/patterns/time` | ISO timestamps. |
| `CodeBlock`, `CopyButton`, `ValueField`, `useCopy` | `@/components/patterns/code` | `ValueField` masks when `secret`. |
| `DataTable`, `Column` | `@/components/patterns/collections` | `columns`, `rows`, `rowKey`. `Column`: `key`, `header`, `cell`, `align`, `hideOnMobile`, `primary`. |
| `LogStream`, `LogLine` | same | Levelled mono log. |
| `ListGroup`, `ListItem` | same | Grouped rows. `ListItem`: `icon`, `title`, `description`, `trailing`, `href`, `chevron`, `onClick`, `destructive`. |
| `Toolbar`, `ToolbarSeparator` | same | |
| `AvatarStack` | same | Overlapping avatars. |
| `CardSkeleton`, `ListSkeleton` | same | |
| `Skeleton` | `@/components/ui/skeleton` | |
| `Table` and row/cell parts | `@/components/ui/table` | Low-level table. Prefer `DataTable` for records. |
| `Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarBadge`, `AvatarGroup`, `AvatarGroupCount` | `@/components/ui/avatar` | |
| `cardSurface` | `@/components/patterns/card-surface` | Class string for clickable cards. |
| `ProjectCover` | `@/components/patterns/project-cover` | `slug`, `hue` (degrees), `density`. Stable generative art. |
| `ArchitectureDiagram` | `@/components/patterns/architecture` | `diagram: ArchitectureDiagram` from `@/lib/architecture`. |
| `Kbd`, `KbdGroup` | `@/components/ui/kbd` | Keyboard hints. |

## Feedback

| Export | From | Notes |
| --- | --- | --- |
| `Alert`, `AlertTitle`, `AlertDescription`, `AlertAction` | `@/components/ui/alert` | `variant`: `default` \| `destructive`. |
| `Toaster` | `@/components/ui/sonner` | Mount once. Call `toast` from `sonner`. |
| `Spinner` | `@/components/ui/spinner` | |
| `EmptyState`, `ListSkeleton`, `CardSkeleton` | patterns | See layout and collections. |

## Overlays

| Export | From | Notes |
| --- | --- | --- |
| `ResponsiveDialog` | `@/components/patterns/responsive-dialog` | `open`, `onOpenChange`, `title`, `description`, `children`, `footer`. Dialog at `md+`, drawer below. |
| `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose` | `@/components/ui/dialog` | Desktop-only dialog. |
| `Drawer` and matching parts, including `DrawerSwipeHandle` | `@/components/ui/drawer` | Phone sheet. |
| `Sheet` and matching parts | `@/components/ui/sheet` | Side panel. |
| `DropdownMenu` and item, checkbox, radio, sub, shortcut parts | `@/components/ui/dropdown-menu` | |
| `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverHeader`, `PopoverTitle`, `PopoverDescription` | `@/components/ui/popover` | |
| `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` | `@/components/ui/tooltip` | Provider is mounted in the root layout. |
| `HoverCard`, `HoverCardTrigger`, `HoverCardContent` | `@/components/ui/hover-card` | |
| `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandSeparator`, `CommandShortcut` | `@/components/ui/command` | Wire items to your own routes. |

## Navigation primitives

| Export | From | Notes |
| --- | --- | --- |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `tabsListVariants` | `@/components/ui/tabs` | Panel switches. |
| `Breadcrumbs` | `@/components/patterns/breadcrumbs` | `items: { label, href? }[]`. |
| `Breadcrumb` and list, item, link, page, separator, ellipsis | `@/components/ui/breadcrumb` | Low-level. Prefer `Breadcrumbs`. |
| `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | `@/components/ui/accordion` | |
| `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` | `@/components/ui/collapsible` | |

## Other primitives

| Export | From |
| --- | --- |
| `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` | `@/components/ui/card` |
| `Separator` | `@/components/ui/separator` |
| `ScrollArea`, `ScrollBar` | `@/components/ui/scroll-area` |

## Hooks

| Export | From | Notes |
| --- | --- | --- |
| `useMediaQuery`, `useIsDesktop` | `@/hooks/use-media-query` | Desktop is `(min-width: 768px)`. SSR fallback avoids hydration mismatch. |
| `useCopy` | `@/components/patterns/code` | |
| `useTheme` | `@/components/theme/theme-provider` | |

## CSS utilities in `globals.css`

Use these class names; do not reimplement them.

| Class | Effect |
| --- | --- |
| `pressable` | Slight scale on press. |
| `bg-grid`, `bg-dots` | Technical background texture. |
| `mask-fade-b`, `mask-radial` | Edge fades. |
| `glow-brand` | Soft brand and signal glow for heroes. |
| `scrollbar-none` | Hide a horizontal scroller's bar. |
| `top-chrome` | Sticky offset under the top bar. |
| `pb-safe`, `pt-safe` | Safe-area padding. |
| `font-heading` | Space Grotesk display face. |

View-transition names used by chrome: `top-bar`, `tab-bar`, `side-bar`. Page content uses `page`, `nav-forward`, `nav-back` via `PageTransition`.
