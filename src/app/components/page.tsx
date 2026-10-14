import type { Metadata } from "next"
import { PageHeader, SectionHeader } from "@/components/patterns/layout"
import { Eyebrow } from "@/components/patterns/status"
import { ExampleGallery } from "@/components/docs/example-gallery"
import { CatalogBrowser } from "@/components/docs/catalog-browser"
import { getCatalog } from "@/lib/docs/catalog"

export const metadata: Metadata = { title: "Components" }
export default function ComponentsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow={<Eyebrow code="03">The component catalog</Eyebrow>}
        title="Building blocks you can try."
        description="Explore the real kit in your current theme. Every example below is interactive; the data is illustrative."
      />
      <ExampleGallery />
      <section className="mt-14 space-y-8">
        <SectionHeader
          eyebrow="Source reference"
          title="Every module. Its actual contract."
          description="Browse all primitives, patterns, theme helpers, and navigation chrome. Source pages are generated from the files in this repository."
        />
        <CatalogBrowser entries={getCatalog()} filter />
      </section>
    </div>
  )
}
