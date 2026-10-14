# http2xx design system

Created and maintained by **[Shashi Kanth G S](https://shashikanth.me)** · [GitHub profile](https://github.com/shashikanth-gs).

The reusable source kit extracted from http2xx.io, with a working reference catalog for building personal tools.

**http2xx design system, built on shadcn/ui and Base UI.** Shared primitives and APIs come from these upstream projects; the http2xx semantic tokens, branding, and composed patterns form the custom layer. This project is independently maintained.

Original software and documentation are [MIT-licensed](LICENSE). Preserve [third-party notices](THIRD_PARTY_NOTICES.md) and the full upstream texts in `licenses/` when redistributing the kit. The reference name and artwork are covered separately by [BRAND.md](BRAND.md); replace that identity for other products.

**Source repository: private. Reference catalog and downloadable kit: public.** GitHub Pages does not inherit the repository’s privacy. The catalog intentionally exposes component source and the reusable kit, but never private product data.

The catalog is prepared for hosting; it is not publicly deployed yet. Recommended custom subdomain: **design.http2xx.io**. The prepared GitHub Pages URL is https://shashikanth-gs.github.io/http2xx.io-desing-system/.

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

The archive excludes the catalog, generated output, Git metadata, dependencies, and environment files. It includes components, patterns, theme, phone chrome, tokens, shared helpers, reference brand assets, scaffold, dependency requirements, agent documentation, and all license notices. Retain `LICENSE`, `BRAND.md`, `THIRD_PARTY_NOTICES.md`, and `licenses/` in each redistributed copy. The exported catalog also serves them under `/licenses/`.

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
| `LICENSE`, `BRAND.md` | Original-code license and separate brand terms |
| `THIRD_PARTY_NOTICES.md`, `licenses/` | Attribution and complete upstream license texts |

## Vercel and Cloudflare Pages

Both can host this catalog under a custom subdomain. It uses Next.js static export (`output: "export"`), so no server runtime is required. The host's Git integration can build the repository when you push.

**Suggested domain: `design.http2xx.io`.** It covers foundations, components, and patterns, and follows the convention used by [GitLab's design system](https://design.gitlab.com/). `ui.http2xx.io` is a shorter option focused on the component kit; `design-system.http2xx.io` is explicit but longer. You can also use `design.shashikanth.me` if you want the domain to emphasize your personal identity. These are suggestions, not configured DNS records.

| Setting | Vercel | Cloudflare Pages |
| --- | --- | --- |
| Framework preset | Next.js | Next.js (Static HTML Export) |
| Install command | `npm ci` | Automatic npm install from the lockfile |
| Build command | `npm run build` | `npm run build` (override the preset's `npx next build` so the kit and notices are generated) |
| Output directory | `out` | `out` |
| Production branch | `main` | `main` |
| Node.js | 22 or newer | 22 or newer (`NODE_VERSION=22` is an explicit option) |
| `NEXT_PUBLIC_BASE_PATH` | Unset / empty | Unset / empty |

Builds on a custom domain must use the empty base path; `/http2xx.io-desing-system` is only for the repository URL on GitHub Pages. Do not copy that GitHub Actions environment value into Vercel or Cloudflare.

After importing the repository, add your selected subdomain in the host's custom-domain settings. Use the DNS target shown for that deployment. With Cloudflare Pages, add the domain to the Pages project before adding a manual CNAME; with Vercel, use the CNAME target displayed in the project's Domains settings. No deployment or DNS change is performed by this repository itself.

References: [Vercel Next.js](https://vercel.com/docs/frameworks/full-stack/nextjs), [Vercel domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain), [Cloudflare static Next.js](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/), [Cloudflare custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## GitHub Pages

The remote name contains `desing`; the base path preserves that exact spelling.

Enable **Settings → Pages → GitHub Actions**. `.github/workflows/pages.yml` validates and builds pull requests, then publishes main to GitHub Pages once Pages is enabled. Until then it uploads the verified static artifact and skips deployment. A private repository needs an eligible paid GitHub plan for Pages. Keep the source repository private.

The initial attempt to enable Pages returned HTTP 422: “Your current plan does not support GitHub Pages for this repository.” Upgrade the personal account to an eligible plan (such as GitHub Pro), enable Pages with GitHub Actions in repository settings, and manually run **Validate and publish catalog**. The prepared URL above becomes live after that deployment succeeds.

After a repository rename, update the workflow’s `NEXT_PUBLIC_BASE_PATH`, `src/lib/docs/links.ts`, and documented URLs. Do not configure a `CNAME` unless adding a verified custom domain.

## Maintaining the kit

Use existing semantic tokens and components. Add reusable compositions to `src/components/patterns/` and document them in `COMPONENTS.md`. The catalog source inventory automatically includes new component modules on the next build. Interactive examples are curated separately in `src/components/docs/examples.tsx`.

This snapshot is independent of the original http2xx.io app. Updating it does not update that live app or tools that already copied the source. Review and copy changes into each consumer deliberately.

## Dependency audit

At preparation time, `npm audit` reports seven high-severity findings in the inherited shadcn CLI’s transitive globbing dependencies (the braces advisory GHSA-vfj7-8cjw-p6xm). The installed latest braces release has no patched version available; do not apply the suggested shadcn 1.0 downgrade, which would change this Base UI kit’s tooling. These dependencies are used by build/tooling, not shipped as a server by this static catalog. Recheck the audit when updating shadcn.
