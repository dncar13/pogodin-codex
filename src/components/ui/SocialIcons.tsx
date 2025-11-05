import type { SiteCopy } from "@/types/content";

const iconProps = "w-5 h-5";

const icons = {
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconProps}>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.77.6-3.36-1.18-3.36-1.18-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.61.07-.61 1 .07 1.52 1.05 1.52 1.05.88 1.52 2.32 1.08 2.89.83a2.09 2.09 0 0 1 .62-1.32c-2.21-.25-4.55-1.11-4.55-4.93a3.86 3.86 0 0 1 1-2.68 3.58 3.58 0 0 1 .1-2.65s.84-.27 2.75 1a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1 2.75-1a3.58 3.58 0 0 1 .1 2.65 3.86 3.86 0 0 1 1 2.68c0 3.84-2.34 4.68-4.57 4.93a2.35 2.35 0 0 1 .67 1.83v2.71c0 .27.18.58.69.48A10 10 0 0 0 12 2"
      />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconProps}>
      <path
        fill="currentColor"
        d="M4.98 3.5a2 2 0 1 0 0 4.01 2 2 0 0 0 0-4.01M3 8.98h3.95V21H3zm7.35 0H14v1.63h.05c.54-1.02 1.86-2.1 3.83-2.1 4.09 0 4.85 2.69 4.85 6.2V21h-3.95v-5.13c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-3.96z"
      />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconProps}>
      <path
        fill="currentColor"
        d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm2 .5v.28l7 4.38 7-4.38V6.5zm14 3.04-6.65 4.16a1.5 1.5 0 0 1-1.7 0L4 9.54V18h15z"
      />
    </svg>
  ),
};

export function SocialIcons({ social, label }: { social: SiteCopy["social"]; label: string }) {
  return (
    <ul className="mt-8 flex items-center gap-3" aria-label={label}>
      {social.github && (
        <li>
          <a
            href={social.github}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-current text-sm transition-colors hover:bg-white/10"
            aria-label="GitHub"
          >
            {icons.github}
          </a>
        </li>
      )}
      {social.linkedin && (
        <li>
          <a
            href={social.linkedin}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-current text-sm transition-colors hover:bg-white/10"
            aria-label="LinkedIn"
          >
            {icons.linkedin}
          </a>
        </li>
      )}
      {social.email && (
        <li>
          <a
            href={`mailto:${social.email}`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-current text-sm transition-colors hover:bg-white/10"
            aria-label="Email"
          >
            {icons.email}
          </a>
        </li>
      )}
    </ul>
  );
}
