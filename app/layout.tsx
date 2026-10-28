import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Jixiao Li, PhD | Plant Breeding & Non-destructive Phenotyping";
const description =
  "Jixiao Li (李继潇) — postdoctoral researcher at the Experimental Farm, Field Science Center for Northern Biosphere, Hokkaido University. Non-destructive phenotyping, rice anther culture, ploidy and fruit quality, and open research software.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yuriljx.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  authors: [{ name: "Jixiao Li", url: siteUrl }],
  keywords: ["Jixiao Li", "李继潇", "李継瀟", "plant breeding", "phenotyping", "rice anther culture", "haskap", "Hokkaido University"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title,
    description: "Evaluating breeding materials earlier and more objectively — image analysis, time-series modelling and chemical profiling.",
    type: "profile",
    url: "/",
    siteName: "Jixiao Li",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Jixiao Li — plant breeding and non-destructive phenotyping" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#060f18" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jixiao Li",
  alternateName: ["李继潇", "李継瀟"],
  honorificSuffix: "PhD",
  jobTitle: "Postdoctoral Researcher",
  url: siteUrl,
  email: "mailto:lijixiao327@gmail.com",
  affiliation: {
    "@type": "Organization",
    name: "Experimental Farm, Field Science Center for Northern Biosphere, Hokkaido University",
    parentOrganization: { "@type": "CollegeOrUniversity", name: "Hokkaido University" },
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Hokkaido University" },
    { "@type": "CollegeOrUniversity", name: "University of Denver" },
    { "@type": "CollegeOrUniversity", name: "Winona State University" },
    { "@type": "CollegeOrUniversity", name: "City College of Hebei University of Technology" },
  ],
  knowsAbout: ["Plant breeding", "Plant phenotyping", "Rice anther culture", "Doubled haploids", "Polyploidy", "Computer vision", "GC–MS", "Genomic prediction"],
  sameAs: [
    "https://orcid.org/0000-0003-2377-1011",
    "https://scholar.google.com/citations?user=m2FLOrUAAAAJ",
    "https://github.com/yuriljx",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="image" href="/research/anther-culture.webp" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("jixiao-theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
