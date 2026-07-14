import type { Metadata } from "next";
import { Geist, Geist_Mono, Readex_Pro } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const readexPro = Readex_Pro({
  variable: "--font-readex-pro",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "SaasForge — Instantly Generate SaaS Boilerplates with Auth, CI/CD & Payments",
    template: "%s | SaasForge",
  },
  description:
    "Generate a production-ready SaaS boilerplate in seconds with SaasForge. Pick from Next.js, Express, FastAPI, Go, Rails, or Laravel. Get a GitHub repo with auth, Stripe payments, Supabase database, and CI/CD pipelines pre-configured — no setup required.",
  keywords: [
    "SaaS boilerplate generator",
    "SaaS starter kit",
    "Next.js SaaS boilerplate",
    "boilerplate generator",
    "production-ready SaaS",
    "startup boilerplate",
    "web app generator",
    "SaaS template",
    "auth database CI/CD",
    "Supabase boilerplate",
    "Stripe SaaS starter",
    "SaasForge",
  ],
  authors: [{ name: "Dhruvil Shah" }],
  creator: "Dhruvil Shah",
  publisher: "Dhruvil Shah",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saas-boilerplate-generator.vercel.app",
    siteName: "SaaSForge",
    title: "SaaSForge — SaaS Boilerplate Generator",
    description:
      "Generate a production-ready SaaS boilerplate in seconds. Pick your stack and get a GitHub repo with auth, database, CI/CD, and payments.",
    images: [
      {
        url: "https://saas-boilerplate-generator.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "SaaSForge — SaaS Boilerplate Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaSForge — SaaS Boilerplate Generator",
    description:
      "Generate a production-ready SaaS boilerplate in seconds. Pick your stack and get a GitHub repo with auth, database, CI/CD, and payments.",
    images: ["https://saas-boilerplate-generator.vercel.app/og-image.png"],
    creator: "@dhruvilshah",
  },
  alternates: {
    canonical: "https://saas-boilerplate-generator.vercel.app",
  },
  verification: {
    google: "iW2FuoExxutmdaSY1w8w1BzX6eyTjd8DG5tr4NEBIds",
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SaaSForge",
  url: "https://saas-boilerplate-generator.vercel.app",
  description:
    "Generate a production-ready SaaS boilerplate in seconds. Pick your stack and get a GitHub repo with auth, database, CI/CD, and payments pre-configured.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
  author: {
    "@type": "Person",
    name: "Dhruvil Shah",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${readexPro.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <div className="fixed bottom-4 right-4 z-50">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-neutral-900/80 backdrop-blur px-3.5 py-1.5 text-[11px] text-white/40 lowercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            made by dhruvil shah
          </span>
        </div>
      </body>
    </html>
  );
}
