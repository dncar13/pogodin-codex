export function Footer({ siteName, email }: { siteName: string; email: string }) {
  return (
    <footer className="mt-16 border-t border-black/10 bg-white/80">
      <div className="page-shell flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-black/70">
        <span>© {new Date().getFullYear()} {siteName}</span>
        <a href={`mailto:${email}`} className="underline">
          {email}
        </a>
      </div>
    </footer>
  );
}
