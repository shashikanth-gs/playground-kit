# http2xx design system

The reusable source kit extracted from http2xx.io, with a working reference catalog for building personal tools.

**Source repository: private. Reference catalog and downloadable kit: public.** GitHub Pages does not inherit the repository’s privacy. The catalog intentionally exposes component source and the reusable kit, but never private product data.

Catalog: https://shashikanth-gs.github.io/http2xx.io-desing-system/

## What it is based on

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4 with semantic CSS variables for light and dark themes
- shadcn/ui, `base-nova` style, using Base UI interaction primitives
- Lucide icons
- Geist Sans for UI, Geist Mono for technical details, Space Grotesk for headings
- http2xx’s own brand tokens, status tones, navigation chrome, and composed patterns

This is a **source kit**, not an npm library. Copy the files into each tool and compose screens from them. The documentation app lives separately in `src/app/` and `src/components/docs/`; it is not included in kit downloads.

## Run the catalog

Requires Node.js 22 or newer and npm.

```bash
npm ci
npm run dev
```

Open http://127.0.0.1:3000. The catalog includes an overview, installation instructions, token and typography references, interactive examples, searchable module inventory, and full source pages generated from the actual files.

```bash
npm test
npm run build
npm run typecheck
npm run preview
```

`build` generates the reusable kit and statically exports the catalog to `out/`. `preview` serves that export at http://127.0.0.1:4173.

To build and preview the exact GitHub Pages repository path:

```bash
NEXT_PUBLIC_BASE_PATH=/http2xx.io-desing-system npm run build
NEXT_PUBLIC_BASE_PATH=/http2xx.io-desing-system npm run preview
```

## Use in another tool

1. Create a Next.js 16 + React 19 + Tailwind 4 + TypeScript app with `@/*` → `./src/*`.
2. Run `npm run kit`, or download the kit from the catalog. Extract `artifacts/http2xx-design-system.tar.gz`.
3. Copy the kit’s `src/` into the host’s `src/`, `public/brand/` into `public/brand/`, and `components.json` into its root. Review file conflicts before copying into an existing app.
4. Run `node /path/to/extracted-kit/install-dependencies.mjs --target /path/to/host`, then install dependencies with your host package manager. The helper preserves host scripts and existing compatible dependency versions; it refuses incompatible or too-old versions.
5. Use `scaffold/root-layout.tsx` as `src/app/layout.tsx` and `scaffold/template.tsx` as `src/app/template.tsx`. Import `@/styles/globals.css` exactly once. Remove duplicate global styles and configure Tailwind’s PostCSS plugin.
6. Update product metadata, the theme storage key, brand mark, and the phone home link’s accessible label.
7. Keep `AGENTS.md` and `COMPONENTS.md` available to the host’s agents. Read each component source before use.

The archive excludes the catalog, generated output, Git metadata, dependencies, and environment files. It includes components, patterns, theme, phone chrome, tokens, shared helpers, reference brand assets, scaffold, dependencies, and agent documentation.

## Repository layout

| Path | Purpose |
| --- | --- |
| `src/styles/globals.css` | Shared tokens, themes, utilities, and motion |
| `src/components/ui/` | shadcn / Base UI primitives |
| `src/components/patterns/` | Composed headers, status, forms, records, metrics, overlays |
| `src/components/theme/` | Light, dark, and system preferences |
| `src/components/navigation/` | Phone top bar, tab bar, page transitions |
| `src/components/brand/`, `public/brand/` | http2xx reference identity |
| `scaffold/` | Host app shell templates |
| `src/app/`, `src/components/docs/`, `src/lib/docs/` | Reference catalog only |
| `scripts/` | Kit packaging, dependency helper, static preview |
| `COMPONENTS.md` | Component API inventory |
| `AGENTS.md` | Rules for composing tools from this kit |

## GitHub Pages

The remote name contains `desing`; the base path preserves that exact spelling.

Enable **Settings → Pages → GitHub Actions**. `.github/workflows/pages.yml` validates and builds pull requests, then publishes main to GitHub Pages. A private repository needs an eligible paid GitHub plan for Pages. Keep the source repository private.

After a repository rename, update the workflow’s `NEXT_PUBLIC_BASE_PATH`, `src/lib/docs/links.ts`, and documented URLs. Do not configure a `CNAME` unless adding a verified custom domain.

## Maintaining the kit

Use existing semantic tokens and components. Add reusable compositions to `src/components/patterns/` and document them in `COMPONENTS.md`. The catalog source inventory automatically includes new component modules on the next build. Interactive examples are curated separately in `src/components/docs/examples.tsx`.

This snapshot is independent of the original http2xx.io app. Updating it does not update that live app or tools that already copied the source. Review and copy changes into each consumer deliberately.

## Dependency audit

At preparation time, `npm audit` reports seven high-severity findings in the inherited shadcn CLI’s transitive globbing dependencies (the braces advisory GHSA-vfj7-8cjw-p6xm). The installed latest braces release has no patched version available; do not apply the suggested shadcn 1.0 downgrade, which would change this Base UI kit’s tooling. These dependencies are used by build/tooling, not shipped as a server by this static catalog. Recheck the audit when updating shadcn.
