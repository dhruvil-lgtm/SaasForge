import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "see what it's about",
    features: [
      "1 boilerplate generation",
      "All 6 stacks supported",
      "Basic JWT auth",
      "Supabase integration",
      "GitHub delivery",
    ],
    cta: "get started",
    href: "/signup",
  },
  {
    name: "Pro",
    price: "₹999",
    period: "/month",
    description: "for people who ship regularly",
    features: [
      "Unlimited generations",
      "All 6 stacks supported",
      "Stripe payments included",
      "Priority templates",
      "Custom branding",
      "Email support",
    ],
    cta: "subscribe",
    href: "/signup",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "₹2999",
    period: "/month",
    description: "for teams and agencies",
    features: [
      "Everything in Pro",
      "Team workspaces",
      "Custom integrations",
      "Private templates",
      "White-label",
      "Priority support",
      "SLAs",
    ],
    cta: "contact sales",
    href: "#",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-20 md:py-32 overflow-hidden mesh-gradient-5">
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-4">
            pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            Pay for what you need,<br />
            <span className="text-white/40">nothing you don't.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-7 flex flex-col transition-all duration-500 ${
                plan.popular
                  ? "border-white/20 bg-white/[0.04] shadow-[0_0_40px_-10px_rgba(255,255,255,0.08)]"
                  : "border-white/[0.06] bg-neutral-900/30 hover:border-white/[0.12] hover:bg-neutral-900/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center rounded-full bg-white px-4 py-1 text-xs font-medium text-black">
                    most popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-medium text-base text-white/50">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white tracking-tight">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-white/30">{plan.period}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-white/40">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/55">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/15 shrink-0">
                      <Check className={`h-3 w-3 ${
                        plan.popular ? "text-white/60" : "text-white/40"
                      }`} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={plan.href}>
                <button
                  className={`w-full text-sm rounded-full py-3.5 font-normal transition-all duration-300 ${
                    plan.popular
                      ? "bg-white text-black hover:bg-neutral-200"
                      : "border border-white/20 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {plan.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
