"use client"

import type { Route } from "next"
import { HouseIcon, LayersIcon, SettingsIcon } from "lucide-react"

import { AppChrome as PhoneChrome } from "@/components/navigation/app-chrome"

/**
 * Host-app phone chrome. Edit `items` and `parentOf` for your routes; set
 * `homeLabel` / pass `logo` for the product. The scaffold root layout mounts
 * this around page content so phones get MobileTopBar + TabBar.
 */
export function AppChrome({ children }: { children: React.ReactNode }) {
  return (
    <PhoneChrome
      homeHref={"/" as Route}
      homeLabel="App home"
      parentOf={(pathname) => {
        if (pathname.startsWith("/settings/") && pathname !== "/settings/") {
          return "/settings/" as Route
        }
        return null
      }}
      items={[
        { title: "Home", href: "/" as Route, icon: HouseIcon, exact: true },
        { title: "Tools", href: "/tools/" as Route, icon: LayersIcon },
        { title: "Settings", href: "/settings/" as Route, icon: SettingsIcon },
      ]}
    >
      {children}
    </PhoneChrome>
  )
}
