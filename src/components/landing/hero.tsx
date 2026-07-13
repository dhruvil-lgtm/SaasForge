import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, GitBranch, Sparkles } from "lucide-react";

const stacks = [
  "Next.js", "Express", "FastAPI", "Go + Templ", "Rails", "Laravel",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent" />
      <div className="container mx-auto px-4 text-center relative">
        <div className="inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm mb-8">
          <Sparkles className="h-4 w-4 text-orange-500" />
          <span>Launch your SaaS startup in minutes, not months</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
          Ship your SaaS idea with a{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            production-ready boilerplate
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose your stack, pick your features, and get a complete GitHub repo with auth, database, payments, and CI/CD included.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/generate">
            <Button size="lg" className="text-base gap-2">
              Generate Your SaaS <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/docs">
            <Button variant="outline" size="lg" className="text-base gap-2">
              <GitBranch className="h-4 w-4" />
              View Examples
            </Button>
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-muted-foreground">Supports:</span>
          {stacks.map((stack) => (
            <span
              key={stack}
              className="inline-flex items-center rounded-md border bg-background px-3 py-1 text-sm font-medium"
            >
              {stack}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
