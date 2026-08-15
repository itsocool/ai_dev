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

### dev 서버 403 (Unauthorized)

`next dev` 는 `/_next/*` 를 `localhost` 에서만 서빙하고 다른 Origin 은 403 으로 막는다.
브라우저 주소창에 `127.0.0.1:3000` 을 치면 청크가 전부 403 이 되고 HMR 웹소켓도 끊긴다.
`next.config.ts` 의 `allowedDevOrigins` 에 그 호스트를 추가하면 된다 (LAN IP, 터널 도메인도 동일).
이 옵션은 dev 전용이라 `next build` 산출물에는 영향이 없다.

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

### 폰트

기본 서체는 **Gmarket Sans** 이며 저장소에서 직접 호스팅한다. 외부 CDN 을 쓰지 않는다.

- `public/fonts/gmarket/woff2/` — 서브셋 woff2 185개
- `app/gmarket.css` — `@font-face` 185개. `globals.css` 가 `@import` 해서 번들 CSS 에 인라인된다. **생성물이므로 직접 수정하지 말 것.**
- `public/fonts/gmarket/NOTICE.txt` — 라이선스 고지. Gmarket 이 무료로 배포하며 상업적 사용이 가능하고, 폰트 파일 자체의 유료 판매만 금지된다.

원본은 굵기별 단일 파일(woff 합계 1.8MB)이라 그대로 실으면 무겁다. 그래서 유니코드 범위 92개로
잘라 `unicode-range` 로 물려두었고, 브라우저는 **실제로 렌더링되는 범위만** 받는다.
현재 페이지 기준 **22조각 · 약 170KB** 다. `font-display: swap` 이라 도착 전에는 폴백 스택으로 렌더링된다.

**굵기는 3종뿐이다 — Light 200 · Medium 500 · Bold 700.** 가변 폰트가 아니므로 디자인이 쓰는
굵기는 CSS 굵기 매칭 규칙에 따라 아래로 접힌다. 가짜 볼드(합성)는 발생하지 않는다.

| 디자인이 요청 | 실제 렌더 | 쓰이는 곳 |
|---|---|---|
| 300 (`font-light`) | Light 200 | 프로젝트 번호 01/02/03 |
| 400 (기본) | Medium 500 | 본문 전체 |
| 600 (`font-semibold`) | Bold 700 | Work 섹션 리드 문장 |
| 700 / 800 | Bold 700 | 제목, 버튼, 라벨 |

Light 는 숫자에만 쓰이므로 `U+0030-0039` 만 담은 1KB 짜리 조각 하나로 끝낸다.

서체를 교체한다면 `@theme` 의 `--font-sans`, `app/gmarket.css`, `public/fonts/` 를 함께 바꾼다.
히어로의 장식용 코드 블록은 `--font-mono`(시스템 모노스페이스)를 계속 쓴다.

Gmarket Sans 는 Pretendard 보다 자폭이 넓다. Work 섹션 그리드는 그에 맞춰 다시 배분했다
(아래 "Work 그리드" 참고). 문구를 크게 늘릴 때는 1440px 에서 줄바꿈을 확인하는 편이 좋다.

### 한글 렌더링

한글 본문이 얇고 흐리게 보이지 않도록 두 가지를 맞춰뒀다.

1. **`-webkit-font-smoothing`** — `body` 에서 `antialiased` 를 뺐다. 이 값은 macOS 에서 글자를
   더 얇게 그려서 한글 본문(12~17px)의 획을 흐리게 만든다. 기본값(subpixel)이 한글에 더 또렷하다.
   대신 **Contact 섹션에만** `antialiased` 를 남겼다 — 파란 배경 위 밝은 글자는 subpixel AA 에서
   색 번짐이 생겨 그쪽은 반대로 grayscale AA 가 낫다.
2. **정수 픽셀 크기** — 본문 크기를 루트 16px 기준 정수 px 에 떨어지는 rem 값으로 맞췄다
   (`0.75` `0.8125` `0.875` `0.9375` `1.0625` `1.125` rem = 12/13/14/15/17/18px).
   `px` 로 바꾸지 않은 이유는 브라우저 글자 크기 설정을 계속 따르게 하기 위해서다.

더 키우고 싶다면 본문 최소 크기를 12px → 13px 로 올리는 쪽이 다음 후보다. 다만 원본 디자인의
비율이 바뀌므로 여기서는 건드리지 않았다.

### Work 그리드

Work 섹션의 5컬럼 그리드(>1200px)는 `fr` 비율이 아니라 **내용 크기 기준**으로 잡혀 있다.

```
6.5rem  minmax(16rem,1fr)  fit-content(26rem)  fit-content(15rem)  7.5rem
번호     제목·설명          Role/Stack          성과               장식 마크
```

- Stack 컬럼이 `fit-content` 인 이유: `fr` 비율로는 뷰포트 폭에 따라 Stack 값이 두 줄로 접힌다.
  내용 크기로 잡으면 항상 한 줄이고, 26rem 을 넘길 만큼 길어지면 그때부터 접힌다.
- 번호(8rem→6.5rem)와 장식 마크(9rem→7.5rem) 컬럼은 실측 필요폭(97px / 120px)보다 과하게
  잡혀 있어서 줄였고, 그 여유를 Stack 과 제목 컬럼으로 넘겼다.
- 성과 컬럼의 `pr` 은 장식 마크와 붙지 않게 하려는 것이다. 지우면 성과 수치가 마크에 닿는다.

1440px 기준 `104 | 494 | 325 | 238 | 120` 으로 떨어지며 Stack·설명·제목이 모두 한 줄이다.
1200px 이하에서는 4컬럼 레이아웃으로 바뀌고, 그 폭에서는 Stack 이 두 줄로 접히는 게 정상이다.

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
