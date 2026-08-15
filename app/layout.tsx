import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "김태현 — AI Product Engineer",
  description:
    "AI를 실제 제품으로 만드는 개발자 김태현의 프로젝트와 역량을 소개합니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body className="font-sans bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
