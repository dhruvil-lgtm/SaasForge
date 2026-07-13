import type { Metadata } from "next";
import { CinematicHero } from "@/components/landing/cinematic-hero";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";

export const metadata: Metadata = {
  title: "SaaS Boilerplate Generator",
  description:
    "Generate a production-ready SaaS boilerplate in seconds. Pick your stack (Next.js, Express, FastAPI, Go, Rails, Laravel) and get a GitHub repo with auth, database, CI/CD, and payments pre-configured.",
  openGraph: {
    title: "SaaSForge — SaaS Boilerplate Generator",
    description:
      "Generate a production-ready SaaS boilerplate in seconds. Pick your stack and get a GitHub repo with auth, database, CI/CD, and payments.",
  },
};

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <Features />
      <Testimonials />
      <PricingSection />
      <FAQ />
      <CTA />
    </>
  );
}
