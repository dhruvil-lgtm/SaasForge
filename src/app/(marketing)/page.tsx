import { CinematicHero } from "@/components/landing/cinematic-hero";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";

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
