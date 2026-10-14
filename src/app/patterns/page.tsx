import type { Metadata } from "next"
import { PageHeader, Panel } from "@/components/patterns/layout"
import { Eyebrow } from "@/components/patterns/status"
import { CatalogBrowser } from "@/components/docs/catalog-browser"
import {
  CollectionsExample,
  MetricsExample,
  WorkflowExample,
  LogsExample,
} from "@/components/docs/examples"
import { getCatalog } from "@/lib/docs/catalog"

export const metadata: Metadata = { title: "Patterns" }
export default function PatternsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow={<Eyebrow code="04">Compose a screen</Eyebrow>}
        title="Useful pieces, already assembled."
        description="Patterns combine primitives into the things tools need: records, metrics, grouped settings, workflows, and feedback."
      />
      <div className="space-y-5">
        <Panel title="Metrics & quotas" description="Illustrative usage">
          <MetricsExample />
        </Panel>
        <Panel
          title="Records"
          description="A table on desktop, cards on a phone"
        >
          <CollectionsExample />
        </Panel>
        <Panel title="A guided workflow">
          <WorkflowExample />
        </Panel>
        <LogsExample />
      </div>
      <section className="mt-12 space-y-6">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Pattern source reference
        </h2>
        <CatalogBrowser
          entries={getCatalog().filter(
            (entry) => entry.category === "patterns",
          )}
        />
      </section>
    </div>
  )
}
