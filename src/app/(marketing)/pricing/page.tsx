import type { Metadata } from "next";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQ } from "@/components/landing/faq";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start free, scale as you grow. Generate unlimited SaaS boilerplates with our free tier, or go Pro for advanced features and priority support.",
};

export default function PricingPage() {
  return (
    <div className="pt-28 bg-black">
      <PricingSection />
      <FAQ />
    </div>
  );
}
