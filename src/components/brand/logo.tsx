import { cn } from "@/lib/utils"

/**
 * Playground Kit mark: a command prompt inside a workspace frame.
 * Colours come from the shared theme tokens. Legacy http2xx artwork
 * remains in public/brand as a reference to the kit's origins.
 */
export function Logomark({
  className,
  title,
}: {
  className?: string
  /** Compatibility flag; the Playground Kit mark is static. */
  animated?: boolean
  /** Accessible name; omit when a visible wordmark sits next to it. */
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("size-7 shrink-0 overflow-visible", className)}
    >
      <rect
        x="3"
        y="3"
        width="26"
        height="26"
        rx="6"
        className="stroke-border-strong"
        strokeWidth="1.5"
      />
      <path
        d="M10 12 L14 16 L10 20"
        className="stroke-brand"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 20 H23"
        className="stroke-foreground"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-heading text-[17px] leading-none tracking-[-0.02em]",
        className,
      )}
    >
      <span className="font-semibold text-foreground">Playground</span>{" "}
      <span className="font-medium text-muted-foreground">Kit</span>
    </span>
  )
}

/** Playground Kit mark and wordmark. */
export function Logo({
  className,
  animated,
}: {
  className?: string
  animated?: boolean
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Logomark animated={animated} className="size-6" />
      <Wordmark />
    </span>
  )
}
