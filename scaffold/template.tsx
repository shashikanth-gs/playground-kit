import { PageTransition } from "@/components/navigation/page-transition"

/** Place at `src/app/template.tsx` so route changes fade and slide. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>
}
