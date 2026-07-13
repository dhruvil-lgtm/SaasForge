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
    <div className="pt-24 bg-black">
      <div className="text-center mb-16 px-4">
        <h1 className="text-4xl font-bold tracking-tight text-white">Pricing</h1>
        <p className="mt-4 text-lg text-white/50 lowercase">
          start free, scale as you grow.
        </p>
      </div>
      <PricingSection />
      <FAQ />
    </div>
  );
}
