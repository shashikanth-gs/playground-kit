# Catalog publication

Playground Kit is prepared for Cloudflare Pages Git integration. Connect `shashikanth-gs/playground-kit`, set production branch `main`, build command `npm test && npm run build`, output directory `out`, and Node.js 22. Leave `NEXT_PUBLIC_BASE_PATH` unset for Cloudflare and custom domains.

The owner authorized a public catalog, source examples, and downloadable kit. Repository visibility is a separate choice. Do not add secrets or private product data to the published assets.

The optional GitHub Pages workflow validates pull requests and main pushes. It uploads a verified static artifact and only deploys when GitHub Pages is enabled with the Actions publishing source. Its base path is derived from the repository name. The prepared GitHub Pages URL is https://shashikanth-gs.github.io/playground-kit/.

Cloudflare's Git integration deploys separately from this GitHub Pages workflow. A push to main updates Cloudflare production; other branches receive previews when enabled. The catalog and download update together. Apps that copied the source do not update automatically.
