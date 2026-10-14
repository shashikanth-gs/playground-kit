# Catalog publication

The owner authorized a **public catalog with a private source repository**. The catalog's component source and reusable kit download are public. Do not add private content, secrets, tokens, or environment files to either.

Enable Settings → Pages → Build and deployment → GitHub Actions. Private repository Pages requires an eligible paid plan. The intended URL is https://shashikanth-gs.github.io/http2xx.io-desing-system/ (the remote spelling is intentional).

Publishing runs on main and manual dispatch once Pages is enabled with the Actions publishing source. Before that, the workflow validates and uploads the static artifact, then skips deployment. Pull requests validate and upload a build but never deploy. Keep the source repository private; making it public is not a fallback for a billing restriction.

If the repository is renamed, update NEXT_PUBLIC_BASE_PATH in pages.yml, repository links in src/lib/docs/links.ts, and documented URLs together.
