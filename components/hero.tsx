import { Button } from "@/components/ui/button";

/* Overrides shadcn's cva defaults (rounded, sizing, focus ring, active nudge) to match the
   original `.button` rules. The arbitrary `outline` shorthand is deliberate: the cva base sets
   `outline-none`, which pins `--tw-outline-style: none`, so `focus-visible:outline-3` alone would
   resolve to `outline-style: none` and kill the global `:focus-visible` ring. */
const cta =
  "h-auto min-h-[4.15rem] min-w-60 shrink justify-between rounded-none border px-8 text-[1.08rem] font-bold transition-[color,background-color] duration-[160ms] ease-[ease] active:not-aria-[haspopup]:translate-y-0 focus-visible:ring-0 focus-visible:outline-offset-4 focus-visible:[outline:3px_solid_var(--color-ink)] max-xl:min-w-0 max-xl:flex-1 max-xl:px-4 max-md:w-full max-md:min-w-0";

const arrow = "text-[1.75em] font-light";

export default function Hero() {
  return (
    <section
      className="grid min-h-[calc(100vh-5.5rem)] grid-cols-[minmax(0,1.08fr)_minmax(28rem,0.92fr)] items-center gap-[clamp(2rem,5vw,6rem)] px-gutter pt-[clamp(4rem,8vh,7rem)] pb-[clamp(3rem,7vh,5rem)] max-xl:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] max-md:min-h-0 max-md:grid-cols-[minmax(0,1fr)] max-md:pt-14"
      aria-labelledby="hero-title"
    >
      <div>
        <h1
          id="hero-title"
          className="max-w-[52rem] text-[clamp(4.5rem,6.3vw,7.5rem)] leading-[0.98] font-extrabold tracking-[-0.075em] max-md:text-[clamp(3.55rem,16vw,5.5rem)] max-xs:text-[13.2vw]"
        >
          AI를 실제<br />제품으로 만드는<br />개발자
        </h1>
        <p className="mt-[clamp(2.25rem,4vw,3.5rem)] text-[clamp(1.05rem,1.35vw,1.3rem)] leading-[1.7] tracking-[-0.025em]">
          모델의 가능성을 사용자 가치로 연결합니다. <br className="max-md:hidden" />
          데이터부터 배포까지, 작동하는 AI 제품을 설계하고 만듭니다.
        </p>
        <div className="mt-9 flex gap-5 max-md:flex-col">
          <Button
            asChild
            className={`${cta} border-signal bg-signal text-paper hover:bg-signal-dark focus-visible:border-signal`}
          >
            <a href="mailto:hello@doyoon.dev">면접 제안하기 <span aria-hidden="true" className={arrow}>→</span></a>
          </Button>
          <Button
            asChild
            variant="outline"
            className={`${cta} border-ink bg-transparent text-ink hover:bg-ink hover:text-paper focus-visible:border-ink`}
          >
            <a href="#work">프로젝트 보기 <span aria-hidden="true" className={arrow}>→</span></a>
          </Button>
        </div>
        <p className="mt-9 max-w-[48rem] border-t border-line pt-[1.15rem] text-base max-md:leading-[1.6]">
          LLM · RAG · MLOps · Product Engineering
        </p>
      </div>

      <div
        aria-hidden="true"
        className="relative aspect-[0.94] min-h-[34rem] w-full font-mono text-[clamp(0.57rem,0.76vw,0.78rem)] max-xl:min-h-0 max-md:max-h-[28rem] max-md:min-h-[22rem]"
      >
        {/* .hero-visual::before — centre rule */}
        <div className="absolute top-[1%] bottom-0 left-[51%] w-px bg-line" />

        <div className="absolute top-[20%] left-[2%] flex flex-col gap-[0.65em] leading-[1.2] max-md:left-0">
          <span><b className="font-semibold text-signal">def</b> build_ai_product():</span>
          <span>&nbsp;&nbsp;data = collect()</span>
          <span>&nbsp;&nbsp;model = train(data)</span>
          <span>&nbsp;&nbsp;index = embed(model)</span>
          <span>&nbsp;&nbsp;result = retrieve(index)</span>
          <span>&nbsp;&nbsp;answer = generate(model, result)</span>
          <span>&nbsp;&nbsp;<b className="font-semibold text-signal">return</b> answer</span>
        </div>

        <div className="absolute top-[4%] left-[18%] h-[23%] w-[57%]">
          <div className="absolute top-1/2 left-0 h-px w-full bg-line" />
          <div className="absolute top-0 left-1/2 h-full w-px bg-line" />
          <i className="absolute top-[calc(50%-0.275rem)] left-[calc(50%-0.275rem)] h-[0.55rem] w-[0.55rem] bg-ink" />
        </div>

        <div className="absolute top-[15%] left-[43%] h-[17%] w-[15%] bg-signal" />

        <div className="absolute top-[21%] right-[1%] text-right leading-[2.4] max-md:hidden">
          01<br />02<br />03<br />04<br />05<br />06<br /><br />07<br />08<br />09
        </div>

        <div className="absolute bottom-[17%] left-0 flex flex-col gap-[0.65em] leading-[1.2] max-md:hidden">
          <span><b className="font-semibold text-signal">for</b> user <b className="font-semibold text-signal">in</b> users:</span>
          <span>&nbsp;&nbsp;value = ai(user.input)</span>
          <span>&nbsp;&nbsp;deliver(value)<i className="ml-[0.25em] inline-block h-[1.2em] w-[0.55em] bg-signal align-middle" /></span>
        </div>

        <div className="dot-grid absolute bottom-[13%] left-[32%] h-[24%] w-[27%]" />

        <div className="absolute right-0 bottom-[9%] h-[38%] w-[52%]">
          <div className="absolute top-1/2 left-0 h-px w-full bg-line" />
          <div className="absolute top-0 left-1/2 h-full w-px bg-line" />
          <i className="absolute top-[calc(50%-0.275rem)] left-[calc(20%-0.275rem)] h-[0.55rem] w-[0.55rem] bg-ink" />
        </div>

        <div className="absolute right-[18%] bottom-[15%] aspect-square w-[25%] rounded-tr-full border-t border-r border-line" />

        <div className="absolute right-[18%] bottom-[9%] h-[5%] w-[30%] bg-signal" />
      </div>
    </section>
  );
}
