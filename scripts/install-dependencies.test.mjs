import test from "node:test"
import assert from "node:assert/strict"
import { mergeDependencies } from "./install-dependencies.mjs"

test("preserves host scripts, pinned versions, and existing dependency placement", () => {
  const host = { name: "my-tool", scripts: { build: "next build" }, dependencies: { react: "19.3.0" }, devDependencies: { typescript: "~5.9.0" } }
  const kit = { dependencies: { react: "^19.3.0", clsx: "^2.1.1" }, devDependencies: { typescript: "^5" } }
  const result = mergeDependencies(host, kit)
  assert.equal(result.dependencies.react, "19.3.0")
  assert.equal(result.dependencies.clsx, "^2.1.1")
  assert.deepEqual(result.scripts, host.scripts)
  assert.equal(result.devDependencies.typescript, "~5.9.0")
  assert.equal(host.dependencies.clsx, undefined)
})

test("refuses incompatible major versions before modifying the host", () => {
  const host = { dependencies: { react: "^18.0.0" } }
  assert.throws(() => mergeDependencies(host, { dependencies: { react: "19.3.0" } }), /version conflict/)
  assert.equal(host.dependencies.react, "^18.0.0")
})

test("refuses older same-major versions missing the required APIs", () => {
  assert.throws(() => mergeDependencies({ dependencies: { react: "19.0.0" } }, { dependencies: { react: "19.3.0" } }), /version conflict/)
  assert.throws(() => mergeDependencies({ dependencies: { next: "^16.0.0" } }, { dependencies: { next: "16.4.0" } }), /version conflict/)
})
