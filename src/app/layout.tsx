import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://joshuaizzard.com"
  ),
  title: "Joshua Izzard — Concert pianist. Hedge fund manager. CEO. Developer.",
  description:
    "Building the tools I wished existed. Developer tooling, AI systems, and the boring infrastructure that makes them work.",
  openGraph: {
    title: "Joshua Izzard",
    description:
      "Concert pianist. Hedge fund manager. CEO. Developer. Building the tools I wished existed.",
    type: "website",
    url: "https://joshuaizzard.com",
    siteName: "Joshua Izzard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua Izzard",
    description:
      "Concert pianist. Hedge fund manager. CEO. Developer. Building the tools I wished existed.",
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
