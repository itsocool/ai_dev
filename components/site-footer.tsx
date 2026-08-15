import { Separator } from "@/components/ui/separator"

export default function SiteFooter() {
  return (
    <footer className="grid min-h-[6.5rem] grid-cols-[auto_1fr_auto] items-center gap-10 px-gutter text-[0.9rem] max-md:grid-cols-1 max-md:gap-5 max-md:py-8">
      <p>김도윤 · AI Product Engineer</p>
      <Separator className="bg-line max-md:w-full" />
      <p>Seoul · 2026</p>
    </footer>
  )
}
