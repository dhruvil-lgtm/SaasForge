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
  title: "SaaSForge — SaaS Boilerplate Generator",
  description:
    "Generate a complete, production-ready SaaS starter in seconds. Pick your stack, get a GitHub repo with auth, database, payments, and CI/CD.",
  verification: {
    google: "iW2FuoExxutmdaSY1w8w1BzX6eyTjd8DG5tr4NEBIds",
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
