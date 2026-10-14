import type { Metadata } from "next"
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { ThemeScript } from "@/components/theme/theme-script"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { DocsShell } from "@/components/docs/shell"
import { getCatalog } from "@/lib/docs/catalog"
import { asset } from "@/lib/docs/links"
import "@/styles/globals.css"

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const heading = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] })

export const metadata: Metadata = {
  title: { default: "http2xx · Design system", template: "%s · http2xx" },
  description: "A source-owned design system for personal tools. Explore the foundations, components, and patterns extracted from http2xx.io.",
  icons: { icon: asset("/brand/favicon.svg"), apple: asset("/brand/apple-touch-icon.png") },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable} ${heading.variable} h-full antialiased`}><head><ThemeScript /></head><body className="min-h-full"><ThemeProvider><TooltipProvider delay={300}><DocsShell entries={getCatalog()}>{children}</DocsShell><Toaster position="bottom-right" /></TooltipProvider></ThemeProvider></body></html>
}
