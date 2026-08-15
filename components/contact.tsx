export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="antialiased bg-signal px-gutter pt-10 pb-16 text-paper max-md:pt-12"
    >
      <p className="mb-[1.65rem] text-[0.75rem] font-extrabold uppercase text-paper">
        Contact
      </p>

      <div className="grid grid-cols-[1.3fr_0.8fr_0.8fr_0.55fr] items-center gap-[clamp(2rem,5vw,5rem)] max-xl:grid-cols-[1.15fr_0.75fr_0.75fr] max-md:grid-cols-1 max-md:gap-10">
        <h2
          id="contact-title"
          className="text-[clamp(2.5rem,2.8vw,3.4rem)] font-bold leading-[1.15] tracking-[-0.055em] max-md:text-[clamp(2.35rem,10vw,3.5rem)]"
        >
          함께 만들 다음 문제를
          <br />
          이야기해 주세요.
        </h2>

        <p className="border-l border-[rgba(245,242,235,0.75)] pl-10 text-[1.0625rem] leading-[1.65] max-md:border-t max-md:border-l-0 max-md:pt-6 max-md:pl-0">
          AI 제품을 만드는 팀과의
          <br />
          대화를 기다립니다.
        </p>

        <a
          href="mailto:yesicankor@gmail.com"
          className="w-max max-w-full border-b border-paper pb-[0.65rem] text-[clamp(1rem,1.55vw,1.45rem)] font-bold focus-visible:outline-paper"
        >
          yesicankor@gmail.com
        </a>

        <a
          href="mailto:yesicankor@gmail.com"
          className="flex w-max max-w-full items-center gap-5 border-b border-paper pb-[0.65rem] text-[clamp(1rem,1.55vw,1.45rem)] font-bold focus-visible:outline-paper max-xl:col-start-3 max-md:col-start-auto"
        >
          면접 제안하기 <span aria-hidden="true" className="text-[1.75em] font-light">→</span>
        </a>
      </div>
    </section>
  )
}
