import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joshua Izzard — Builder",
  description:
    "Joshua Izzard — developer tooling, AI systems, and the boring infrastructure that makes them work.",
  openGraph: {
    title: "Joshua Izzard — Builder",
    description:
      "Developer tooling, AI systems, and the boring infrastructure that makes them work.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua Izzard — Builder",
    description:
      "Developer tooling, AI systems, and the boring infrastructure that makes them work.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-svh flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
