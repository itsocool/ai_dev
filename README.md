# ai_dev

`dev.itsocool.tech` 에 배포되는 포트폴리오 랜딩 페이지.
Next.js (App Router · 정적 export) + Tailwind CSS v4 + shadcn/ui.

## 개발

```bash
npm ci
npm run dev     # http://localhost:3000
npm run build   # 정적 산출물 -> out/
```

## 배포

`main` 푸시 시 `.github/workflows/deploy.yml` 이 `out/` 을 GitHub Pages 로 배포한다.

**최초 1회 설정 필요**: 저장소 Settings → Pages → Source 를 **GitHub Actions** 로 변경.
기존 "Deploy from a branch" 설정으로는 동작하지 않는다.

커스텀 도메인은 `public/CNAME` 으로 관리한다.

## 구조

- `app/globals.css` — 디자인 토큰(`paper` / `ink` / `signal` / `line`)과 브레이크포인트(`xs` 430px · `md` 800px · `xl` 1200px). 원본 미디어쿼리와 1:1 대응하도록 Tailwind 기본 브레이크포인트는 초기화했다.
- `components/` — 섹션 컴포넌트. 전부 서버 컴포넌트이며, 클라이언트 JS 는 shadcn `Separator` 하나뿐이다.
- `legacy/` — 이 페이지의 원본 정적 HTML/CSS. 디자인 레퍼런스이며 배포되지 않는다.
