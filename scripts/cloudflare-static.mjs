#!/usr/bin/env node
/**
 * Guard Cloudflare deploys for this static Next.js export.
 *
 * The catalog uses `output: "export"` → `out/`. Workers Static Assets should
 * upload that folder via wrangler.jsonc. Bare `npx wrangler deploy` without a
 * committed config auto-detects Next.js and runs OpenNext migrate, which fails
 * looking for `.next/standalone/.../pages-manifest.json`.
 */
import { spawnSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const outDir = path.join(root, "out")
const configPath = path.join(root, "wrangler.jsonc")

function stripJsonc(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1")
}

export function readWranglerConfig(filePath = configPath) {
  const raw = fs.readFileSync(filePath, "utf8")
  return JSON.parse(stripJsonc(raw))
}

export function assertStaticAssetsConfig(config = readWranglerConfig()) {
  const errors = []

  if (config.main) {
    errors.push(
      `wrangler.jsonc sets "main": "${config.main}". This catalog is a static export; remove the Worker entry point (OpenNext/vinext paths are wrong here).`,
    )
  }

  const directory = config.assets?.directory
  if (!directory) {
    errors.push(
      'wrangler.jsonc must set assets.directory (expected "./out") so Wrangler does not auto-migrate Next.js to OpenNext.',
    )
  } else {
    const normalized = String(directory).replace(/^\.\//, "").replace(/\/$/, "")
    if (normalized !== "out") {
      errors.push(
        `wrangler.jsonc assets.directory is "${directory}"; expected "./out" (Next.js output: "export").`,
      )
    }
  }

  if (config.pages_build_output_dir) {
    errors.push(
      "wrangler.jsonc sets pages_build_output_dir. Use Cloudflare Pages dashboard output `out`, or Workers assets.directory — not both in this file.",
    )
  }

  return errors
}

export function assertExportPresent(directory = outDir) {
  const errors = []
  if (!fs.existsSync(directory)) {
    errors.push(
      `Missing ${path.relative(root, directory) || "out"}/. Run \`npm run build\` first (Next.js output: "export").`,
    )
    return errors
  }
  if (!fs.existsSync(path.join(directory, "index.html"))) {
    errors.push(
      `${path.relative(root, directory) || "out"}/index.html is missing; the static export did not complete.`,
    )
  }
  return errors
}

export function dashboardSettings() {
  return {
    preferred:
      "Cloudflare Pages — Framework: Next.js (Static HTML Export); build: npm test && npm run build; output directory: out; leave deploy command empty.",
    workersAlternative:
      "Workers Builds — build: npm test && npm run build; deploy: npm run deploy:cloudflare; Node 22; leave NEXT_PUBLIC_BASE_PATH empty. Do not use bare npx wrangler deploy without wrangler.jsonc.",
    avoid:
      "OpenNext / vinext / output standalone / deploy commands that run opennextjs-cloudflare migrate or build.",
  }
}

function fail(errors) {
  for (const error of errors) {
    console.error(`cloudflare-static: ${error}`)
  }
  const settings = dashboardSettings()
  console.error(`\nDashboard (Pages, preferred):\n  ${settings.preferred}`)
  console.error(`Dashboard (Workers Static Assets):\n  ${settings.workersAlternative}`)
  console.error(`Avoid:\n  ${settings.avoid}`)
  process.exit(1)
}

function runWrangler(args) {
  const result = spawnSync("wrangler", args, {
    cwd: root,
    stdio: "inherit",
    env: process.env,
    shell: process.platform === "win32",
  })
  if (result.error) {
    console.error(`cloudflare-static: failed to start wrangler: ${result.error.message}`)
    process.exit(1)
  }
  process.exit(result.status ?? 1)
}

export function main(argv = process.argv.slice(2)) {
  const [command, ...rest] = argv
  if (command !== "check" && command !== "deploy") {
    console.error("Usage: node scripts/cloudflare-static.mjs <check|deploy> [...wrangler args]")
    process.exit(2)
  }

  const configErrors = assertStaticAssetsConfig()
  if (configErrors.length) fail(configErrors)

  const exportErrors = assertExportPresent()
  if (exportErrors.length) fail(exportErrors)

  if (command === "check") {
    runWrangler([
      "deploy",
      "--dry-run",
      "--outdir",
      "artifacts/cloudflare-dry-run",
      ...rest,
    ])
  }

  runWrangler(["deploy", ...rest])
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
}
