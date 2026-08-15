import type { Metadata } from "next";
import "./globals.css";

const title = "김태현 — AI Product Engineer";
const description =
  "AI를 실제 제품으로 만드는 개발자 김태현의 프로젝트와 역량을 소개합니다.";

export const metadata: Metadata = {
  metadataBase: new URL("https://dev.itsocool.tech"),
  title,
  description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: title,
    title,
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body className="font-sans bg-paper text-ink">{children}</body>
    </html>
  );
}
