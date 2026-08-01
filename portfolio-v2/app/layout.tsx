import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohit Agarwal — Business × Tech",
  description:
    "Portfolio of Mohit Agarwal (18) — B.Tech IT student, aspiring entrepreneur at the intersection of business and technology.",
  keywords: [
    "Mohit Agarwal",
    "portfolio",
    "B.Tech IT",
    "entrepreneur",
    "strategy consulting",
    "fintech",
  ],
  authors: [{ name: "Mohit Agarwal" }],
  openGraph: {
    title: "Mohit Agarwal — Business × Tech",
    description: "B.Tech IT student. Aspiring entrepreneur.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
