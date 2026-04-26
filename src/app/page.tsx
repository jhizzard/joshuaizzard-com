import Link from "next/link";
import Image from "next/image";
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
import ContactForm from "@/components/ContactForm";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

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

const flagship: Project[] = [
  {
    title: "TermDeck",
    tagline: "The terminal that remembers what you fixed last month",
    description:
      "Browser-based terminal multiplexer with proactive memory recall. When a panel enters an error state, Flashback queries your persistent developer memory and surfaces similar past fixes as a non-blocking toast. Real PTYs in 7 grid layouts, 8 themes, per-panel metadata overlays, onboarding tour, in-browser setup wizard with Supabase MCP auto-fill, `termdeck doctor` version check, and one-command stack installer (`npx @jhizzard/termdeck-stack`). Part of a three-tier stack \u2014 TermDeck (display) \u2192 Mnestra (memory) \u2192 Rumen (async learning). MIT, vanilla JS client, no build step, one command to install.",
    tech: ["Node.js", "node-pty", "xterm.js", "WebSocket", "SQLite", "MCP"],
    status: "Live \u00b7 v0.6.9",
    statusColor: "green",
    links: [
      { label: "GitHub", href: "https://github.com/jhizzard/termdeck" },
      { label: "npm", href: "https://www.npmjs.com/package/@jhizzard/termdeck" },
      { label: "Docs", href: "https://termdeck-docs.vercel.app" },
    ],
  },
  {
    title: "Mnestra",
    tagline: "Persistent developer memory for Claude Code, Cursor, Windsurf",
    description:
      "MCP server that gives any AI coding tool persistent memory across sessions. Hybrid search with tiered recency decay, three-layer progressive disclosure (index \u2192 timeline \u2192 get), webhook bridge, privacy tags, export/import, auto-read of `~/.termdeck/secrets.env` so Mnestra starts without sourcing first. pgvector + OpenAI embeddings + Supabase. The memory layer behind TermDeck\u2019s Flashback feature \u2014 also works standalone with any MCP client.",
    tech: ["TypeScript", "Supabase", "pgvector", "OpenAI embeddings", "MCP"],
    status: "Live \u00b7 v0.2.2",
    statusColor: "green",
    links: [
      { label: "GitHub", href: "https://github.com/jhizzard/mnestra" },
      { label: "npm", href: "https://www.npmjs.com/package/@jhizzard/mnestra" },
      { label: "Docs", href: "https://termdeck-docs.vercel.app/mnestra/" },
    ],
  },
  {
    title: "Rumen",
    tagline: "The part of your memory that keeps processing after you stop working",
    description:
      "Async learning layer that runs on top of any pgvector memory store. Extract \u2192 Relate \u2192 Synthesize loop: pulls recent memories, finds cross-project patterns, synthesizes insights via Haiku, writes them back. Ships as a Supabase Edge Function on a 15-minute pg_cron schedule. Cost-guarded. Three-pass JSON parser hardens Haiku output, context-size-aware confidence normalization. The LLM is stateless. Rumen isn\u2019t.",
    tech: ["TypeScript", "Supabase Edge Functions", "pg", "pgvector", "Claude Haiku"],
    status: "Live \u00b7 v0.4.3",
    statusColor: "green",
    links: [
      { label: "GitHub", href: "https://github.com/jhizzard/rumen" },
      { label: "npm", href: "https://www.npmjs.com/package/@jhizzard/rumen" },
      { label: "Docs", href: "https://termdeck-docs.vercel.app/rumen/" },
    ],
  },
];

const shipped: Project[] = [
  {
    title: "Maestro",
    tagline:
      "AI-powered event scheduling with constraint satisfaction",
    description:
      "Enterprise scheduling engine for multi-day, multi-venue events. OR-Tools CP-SAT solver handles room conflicts, faculty availability, participant preferences, and practice allocation across 23 constraints with a 100/100 fairness score. 12-step pipeline with real-time SSE streaming, NL-first setup wizard, multi-tenant architecture, Zapier/Make connectors, and 461 tests. 28 frontend routes, zero TypeScript errors.",
    tech: [
      "Next.js 16",
      "Python FastAPI",
      "OR-Tools CP-SAT",
      "SQLModel",
      "PostgreSQL",
      "Claude Haiku",
    ],
    status: "Deployed \u00b7 Private",
    statusColor: "green",
    links: [],
    note: "Private repo",
  },
  {
    title: "Podium",
    tagline:
      "Application intake and review platform for the Nashville International Chopin Piano Competition",
    description:
      "End-to-end pipeline: Wix CMS sync, AI-powered application cleaning (name normalization, repertoire parsing), server-rendered tearsheet PDFs, review catalog with scoring and keyboard navigation, multi-event support. Live in production with real applicants.",
    tech: ["Next.js 16", "Prisma 6", "Supabase", "React-PDF", "Claude AI"],
    status: "Live",
    statusColor: "green",
    links: [
      {
        label: "Live site",
        href: "https://podium.nashvillechopin.org",
      },
    ],
  },
  {
    title: "DOR",
    tagline: "Deterministic Orchestration Router \u2014 LLM gateway in Rust",
    description:
      "Routes AI agent requests across multiple LLM providers with automatic circuit breaker failover. When one provider goes down, traffic cascades to the next healthy provider. Streaming SSE passthrough, per-task routing tiers, health monitoring daemon.",
    tech: ["Rust", "Axum", "Tokio", "DashMap"],
    status: "Built \u00b7 Private",
    statusColor: "blue",
    links: [],
    note: "Private repo",
  },
  {
    title: "Healthcare Marketplace",
    tagline: "Healthcare marketplace with AI-powered price discovery",
    description:
      "Full-stack marketplace where patients find and compare healthcare providers through an AI-driven price discovery mechanism. 194K data points, 12K locations, pgvector-powered service matching, Stripe Connect for provider payouts. Built solo in 6 weeks.",
    tech: [
      "Next.js 16",
      "Supabase",
      "Stripe Connect",
      "Google Maps",
      "pgvector",
    ],
    status: "Shipped \u00b7 Private",
    statusColor: "amber",
    links: [],
    note: "Private",
  },
  {
    title: "iMessage Reader",
    tagline: "Browse and AI-analyze 1.25M+ iMessages in your browser",
    description:
      "Local-only macOS web app that reads Apple\u2019s chat.db directly (read-only VFS), renders conversations with virtual scrolling, and uses Claude for streaming AI analysis with vision support. Google Drive backup with OAuth2 and resumable uploads.",
    tech: ["Python", "FastAPI", "Claude API", "Google Drive API", "vanilla JS"],
    status: "Working MVP \u00b7 Private",
    statusColor: "blue",
    links: [],
    note: "Private repo",
  },
  {
    title: "ClaimGuard AI",
    tagline: "AI-powered detection of customer service claims risk",
    description:
      "Monitors customer service tickets in real-time, classifies severity using multi-tier AI analysis, and flags conversations likely to escalate to claims or legal action. Multi-tenant architecture with per-organization model configuration.",
    tech: ["Next.js", "Prisma", "Supabase", "Gemini AI"],
    status: "In development \u00b7 Private",
    statusColor: "blue",
    links: [],
    note: "Private repo",
  },
  {
    title: "Claude Gmail Extension",
    tagline: "AI-powered email assistant as a Chrome extension",
    description:
      "Chrome extension that integrates Claude AI into Gmail for intelligent email composition, summarization, and response drafting directly in the inbox.",
    tech: ["Chrome Extension API", "Claude API", "TypeScript"],
    status: "Built \u00b7 Private",
    statusColor: "blue",
    links: [],
    note: "Private repo",
  },
  {
    title: "Mail Merge",
    tagline: "Automated personalized email campaigns",
    description:
      "Bulk email tool with template personalization, merge fields, and send scheduling. Handles large recipient lists with rate limiting and delivery tracking.",
    tech: ["TypeScript", "Resend", "React"],
    status: "Built \u00b7 Private",
    statusColor: "blue",
    links: [],
    note: "Private repo",
  },
];

const comingSoon: Project[] = [
  {
    title: "KANLABS",
    tagline: "Interpretable AI using Kolmogorov-Arnold Networks",
    description:
      "Building small language models using KAN architectures that produce interpretable outputs \u2014 including novel solutions to partial differential equations. Applications in quantitative finance, trading models, and scientific computing.",
    tech: ["Python", "PyTorch", "KAN", "PDE solvers"],
    status: "Coming soon",
    statusColor: "purple",
    links: [],
  },
  {
    title: "TenuraML",
    tagline: "Predict subscription lifetime with deep survival analysis",
    description:
      "Deep learning survival framework that predicts when a subscriber will churn, enabling dynamic pricing and retention interventions. Extends the classical survival analysis architecture with novel contributions for subscription economics.",
    tech: ["Python", "PyTorch", "Survival analysis", "Kaplan-Meier"],
    status: "Coming soon",
    statusColor: "purple",
    links: [],
  },
  {
    title: "Capital Structure Arbitrage",
    tagline: "Quantitative models for relative value trading",
    description:
      "Statistical arbitrage models exploiting pricing inefficiencies in a firm\u2019s capital structure \u2014 equity, credit, and derivatives. Connecting the hedge fund experience to modern ML infrastructure.",
    tech: ["Python", "Quantitative finance", "ML"],
    status: "Coming soon",
    statusColor: "purple",
    links: [],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

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

function ProjectCard({ p }: { p: Project }) {
  return (
    <Card className="group flex flex-col border-border bg-card transition-colors duration-150 hover:border-[var(--jz-accent-blue)]">
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
        <CardTitle className="text-xl">{p.title}</CardTitle>
        <CardDescription className="text-foreground/80">
          {p.tagline}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {p.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
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
              {l.label} &rarr;
            </a>
          ))
        ) : (
          <span className="text-sm text-muted-foreground italic">
            {p.note}
          </span>
        )}
      </CardFooter>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <main className="flex-1">
      {/* ==================== Hero ==================== */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-32 pb-20 sm:pb-28">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 h-40 w-40 sm:h-48 sm:w-48 overflow-hidden rounded-full border border-border shadow-md">
            <Image
              src="/joshua-izzard-bw.jpg"
              alt="Joshua Izzard portrait"
              width={384}
              height={384}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight">
            Joshua Izzard
          </h1>
          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-foreground/90 leading-relaxed">
            Concert pianist. Hedge fund manager. CEO. Developer.
          </p>
          <p className="mt-4 max-w-xl text-sm sm:text-base text-muted-foreground">
            Building the tools I wished existed.
          </p>

          {/* Color swatches */}
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
              className={
                buttonVariants({ size: "lg" }) + " h-11 px-6 text-base"
              }
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
              href="#contact"
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      <Separator className="max-w-[1400px] mx-auto" />

      {/* ==================== Tier 1: The Developer Brain ==================== */}
      <section
        id="projects"
        className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-28"
      >
        <div className="mb-12">
          <div className="font-mono text-xs tracking-wider text-muted-foreground uppercase mb-3">
            /open-source
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            The Developer Brain
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Three tools that compose into a persistent memory system for AI
            coding agents. Each stands alone. Together they form the dev brain I
            wished existed.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          {flagship.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </section>

      <Separator className="max-w-[1400px] mx-auto" />

      {/* ==================== Tier 2: Shipped ==================== */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
        <div className="mb-12">
          <div className="font-mono text-xs tracking-wider text-muted-foreground uppercase mb-3">
            /shipped
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Production work
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Many of these internal tools are being abstracted into public-facing
            open source projects or products.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {shipped.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </section>

      <Separator className="max-w-[1400px] mx-auto" />

      {/* ==================== Tier 3: Coming Soon ==================== */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
        <div className="mb-12">
          <div className="font-mono text-xs tracking-wider text-muted-foreground uppercase mb-3">
            /next
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Coming soon
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          {comingSoon.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </section>

      <Separator className="max-w-[1400px] mx-auto" />

      {/* ==================== About ==================== */}
      <section
        id="about"
        className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-28"
      >
        <div className="max-w-3xl">
          <div className="font-mono text-xs tracking-wider text-muted-foreground uppercase mb-3">
            /about
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-8">
            Wyoming &rarr; Moscow &rarr; Chicago &rarr; Silicon Valley.
          </h2>
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-foreground/90">
            <p>
              Born in Wyoming. Studied piano performance at the Moscow State
              Conservatory, then quantitative finance and accounting at Chicago
              Booth. Fifteen years managing investment strategies &mdash;
              Bloomberg terminals, orange on black, six screens deep. Concert
              stages and trading floors demand the same thing: obsessive detail
              and pattern recognition inside complex structures.
            </p>
            <p>
              Now CEO of{" "}
              <a
                href="https://unagiscooters.com"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--jz-accent-blue)] hover:underline"
              >
                Unagi Scooters
              </a>{" "}
              and the{" "}
              <a
                href="https://nashvillechopin.org"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--jz-accent-blue)] hover:underline"
              >
                Nashville International Chopin Piano Competition
              </a>
              . Building developer tooling and AI systems &mdash; the
              infrastructure I wished existed when I started coding.
            </p>
            <p>
              Interested in interpretable AI, persistent memory for LLMs, and
              whether machines can learn the way developers do &mdash; not from
              training data, but from experience.
            </p>
          </div>
        </div>
      </section>

      <Separator className="max-w-[1400px] mx-auto" />

      {/* ==================== Contact ==================== */}
      <ContactForm />

      {/* ==================== Footer ==================== */}
      <footer className="mt-auto border-t border-border">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground font-mono">
            Built with Next.js + Tailwind + shadcn/ui &middot; &copy; 2026
            Joshua Izzard
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
              href="/blog"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Link
              href="#contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
