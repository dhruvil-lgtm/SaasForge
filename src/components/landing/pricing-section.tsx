import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "try it out",
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
    price: "$19",
    period: "/month",
    description: "for serious builders",
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
    price: "$49",
    period: "/month",
    description: "for teams",
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
    <section id="pricing" className="relative py-20 md:py-32 overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-white/50 lowercase mb-6">
            pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Simple, transparent
          </h2>
          <p className="mt-4 text-lg text-white/40 max-w-xl mx-auto lowercase">
            start free, upgrade when you need more.
          </p>
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
                <h3 className="font-medium text-lg text-white/90">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-white/40">{plan.period}</span>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-white/40 lowercase">{plan.description}</p>
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/55">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20 shrink-0">
                      <Check className="h-3 w-3 text-white/40" />
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
                      : "border border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
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
