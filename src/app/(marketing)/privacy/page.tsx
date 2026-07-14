import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our privacy policy outlines how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <a href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
          back to home
        </a>
        <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-4">Legal</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-white/50 text-sm leading-relaxed">
          <p><strong className="text-white/70">Last updated:</strong> July 2026</p>

          <h2 className="text-white/80 text-base font-medium mt-8">1. Information We Collect</h2>
          <p>
            We collect information you provide when creating an account, generating a boilerplate, or contacting us.
            This includes your name, email address, and GitHub username. We also collect usage data such as pages
            visited and features used to improve our service.
          </p>

          <h2 className="text-white/80 text-base font-medium mt-8">2. How We Use Your Information</h2>
          <p>
            Your information is used to provide and maintain our service, notify you about changes, and provide
            customer support. We do not sell your personal data to third parties.
          </p>

          <h2 className="text-white/80 text-base font-medium mt-8">3. Data Storage</h2>
          <p>
            Your data is stored securely using industry-standard encryption. We retain your data for as long as
            your account is active or as needed to provide you services.
          </p>

          <h2 className="text-white/80 text-base font-medium mt-8">4. Third-Party Services</h2>
          <p>
            We use GitHub for repository creation, Supabase for authentication and database, and Stripe for
            payment processing. Each service has its own privacy policy governing data handling.
          </p>

          <h2 className="text-white/80 text-base font-medium mt-8">5. Your Rights</h2>
          <p>
            You can request access, correction, or deletion of your personal data at any time by contacting us.
            You may also export your data through your account settings.
          </p>

          <h2 className="text-white/80 text-base font-medium mt-8">6. Contact</h2>
          <p>
            For privacy-related inquiries, contact us at{" "}
            <a href="mailto:privacy@saasforge.dev" className="text-white/70 hover:text-white transition-colors">
              privacy@saasforge.dev
            </a>.
          </p>

          <p className="text-white/30 text-xs pt-6 border-t border-white/10 mt-8">
            This is a template policy. Replace with your actual legal terms before going live.
          </p>
        </div>
      </div>
    </div>
  );
}
