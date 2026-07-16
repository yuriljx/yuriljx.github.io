import type { Metadata } from "next";
import "./globals.css";

const title = "Jixiao Li | Plant Science & Research Software";
const description = "Jixiao Li's publications, society presentations, patents, crop phenotyping research and research software.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yuriljx.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title,
    description: "Crop phenotyping, breeding, quality analysis and traceable research software.",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
