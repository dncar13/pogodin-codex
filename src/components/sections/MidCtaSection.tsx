import { Button } from "@/components/ui/Button";
import type { SiteCopy } from "@/types/content";

export function MidCtaSection({ copy }: { copy: SiteCopy["midCta"] }) {
  return (
    <section className="page-shell py-16">
      <div className="rounded-[32px] bg-gradient-to-r from-black via-black to-zinc-900 p-8 text-white">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">Next step</p>
          <h3 className="text-3xl font-semibold">{copy.heading}</h3>
          <p className="text-lg text-white/80">{copy.body}</p>
          <Button href="#contact" variant="ghost" className="border-white text-white hover:bg-white/10">
            {copy.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
