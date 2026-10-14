import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import {
  assertExportPresent,
  assertStaticAssetsConfig,
  readWranglerConfig,
} from "./cloudflare-static.mjs"

test("committed wrangler.jsonc is assets-only and targets out/", () => {
  const config = readWranglerConfig()
  assert.equal(config.main, undefined)
  assert.equal(config.pages_build_output_dir, undefined)
  assert.equal(config.assets?.directory, "./out")
  assert.deepEqual(assertStaticAssetsConfig(config), [])
})

test("rejects OpenNext-style wrangler configs", () => {
  const errors = assertStaticAssetsConfig({
    name: "playground-kit",
    main: ".open-next/worker.js",
    assets: { directory: ".open-next/assets", binding: "ASSETS" },
  })
  assert.ok(errors.some((error) => error.includes('"main"')))
  assert.ok(errors.some((error) => error.includes('expected "./out"')))
})

test("requires a completed static export before deploy", () => {
  const missing = assertExportPresent(path.join(os.tmpdir(), `pk-missing-${process.pid}`))
  assert.ok(missing.some((error) => error.includes("Run `npm run build`")))

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pk-export-"))
  try {
    const incomplete = assertExportPresent(dir)
    assert.ok(incomplete.some((error) => error.includes("index.html")))
    fs.writeFileSync(path.join(dir, "index.html"), "<!doctype html>")
    assert.deepEqual(assertExportPresent(dir), [])
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})
