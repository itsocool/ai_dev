# ai_dev

AI Product Engineer 포트폴리오 랜딩 페이지. GitHub Pages 로 배포된다.

**Live:** https://dev.itsocool.tech/

Next.js App Router 를 정적 export 로 빌드한 단일 페이지다. 서버 런타임이 없고,
클라이언트 JS 는 shadcn `Separator` 하나뿐이다.

| | |
|---|---|
| Framework | Next.js 16 (App Router, `output: "export"`, Turbopack) |
| UI | React 19 · Tailwind CSS v4 · shadcn/ui |
| Hosting | GitHub Pages (GitHub Actions 배포) |
| Domain | `dev.itsocool.tech` (`public/CNAME`) |

---

## 시작하기

```bash
npm ci
npm run dev     # http://localhost:3000
npm run build   # 정적 산출물 -> out/
npm run lint
npx tsc --noEmit
```

`npm run build` 는 `out/` 에 완성된 정적 사이트를 만든다. 산출물을 그대로 확인하려면:

```bash
npx serve out    # 또는: python3 -m http.server 4321 --directory out
```

---

## 구조

```
app/
  layout.tsx        <html lang="ko">, 메타데이터
  page.tsx          섹션 배선 (이 파일이 페이지 전체의 목차다)
  globals.css       디자인 토큰 · 브레이크포인트 · base 레이어
components/
  skip-link.tsx     "본문으로 바로가기"
  site-header.tsx   브랜드 + 네비게이션
  hero.tsx          히어로 카피 + 장식 비주얼 (CTA 2개)
  work.tsx          Selected Work — PROJECTS 배열이 데이터 소스
  about.tsx         About + capabilities 3개
  contact.tsx       Contact (파란 배경 섹션)
  site-footer.tsx   푸터
  ui/               shadcn 생성물 (button, separator) — 직접 수정하지 말 것
lib/utils.ts        shadcn cn()
public/
  CNAME             커스텀 도메인
  .nojekyll         Jekyll 이 _next/ 를 무시하지 않도록 방지
legacy/             이 페이지의 원본 정적 HTML/CSS. 디자인 레퍼런스이며 배포되지 않는다.
```

모든 섹션 컴포넌트는 **서버 컴포넌트**다. 인터랙션이 없으므로 `"use client"` 를 추가할 일이 없다.

---

## 디자인 시스템

### 색·간격 토큰

`app/globals.css` 의 `@theme` 에 정의돼 있다. 컴포넌트에서 임의 hex 를 쓰지 말고 항상 토큰을 쓴다.

| 토큰 | 값 | 유틸리티 |
|---|---|---|
| `--color-paper` | `#f5f2eb` | `bg-paper` `text-paper` |
| `--color-ink` | `#0a0a0a` | `bg-ink` `text-ink` |
| `--color-signal` | `#1047e8` | `bg-signal` `text-signal` `border-signal` |
| `--color-signal-dark` | `#0b39bd` | `hover:bg-signal-dark` |
| `--color-line` | `rgba(10,10,10,.72)` | `border-line` `bg-line` |
| `--spacing-gutter` | `clamp(1.25rem, 5vw, 5rem)` | `px-gutter` |
| `--spacing-section` | `clamp(5rem, 10vw, 10rem)` | `py-section` |

다크모드는 없다. `.dark` 블록은 삭제했고, `@custom-variant dark (&:is(.dark *))` 만 남겨서
shadcn 컴포넌트가 들고 오는 `dark:` 클래스가 `prefers-color-scheme` 으로 새지 않도록 막았다.

### 브레이크포인트

Tailwind 기본 브레이크포인트를 `--breakpoint-*: initial` 로 **전부 초기화**하고,
원본 디자인의 미디어쿼리 3개만 남겼다.

| 변형 | 최대 너비 | 원본 미디어쿼리 |
|---|---|---|
| `max-xs:` | 27rem (432px) | `@media (max-width: 430px)` |
| `max-md:` | 50rem (800px) | `@media (max-width: 800px)` |
| `max-xl:` | 75rem (1200px) | `@media (max-width: 1200px)` |

> **주의:** `sm:` `lg:` `2xl:` 등은 존재하지 않는다. 쓰면 오류 없이 **조용히 무시**된다.
> 이 디자인은 데스크톱 기준으로 좁혀가는 방식이라 `max-*` 만 쓴다.

### dot-grid

원본의 점 패턴은 Tailwind 유틸리티로 표현할 수 없어 `globals.css` 에 `@utility dot-grid` 로 남겼다.

---

## shadcn/ui 사용 시 주의

이 페이지는 shadcn 의 `Button` 과 `Separator` 만 쓴다.
`--radius: 0rem` 이라 모든 shadcn 컴포넌트가 각진 모서리로 나온다.

`Button` 의 cva 기본 클래스는 이 디자인과 충돌하는 부분이 있어 `hero.tsx` 상단 `cta` 상수에서
덮어쓴다. 버튼을 새로 추가한다면 아래 3가지를 그대로 가져가야 한다.

1. **포커스 아웃라인** — cva 기본값에 `outline-none` 이 있고, 이게 `--tw-outline-style: none` 을
   고정한다. 그래서 `focus-visible:outline-3` 같은 일반 유틸리티는 `outline-style: none` 으로
   해석돼 링이 안 보인다. 임의 속성 단축형으로 강제해야 한다:
   `focus-visible:[outline:3px_solid_var(--color-ink)]`
2. **전이 속성** — `transition-colors` 는 `outline-color` 까지 전이 대상에 포함한다. 그러면
   포커스 링이 currentColor 에서 페이드인해서, 파란 버튼에서는 160ms 동안 링이 보이지 않는다.
   원본과 동일하게 `transition-[color,background-color] ease-[ease]` 로 좁힌다.
3. **active 눌림 효과 제거** — cva 는 `active:not-aria-[haspopup]:translate-y-px` 를 준다.
   tailwind-merge 가 이걸 걷어내려면 **변형 체인이 정확히 같아야** 한다.
   `active:translate-y-0` 이 아니라 `active:not-aria-[haspopup]:translate-y-0` 을 써야 한다.

Contact 섹션은 파란 배경이라 전역 포커스 아웃라인(ink)이 안 보인다. 그 안의 링크에는
`focus-visible:outline-paper` 를 붙여 대비를 확보한다.

---

## 내용 수정

- **이름·직함** — `app/layout.tsx`(title, description), `components/site-header.tsx`,
  `components/site-footer.tsx` 네 군데.
- **메일 주소** — `components/hero.tsx` 의 CTA, `components/contact.tsx` 의 `mailto:` 2개와
  화면에 노출되는 주소 1개. 총 4곳이므로 전부 바꿨는지 `grep -rn "mailto:" app components` 로 확인한다.
- **프로젝트 추가·수정** — `components/work.tsx` 의 `PROJECTS` 배열. 제목은 `<br>` 이 들어가므로
  `["1행", "2행"]` 배열이고, 성과 수치는 `{lead, stat, tail, statClass}` 로 분해돼 있다.
  수치가 길어 한 줄에 안 들어가면 `STAT_WIDE` 를 쓴다.
- **역량 항목** — `components/about.tsx` 의 `capabilities` 배열.

문구 길이를 크게 바꿨다면 1440 / 800 / 430px 근처에서 넘침을 확인한다. Contact 그리드와
프로젝트 행은 고정 `fr` 비율이라 긴 문자열에 민감하다.

---

## 배포

`main` 에 푸시하면 `.github/workflows/deploy.yml` 이 빌드해서 `out/` 을 Pages 로 올린다.
수동 실행은 Actions 탭의 **Deploy to GitHub Pages → Run workflow**.

저장소 설정은 **Settings → Pages → Source = GitHub Actions** 여야 한다.

```bash
gh api repos/itsocool/ai_dev/pages --jq .build_type   # -> workflow
```

"Deploy from a branch" 로 되돌리면 루트에 `index.html` 이 없으므로 사이트가 404 가 된다.

커스텀 도메인은 `public/CNAME` 으로 관리한다. 저장소 설정 화면에서 도메인을 바꾸면 GitHub 이
루트에 `CNAME` 을 만드는데, 그 파일은 export 에 포함되지 않으므로 다음 배포에서 `public/CNAME`
값으로 덮어쓰인다. **도메인 변경은 `public/CNAME` 에서 해야 한다.**

`public/.nojekyll` 은 지우면 안 된다. 없으면 Pages 의 Jekyll 이 밑줄로 시작하는 `_next/`
디렉터리를 무시해서 CSS/JS 가 전부 404 가 된다.

---

## 원본과의 관계

`legacy/` 의 정적 HTML/CSS 가 이 페이지의 원본이다. 포팅 시 원본 셀렉터를 1:1 로 대조했고,
1440 / 900 / 480px 에서 렌더링을 비교했다. 전체 문서 높이 기준 누적 차이는 14px(0.4%) 이며,
원인은 Tailwind preflight 가 heading 굵기를 `inherit` 로 리셋해서 `font-bold` 를 명시적으로
보정한 부분이다. 레이아웃이 깨지는 차이는 없다.

`legacy/` 는 스냅샷이므로 이름·연락처 등 이후 변경사항은 반영하지 않는다. "원래 어떻게
생겼었나" 를 확인할 때만 `python3 -m http.server 4322 --directory legacy` 로 띄워 비교한다.
