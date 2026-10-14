import fs from "node:fs"
import path from "node:path"
import ts from "typescript"

export type CatalogEntry = {
  slug: string
  name: string
  category: string
  file: string
  exports: string[]
}

const groups = ["ui", "patterns", "theme", "navigation", "brand"]
const title = (name: string) => name.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ")

export function getCatalog(): CatalogEntry[] {
  return groups.flatMap((category) => {
    const directory = path.join(process.cwd(), "src/components", category)
    return fs.readdirSync(directory).filter((file) => /\.tsx?$/.test(file)).sort().map((file) => {
      const name = file.replace(/\.tsx?$/, "")
      const source = fs.readFileSync(path.join(directory, file), "utf8")
      const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true)
      const exports: string[] = []
      ast.forEachChild((node) => {
        if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
          exports.push(...node.exportClause.elements.map((item) => item.name.text))
        } else if (ts.canHaveModifiers(node) && ts.getModifiers(node)?.some((item) => item.kind === ts.SyntaxKind.ExportKeyword)) {
          if (ts.isVariableStatement(node)) {
            exports.push(...node.declarationList.declarations.map((item) => item.name.getText(ast)))
          } else if ((ts.isFunctionDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) && node.name) {
            exports.push(node.name.text)
          }
        }
      })
      return { slug: `${category}-${name}`, name: title(name), category, file: `src/components/${category}/${file}`, exports: [...new Set(exports)] }
    })
  })
}

export function getSource(entry: CatalogEntry) {
  return fs.readFileSync(path.join(process.cwd(), entry.file), "utf8")
}

export function getTokens() {
  const source = fs.readFileSync(path.join(process.cwd(), "src/styles/globals.css"), "utf8")
  const light = source.split(":root,\n.light-scope {")[1].split("/* ---------- Dark")[0]
  const dark = source.split(".dark {\n  color-scheme: dark;")[1].split("@layer base")[0]
  const values = (section: string) => Object.fromEntries([...section.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((match) => [match[1], match[2]]))
  const lightValues = values(light)
  const darkValues = values(dark)
  return [...source.matchAll(/--color-([\w-]+): var\(--([\w-]+)\)/g)].map((match) => ({
    name: match[1], variable: match[2], light: lightValues[match[2]], dark: darkValues[match[2]],
  }))
}
