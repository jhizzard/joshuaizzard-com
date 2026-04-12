import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import Callout from "@/components/mdx/Callout";
import PullQuote from "@/components/mdx/PullQuote";
import type { Metadata } from "next";

const mdxComponents = {
  Callout,
  PullQuote,
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getPostBySlug(slug);
    return {
      title: `${frontmatter.title} — Joshua Izzard`,
      description: frontmatter.description,
    };
  } catch {
    return { title: "Post not found — Joshua Izzard" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <main className="flex-1">
      <article className="w-full max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-20 sm:pb-28">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 font-mono"
        >
          &larr; /blog
        </Link>

        {/* Header */}
        <header className="mb-14">
          <div className="font-mono text-xs text-muted-foreground mb-5">
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <h1 className="text-3xl sm:text-[2.5rem] lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15] mb-6">
            {frontmatter.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {frontmatter.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {frontmatter.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="font-mono text-[10px] tracking-wide"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Separator */}
        <hr className="border-border mb-12" />

        {/* MDX content — Medium-style typography */}
        <div
          className={[
            "prose prose-invert prose-lg max-w-none",
            // Headings
            "prose-headings:font-semibold prose-headings:tracking-tight",
            "prose-h2:text-[1.625rem] prose-h2:mt-14 prose-h2:mb-5 prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-3",
            "prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4",
            // Body text — Medium-like: 21px equiv, generous line height
            "prose-p:text-[1.125rem] prose-p:text-foreground/90 prose-p:leading-[1.8] prose-p:mb-7",
            // First paragraph — slightly larger
            "[&>p:first-of-type]:text-[1.25rem] [&>p:first-of-type]:leading-[1.7] [&>p:first-of-type]:text-foreground",
            // Links
            "prose-a:text-[var(--jz-accent-blue)] prose-a:no-underline prose-a:border-b prose-a:border-[var(--jz-accent-blue)]/30 hover:prose-a:border-[var(--jz-accent-blue)]",
            // Strong
            "prose-strong:text-foreground prose-strong:font-semibold",
            // Code inline
            "prose-code:text-[var(--jz-accent-purple)] prose-code:font-mono prose-code:text-[0.875rem]",
            "prose-code:bg-[var(--jz-surface-2)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded",
            "prose-code:before:content-none prose-code:after:content-none",
            // Code blocks
            "prose-pre:bg-[var(--jz-surface)] prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:shadow-lg prose-pre:my-8",
            "prose-pre:text-sm prose-pre:leading-relaxed",
            // Lists
            "prose-li:text-[1.125rem] prose-li:text-foreground/90 prose-li:leading-[1.7] prose-li:mb-2",
            "prose-ul:my-6 prose-ol:my-6",
            // Blockquotes
            "prose-blockquote:border-l-4 prose-blockquote:border-[var(--jz-accent-blue)] prose-blockquote:pl-5",
            "prose-blockquote:text-foreground/70 prose-blockquote:italic prose-blockquote:text-[1.125rem] prose-blockquote:my-8",
            "prose-blockquote:not-italic",
            // HR
            "prose-hr:border-border prose-hr:my-12",
            // Images
            "prose-img:rounded-xl prose-img:shadow-lg prose-img:my-10",
            // Tables — full borders
            "prose-table:text-sm",
            "prose-th:text-left prose-th:font-mono prose-th:text-xs prose-th:uppercase prose-th:tracking-wider prose-th:text-muted-foreground",
            "prose-thead:border-b prose-thead:border-border",
            "prose-tr:border-b prose-tr:border-border/50",
            "[&_table]:block [&_table]:overflow-x-auto [&_table]:whitespace-normal",
            "[&_table]:border [&_table]:border-border [&_table]:rounded-lg",
            "[&_td]:border [&_td]:border-border/40 [&_td]:px-3 [&_td]:py-2.5",
            "[&_th]:border [&_th]:border-border/40 [&_th]:px-3 [&_th]:py-3 [&_th]:bg-[var(--jz-surface)]",
          ].join(" ")}
        >
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-[var(--jz-accent-blue)] hover:underline font-mono"
          >
            &larr; Back to all posts
          </Link>
          <div className="text-xs text-muted-foreground font-mono">
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </article>
    </main>
  );
}
