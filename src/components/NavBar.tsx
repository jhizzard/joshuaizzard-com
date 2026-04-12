"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-sm tracking-tight text-foreground hover:text-foreground/80 transition-colors"
        >
          Joshua Izzard
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href.replace(/\/#.*/, "")) &&
                  link.href !== "/";

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs sm:text-sm px-2 sm:px-3 py-1.5 rounded-md transition-colors font-mono ${
                  isActive
                    ? "text-foreground bg-[var(--jz-surface)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-[var(--jz-surface)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="https://github.com/jhizzard"
            target="_blank"
            rel="noreferrer"
            className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-[var(--jz-surface)] transition-colors font-mono"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
