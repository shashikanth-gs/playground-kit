# Third-party notices

**http2xx design system, built on shadcn/ui and Base UI.**

The UI primitives in `src/components/ui/` are adapted from shadcn/ui's `base-nova` style, with Base UI providing interaction behavior. Their shared appearance and APIs are intentional reuse of these upstream projects. The http2xx semantic tokens, branding, and composed patterns form the custom layer. This project is independently maintained and is not an official shadcn/ui or Base UI release.

Original software and documentation are covered by the root [MIT license](LICENSE), subject to the separate [brand notice](BRAND.md). Upstream source, packages, and fonts retain their own licenses and copyright notices; the root license does not replace them.

## Copied source and direct dependencies

The full upstream license texts are preserved in `licenses/`. Keep this file and those texts when redistributing the source kit. In particular, the copied shadcn primitives retain **Copyright (c) 2023 shadcn**, under the MIT license in `licenses/shadcn.txt`.

| Project / package | License | Full text | Role |
| --- | --- | --- | --- |
| [shadcn/ui](https://github.com/shadcn-ui/ui) / `shadcn` | MIT | [shadcn.txt](licenses/shadcn.txt) | Adapted component source and Tailwind utilities |
| [Base UI](https://github.com/mui/base-ui) / `@base-ui/react` | MIT | [base-ui-react.txt](licenses/base-ui-react.txt) | Interaction primitives |
| `class-variance-authority` | Apache-2.0 | [class-variance-authority.txt](licenses/class-variance-authority.txt) | Component variants |
| `clsx` | MIT | [clsx.txt](licenses/clsx.txt) | Class composition |
| `cmdk` | MIT | [cmdk.txt](licenses/cmdk.txt) | Command menu |
| [Lucide](https://github.com/lucide-icons/lucide) / `lucide-react` | ISC; MIT for Feather-derived icons | [lucide-react.txt](licenses/lucide-react.txt) | Icons; includes the Feather copyright and MIT notice |
| `next` | MIT | [next.txt](licenses/next.txt) | Catalog framework |
| `react` | MIT | [react.txt](licenses/react.txt) | Component runtime |
| `react-dom` | MIT | [react-dom.txt](licenses/react-dom.txt) | Browser rendering |
| `sonner` | MIT | [sonner.txt](licenses/sonner.txt) | Toasts |
| `tailwind-merge` | MIT | [tailwind-merge.txt](licenses/tailwind-merge.txt) | Class merging |
| `tailwindcss` | MIT | [tailwindcss.txt](licenses/tailwindcss.txt) | Styling |
| `tw-animate-css` | MIT | [tw-animate-css.txt](licenses/tw-animate-css.txt) | Motion utilities |

This list records the copied source, direct runtime dependencies, Tailwind CSS, and catalog fonts. It is not an exhaustive list of transitive or development dependencies. If redistributing installed packages, preserve their included licenses and notices too. Review new or updated dependencies before redistributing them; the lockfile records the versions used by this catalog.

## Fonts

The catalog uses `next/font/google` to download and self-host the following font families. Each retains its SIL Open Font License 1.1 (OFL-1.1); the project's MIT license does not relicense the fonts.

| Font | Copyright | Full text |
| --- | --- | --- |
| Geist Sans | Copyright 2024 The Geist Project Authors | [geist-OFL.txt](licenses/geist-OFL.txt) |
| Geist Mono | Copyright 2024 The Geist Project Authors | [geistmono-OFL.txt](licenses/geistmono-OFL.txt) |
| Space Grotesk | Copyright 2020 The Space Grotesk Project Authors | [spacegrotesk-OFL.txt](licenses/spacegrotesk-OFL.txt) |

Font notices were obtained from the Google Fonts source directories [Geist](https://github.com/google/fonts/tree/main/ofl/geist), [Geist Mono](https://github.com/google/fonts/tree/main/ofl/geistmono), and [Space Grotesk](https://github.com/google/fonts/tree/main/ofl/spacegrotesk). The source kit contains the font-loading scaffold; the catalog build contains the self-hosted font files.

## Distribution

`npm run kit` includes `LICENSE`, `BRAND.md`, `THIRD_PARTY_NOTICES.md`, and the complete `licenses/` directory in the downloadable archive. It also copies these notices to `public/licenses/`, so the exported catalog retains them alongside its bundled code and fonts. The catalog links to them from its landing page and footer.
