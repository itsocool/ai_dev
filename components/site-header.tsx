export default function SiteHeader() {
  return (
    <header className="flex min-h-[5.5rem] items-center justify-between border-b border-line px-gutter max-md:min-h-[4.5rem]">
      <a
        className="text-[clamp(1.45rem,2vw,2rem)] font-extrabold tracking-[-0.06em] max-xs:text-[1.25rem]"
        href="#main"
        aria-label="김도윤 포트폴리오 홈"
      >
        김도윤
      </a>
      <nav
        aria-label="주요 메뉴"
        className="flex gap-[clamp(1.5rem,5vw,4.75rem)] text-[1.05rem] max-md:gap-[1.2rem] max-md:text-[0.88rem] max-xs:gap-[0.9rem] max-xs:text-[0.82rem]"
      >
        <a className="border-b border-transparent py-2 hover:border-signal" href="#work">
          Work
        </a>
        <a className="border-b border-transparent py-2 hover:border-signal" href="#about">
          About
        </a>
        <a className="border-b border-transparent py-2 hover:border-signal" href="#contact">
          Contact
        </a>
      </nav>
    </header>
  );
}
