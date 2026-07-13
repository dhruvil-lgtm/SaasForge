import Link from "next/link";

const stacks = [
  "Next.js", "Express", "FastAPI", "Go + Templ", "Rails", "Laravel",
];

export function CinematicHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4"
      />
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      <nav className="absolute top-0 left-0 right-0 z-20 px-6 md:px-10 pt-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur rounded-full pl-4 pr-6 py-3"
          >
            <svg viewBox="0 0 256 256" className="h-5 w-5 fill-white">
              <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" />
            </svg>
            <span className="text-white text-sm font-normal tracking-tight">
              saasforge
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-neutral-900/90 backdrop-blur rounded-full px-3 py-2">
            {["platform", "solutions", "company", "support"].map((item) => (
              <Link
                key={item}
                href={item === "platform" ? "/generate" : item === "solutions" ? "/#features" : item === "company" ? "/pricing" : "/docs"}
                className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full"
              >
                {item}
              </Link>
            ))}
          </div>

          <Link
            href="/generate"
            className="bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors"
          >
            get started
          </Link>
        </div>
      </nav>

      <div className="relative h-full w-full">
        <h1 className="hero-title absolute text-white font-medium text-[15vw] md:text-[13vw] left-4 md:left-10 top-[13%] md:top-[18%] lowercase m-0">
          ship
        </h1>
        <h1 className="hero-title absolute text-white font-medium text-[15vw] md:text-[13vw] right-4 md:right-10 top-[30%] md:top-[38%] lowercase m-0">
          your
        </h1>
        <h1 className="hero-title absolute text-white font-medium text-[15vw] md:text-[13vw] left-[12%] md:left-[28%] top-[52%] md:top-[58%] lowercase m-0">
          saas
        </h1>

        <p className="absolute left-4 md:left-10 top-[42%] md:top-[46%] max-w-[160px] md:max-w-[240px] text-[12px] md:text-[15px] leading-snug text-white/90 lowercase">
          generate a production-ready boilerplate with auth, database, and ci/cd in seconds.
        </p>

        <div className="absolute right-4 md:right-24 top-[10%] md:top-[14%]">
          <div className="flex items-center gap-2 md:gap-3 justify-end md:justify-end">
            <span className="text-base md:text-5xl font-medium tracking-tight">
              +65k
            </span>
            <span className="hidden md:block h-px w-24 bg-white/40 rotate-[20deg]" />
          </div>
          <p className="text-[9px] md:text-sm text-white/70 mt-0 md:mt-1 text-right md:text-right lowercase">
            developers served
          </p>
        </div>

        <div className="hidden md:block absolute md:left-20 bottom-24">
          <div className="flex items-center gap-3">
            <span className="text-5xl font-medium tracking-tight">
              +6
            </span>
            <span className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]" />
          </div>
          <p className="text-sm text-white/70 mt-1 lowercase">
            frameworks supported
          </p>
        </div>

        <div className="hidden md:block absolute md:right-20 bottom-20">
          <div className="flex items-center gap-3 justify-end">
            <span className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]" />
            <span className="text-5xl font-medium tracking-tight">
              +300k
            </span>
          </div>
          <p className="text-sm text-white/70 mt-1 text-right lowercase">
            boilerplates generated
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 pb-4 md:pb-8 px-4 z-10">
          <span className="text-[9px] md:text-xs text-white/50 uppercase tracking-wider">supports:</span>
          <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
            {stacks.map((stack) => (
              <span
                key={stack}
                className="inline-flex items-center rounded-full bg-white/10 backdrop-blur px-1.5 py-0.5 md:px-3 md:py-1 text-[9px] md:text-xs font-medium text-white/80"
              >
                {stack}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}
