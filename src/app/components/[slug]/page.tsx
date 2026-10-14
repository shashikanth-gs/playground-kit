import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getCatalog, getSource } from "@/lib/docs/catalog"
import { PageHeader, Panel } from "@/components/patterns/layout"
import { Eyebrow, Tag } from "@/components/patterns/status"
import { CodeBlock, CopyButton } from "@/components/patterns/code"
import { ModulePreview } from "@/components/docs/examples"

export function generateStaticParams() {
  return getCatalog().map(({ slug }) => ({ slug }))
}
export const dynamicParams = false
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  return {
    title:
      getCatalog().find((entry) => entry.slug === slug)?.name ?? "Component",
  }
}
export default async function SourcePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getCatalog().find((item) => item.slug === slug)
  if (!entry) notFound()
  const module = `@/components/${entry.category}/${entry.file
    .split("/")
    .pop()!
    .replace(/\.tsx?$/, "")}`
  const preview =
    [
      "ui-button",
      "ui-field",
      "ui-input",
      "ui-checkbox",
      "ui-switch",
      "ui-tabs",
      "ui-sonner",
      "patterns-status",
      "patterns-responsive-dialog",
      "patterns-data-display",
      "patterns-collections",
      "patterns-code",
      "patterns-segmented-control",
    ].includes(slug) || entry.category === "theme"
  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/components/"
        className="mb-6 inline-block text-xs text-muted-foreground hover:text-brand-text"
      >
        ← All components
      </Link>
      <PageHeader
        eyebrow={<Eyebrow>{entry.category} / Source reference</Eyebrow>}
        title={entry.name}
        description="The source is the contract. Use the exported API and existing semantic tokens when composing your screens."
      />
      <div className="space-y-6">
        <Panel title="Module">
          <div className="flex items-center justify-between gap-2">
            <code className="min-w-0 overflow-x-auto font-mono text-xs">
              {module}
            </code>
            <CopyButton value={module} toastLabel="Module path" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.exports.map((name) => (
              <Tag key={name}>{name}</Tag>
            ))}
          </div>
        </Panel>
        {preview && (
          <Panel
            title="Interactive preview"
            description="Illustrative content. Try the controls."
          >
            <ModulePreview slug={slug} />
          </Panel>
        )}
        <CodeBlock title={entry.file} lang="tsx" code={getSource(entry)} />
        <p className="text-xs leading-6 text-muted-foreground">
          This catalog includes source references for every module and live
          examples for core compositions. Copy the full kit when a component
          imports shared helpers or other primitives.
        </p>
      </div>
    </div>
  )
}
