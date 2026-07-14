import type { Metadata } from "next";
import { CinematicHero } from "@/components/landing/cinematic-hero";
import { Features } from "@/components/landing/features";
import { Mission } from "@/components/landing/mission";
import { Testimonials } from "@/components/landing/testimonials";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";

export const metadata: Metadata = {
  title: "SaaS Boilerplate Generator — Instantly Generate & Deploy",
  description:
    "Generate a production-ready SaaS boilerplate in seconds with SaasForge. Choose from Next.js, Express, FastAPI, Go, Rails, or Laravel and get a GitHub repo with auth, Stripe, Supabase, and CI/CD instantly.",
  openGraph: {
    title: "SaasForge — Instantly Generate SaaS Boilerplates",
    description:
      "Generate a production-ready SaaS boilerplate in seconds. Pick your stack and get a GitHub repo with auth, Stripe payments, Supabase database, and CI/CD pipelines pre-configured.",
  },
};

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <Features />
      <Mission />
      <Testimonials />
      <PricingSection />
      <FAQ />
      <CTA />
    </>
  );
}
