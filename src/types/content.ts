export type Locale = "he" | "en";

export type HeroOption = {
  id: string;
  label: string;
  headline: string;
  body: string;
};

export type HeroCta = {
  label: string;
  href: string;
};

export type HeroCopy = {
  kicker: string;
  options: HeroOption[];
  ctas: HeroCta[];
  hint: string;
  portraitAlt: string;
};

export type SiteCopy = {
  siteName: string;
  owner: string;
  role: string;
  meta: {
    title: string;
    description: string;
    ogImageAlt: string;
  };
  navigation: {
    about: string;
    skills: string;
    projects: string;
    contact: string;
    contactCta: string;
  };
  hero: HeroCopy;
  band: {
    label: string;
    cta: string;
  };
  about: {
    heading: string;
    lede: string;
    body: string;
  };
  services: string[];
  servicesHeading: string;
  skillsHeading: string;
  skills: string[];
  midCta: {
    heading: string;
    body: string;
    cta: string;
  };
  contact: {
    heading: string;
    lede: string;
    success: string;
    error: string;
    form: {
      name: string;
      email: string;
      message: string;
      cta: string;
    };
  };
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
};

export type AboutCopy = {
  he: string;
  en: string;
};

export type StructuredHighlight = {
  he: string;
  en: string;
};

export type ProjectFrontMatter = {
  slug: string;
  title: Record<Locale, string>;
  role: Record<Locale, string>;
  status: string;
  stack: string[];
  cover: {
    label: string;
  };
  summary: Record<Locale, string>;
  highlights: StructuredHighlight[];
  links: {
    demo?: string;
    repo?: string;
  };
  body: Record<Locale, string>;
};

export type ProjectContent = ProjectFrontMatter & {
  locale: Locale;
  bodyForLocale: string;
  summaryForLocale: string;
  titleForLocale: string;
  roleForLocale: string;
  highlightsForLocale: string[];
};
