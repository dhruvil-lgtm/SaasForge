"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Check,
  GitBranch,
  Monitor,
  Server,
  Globe,
  Package,
  ExternalLink,
  Loader2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const frameworks = [
  { id: "nextjs", label: "Next.js", icon: Globe, desc: "React framework with SSR" },
  { id: "express", label: "Express", icon: Server, desc: "Node.js web framework" },
  { id: "fastapi", label: "FastAPI", icon: Server, desc: "Python async framework" },
  { id: "go-templ", label: "Go + Templ", icon: Monitor, desc: "Go web framework" },
  { id: "rails", label: "Ruby on Rails", icon: Package, desc: "Full-stack Ruby" },
  { id: "laravel", label: "Laravel", icon: Package, desc: "PHP framework" },
];

const deployments = [
  { id: "vercel", label: "Vercel", desc: "Best for Next.js" },
  { id: "railway", label: "Railway", desc: "Full-stack hosting" },
  { id: "docker", label: "Docker", desc: "Self-host anywhere" },
];

const steps = ["framework", "config", "deploy", "review"] as const;
type Step = (typeof steps)[number];

export default function GeneratePage() {
  const [step, setStep] = useState<Step>("framework");
  const [framework, setFramework] = useState("");
  const [deployment, setDeployment] = useState("");
  const [ui, setUi] = useState("shadcn");
  const [projectName, setProjectName] = useState("");
  const [repoName, setRepoName] = useState("");
  const [githubToken, setGitHubToken] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<{ repoUrl: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [githubConnected, setGitHubConnected] = useState(false);
  const router = useRouter();

  const stepIndex = steps.indexOf(step);

  const canAdvance = () => {
    switch (step) {
      case "framework": return !!framework;
      case "config": return !!projectName && !!repoName && !!githubConnected;
      case "deploy": return !!deployment && !!ui;
      case "review": return false;
    }
  };

  const advance = () => {
    if (stepIndex < steps.length - 1 && canAdvance()) {
      setStep(steps[stepIndex + 1]);
    }
  };

  const goBack = () => {
    if (stepIndex > 0) setStep(steps[stepIndex - 1]);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          framework, auth: "jwt", database: "supabase",
          ui, deployment, projectName, repoName, githubToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    }
    setGenerating(false);
  };

  const handleGitHubConnect = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { scopes: "repo,user", redirectTo: `${location.origin}/auth/callback` },
    });
    if (data?.url) window.location.href = data.url;
  };

  if (result) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-0 bg-white/[0.02] rounded-3xl blur-3xl" />
          <div className="relative rounded-3xl border border-white/[0.08] bg-neutral-900/60 backdrop-blur p-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.06] mb-6 animate-float">
              <Check className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">It&apos;s alive!</h2>
                  <p className="text-white/50 text-sm mb-6 lowercase">
                    your boilerplate has been pushed to github.
                  </p>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 mb-6">
              <p className="text-xs text-white/40 mb-1 lowercase">repository url</p>
              <a
                href={result.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-white break-all transition-colors"
              >
                {result.repoUrl}
              </a>
            </div>
            <div className="flex gap-3">
              <a
                href={result.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white text-black text-sm rounded-full py-3.5 font-normal hover:bg-neutral-200 transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                open repo <ExternalLink className="h-4 w-4" />
              </a>
              <button
                onClick={() => router.push("/dashboard")}
                className="flex-1 border border-white/20 text-white/70 text-sm rounded-full py-3.5 font-normal hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40" />

      <div className="relative container mx-auto px-4 pt-24 pb-20 max-w-xl">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-white/50 lowercase mb-4">
            4-step wizard
          </span>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Generate your boilerplate
            </h1>
            <p className="mt-3 text-white/40 lowercase">
              pick a framework, we&apos;ll ship the rest.
            </p>
        </div>

        <div className="flex items-center justify-center gap-0 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <button
                onClick={() => i <= stepIndex ? setStep(s) : null}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  i === stepIndex
                    ? "bg-white text-black"
                    : i < stepIndex
                    ? "text-white/50"
                    : "text-white/20"
                } ${i > stepIndex ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <span className={`flex items-center justify-center w-5 h-5 rounded-full text-xs font-medium ${
                  i === stepIndex
                    ? "bg-black/10 text-black"
                    : i < stepIndex
                    ? "bg-white/10 text-white/50"
                    : "bg-white/5 text-white/20"
                }`}>
                  {i < stepIndex ? <Check className="w-3 h-3" /> : i + 1}
                </span>
                <span className="hidden sm:inline lowercase">{s}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`w-8 h-px mx-1 transition-colors duration-300 ${
                  i < stepIndex ? "bg-white/30" : "bg-white/10"
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-white/[0.015] rounded-3xl blur-3xl pointer-events-none" />
          <div className="relative rounded-3xl border border-white/[0.08] bg-neutral-900/50 backdrop-blur p-6 md:p-8">
            {step === "framework" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Choose your framework</h2>
                  <p className="text-sm text-white/40 lowercase">pick the technology stack for your saas.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {frameworks.map((f) => {
                    const Icon = f.icon;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setFramework(f.id)}
                        className={`group relative flex flex-col items-center gap-3 rounded-2xl border p-5 text-center transition-all duration-300 ${
                          framework === f.id
                            ? "border-white/30 bg-white/[0.06] shadow-[0_0_25px_-5px_rgba(255,255,255,0.05)]"
                            : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]"
                        }`}
                      >
                        <Icon className={`h-8 w-8 transition-colors duration-300 ${
                          framework === f.id ? "text-white" : "text-white/40 group-hover:text-white/70"
                        }`} />
                        <div>
                          <p className={`font-medium text-sm transition-colors duration-300 ${
                            framework === f.id ? "text-white" : "text-white/60 group-hover:text-white/80"
                          }`}>{f.label}</p>
                          <p className="text-xs text-white/30 mt-0.5">{f.desc}</p>
                          {f.id === "nextjs" && <p className="text-[10px] text-white/15 mt-1">recommended</p>}
                        </div>
                        {framework === f.id && (
                          <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-white">
                            <Check className="h-3 w-3 text-black" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === "config" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Name it & connect GitHub</h2>
                  <p className="text-sm text-white/40 lowercase">give it a name and link your account.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/50 mb-2 lowercase">project name</label>
                    <input
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="my saas app"
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 mb-2 lowercase">github repo name</label>
                    <input
                      value={repoName}
                      onChange={(e) => setRepoName(e.target.value)}
                      placeholder="my-saas-app"
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-300"
                    />
                    <p className="text-xs text-white/25 mt-1.5 lowercase">the repo will appear at github.com/yourname/{repoName || "..."}.</p>
                  </div>
                  <div className="pt-2">
                    <label className="block text-sm text-white/50 mb-3 lowercase">connect github</label>
                    {!githubConnected ? (
                      <div className="space-y-3">
                        <button
                          onClick={handleGitHubConnect}
                          className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-sm text-white/70 hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300"
                        >
                          <GitBranch className="h-4 w-4" />
                          connect with github oauth
                        </button>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/[0.06]" />
                          </div>
                          <div className="relative flex justify-center">
                            <span className="bg-neutral-900 px-3 text-xs text-white/30 lowercase">or use a token</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <input
                            value={githubToken}
                            onChange={(e) => setGitHubToken(e.target.value)}
                            placeholder="github personal access token"
                            type="password"
                            className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-300"
                          />
                          <button
                            onClick={() => githubToken.trim() && setGitHubConnected(true)}
                            className="rounded-xl border border-white/[0.08] px-4 py-3 text-sm text-white/50 hover:bg-white/[0.06] hover:text-white/70 transition-all duration-300"
                          >
                            connect
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                          <Check className="h-3 w-3 text-white/70" />
                        </span>
                        <span className="text-sm text-white/60 lowercase">github connected</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === "deploy" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Deploy & design</h2>
                  <p className="text-sm text-white/40 lowercase">where it goes, what it looks like.</p>
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-3 lowercase">deployment target</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {deployments.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setDeployment(d.id)}
                        className={`rounded-2xl border p-4 text-center transition-all duration-300 ${
                          deployment === d.id
                            ? "border-white/30 bg-white/[0.06]"
                            : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]"
                        }`}
                      >
                        <p className={`font-medium text-sm transition-colors ${
                          deployment === d.id ? "text-white" : "text-white/60"
                        }`}>{d.label}</p>
                        <p className={`text-xs mt-0.5 transition-colors ${
                          deployment === d.id ? "text-white/40" : "text-white/30"
                        }`}>{d.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-3 lowercase">ui library</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {["shadcn", "tailwind", "minimal"].map((u) => (
                      <button
                        key={u}
                        onClick={() => setUi(u)}
                        className={`rounded-2xl border p-4 text-center transition-all duration-300 ${
                          ui === u
                            ? "border-white/30 bg-white/[0.06]"
                            : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]"
                        }`}
                      >
                        <p className={`font-medium text-sm capitalize transition-colors ${
                          ui === u ? "text-white" : "text-white/60"
                        }`}>
                          {u === "shadcn" ? "shadcn/ui" : u === "tailwind" ? "Tailwind" : "Minimal"}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === "review" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Review & generate</h2>
                  <p className="text-sm text-white/40 lowercase">looks good? we&apos;ll push everything to github.</p>
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] divide-y divide-white/[0.04]">
                  {[
                    { label: "framework", value: framework },
                    { label: "deployment", value: deployment },
                    { label: "ui library", value: ui === "shadcn" ? "shadcn/ui" : ui },
                    { label: "project name", value: projectName },
                    { label: "repository", value: repoName },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-sm text-white/40 lowercase">{item.label}</span>
                      <span className="text-sm text-white/80 capitalize">{item.value}</span>
                    </div>
                  ))}
                </div>
                {error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}
                <button
                  onClick={handleGenerate}
                  disabled={generating || !githubConnected}
                  className="w-full bg-white text-black text-sm rounded-full py-4 font-normal hover:bg-neutral-200 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]"
                >
                  {generating ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> generating...</>
                  ) : (
                    <><GitBranch className="h-4 w-4" /> generate & push to github</>
                  )}
                </button>
              </div>
            )}

            {step !== "review" && (
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/[0.06]">
                <button
                  onClick={goBack}
                  disabled={step === "framework"}
                  className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-4 w-4" /> back
                </button>
                <button
                  onClick={advance}
                  disabled={!canAdvance()}
                  className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
