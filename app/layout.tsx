import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jixiao Li | Intelligent Agriculture & Plant Science",
  description: "李继潇的论文发表、学会报告、智能农业研究与科研软件项目。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Jixiao Li | Intelligent Agriculture & Plant Science",
    description: "论文发表、学会报告、智能农业研究与科研软件项目。",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
