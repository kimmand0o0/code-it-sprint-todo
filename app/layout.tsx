import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Do it",
  description: "코드잇 단기심화 프론트엔드 스프린트 지원 과제 - Do it",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
