import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using SaaSForge.",
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <a href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
          back to home
        </a>
        <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-4">Legal</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>

        <div className="space-y-6 text-white/50 text-sm leading-relaxed">
          <p><strong className="text-white/70">Last updated:</strong> July 2026</p>

          <h2 className="text-white/80 text-base font-medium mt-8">1. Acceptance of Terms</h2>
          <p>
            By accessing or using SaaSForge, you agree to be bound by these terms. If you do not agree,
            do not use the service.
          </p>

          <h2 className="text-white/80 text-base font-medium mt-8">2. Description of Service</h2>
          <p>
            SaaSForge generates boilerplate code repositories based on user-selected configurations.
            We deliver the generated code to your GitHub account. The generated code is yours to modify,
            distribute, and deploy as you see fit.
          </p>

          <h2 className="text-white/80 text-base font-medium mt-8">3. User Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and for all activities
            under your account. You agree not to use the service for any unlawful purpose.
          </p>

          <h2 className="text-white/80 text-base font-medium mt-8">4. Intellectual Property</h2>
          <p>
            The generated boilerplate code is owned by you. SaaSForge retains ownership of the generation
            engine, templates, and any proprietary tooling used to create the output.
          </p>

          <h2 className="text-white/80 text-base font-medium mt-8">5. Limitation of Liability</h2>
          <p>
            SaaSForge is provided &quot;as is&quot; without warranty of any kind. We are not liable for any
            damages arising from the use or inability to use the service.
          </p>

          <h2 className="text-white/80 text-base font-medium mt-8">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Users will be notified of material
            changes via email or through the service.
          </p>

          <p className="text-white/30 text-xs pt-6 border-t border-white/10 mt-8">
            This is a template terms document. Replace with your actual legal terms before going live.
          </p>
        </div>
      </div>
    </div>
  );
}
