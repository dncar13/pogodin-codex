import { NextResponse } from "next/server";

const EMAIL_REGEX = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const MIN_ELAPSED_MS = 1200;

export async function POST(request: Request) {
  const data = await request.json();
  const { name, email, message, company, elapsed } = data ?? {};

  if (company) {
    return NextResponse.json({ error: "blocked" }, { status: 422 });
  }

  if (!name || !EMAIL_REGEX.test(email ?? "") || (message ?? "").length < 10) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  if (typeof elapsed !== "number" || elapsed < MIN_ELAPSED_MS) {
    return NextResponse.json({ error: "too_fast" }, { status: 400 });
  }

  console.info("Contact request", { name, email });

  return NextResponse.json({ ok: true });
}
