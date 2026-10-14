import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

export function mergeDependencies(host, kit) {
  const next = structuredClone(host)
  for (const group of ["dependencies", "devDependencies"]) {
    next[group] ??= {}
    for (const [name, version] of Object.entries(kit[group] ?? {})) {
      const existing = next.dependencies?.[name] ?? next.devDependencies?.[name]
      const parse = (range) => range.match(/^(?:[~^]|>=)?(\d+)(?:\.(\d+))?(?:\.(\d+))?$/)?.slice(1).map((part) => Number(part ?? 0))
      const required = parse(version)
      const present = existing ? parse(existing) : null
      const tooOld = present && required && (present[1] < required[1] || (present[1] === required[1] && present[2] < required[2]))
      if (existing && (!present || !required || present[0] !== required[0] || tooOld)) {
        throw new Error(`${name}: host uses ${existing}, kit requires ${version}. Resolve this version conflict before installing.`)
      }
      if (!existing) next[group][name] = version
    }
  }
  return next
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const index = process.argv.indexOf("--target")
  if (index < 0 || !process.argv[index + 1]) throw new Error("Usage: node install-dependencies.mjs --target ./my-tool")
  const directory = path.dirname(fileURLToPath(import.meta.url))
  const source = fs.existsSync(path.join(directory, "dependencies.json")) ? path.join(directory, "dependencies.json") : path.join(directory, "../package.json")
  const target = path.resolve(process.argv[index + 1], "package.json")
  const kit = JSON.parse(fs.readFileSync(source, "utf8"))
  const host = JSON.parse(fs.readFileSync(target, "utf8"))
  const next = mergeDependencies(host, kit)
  fs.writeFileSync(target, `${JSON.stringify(next, null, 2)}\n`)
  console.log(`Updated ${target}. Run your host app's package manager to install dependencies.`)
}
