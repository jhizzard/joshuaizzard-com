type CalloutVariant = "info" | "warning" | "tip" | "insight";

const styles: Record<CalloutVariant, { border: string; bg: string; icon: string }> = {
  info: {
    border: "border-l-[var(--jz-accent-blue)]",
    bg: "bg-[var(--jz-accent-blue)]/5",
    icon: "\u2139\uFE0F",
  },
  warning: {
    border: "border-l-[var(--jz-accent-amber)]",
    bg: "bg-[var(--jz-accent-amber)]/5",
    icon: "\u26A0\uFE0F",
  },
  tip: {
    border: "border-l-[var(--jz-accent-green)]",
    bg: "bg-[var(--jz-accent-green)]/5",
    icon: "\uD83D\uDCA1",
  },
  insight: {
    border: "border-l-[var(--jz-accent-purple)]",
    bg: "bg-[var(--jz-accent-purple)]/5",
    icon: "\uD83E\uDDE0",
  },
};

export default function Callout({
  variant = "info",
  children,
}: {
  variant?: CalloutVariant;
  children: React.ReactNode;
}) {
  const s = styles[variant];
  return (
    <aside
      className={`not-prose my-8 border-l-4 ${s.border} ${s.bg} rounded-r-lg px-5 py-4`}
    >
      <div className="flex gap-3 items-start">
        <span className="text-lg shrink-0 mt-0.5">{s.icon}</span>
        <div className="text-sm sm:text-base leading-relaxed text-foreground/90 [&>p]:mb-2 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </aside>
  );
}
