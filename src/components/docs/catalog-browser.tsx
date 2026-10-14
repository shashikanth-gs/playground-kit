"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRightIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { FilterChips } from "@/components/patterns/filter-chips"
import { cardSurface } from "@/components/patterns/card-surface"
import { EmptyState } from "@/components/patterns/layout"
import { Tag } from "@/components/patterns/status"
import type { CatalogEntry } from "@/lib/docs/catalog"

export function CatalogBrowser({
  entries,
  filter = false,
}: {
  entries: CatalogEntry[]
  filter?: boolean
}) {
  const [query, setQuery] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const shown = entries.filter(
    (entry) =>
      (!categories.length || categories.includes(entry.category)) &&
      `${entry.name} ${entry.exports.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  )
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <Field className="sm:max-w-xs">
          <FieldLabel htmlFor="catalog-search">
            Find in the source kit
          </FieldLabel>
          <Input
            id="catalog-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search names and exports…"
          />
        </Field>
        {filter && (
          <FilterChips
            label="Component category"
            value={categories}
            onValueChange={setCategories}
            options={[
              { value: "ui", label: "Primitives" },
              { value: "patterns", label: "Patterns" },
              { value: "theme", label: "Theme" },
              { value: "navigation", label: "Chrome" },
              { value: "brand", label: "Brand" },
            ]}
          />
        )}
      </div>
      <p className="font-mono text-xs text-muted-foreground" aria-live="polite">
        {shown.length} / {entries.length} modules
      </p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((entry) => (
          <Link
            key={entry.slug}
            href={`/components/${entry.slug}/`}
            className={`${cardSurface} gap-5 p-5`}
          >
            <div className="flex items-center justify-between">
              <Tag>{entry.category}</Tag>
              <ArrowUpRightIcon className="size-4 text-subtle-foreground" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-medium">{entry.name}</h3>
              <p className="mt-2 line-clamp-2 font-mono text-[11px] leading-5 text-muted-foreground">
                {entry.exports.join(" · ")}
              </p>
            </div>
            <p className="mt-auto border-t pt-3 text-xs text-muted-foreground">
              View API & source
            </p>
          </Link>
        ))}
      </div>
      {!shown.length && (
        <EmptyState
          icon={SearchIcon}
          title="No matching components"
          description="Try a different name or clear the category filter."
        />
      )}
    </div>
  )
}
