"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { SiteCopy } from "@/types/content";

const EMAIL_REGEX = /[^\s@]+@[^\s@]+\.[^\s@]+/;

export function ContactForm({ copy }: { copy: SiteCopy["contact"] }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [startTime, setStartTime] = useState(() => Date.now());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const body = String(formData.get("message") ?? "").trim();
    const company = String(formData.get("company") ?? "");

    if (!name || !EMAIL_REGEX.test(email) || body.length < 10) {
      setStatus("error");
      setMessage(copy.error);
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: body,
          company,
          elapsed: Date.now() - startTime,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      form.reset();
      setStatus("success");
      setMessage(copy.success);
      setStartTime(Date.now());
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage(copy.error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor="name">
          {copy.form.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-2xl border border-black/20 bg-white/90 p-4 text-base"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor="email">
          {copy.form.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-2xl border border-black/20 bg-white/90 p-4 text-base"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor="message">
          {copy.form.message}
        </label>
        <textarea
          id="message"
          name="message"
          minLength={10}
          rows={5}
          required
          className="w-full rounded-2xl border border-black/20 bg-white/90 p-4 text-base"
        />
      </div>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} />
      </div>
      <input type="hidden" name="timestamp" value={startTime} />
      <Button type="submit" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "..." : copy.form.cta}
      </Button>
      <p role="status" aria-live="polite" className="text-sm text-black/70">
        {message}
      </p>
    </form>
  );
}
