import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4 text-center"
      style={{ background: "var(--off-white)" }}
    >
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="text-lg text-black/70">This page could not be found.</p>
      <Link href="/" className="text-black underline">
        Go back home
      </Link>
    </div>
  );
}
