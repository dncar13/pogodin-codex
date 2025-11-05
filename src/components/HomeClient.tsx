"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { BandSection } from "@/components/sections/BandSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { MidCtaSection } from "@/components/sections/MidCtaSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LanguageProvider, useLanguage } from "@/components/providers/LanguageProvider";
import { AnalyticsScript } from "@/components/AnalyticsScript";
import type { AboutCopy, Locale, ProjectContent, SiteCopy } from "@/types/content";

function HomeInner({ projectsByLocale }: { projectsByLocale: Record<Locale, ProjectContent[]> }) {
  const { copy, about, locale } = useLanguage();
  const projects = projectsByLocale[locale] ?? [];
  return (
    <>
      <AnalyticsScript />
      <SiteHeader navigation={copy.navigation} siteName={copy.siteName} locale={locale} />
      <main>
        <div className="page-shell py-12">
          <p className="text-sm uppercase tracking-[0.3em] text-black/60">{copy.role}</p>
        </div>
        <HeroSection hero={copy.hero} social={copy.social} role={copy.role} locale={locale} />
        <BandSection band={copy.band} />
        <AboutSection copy={copy.about} body={about} />
        <ServicesSection title={copy.servicesHeading} services={copy.services} />
        <SkillsSection heading={copy.skillsHeading} kicker={copy.navigation.skills} skills={copy.skills} />
        <ProjectsSection title={copy.navigation.projects} projects={projects} locale={locale} />
        <MidCtaSection copy={copy.midCta} />
        <ContactSection copy={copy.contact} email={copy.social.email} />
      </main>
      <Footer siteName={copy.siteName} email={copy.social.email} />
    </>
  );
}

type Props = {
  siteCopy: Record<Locale, SiteCopy>;
  aboutCopy: AboutCopy;
  projectsByLocale: Record<Locale, ProjectContent[]>;
};

export function HomeClient({ siteCopy, aboutCopy, projectsByLocale }: Props) {
  return (
    <LanguageProvider siteCopy={siteCopy} aboutCopy={aboutCopy}>
      <HomeInner projectsByLocale={projectsByLocale} />
    </LanguageProvider>
  );
}
