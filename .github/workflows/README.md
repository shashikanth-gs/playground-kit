# Catalog publication

Playground Kit is a static export (`out/`). Prefer Cloudflare Pages: production branch `main`, build `npm test && npm run build`, output directory `out`, Node.js 22, empty deploy command, unset `NEXT_PUBLIC_BASE_PATH`. If production uses Workers Builds instead, set deploy to `npm run deploy:cloudflare` (committed `wrangler.jsonc` serves `out/` as Workers Static Assets — not OpenNext).

The owner authorized a public catalog, source examples, and downloadable kit. Repository visibility is a separate choice. Do not add secrets or private product data to the published assets.

The optional GitHub Pages workflow validates pull requests and main pushes, including `npm run check:cloudflare`. It uploads a verified static artifact and only deploys when GitHub Pages is enabled with the Actions publishing source. Its base path is derived from the repository name. The prepared GitHub Pages URL is https://shashikanth-gs.github.io/playground-kit/.

Cloudflare's Git integration deploys separately from this GitHub Pages workflow. A push to main should update `design.http2xx.io` once the Cloudflare project settings above are correct and the latest deployment succeeds. Apps that copied the source do not update automatically.
