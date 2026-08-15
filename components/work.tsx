// Right-hand decorative marks: [outer border/fill classes, inner ::after replacement].
const MARKS = {
  block: [
    "border-b border-l border-line",
    "right-0 bottom-0 h-[72%] w-[58%]",
  ],
  arc: [
    "rounded-tr-full border-t border-r border-line",
    "-top-[0.3rem] -right-[0.3rem] h-[0.6rem] w-[0.6rem]",
  ],
  dots: [
    "dot-grid border-b border-line",
    "right-0 bottom-0 h-[1.65rem] w-full",
  ],
} as const;

const STAT = "not-italic text-[1.45em]";
// Third project's stat is a range, so it keeps body size and stays on one line.
const STAT_WIDE = "not-italic text-[1em] whitespace-nowrap max-xl:whitespace-normal";

const PROJECTS = [
  {
    number: "01",
    title: ["사내 지식 검색을 바꾼", "RAG Assistant"],
    summary: "검색 실패율을 낮추고 답변 근거를 투명하게 만든 검색 경험",
    meta: [
      ["Role", "AI Engineer · Product Owner"],
      ["Stack", "Python · FastAPI · OpenAI · Qdrant"],
    ],
    outcome: { lead: "검색 성공률", stat: "34%", tail: " 향상", statClass: STAT },
    mark: MARKS.block,
  },
  {
    number: "02",
    title: ["상담 품질을 높인", "Conversation Copilot"],
    summary: "실시간 추천과 요약으로 상담원의 판단을 돕는 AI 도구",
    meta: [
      ["Role", "ML Engineer"],
      ["Stack", "TypeScript · LangGraph · PostgreSQL"],
    ],
    outcome: { lead: "후처리 시간", stat: "41%", tail: " 단축", statClass: STAT },
    mark: MARKS.arc,
  },
  {
    number: "03",
    title: ["모델 운영을 단순화한", "Evaluation Pipeline"],
    summary: "프롬프트와 모델 변경을 같은 기준으로 비교하는 자동 평가 시스템",
    meta: [
      ["Role", "AI Platform Engineer"],
      ["Stack", "Python · Docker · GitHub Actions"],
    ],
    outcome: { lead: "배포 검증", stat: "3시간→18분", tail: "", statClass: STAT_WIDE },
    mark: MARKS.dots,
  },
];

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-section px-gutter">
      <div className="relative grid grid-cols-[1.3fr_0.7fr] items-center pb-[4.5rem] max-md:grid-cols-[1fr]">
        <h2
          id="work-title"
          className="text-[clamp(4.25rem,7vw,7rem)] font-bold leading-[0.95] tracking-[-0.06em] max-md:text-[clamp(3.4rem,16vw,5.5rem)]"
        >
          Selected Work
        </h2>
        <p className="text-[1.125rem] font-semibold leading-[1.55] max-md:mt-8">
          문제를 정의하고,
          <br />
          모델을 연결하고, 제품으로 완성한 작업입니다.
        </p>
        <div
          aria-hidden="true"
          className="absolute right-4 bottom-0 h-32 w-32 border-b border-l border-line max-md:right-0 max-md:h-16 max-md:w-16"
        >
          <div className="absolute -bottom-[0.275rem] -left-[0.275rem] h-[0.55rem] w-[0.55rem] bg-ink" />
        </div>
      </div>

      {PROJECTS.map(({ number, title, summary, meta, outcome, mark }, i) => (
        <article
          key={number}
          className={`grid min-h-[14.75rem] grid-cols-[6.5rem_minmax(16rem,1fr)_fit-content(26rem)_fit-content(15rem)_7.5rem] items-center border-t border-line py-12 max-xl:grid-cols-[5.5rem_minmax(0,1.3fr)_minmax(0,0.9fr)_minmax(0,0.7fr)] max-md:grid-cols-[3.5rem_1fr] max-md:items-start max-md:py-10 ${
            i === PROJECTS.length - 1 ? "border-b" : ""
          }`}
        >
          <p
            aria-hidden="true"
            className="flex items-center self-stretch border-r border-line text-[clamp(3rem,5vw,5.5rem)] font-light leading-none max-md:pt-1 max-md:text-[1.8125rem]"
          >
            {number}
          </p>

          <div className="px-[clamp(1.25rem,2.2vw,2.5rem)] max-md:col-start-2 max-md:px-0 max-md:pl-5">
            <h3 className="text-[clamp(1.75rem,2.5vw,2.65rem)] font-bold leading-[1.12] tracking-[-0.045em] max-xs:text-[1.625rem]">
              {title[0]}
              <br />
              {title[1]}
            </h3>
            <p className="mt-[1.2rem] text-[0.9375rem] leading-[1.55]">{summary}</p>
          </div>

          <dl className="flex flex-col justify-center gap-6 self-stretch border-r border-line px-[clamp(1rem,1.5vw,1.5rem)] max-md:col-start-2 max-md:mt-8 max-md:grid max-md:grid-cols-[1fr] max-md:gap-4 max-md:border-r-0 max-md:px-0 max-md:pl-5">
            {meta.map(([term, value]) => (
              <div key={term}>
                <dt className="mb-[0.55rem] text-[0.75rem] uppercase">{term}</dt>
                <dd className="text-[0.9375rem] leading-[1.5]">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="pl-[clamp(1.5rem,3vw,2.5rem)] pr-[clamp(1rem,2vw,2rem)] text-signal max-md:col-start-2 max-md:mt-8 max-md:px-0 max-md:pl-5">
            <p className="mb-[0.9rem] text-[0.75rem] font-bold">예시 성과</p>
            <strong className="text-[clamp(1.6rem,2.2vw,2.35rem)] font-bold leading-[1.15] tracking-[-0.04em]">
              {outcome.lead}
              <br />
              <em className={outcome.statClass}>{outcome.stat}</em>
              {outcome.tail}
            </strong>
          </div>

          <div
            aria-hidden="true"
            className={`relative h-[7.5rem] w-[7.5rem] justify-self-end max-xl:hidden ${mark[0]}`}
          >
            <div className={`absolute bg-signal ${mark[1]}`} />
          </div>
        </article>
      ))}
    </section>
  );
}
