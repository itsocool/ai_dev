const capabilities = [
  { no: "01", title: "Applied AI", body: "LLM · RAG 설계와 평가" },
  { no: "02", title: "Product Engineering", body: "API부터 관측 가능한 배포까지" },
  { no: "03", title: "Collaboration", body: "복잡한 기술을 명확한 결정으로" },
]

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="px-gutter py-[clamp(5rem,8vw,8rem)] pb-[clamp(4rem,7vw,7rem)]"
    >
      <div className="grid grid-cols-[1.35fr_0.65fr] gap-20 max-md:grid-cols-1 max-md:gap-12">
        <div>
          <p className="mb-[1.65rem] text-[0.75rem] font-extrabold uppercase text-signal">
            About
          </p>
          <h2
            id="about-title"
            className="text-[clamp(3.5rem,4.5vw,5rem)] font-bold leading-[1.08] tracking-[-0.065em] max-md:text-[clamp(3rem,13vw,4.75rem)]"
          >
            좋은 AI는
            <br />
            모델 밖에서 완성됩니다.
          </h2>
          <p className="mt-10 text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.65] max-md:[&_br]:hidden">
            정확한 문제 정의, 신뢰할 수 있는 데이터, 빠른 실험, 안정적인 운영까지 <br />
            함께 설계합니다. 기술을 설명하는 데서 멈추지 않고 <br />
            팀이 사용할 수 있는 제품으로 만듭니다.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="relative h-60 w-88 self-start justify-self-end border-b border-l border-line max-md:h-24 max-md:w-[60%]"
        >
          <div className="absolute -bottom-[0.275rem] -left-[0.275rem] h-[0.55rem] w-[0.55rem] bg-ink" />
        </div>
      </div>

      <ol className="mt-10 grid grid-cols-3 border-y border-line py-11 max-md:grid-cols-1 max-md:p-0">
        {capabilities.map((item, i) => (
          <li
            key={item.no}
            className={
              "grid min-h-17 grid-cols-[4.25rem_1fr] pr-8 max-xl:grid-cols-[3rem_minmax(0,1fr)] max-xl:pr-4 max-md:min-h-28 max-md:py-7 max-md:pr-0" +
              (i > 0
                ? " pl-8 max-xl:pl-4 max-md:border-t max-md:border-line max-md:pl-0"
                : "")
            }
          >
            <span className="text-[1.4375rem]">{item.no}</span>
            <div className="border-l border-line pl-10 max-xl:pl-4">
              <h3 className="text-[1.0625rem] font-bold">{item.title}</h3>
              <p className="mt-[0.9rem] text-[0.875rem]">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
