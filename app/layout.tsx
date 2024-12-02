import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/app/components/header";

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
    <html lang="en" className="size-full flex justify-center">
      <body className="size-full top-0 left-0 antialiased flex bg-gray-50">
        <Header />
        <div className="w-full flex justify-center">
          <div className="body-wrapper">{children}</div>
        </div>
      </body>
    </html>
  );
}
