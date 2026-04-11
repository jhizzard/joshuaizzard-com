import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Project = {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  status: string;
  statusColor: "green" | "blue" | "amber" | "purple";
  links: { label: string; href: string }[];
  note?: string;
};

const projects: Project[] = [
  {
    title: "TermDeck",
    tagline: "Browser-based terminal multiplexer with AI agent awareness",
    description:
      "tmux in your browser, but it knows what your AI agents are doing. Real PTYs in 6 grid layouts, per-terminal theming, output analyzer that detects Claude Code / Gemini CLI / Python servers, status dots that tell you what each terminal is doing at a glance. MIT, vanilla JS client, no build step.",
    tech: ["Node.js", "node-pty", "xterm.js", "WebSocket", "SQLite"],
    status: "Live · v0.1.1",
    statusColor: "green",
    links: [{ label: "GitHub", href: "https://github.com/jhizzard/termdeck" }],
  },
  {
    title: "Engram",
    tagline: "Developer brain — persistent memory for AI coding sessions",
    description:
      "A Supabase-backed memory layer that records every Claude Code session, command, and decision across all my projects. Hybrid search (keyword + semantic + recency boost) over ~1,000 production memories. Powers TermDeck's upcoming Rumen async learning layer.",
    tech: ["TypeScript", "Supabase", "pgvector", "OpenAI embeddings", "MCP"],
    status: "Production · internal",
    statusColor: "blue",
    links: [],
    note: "Open-sourcing soon",
  },
  {
    title: "PetVetBid",
    tagline: "Real-time veterinary care marketplace",
    description:
      "Full-stack marketplace where pet owners get bids from vets in their area. 194K prices, 12K locations, Stripe Connect, AI-powered service matching. Built in 6 weeks as a solo developer.",
    tech: ["Next.js 16", "Supabase", "Stripe Connect", "Google Maps", "pgvector"],
    status: "Demo live",
    statusColor: "amber",
    links: [{ label: "Live demo", href: "https://pvb-one.vercel.app" }],
  },
];

const statusDotColor: Record<Project["statusColor"], string> = {
  green: "bg-jz-accent-green",
  blue: "bg-jz-accent-blue",
  amber: "bg-jz-accent-amber",
  purple: "bg-jz-accent-purple",
};

const swatches = [
  { color: "bg-jz-accent-blue", label: "Blue" },
  { color: "bg-jz-accent-green", label: "Green" },
  { color: "bg-jz-accent-purple", label: "Purple" },
  { color: "bg-jz-accent-amber", label: "Amber" },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-32 pb-20 sm:pb-28">
        <div className="flex flex-col items-center text-center">
          <div className="font-mono text-xs tracking-wider text-muted-foreground uppercase mb-6">
            joshuaizzard.dev
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight">
            Joshua Izzard
          </h1>
          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-foreground/90 leading-relaxed">
            Builder. Developer tooling, AI systems, and the boring
            infrastructure that makes them work.
          </p>
          <p className="mt-4 max-w-xl text-sm sm:text-base text-muted-foreground">
            Hedge fund manager turned developer. I build the tools I wished
            existed.
          </p>

          {/* Color swatches — TermDeck signature */}
          <div
            className="mt-8 flex items-center gap-2"
            aria-label="Color signature"
          >
            {swatches.map((s) => (
              <span
                key={s.label}
                className={`${s.color} h-2.5 w-2.5 rounded-full`}
                title={s.label}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
            <a
              className={buttonVariants({ size: "lg" }) + " h-11 px-6 text-base"}
              href="https://github.com/jhizzard"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
            </a>
            <a
              className={
                buttonVariants({ variant: "outline", size: "lg" }) +
                " h-11 px-6 text-base"
              }
              href="mailto:jhizzard@gmail.com"
            >
              Email me
            </a>
          </div>
        </div>
      </section>

      <Separator className="max-w-[1400px] mx-auto" />

      {/* Projects */}
      <section
        id="projects"
        className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-28"
      >
        <div className="mb-12">
          <div className="font-mono text-xs tracking-wider text-muted-foreground uppercase mb-3">
            /projects
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Things I&apos;m building
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          {projects.map((p) => (
            <Card
              key={p.title}
              className="group flex flex-col border-border bg-card transition-colors duration-150 hover:border-[var(--jz-accent-blue)]"
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`h-2 w-2 rounded-full ${statusDotColor[p.statusColor]}`}
                    aria-hidden
                  />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {p.status}
                  </span>
                </div>
                <CardTitle className="text-2xl">{p.title}</CardTitle>
                <CardDescription className="text-foreground/80">
                  {p.tagline}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="font-mono text-[10px] tracking-wide"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-4">
                {p.links.length > 0 ? (
                  p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-[var(--jz-accent-blue)] hover:underline"
                    >
                      {l.label} →
                    </a>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground italic">
                    {p.note}
                  </span>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="max-w-[1400px] mx-auto" />

      {/* About */}
      <section
        id="about"
        className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-28"
      >
        <div className="max-w-3xl">
          <div className="font-mono text-xs tracking-wider text-muted-foreground uppercase mb-3">
            /about
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-8">
            Finance → software.
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
            Fifteen years managing investment strategies in Nashville, formative
            years staring at Bloomberg terminals (orange on black). Left finance
            to build software, primarily developer tooling and AI systems. I run
            multiple AI coding agents simultaneously and build the infrastructure
            they need to work well together. Currently focused on the
            intersection of agent workflows, persistent memory, and the boring
            plumbing nobody wants to write.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground font-mono">
            Built with Next.js + Tailwind + shadcn/ui · © 2026 Joshua Izzard
          </div>
          <nav className="flex items-center gap-5 text-sm">
            <Link
              href="https://github.com/jhizzard"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="mailto:jhizzard@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Email
            </Link>
            <Link
              href="https://x.com/jhizzard"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              X
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
