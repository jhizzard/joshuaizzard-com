export default function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="not-prose my-10 border-l-4 border-[var(--jz-accent-blue)] pl-6 py-2">
      <p className="text-xl sm:text-2xl font-semibold leading-snug tracking-tight text-foreground/90 italic">
        {children}
      </p>
    </blockquote>
  );
}
