import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jixiao Li — Research & Software",
  description: "Jixiao Li 的个人研究、学术成果与软件项目主页。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Jixiao Li — Research & Software",
    description: "个人研究、学术成果与软件项目主页。",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
