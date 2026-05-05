# klasp.dev

Landing page for [klasp](https://github.com/klasp-dev/klasp) — block AI coding agents on the same quality gates your humans hit.

Static site, Astro, deploys to AWS Amplify Hosting.

## Local development

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # → dist/
pnpm preview    # serve dist/
```

## Deploy — AWS Amplify Hosting

One-time setup in the AWS console:

1. **AWS Amplify → Create new app → Host web app → GitHub** — authorize and pick `klasp-dev/klasp.dev`, branch `main`.
2. Amplify auto-detects `amplify.yml` (committed at repo root). Confirm and deploy.
3. **Domain management → Add domain → `klasp.dev`** — Amplify provisions an ACM certificate. Add the CNAME / ALIAS records to whichever DNS provider hosts the zone (Route 53 if you brought it in-house). DNS propagation completes in ~minutes; SSL within ~15 min.

After connect, every push to `main` triggers a build (≈30s) and atomic deploy. Branch previews fire automatically for any PR.

## Project layout

```
.
├── amplify.yml           # AWS Amplify build spec
├── astro.config.mjs
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── layouts/Layout.astro
    ├── pages/index.astro
    └── styles/global.css
```
