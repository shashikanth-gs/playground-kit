import fs from "node:fs"
import path from "node:path"
import { spawnSync } from "node:child_process"

const root = process.cwd()
const output = path.join(root, "artifacts")
const kit = path.join(output, "http2xx-design-system")
fs.rmSync(kit, { recursive: true, force: true })
fs.mkdirSync(kit, { recursive: true })
for (const folder of [
  "src/components",
  "src/hooks",
  "src/lib",
  "src/styles",
  "public/brand",
  "scaffold",
  "licenses",
]) {
  fs.cpSync(path.join(root, folder), path.join(kit, folder), {
    recursive: true,
    filter: (source) => !source.split(path.sep).includes("docs"),
  })
}
const noticeFiles = ["LICENSE", "BRAND.md", "THIRD_PARTY_NOTICES.md"]
for (const file of [
  "AGENTS.md",
  "COMPONENTS.md",
  "components.json",
  ...noticeFiles,
])
  fs.copyFileSync(path.join(root, file), path.join(kit, file))
const publicNotices = path.join(root, "public/licenses")
fs.rmSync(publicNotices, { recursive: true, force: true })
fs.mkdirSync(publicNotices, { recursive: true })
for (const file of noticeFiles)
  fs.copyFileSync(path.join(root, file), path.join(publicNotices, file))
fs.cpSync(path.join(root, "licenses"), path.join(publicNotices, "licenses"), {
  recursive: true,
})
fs.copyFileSync(
  path.join(root, "scripts/install-dependencies.mjs"),
  path.join(kit, "install-dependencies.mjs"),
)
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"))
const {
  typescript,
  "@types/react": reactTypes,
  "@types/react-dom": reactDomTypes,
  tailwindcss,
  "@tailwindcss/postcss": postcss,
} = pkg.devDependencies
fs.writeFileSync(
  path.join(kit, "dependencies.json"),
  JSON.stringify(
    {
      dependencies: pkg.dependencies,
      devDependencies: {
        typescript,
        "@types/react": reactTypes,
        "@types/react-dom": reactDomTypes,
        tailwindcss,
        "@tailwindcss/postcss": postcss,
      },
    },
    null,
    2,
  ) + "\n",
)
fs.writeFileSync(
  path.join(kit, "README.md"),
  "# http2xx source kit\n\nBuilt on shadcn/ui and Base UI. Read AGENTS.md, then COMPONENTS.md. Copy src/ and public/brand/ into a Next.js 16 + React 19 + Tailwind 4 host. Run `node install-dependencies.mjs --target /path/to/host`, then install dependencies with your package manager. Use scaffold/ for your layout and template. Change the theme storage key and product identity. The docs app is intentionally excluded.\n\nOriginal code is MIT-licensed. Preserve LICENSE, THIRD_PARTY_NOTICES.md, and licenses/ when redistributing. Reference logos and names are covered separately by BRAND.md; replace them for other products.\n\nThis is a source kit, not an npm package.\n",
)
const archive = path.join(output, "http2xx-design-system.tar.gz")
const result = spawnSync(
  "tar",
  ["-czf", archive, "-C", output, "http2xx-design-system"],
  { stdio: "inherit", env: { ...process.env, COPYFILE_DISABLE: "1" } },
)
if (result.error) throw result.error
if (result.status !== 0) process.exit(result.status ?? 1)
fs.mkdirSync(path.join(root, "public/downloads"), { recursive: true })
fs.copyFileSync(
  archive,
  path.join(root, "public/downloads/http2xx-design-system.tar.gz"),
)
console.log(`Source kit ready: ${archive}`)
