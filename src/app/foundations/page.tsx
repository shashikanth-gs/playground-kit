import type { Metadata } from "next"
import { PageHeader, SectionHeader, Panel } from "@/components/patterns/layout"
import { Eyebrow, Tag } from "@/components/patterns/status"
import { CodeBlock } from "@/components/patterns/code"
import { getTokens } from "@/lib/docs/catalog"

export const metadata: Metadata = { title: "Foundations" }
export default function FoundationsPage() {
  const tokens = getTokens()
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow={<Eyebrow code="02">The visual language</Eyebrow>}
        title="A small set of shared decisions."
        description="Semantic color, deliberate typography, layered surfaces, and restrained motion. These are the foundations of every component in the kit."
      />
      <section className="space-y-7">
        <SectionHeader
          title="Color follows meaning."
          description="Use tokens, not palette classes. Switch the theme to see every swatch adapt. Brand blue identifies and guides; signal green means live or healthy."
        />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {tokens.map((token) => (
            <div
              key={token.name}
              className="overflow-hidden rounded-lg border bg-card"
            >
              <div
                className="h-16 border-b"
                style={{ backgroundColor: `var(--${token.variable})` }}
                aria-hidden="true"
              />
              <div className="space-y-3 p-4">
                <code className="font-mono text-xs">{token.name}</code>
                <dl className="space-y-1 font-mono text-[10px] text-muted-foreground">
                  <div className="flex gap-3">
                    <dt className="w-8 shrink-0">Light</dt>
                    <dd className="break-all">{token.light}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-8 shrink-0">Dark</dt>
                    <dd className="break-all">{token.dark}</dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>
        <CodeBlock
          title="Semantic utilities"
          code={
            '<main className="bg-background text-foreground">\n  <section className="border-border bg-card">\n    <p className="text-muted-foreground">Supporting copy</p>\n  </section>\n</main>'
          }
        />
      </section>
      <section className="mt-14 space-y-7">
        <SectionHeader
          title="Three faces. Clear roles."
          description="Typography keeps the interface quiet and the technical details precise."
        />
        <div className="divide-y rounded-xl border bg-card px-6">
          {[
            {
              name: "Geist Sans",
              cls: "font-sans",
              text: "The interface stays out of your way.",
              role: "UI text, controls, body copy",
              size: "text-xl",
            },
            {
              name: "Space Grotesk",
              cls: "font-heading",
              text: "Build something useful.",
              role: "Page and section titles",
              size: "text-3xl font-semibold tracking-tight",
            },
            {
              name: "Geist Mono",
              cls: "font-mono",
              text: "200 OK / tools.ready",
              role: "Eyebrows, code, tags, metrics",
              size: "text-lg",
            },
          ].map((font) => (
            <div key={font.name} className="space-y-4 py-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Tag>{font.cls}</Tag>
                <span className="text-xs text-muted-foreground">
                  {font.name} · {font.role}
                </span>
              </div>
              <p className={`${font.cls} ${font.size}`}>{font.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-14 space-y-7">
        <SectionHeader title="Surfaces stack with purpose." />
        <div className="grid gap-4 sm:grid-cols-2">
          <Panel title="Page → well → card → overlay">
            <div className="rounded-lg border bg-background p-4">
              <span className="font-mono text-xs">bg-background</span>
              <div className="mt-4 rounded-lg border bg-sunken p-4">
                <span className="font-mono text-xs">bg-sunken</span>
                <div className="mt-4 rounded-lg border bg-card p-4">
                  <span className="font-mono text-xs">bg-card</span>
                  <div className="mt-4 rounded-lg border bg-popover p-4 font-mono text-xs shadow-elevated">
                    bg-popover
                  </div>
                </div>
              </div>
            </div>
          </Panel>
          <Panel title="Keep the contract">
            <ul className="list-disc space-y-3 pl-4 text-sm leading-relaxed text-muted-foreground">
              <li>One color system across both themes.</li>
              <li>
                Status uses Tone: brand, success, warning, danger, info,
                neutral.
              </li>
              <li>Reuse primitives; compose new patterns.</li>
              <li>Use ResponsiveDialog for phone-ready overlays.</li>
              <li>Motion respects prefers-reduced-motion.</li>
              <li>
                Mount AppChrome (or MobileTopBar + TabBar) in the root layout so
                phones get bottom navigation.
              </li>
              <li>Phone chrome keeps at least 44px touch targets.</li>
              <li>Icons come from Lucide; controls use size-4.</li>
            </ul>
          </Panel>
        </div>
      </section>
    </div>
  )
}
