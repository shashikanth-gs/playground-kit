import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import { spawnSync } from "node:child_process"

test("ships a complete source kit without the docs app or workspace data", () => {
  const packed = spawnSync(process.execPath, ["scripts/package-kit.mjs"], {
    encoding: "utf8",
  })
  assert.equal(packed.status, 0, packed.stderr)
  const archive = "artifacts/http2xx-design-system.tar.gz"
  const listing = spawnSync("tar", ["-tzf", archive], { encoding: "utf8" })
  assert.equal(listing.status, 0, listing.stderr)
  for (const file of [
    "src/styles/globals.css",
    "src/components/ui/button.tsx",
    "src/lib/tone.ts",
    "src/hooks/use-media-query.ts",
    "scaffold/root-layout.tsx",
    "dependencies.json",
    "install-dependencies.mjs",
    "AGENTS.md",
    "COMPONENTS.md",
  ]) {
    assert.ok(
      listing.stdout.includes(`http2xx-design-system/${file}`),
      `missing ${file}`,
    )
  }
  assert.doesNotMatch(listing.stdout, /\/(docs|app|node_modules|\.git|out)\//)
  assert.doesNotMatch(listing.stdout, /\/\.env/)
  assert.deepEqual(
    fs.readFileSync(archive),
    fs.readFileSync("public/downloads/http2xx-design-system.tar.gz"),
  )
  assert.deepEqual(
    fs.readFileSync("src/styles/globals.css"),
    fs.readFileSync("artifacts/http2xx-design-system/src/styles/globals.css"),
  )
})
