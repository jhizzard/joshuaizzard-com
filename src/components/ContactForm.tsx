"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-28"
    >
      <div className="max-w-xl">
        <div className="font-mono text-xs tracking-wider text-muted-foreground uppercase mb-3">
          /contact
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-8">
          Get in touch
        </h2>

        {status === "sent" ? (
          <p className="text-sm text-[var(--jz-accent-green)]">
            Message sent. I&apos;ll get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--jz-accent-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--jz-accent-blue)] transition-colors"
                placeholder="Your name"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--jz-accent-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--jz-accent-blue)] transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                maxLength={2000}
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--jz-accent-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--jz-accent-blue)] transition-colors resize-y"
                placeholder="What's on your mind?"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-500">
                Something went wrong, try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="self-start rounded-md bg-foreground text-background px-6 py-2 text-sm font-medium hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
