export function AvatarIllustration({ inverted }: { inverted?: boolean }) {
  const fill = inverted ? "#0b0b0b" : "#ededed";
  const background = inverted ? "url(#avatarLight)" : "url(#avatarDark)";

  return (
    <svg
      className="h-auto w-full max-w-sm rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      viewBox="0 0 320 360"
      aria-label="Minimal portrait illustration"
      role="img"
    >
      <defs>
        <linearGradient id="avatarDark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#0b0b0b" />
        </linearGradient>
        <linearGradient id="avatarLight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fdfdfd" />
          <stop offset="100%" stopColor="#cbcbcb" />
        </linearGradient>
      </defs>
      <rect width="320" height="360" fill={background} rx="26" />
      <g fill={fill} opacity="0.95">
        <circle cx="160" cy="118" r="64" />
        <path d="M48 300Q160 220 272 300v36H48z" />
        <path d="M68 236q92-72 184 0" fillOpacity="0.8" />
      </g>
      <g fill="none" stroke={inverted ? "#ededed" : "#1a1a1a"} strokeOpacity="0.15">
        <circle cx="160" cy="118" r="90" />
        <circle cx="160" cy="118" r="110" />
      </g>
    </svg>
  );
}
