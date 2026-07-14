export function Mission() {
  return (
    <section className="relative min-h-screen w-full mesh-gradient-2 flex flex-col z-10 overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/20 via-transparent to-neutral-900/20 pointer-events-none" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-white/[0.015] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-white/[0.04] via-white/[0.01] to-transparent rounded-full blur-[80px] pointer-events-none" />

      <div className="flex-1 flex flex-col items-center w-full pt-[100px] md:pt-[400px]">
        <div className="flex flex-col items-center w-full px-8 text-center z-20 relative max-w-[900px] h-auto md:h-[620px] mx-auto">
          <svg
            width="80"
            height="80"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-12"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M60 120C26.8629 120 0 93.1371 0 60V0C22.5654 0 42.2213 12.4569 52.4662 30.8691C38.4788 34.2089 28.0787 46.7902 28.0787 61.8006V63.1443C28.0787 79.9648 41.7146 93.6006 58.5353 93.6006H59.8789L59.8785 61.8006C59.8785 79.3633 74.1159 93.6006 91.6787 93.6006L91.6787 61.8006C91.6787 44.2783 77.5071 30.0661 60 30.0008L60 0H62.5352C94.2722 0 120 25.7279 120 57.4648V60C120 93.1371 93.1371 120 60 120Z"
              fill="white"
            />
          </svg>

          <p className="text-white/60 text-[14px] md:text-[16px] h-auto min-h-[80px] md:h-[100px] w-full max-w-[400px] leading-[1.6] mb-[40px] uppercase tracking-wider mx-auto">
            We built this because we got tired of setting up the same auth, same Stripe, same database every time we wanted to ship something new.
          </p>

          <div className="font-marck text-white/80 text-[60px] md:text-[120px] leading-none mb-[32px]">
            S.P.D
          </div>

          <div className="text-white/50 leading-[1.6] mb-[60px] md:mb-24 w-full flex flex-col items-center font-light">
            <p className="mb-[24px] text-[13px] md:text-[16px] w-full max-w-[400px] text-center">
              Every boilerplate project starts the same way: install next.js, set up tailwind, wire up supabase, add stripe, write dockerfiles. None of that is product work.
            </p>
            <p className="text-[13px] md:text-[16px] w-full max-w-[400px] text-center">
              So we automated it. You pick your stack, we generate the repo, you build on top of it. The boilerplate is the starting line, not the race.
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full shrink-0">
        <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
        <video autoPlay loop muted playsInline className="w-full h-auto block object-contain opacity-70">
          <source
            src="https://res.cloudinary.com/daklr2whx/video/upload/v1778602552/track-video_2_s9lp53.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  );
}
