import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Joshua Izzard",
  description:
    "Writing about developer tooling, AI systems, and building software.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="flex-1">
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-32 pb-20 sm:pb-28">
        <div className="mb-12">
          <div className="font-mono text-xs tracking-wider text-muted-foreground uppercase mb-3">
            /blog
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Writing
          </h2>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground text-lg">Coming soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-lg border border-border bg-card p-6 transition-colors duration-150 hover:border-[var(--jz-accent-blue)]"
              >
                <div className="font-mono text-xs text-muted-foreground mb-3">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-2 group-hover:text-[var(--jz-accent-blue)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="font-mono text-[10px] tracking-wide"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
