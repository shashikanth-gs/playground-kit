import type { Metadata } from "next"
import { ArrowDownToLineIcon, ArrowUpRightIcon } from "lucide-react"
import { PageHeader, Panel } from "@/components/patterns/layout"
import { Eyebrow } from "@/components/patterns/status"
import { CodeBlock } from "@/components/patterns/code"
import { Callout } from "@/components/patterns/data-display"
import { Button } from "@/components/ui/button"
import { asset, REPOSITORY } from "@/lib/docs/links"

export const metadata: Metadata = { title: "Getting started" }
const steps = [
  {
    title: "01 / Create the host app",
    body: "Use Next.js 16, React 19, TypeScript, Tailwind CSS 4, and the @/* → ./src/* alias.",
    code: 'npx create-next-app@latest my-tool --typescript --tailwind --app --src-dir --import-alias "@/*"',
  },
  {
    title: "02 / Copy the source kit",
    body: "Download and extract the kit, then copy only its components, hooks, libraries, and stylesheet. The catalog itself is excluded from the download.",
    code: "tar -xzf http2xx-design-system.tar.gz\ncp -R http2xx-design-system/src/. my-tool/src/\ncp -R http2xx-design-system/public/brand my-tool/public/\ncp http2xx-design-system/components.json my-tool/",
  },
  {
    title: "03 / Install the shared dependencies",
    body: "Run the bundled dependency helper in your host app. It adds the kit’s dependencies to the existing package.json without replacing the host scripts. It refuses incompatible or too-old versions.",
    code: "node http2xx-design-system/install-dependencies.mjs --target ./my-tool\ncd my-tool\nnpm install",
  },
  {
    title: "04 / Mount the app shell",
    body: "Use the scaffold root layout and template. The layout includes all three fonts, ThemeScript, ThemeProvider, TooltipProvider, and Toaster. Import globals.css once; remove your host’s duplicate global stylesheet import.",
    code: "cp ../http2xx-design-system/scaffold/root-layout.tsx src/app/layout.tsx\ncp ../http2xx-design-system/scaffold/template.tsx src/app/template.tsx",
  },
  {
    title: "05 / Give the tool its identity",
    body: "Update the title and description in your root layout. Rename THEME_STORAGE_KEY for this product, replace the logo if needed, and update the mobile home label. Compose screens from the inventory.",
    code: 'import { PageHeader, Panel, EmptyState } from "@/components/patterns/layout"\nimport { Button } from "@/components/ui/button"\n\nexport default function ToolsPage() {\n  return (\n    <main className="mx-auto max-w-6xl px-4 py-8">\n      <PageHeader title="My tools" actions={<Button>New tool</Button>} />\n      <Panel title="Recent">Your tool content</Panel>\n    </main>\n  )\n}',
  },
]

export default function GettingStarted() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow={<Eyebrow code="01">From source to screen</Eyebrow>}
        title="Take the kit. Build your tool."
        description="A copy-and-compose workflow. No private npm registry, runtime service, or catalog dependency is required in your apps."
        actions={
          <Button
            nativeButton={false}
            render={
              <a
                href={asset("/downloads/http2xx-design-system.tar.gz")}
                download
              />
            }
          >
            <ArrowDownToLineIcon />
            Download kit
          </Button>
        }
      />
      <Callout
        tone="info"
        title="The repository and the catalog have different audiences."
      >
        The repository is private. This GitHub Pages catalog, source examples,
        and kit download are public. Do not add secrets or private product data
        to the catalog.
      </Callout>
      <div className="mt-8 space-y-6">
        {steps.map((step) => (
          <Panel key={step.title} title={step.title}>
            <p className="mb-5 text-sm leading-7 text-muted-foreground">
              {step.body}
            </p>
            <CodeBlock
              lang={step.title.startsWith("05") ? "tsx" : "shell"}
              code={step.code}
            />
          </Panel>
        ))}
      </div>
      <section className="mt-10 space-y-4">
        <h2 className="font-heading text-xl font-semibold">
          Give your agent the same reference.
        </h2>
        <p className="text-sm leading-7 text-muted-foreground">
          The download includes AGENTS.md and COMPONENTS.md. Read the guide
          first, then the inventory, then each component’s source before using
          it. Keep the guide with each tool so future changes follow the same
          system.
        </p>
        <Button
          nativeButton={false}
          variant="outline"
          render={<a href={REPOSITORY} target="_blank" rel="noreferrer" />}
        >
          Private source repository <ArrowUpRightIcon />
        </Button>
      </section>
      <section className="mt-10 space-y-4">
        <h2 className="font-heading text-xl font-semibold">
          Keep the notices with the source.
        </h2>
        <p className="text-sm leading-7 text-muted-foreground">
          Original code is MIT-licensed. The download preserves the licenses for
          shadcn/ui, Base UI, other shared dependencies, and the fonts. Keep
          LICENSE, THIRD_PARTY_NOTICES.md, and the licenses directory with any
          redistributed kit. Replace the http2xx reference identity for other
          products; its artwork is covered separately by BRAND.md.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
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
      </section>
    </div>
  )
}
