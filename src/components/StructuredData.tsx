import { SITE_URL } from "@/lib/config";
import type { Locale, SiteCopy } from "@/types/content";

export function StructuredData({ copy, locale }: { copy: SiteCopy; locale: Locale }) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: copy.owner,
    jobTitle: copy.role,
    url: SITE_URL,
    email: copy.social.email,
  };

  const site = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: copy.meta.title,
    url: SITE_URL,
    inLanguage: locale,
    description: copy.meta.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }}
      />
    </>
  );
}
