import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

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
      <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-32 pb-20 sm:pb-28">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 font-mono"
        >
          &larr; /blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="font-mono text-xs text-muted-foreground mb-4">
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
            {frontmatter.title}
          </h1>
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

        {/* MDX content */}
        <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-[var(--jz-accent-blue)] prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-[var(--jz-accent-purple)] prose-code:font-mono prose-code:text-sm prose-code:bg-[var(--jz-surface-2)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[var(--jz-surface)] prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-li:text-foreground/90 prose-li:leading-relaxed prose-blockquote:border-[var(--jz-accent-blue)] prose-blockquote:text-muted-foreground prose-hr:border-border">
          <MDXRemote source={content} />
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-[var(--jz-accent-blue)] hover:underline font-mono"
          >
            &larr; Back to all posts
          </Link>
        </div>
      </article>
    </main>
  );
}
