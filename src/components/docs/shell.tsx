"use client"

import type { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  ArrowUpRightIcon,
  BookOpenIcon,
  BoxIcon,
  CodeIcon,
  LayersIcon,
  LayoutTemplateIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeMenu, ThemeSegmented } from "@/components/theme/theme-toggle"
import { ResponsiveDialog } from "@/components/patterns/responsive-dialog"
import { ListGroup, ListItem } from "@/components/patterns/collections"
import { Tag } from "@/components/patterns/status"
import { MobileTopBar } from "@/components/navigation/mobile-top-bar"
import { TabBar } from "@/components/navigation/tab-bar"
import { cn } from "@/lib/utils"
import { asset, MAINTAINER, REPOSITORY } from "@/lib/docs/links"
import type { CatalogEntry } from "@/lib/docs/catalog"

const navigation = [
  { href: "/" as Route, title: "Overview", tabTitle: "Overview", icon: BookOpenIcon, number: "00", exact: true },
  {
    href: "/getting-started/" as Route,
    title: "Getting started",
    tabTitle: "Start",
    icon: CodeIcon,
    number: "01",
  },
  {
    href: "/foundations/" as Route,
    title: "Foundations",
    tabTitle: "Foundations",
    icon: LayersIcon,
    number: "02",
  },
  {
    href: "/components/" as Route,
    title: "Components",
    tabTitle: "Components",
    icon: BoxIcon,
    number: "03",
  },
  {
    href: "/patterns/" as Route,
    title: "Patterns",
    tabTitle: "Patterns",
    icon: LayoutTemplateIcon,
    number: "04",
  },
]

const tabItems = navigation.map(({ href, tabTitle, icon, exact }) => ({
  title: tabTitle,
  href,
  icon,
  exact,
}))

function docsParentOf(pathname: string): Route | null {
  if (pathname.startsWith("/components/") && pathname !== "/components/") {
    return "/components/" as Route
  }
  return null
}

export function DocsShell({
  entries,
  children,
}: {
  entries: CatalogEntry[]
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])
  const matches = entries.filter((entry) =>
    `${entry.name} ${entry.category} ${entry.exports.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  )
  const searchButton = (
    <Button
      variant="outline"
      onClick={() => setSearchOpen(true)}
      className="min-h-11 lg:min-h-8"
      aria-label="Search documentation"
    >
      <SearchIcon />
      <span className="hidden sm:inline">Search documentation</span>
      <kbd className="ml-6 hidden font-mono text-[10px] text-muted-foreground md:inline">
        ⌘ K
      </kbd>
    </Button>
  )
  const nav = (
    <nav aria-label="Documentation" className="space-y-1">
      {navigation.map(({ href, title, icon: Icon, number, exact }) => {
        const active = exact
          ? pathname === href
          : pathname === href || pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring",
              active
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground",
            )}
          >
            <Icon className="size-4" />
            <span className="flex-1">{title}</span>
            <span className="font-mono text-[10px] text-subtle-foreground">
              {number}
            </span>
          </Link>
        )
      })}
    </nav>
  )
  return (
    <>
      <a
        href="#main-content"
        className="sr-only fixed top-2 left-2 z-50 rounded-lg bg-popover p-3 focus:not-sr-only"
      >
        Skip to content
      </a>
      <MobileTopBar
        homeHref={"/" as Route}
        homeLabel="Playground Kit home"
        parentOf={docsParentOf}
        trailing={
          <>
            <Button
              variant="ghost"
              size="icon"
              className="min-h-11 min-w-11"
              aria-label="Search documentation"
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
            </Button>
            <ThemeMenu className="min-h-11 min-w-11" />
          </>
        }
      />
      <header
        data-chrome
        className="sticky top-0 z-30 hidden h-16 items-center justify-between gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-6 md:flex"
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="Playground Kit home"
            className="flex items-center gap-3"
          >
            <Logo />
            <span className="hidden border-l pl-3 text-xs text-muted-foreground sm:inline">
              Technical UI
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {searchButton}
          <div className="hidden lg:block">
            <ThemeSegmented />
          </div>
          <ThemeMenu className="min-h-11 min-w-11 lg:hidden" />
          <Button
            nativeButton={false}
            variant="ghost"
            render={<a href={REPOSITORY} target="_blank" rel="noreferrer" />}
            className="hidden sm:inline-flex"
          >
            GitHub <ArrowUpRightIcon />
          </Button>
        </div>
      </header>
      <div className="mx-auto grid w-full max-w-[1600px] pb-[calc(3.75rem+env(safe-area-inset-bottom))] md:pb-0 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside
          data-chrome
          className="sticky top-16 hidden h-[calc(100svh-4rem)] flex-col border-r px-5 py-8 lg:flex"
        >
          <div className="mb-5 px-3 font-mono text-[10px] tracking-widest text-subtle-foreground uppercase">
            Playground Kit
          </div>
          {nav}
          <div className="mt-8 space-y-3 border-t px-3 pt-6">
            <p className="font-mono text-[10px] tracking-widest text-subtle-foreground uppercase">
              In the box
            </p>
            {[
              ["Primitives", "ui"],
              ["Patterns", "patterns"],
              ["Theme & chrome", "other"],
            ].map(([label, category]) => (
              <div
                key={label}
                className="flex justify-between text-xs text-muted-foreground"
              >
                <span>{label}</span>
                <span className="font-mono">
                  {
                    entries.filter((entry) =>
                      category === "other"
                        ? !["ui", "patterns"].includes(entry.category)
                        : entry.category === category,
                    ).length
                  }
                </span>
              </div>
            ))}
          </div>
          <div className="mt-auto space-y-3 px-3">
            <Tag>v0.1.0</Tag>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Built for technical playgrounds.
              <br />
              Maintained by{" "}
              <a
                href={MAINTAINER.website}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-text hover:underline"
              >
                {MAINTAINER.name}
              </a>
              .
            </p>
          </div>
        </aside>
        <main
          id="main-content"
          className="min-w-0 px-5 py-10 sm:px-8 lg:px-12 lg:py-14 xl:px-16"
        >
          {children}
          <footer className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground">
            <div className="space-y-2">
              <p>
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
              <div className="flex gap-4">
                <a
                  href={MAINTAINER.website}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-text hover:underline"
                >
                  shashikanth.me
                </a>
                <a
                  href={MAINTAINER.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-text hover:underline"
                >
                  GitHub profile
                </a>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href={asset("/licenses/LICENSE")}
                className="hover:text-brand-text hover:underline"
              >
                MIT license
              </a>
              <a
                href={asset("/licenses/THIRD_PARTY_NOTICES.md")}
                className="hover:text-brand-text hover:underline"
              >
                Third-party notices
              </a>
              <a
                href={asset("/licenses/BRAND.md")}
                className="hover:text-brand-text hover:underline"
              >
                Brand terms
              </a>
            </div>
          </footer>
        </main>
      </div>
      <TabBar items={tabItems} />
      <ResponsiveDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        title="Search documentation"
        description="Find a component, pattern, or exported API."
        footer={
          <Button variant="outline" onClick={() => setSearchOpen(false)}>
            Close <XIcon />
          </Button>
        }
      >
        <Input
          aria-label="Search components"
          placeholder="Try Button, DataTable, theme…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="max-h-80 overflow-y-auto py-4">
          <ListGroup>
            {navigation
              .filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase()),
              )
              .map((item) => (
                <ListItem
                  key={item.href}
                  title={item.title}
                  href={item.href}
                  onClick={() => setSearchOpen(false)}
                />
              ))}
            {matches.map((entry) => (
              <ListItem
                key={entry.slug}
                title={entry.name}
                description={`${entry.category} · ${entry.exports.slice(0, 3).join(", ")}`}
                href={`/components/${entry.slug}/`}
                onClick={() => setSearchOpen(false)}
              />
            ))}
          </ListGroup>
          {matches.length === 0 && (
            <p className="pt-3 text-sm text-muted-foreground">
              No components found. Try another name.
            </p>
          )}
        </div>
      </ResponsiveDialog>
    </>
  )
}
