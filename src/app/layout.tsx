import type { Metadata } from "next";
import "./globals.css";

// ✏️ 修改这里：每个 APP 替换自己的名称和描述
export const metadata: Metadata = {
  title: "AA-Calculator | Split bills in seconds",
  description: "Multi-person AA bill splitting, supports custom ratios.",
  keywords: ["APP_KEYWORD_1", "APP_KEYWORD_2"],
  openGraph: {
    title: "AA-Calculator",
    description: "Multi-person AA bill splitting, supports custom ratios.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
