"use client"

import type { Route } from "next"

import { MobileTopBar } from "@/components/navigation/mobile-top-bar"
import { TabBar, type TabBarItem } from "@/components/navigation/tab-bar"

/**
 * Phone chrome shell: sticky top bar + fixed bottom tabs on viewports below
 * `md`. Desktop layouts pass children through with no extra chrome.
 *
 * Mount once in the root layout around page content. Pad content so the fixed
 * TabBar does not cover the last rows on a phone.
 */
export function AppChrome({
  children,
  items,
  homeHref,
  homeLabel = "Home",
  logo,
  trailing,
  parentOf,
}: {
  children: React.ReactNode
  items: TabBarItem[]
  homeHref: Route
  homeLabel?: string
  logo?: React.ReactNode
  trailing?: React.ReactNode
  parentOf: (pathname: string) => Route | null
}) {
  return (
    <>
      <MobileTopBar
        homeHref={homeHref}
        homeLabel={homeLabel}
        logo={logo}
        trailing={trailing}
        parentOf={parentOf}
      />
      <div className="flex min-h-0 flex-1 flex-col pb-[calc(3.75rem+env(safe-area-inset-bottom))] md:pb-0">
        {children}
      </div>
      <TabBar items={items} />
    </>
  )
}
