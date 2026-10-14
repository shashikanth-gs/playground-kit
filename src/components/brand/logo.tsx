import { cn } from "@/lib/utils"

/**
 * http2xx.io logomark — the prompt (">"), the cursor ("_") and three status
 * dots reading as "2xx" (● ○ ○). Geometry matches the brand kit in
 * /public/brand; colours come from theme tokens so the mark adapts to
 * light and dark exactly like mark-light.svg / mark-dark.svg:
 *   prompt → brand, cursor → foreground, dots → signal.
 */
export function Logomark({
  className,
  animated = false,
  title,
}: {
  className?: string
  /** Pulse the filled status dot (sign-in, loading moments). */
  animated?: boolean
  /** Accessible name; omit when a visible wordmark sits next to it. */
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("size-7 shrink-0 overflow-visible", className)}
    >
      <path d="M8 12 L30 28 L8 44" className="stroke-brand" strokeWidth="7" strokeLinecap="square" />
      <rect x="34" y="44" width="22" height="8" className="fill-foreground" />
      <circle cx="36" cy="14" r="5.5" className={cn("fill-signal", animated && "motion-safe:animate-pulse")} />
      <circle cx="48" cy="14" r="4" className="stroke-signal" strokeWidth="2.5" />
      <circle cx="58" cy="14" r="4" className="stroke-signal" strokeWidth="2.5" />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-heading text-[17px] leading-none tracking-[-0.02em]", className)}>
      <span className="font-light text-muted-foreground">http</span>
      <span className="font-bold text-brand">2xx</span>
      <span className="font-medium text-muted-foreground">.io</span>
    </span>
  )
}

/** Mark + wordmark lockup, as in lockup-light.svg / lockup-dark.svg. */
export function Logo({ className, animated }: { className?: string; animated?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Logomark animated={animated} className="size-6" />
      <Wordmark />
    </span>
  )
}
