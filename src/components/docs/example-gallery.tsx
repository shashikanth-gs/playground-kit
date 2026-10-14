"use client"

import Link from "next/link"
import { examples } from "@/components/docs/examples"
import { CodeBlock } from "@/components/patterns/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRightIcon } from "lucide-react"

export function ExampleGallery() {
  return <div className="grid gap-6 xl:grid-cols-2">{examples.map(({ title, description, component: Component, code, slug }) => <section key={title} className="min-w-0 overflow-hidden rounded-xl border bg-card"><header className="flex items-start justify-between gap-3 border-b px-5 py-4"><div><h3 className="font-heading font-medium">{title}</h3><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p></div><Link href={`/components/${slug}/`} aria-label={`${title} source`} className="rounded text-muted-foreground hover:text-brand-text focus-visible:outline-2 focus-visible:outline-ring"><ArrowUpRightIcon className="size-4" /></Link></header><Tabs defaultValue="preview" className="p-5"><TabsList variant="line" aria-label={`${title} example view`}><TabsTrigger value="preview">Preview</TabsTrigger><TabsTrigger value="code">Usage</TabsTrigger></TabsList><TabsContent value="preview" className="py-5"><Component /></TabsContent><TabsContent value="code" className="py-5"><CodeBlock lang="tsx" code={code} /><p className="mt-3 text-xs text-muted-foreground">Illustrative usage. Read the source for imports and the full prop contract.</p></TabsContent></Tabs></section>)}</div>
}
