import { Button } from "@/components/ui/Button";
import type { SiteCopy } from "@/types/content";

export function BandSection({ band }: { band: SiteCopy["band"] }) {
  return (
    <section className="my-16 rounded-3xl bg-black text-white">
      <div className="page-shell flex flex-wrap items-center justify-between gap-6 py-8">
        <p className="text-lg font-semibold tracking-wide">{band.label}</p>
        <Button
          href="#projects"
          variant="ghost"
          className="border-white text-white hover:bg-white/10"
        >
          {band.cta}
        </Button>
      </div>
    </section>
  );
}
