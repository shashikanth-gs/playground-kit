# Playground Kit

**UI components for interactive technical playgrounds.**

Created and maintained by **[Shashi Kanth G S](https://shashikanth.me)** · [GitHub profile](https://github.com/shashikanth-gs).

Playground Kit provides a shared visual language and reusable compositions for technical demos, developer tools, and hands-on labs. Build around code, logs, status, metrics, and responsive panels; connect your own application and execution backend for live behavior.

Built on **shadcn/ui (`base-nova`), Base UI, and Tailwind CSS 4**, using Next.js 16, React 19, and TypeScript. The original tokens and patterns were extracted from http2xx.io; Playground Kit is maintained as an independent source kit.

Original software and documentation are [MIT-licensed](LICENSE). Preserve [third-party notices](THIRD_PARTY_NOTICES.md) and the upstream texts in `licenses/` when redistributing the source. Reference artwork and names have separate terms in [BRAND.md](BRAND.md).

## Why use it

shadcn/ui supplies styled primitives, Base UI supplies interaction behavior, and Tailwind CSS supplies styling utilities. Playground Kit adds a particular visual language and compositions suited to technical interfaces: layered surfaces, defined typography roles, shared status tones, log output, connection values, and layouts that adapt to phones.

Use it when you want consistent technical screens without choosing every token and composition for each tool. Generic controls remain close to their upstream foundation. This is an opinionated source kit, not a replacement for those projects.

## Available today

- Code blocks, copyable values, secret masking, and toast feedback
- LogStream for displaying supplied log entries
- Status pills, live status dots, metrics, sparklines, quotas, and progress
- Page headers, panels, grouped settings, responsive record tables, and workflows
- Architecture diagrams and generated project covers
- Phone navigation, responsive dialog / bottom-sheet composition, and route transitions
- Light / dark / system themes; Geist Sans, Geist Mono, and Space Grotesk
- An interactive reference catalog, source browser, reusable archive, and agent guide

The catalog uses illustrative data. LogStream renders the entries you supply; it does not establish a stream, run commands, or provide a terminal backend.

## Planned component families

| Family | Direction |
| --- | --- |
| Terminal sessions | Command input, history, scrollback, execution status |
| Live consoles | Streaming output, filters, pause / clear, reconnection state |
| Live screens | Running previews, connection status, session controls |
| Inspectors | Requests, responses, events, structured data |
| Playground workspaces | Resizable panels combining these experiences |

These families describe the roadmap, not features already shipped in this release. Execution, networking, authentication, and session services remain separate from the UI components.

## Run the catalog

Requires Node.js 22 or newer and npm.

```bash
npm ci
npm run kit
npm run dev
```

Open http://127.0.0.1:3000. Running `kit` first makes the download and license files available during development.

```bash
npm test
npm run build
npm run typecheck
npm run preview
```

`build` packages the reusable kit and exports the catalog to `out/`. `preview` serves that export at http://127.0.0.1:4173.

The docs app lives in `src/app/`, `src/components/docs/`, and `src/lib/docs/`. It is excluded from the downloadable kit.

## Use in another project

1. Create a Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript app with `@/*` → `./src/*`.
2. Run `npm run kit`, or download the archive from the catalog. Extract `artifacts/playground-kit.tar.gz`.
3. Copy the extracted kit's `src/` into the host's `src/`, `public/brand/` into its `public/brand/`, and `components.json` into its root. Review existing file conflicts first.
4. Run `node /path/to/playground-kit/install-dependencies.mjs --target /path/to/host`, then install with the host's package manager. The helper preserves scripts and compatible dependency versions; it refuses incompatible or too-old versions.
5. Use `scaffold/root-layout.tsx` as `src/app/layout.tsx` and `scaffold/template.tsx` as `src/app/template.tsx`. The root layout mounts `AppChrome` (`MobileTopBar` + `TabBar`) for phones — edit tab items in `src/components/app-chrome.tsx`. Import `@/styles/globals.css` once and configure Tailwind's PostCSS plugin.
6. Update product metadata, theme storage key, brand artwork, phone home label, and tab routes.
7. Keep `AGENTS.md`, `COMPONENTS.md`, `LICENSE`, `BRAND.md`, `THIRD_PARTY_NOTICES.md`, and `licenses/` with redistributed source.

The archive excludes the docs app, generated output, Git metadata, installed packages, and environment files. The exported catalog also serves notices under `/licenses/`.

Copied components do not receive upstream fixes automatically. Review and copy updates into each consuming project deliberately; a shared package or source-sync workflow can be added separately.

## Cloudflare Pages

This catalog intentionally produces static assets in `out/`. Use the Pages static-export settings below, or Workers Static Assets in the next section. The regular Next.js / OpenNext adapter targets a server deployment and expects `.next/standalone`; an OpenNext error about `.next/standalone/.next/server/pages-manifest.json` indicates that the server adapter is being run against the static export. Use the static configuration instead of creating a placeholder manifest or switching this catalog to standalone output.

Connect **[shashikanth-gs/playground-kit](https://github.com/shashikanth-gs/playground-kit)** using Cloudflare Pages Git integration.

| Setting | Value |
| --- | --- |
| Project name | `playground-kit` |
| Framework preset | Next.js (Static HTML Export) |
| Production branch | `main` |
| Build command | `npm test && npm run build` |
| Output directory | `out` |
| Root directory | Leave blank |
| Node.js | 22 or newer; set `NODE_VERSION=22` explicitly |
| `NEXT_PUBLIC_BASE_PATH` | Leave unset / empty |

Override the preset's default build command so the archive and notices are generated. Pushes to main rebuild production; other branches can create previews.

After the first deployment, add your chosen hostname in the project's Custom domains settings, then follow its DNS instructions. **`playground.shashikanth.me`** is a suitable option; the domain remains your choice and is not configured by this repository. The source repository's visibility is separate from the public catalog and kit download.

See [Cloudflare's static Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) and [custom-domain guide](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## Cloudflare Workers Static Assets

Workers can serve this same static catalog using **Workers Static Assets**, without OpenNext. `wrangler.jsonc` points to the existing `out/` export; no Worker entry-point script or Next.js server is required.

In the Worker project's **Settings → Build** configuration, use:

| Setting | Value |
| --- | --- |
| Build command | `npm test && npm run build` |
| Deploy command | `npm run deploy:cloudflare` |
| Root directory | `/` |
| Node.js | `NODE_VERSION=22` |
| `NEXT_PUBLIC_BASE_PATH` | Leave unset / empty |

Existing settings of `npm run build` and `npx wrangler deploy` also work: the deploy script runs the same Wrangler command. Without a Wrangler config, Wrangler can auto-detect Next.js and set up OpenNext. The committed static-assets config prevents that automatic framework setup.

Make sure the Worker project name matches `name` in `wrangler.jsonc` (`playground-kit` by default), then deploy the latest `main` commit. This config includes real 404 handling for unknown routes, and directory-style HTML routes that match the Next.js export. Add your chosen hostname through the Worker's Custom domains settings after the first successful deployment.

For local packaging validation, after `npm run build`, run `npm run check:cloudflare`. It runs Wrangler's dry run and does not publish anything. Actual deployment requires Cloudflare authentication, which Workers Git builds supply through the configured project.

See [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/get-started/) and [Workers build configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/).

## npm naming and release direction

The recommended future package name is **`@shashikanth-gs/playground-kit`**, provided `shashikanth-gs` is your npm user or an organization scope you control. A personal scope makes ownership explicit and avoids depending on the globally shared unscoped `playground-kit` name. The originating http2xx.io app belongs in provenance notes, not in the npm namespace. The GitHub repository and catalog can continue to use the simple `playground-kit` name.

This repository currently ships a copy-and-compose source kit and keeps the catalog's package marked `private: true`. It is **not yet a publishable importable npm library**: its `@/` imports resolve through the consumer's source alias. A release needs a separate package boundary, internal import resolution, documented exports, type declarations, styling integration, and peer dependencies. Changing the name or removing `private` alone is not enough. No npm release is published by the catalog's deployment scripts.

Public scoped packages use `npm publish --access public` from the prepared release package; the scope must belong to your npm account or organization. See [npm scopes](https://docs.npmjs.com/about-scopes/) and [publishing public scoped packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/).

## Other hosting options

Vercel can host the same static export: Next.js preset, build command `npm test && npm run build`, output `out`, and an empty `NEXT_PUBLIC_BASE_PATH`. See [Vercel Next.js](https://vercel.com/docs/frameworks/full-stack/nextjs).

The optional GitHub Pages workflow derives its repository base path automatically. The prepared URL is https://shashikanth-gs.github.io/playground-kit/. Deployment is skipped until Pages is enabled with the Actions publishing source. A private repository requires an eligible GitHub plan for Pages; this restriction does not determine the Cloudflare build path.

Only GitHub Pages uses `/playground-kit` as a base path:

```bash
NEXT_PUBLIC_BASE_PATH=/playground-kit npm run build
NEXT_PUBLIC_BASE_PATH=/playground-kit npm run preview
```

## Repository layout

| Path | Purpose |
| --- | --- |
| `src/styles/globals.css` | Tokens, themes, utilities, motion |
| `src/components/ui/` | shadcn / Base UI primitives |
| `src/components/patterns/` | Technical UI and application compositions |
| `src/components/theme/` | Light, dark, and system preferences |
| `src/components/navigation/` | Phone chrome and transitions |
| `src/components/brand/`, `public/brand/` | Playground Kit identity and legacy reference artwork |
| `scaffold/` | Host app shell templates |
| `src/app/`, `src/components/docs/`, `src/lib/docs/` | Reference catalog only |
| `scripts/` | Packaging, dependency helper, static preview |
| `COMPONENTS.md`, `AGENTS.md` | API inventory and composition rules |
| `LICENSE`, `BRAND.md`, `THIRD_PARTY_NOTICES.md`, `licenses/` | Licenses and attribution |

## Maintaining the kit

Compose existing primitives and semantic tokens. Add reusable technical patterns under `src/components/patterns/` and document them in `COMPONENTS.md`. The catalog includes new modules on the next build; live examples are curated separately in `src/components/docs/examples.tsx`.

This kit is independent of the original http2xx.io application. Updating it does not update that app or projects that previously copied the source.

## Dependency audit

At preparation time, `npm audit` reported seven high-severity findings in the inherited shadcn CLI's transitive globbing dependencies (braces advisory GHSA-vfj7-8cjw-p6xm). The installed latest braces release had no patched version available. Do not apply the suggested shadcn 1.0 downgrade, which changes this Base UI kit's tooling. These are build/tooling dependencies; the catalog exports static assets. Recheck the audit when updating shadcn.
