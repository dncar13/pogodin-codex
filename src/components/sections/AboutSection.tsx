import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteCopy } from "@/types/content";

export function AboutSection({ copy, body }: { copy: SiteCopy["about"]; body: string }) {
  const paragraphs = body.split(/\n+/).filter(Boolean);
  return (
    <section id="about" className="page-shell py-12 sm:py-16 md:py-20">
      <SectionHeading kicker={copy.heading} title={copy.lede} />
      <div className="max-w-3xl text-base sm:text-lg leading-7 sm:leading-8 text-black/80">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="mb-4 sm:mb-5 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
