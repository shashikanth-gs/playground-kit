import Link from "next/link"
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BoxIcon,
  CodeIcon,
  LayersIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Eyebrow, Tag } from "@/components/patterns/status"
import { SectionHeader } from "@/components/patterns/layout"
import { cardSurface } from "@/components/patterns/card-surface"
import { ConsolePreview } from "@/components/docs/examples"
import { CodeBlock } from "@/components/patterns/code"
import { getCatalog } from "@/lib/docs/catalog"
import { asset, MAINTAINER } from "@/lib/docs/links"

const stack = [
  {
    name: "shadcn/ui",
    detail: "Source-owned components · base-nova style",
    href: "https://ui.shadcn.com/",
  },
  {
    name: "Base UI",
    detail: "Behavior, focus, and accessible interaction primitives",
    href: "https://base-ui.com/react/overview",
  },
  {
    name: "Tailwind CSS 4",
    detail: "Semantic CSS variables and utility composition",
    href: "https://tailwindcss.com/",
  },
  {
    name: "Next.js 16 + React 19",
    detail: "App Router, TypeScript, and component composition",
    href: "https://nextjs.org/",
  },
  {
    name: "Lucide + Geist",
    detail: "Icons · Geist Sans & Mono · Space Grotesk headings",
    href: "https://lucide.dev/",
  },
]

export default function Overview() {
  const catalog = getCatalog()
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center justify-between border-b pb-5">
        <Eyebrow code="200">Playground Kit / Technical UI</Eyebrow>
        <Tag>v0.1.0</Tag>
      </div>
      <section className="relative grid items-center gap-12 py-14 xl:grid-cols-[1.1fr_1fr] xl:py-20">
        <div>
          <p className="mb-6 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Components for interactive technical playgrounds
          </p>
          <h1 className="font-heading text-5xl leading-[1.06] font-semibold tracking-[-0.045em] sm:text-6xl xl:text-7xl">
            Build a place{" "}
            <br />
            <span className="text-muted-foreground">to experiment.</span>
          </h1>
          <p className="mt-7 max-w-md text-base leading-7 text-muted-foreground">
            A shared UI foundation for technical demos, developer tools, and
            hands-on labs. Compose code, logs, status, and responsive panels
            into a workspace people can explore.
          </p>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            Built on{" "}
            <a
              href="https://ui.shadcn.com/"
              target="_blank"
              rel="noreferrer"
              className="text-brand-text hover:underline"
            >
              shadcn/ui
            </a>{" "}
            and{" "}
            <a
              href="https://base-ui.com/"
              target="_blank"
              rel="noreferrer"
              className="text-brand-text hover:underline"
            >
              Base UI
            </a>
            .
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              nativeButton={false}
              size="lg"
              render={<Link href="/getting-started/" />}
            >
              Start building <ArrowRightIcon />
            </Button>
            <Button
              nativeButton={false}
              size="lg"
              variant="outline"
              render={<Link href="/components/" />}
            >
              Explore components
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5 font-mono text-[11px] text-subtle-foreground">
            <span>Source owned</span>
            <span>Light + dark</span>
            <span>Mobile aware</span>
          </div>
          <p className="mt-5 max-w-md text-xs leading-6 text-muted-foreground">
            Created and maintained by{" "}
            <a
              href={MAINTAINER.website}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand-text hover:underline"
            >
              {MAINTAINER.name}
            </a>
            .
          </p>
        </div>
        <div className="min-w-0">
          <ConsolePreview />
          <p className="mt-4 text-center font-mono text-[10px] tracking-wider text-subtle-foreground uppercase">
            Existing kit components. Illustrative output. No live connection.
          </p>
        </div>
      </section>
      <div className="grid grid-cols-3 divide-x border-y py-6">
        {[
          [
            catalog.filter((entry) => entry.category === "ui").length,
            "UI primitives",
          ],
          [
            catalog.filter((entry) => entry.category === "patterns").length,
            "Composed patterns",
          ],
          ["2", "Complete themes"],
        ].map(([value, label]) => (
          <div key={label} className="px-3 first:pl-0 sm:px-6">
            <span className="font-mono text-2xl sm:text-3xl">{value}</span>
            <p className="mt-1 text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
      <section className="grid gap-10 py-14 xl:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeader
            eyebrow="01 / The foundation"
            title="General controls. Technical compositions."
            description="shadcn/ui supplies the styled primitives; Base UI supplies interaction behavior; Tailwind CSS supplies the styling utilities. Playground Kit adds a shared visual language and compositions for technical interfaces."
          />
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            The first foundations were extracted from http2xx.io. Today, the kit
            includes code blocks, log streams, copyable values, metrics,
            diagrams, and responsive layouts. Copy the source and connect it to
            your own application or execution backend.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
            <a
              href={asset("/licenses/LICENSE")}
              className="text-brand-text hover:underline"
            >
              MIT license
            </a>
            <a
              href={asset("/licenses/THIRD_PARTY_NOTICES.md")}
              className="text-brand-text hover:underline"
            >
              Third-party notices
            </a>
            <a
              href={asset("/licenses/BRAND.md")}
              className="text-brand-text hover:underline"
            >
              Brand terms
            </a>
          </div>
        </div>
        <div className="divide-y border-y">
          {stack.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-5 py-5 focus-visible:outline-2 focus-visible:outline-ring"
            >
              <div>
                <h3 className="text-sm font-medium group-hover:text-brand-text">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
              <ArrowUpRightIcon className="size-4 shrink-0 text-subtle-foreground" />
            </a>
          ))}
        </div>
      </section>
      <section className="space-y-6 border-t pt-12">
        <SectionHeader
          eyebrow="02 / Explore the system"
          title="From tokens to a technical workspace."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Foundations",
              href: "/foundations/",
              icon: LayersIcon,
              text: "Color, typography, surfaces, and the rules that keep your tools coherent.",
            },
            {
              title: "Components",
              href: "/components/",
              icon: BoxIcon,
              text: "Try the existing controls, code views, log output, and source contracts.",
            },
            {
              title: "Patterns",
              href: "/patterns/",
              icon: CodeIcon,
              text: "Compose metrics, records, workflows, and phone-aware overlays into your workspace.",
            },
          ].map(({ title, href, icon: Icon, text }) => (
            <Link key={href} href={href} className={`${cardSurface} gap-6 p-6`}>
              <Icon className="size-5 text-brand-text" />
              <div>
                <h3 className="font-heading text-xl font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
              <ArrowRightIcon className="mt-auto size-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>
      <section className="mt-14 space-y-6 border-t pt-12">
        <SectionHeader
          eyebrow="03 / The direction"
          title="Terminals. Live screens. Consoles."
          description="The next layer is dedicated UI for interactive technical playgrounds. These component families are planned; the current catalog shows the foundations available today."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Terminal sessions",
              text: "Command input, history, scrollback, and execution state.",
              tag: "Planned",
            },
            {
              title: "Live consoles & screens",
              text: "Streaming output, running previews, connection state, and session controls.",
              tag: "Planned",
            },
            {
              title: "Inspectors & workspaces",
              text: "Request and event inspection, structured data, and resizable workspace panels.",
              tag: "Planned",
            },
          ].map((family) => (
            <div key={family.title} className="space-y-3">
              <Tag>{family.tag}</Tag>
              <h3 className="font-heading text-lg font-medium">
                {family.title}
              </h3>
              <p className="text-sm leading-7 text-muted-foreground">
                {family.text}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-14 grid gap-7 rounded-xl border bg-sunken p-6 sm:p-8 xl:grid-cols-2">
        <div>
          <Eyebrow code="→">Make it yours</Eyebrow>
          <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight">
            Your next playground starts here.
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Take the source, install its dependencies, and compose a screen. The
            agent guide and component inventory travel with the kit.
          </p>
          <Link
            href="/getting-started/"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-text hover:underline"
          >
            Installation guide <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <CodeBlock
          title="A familiar import"
          lang="tsx"
          code={
            'import { PageHeader, Panel } from "@/components/patterns/layout"\nimport { Button } from "@/components/ui/button"\n\n<PageHeader\n  title="My tools"\n  actions={<Button>New tool</Button>}\n/>'
          }
        />
      </section>
    </div>
  )
}
