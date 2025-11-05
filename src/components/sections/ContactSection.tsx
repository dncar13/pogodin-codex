import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteCopy } from "@/types/content";

export function ContactSection({ copy, email }: { copy: SiteCopy["contact"]; email: string }) {
  return (
    <section id="contact" className="page-shell py-16">
      <SectionHeading kicker="Contact" title={copy.heading} />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 text-lg text-black/80">
          <p>{copy.lede}</p>
          <a className="text-black underline" href={`mailto:${email}`}>
            {email}
          </a>
        </div>
        <ContactForm copy={copy} />
      </div>
    </section>
  );
}
