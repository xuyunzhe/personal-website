import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** 宋体/明体系（与常见正文截图中的 Songti / Noto Serif CJK 一类风格一致） */
const notoSerifSC = Noto_Serif_SC({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif-sc",
  display: "swap",
});

const siteUrl = "https://xuyunzhe.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "xuyunzhe.site",
    template: "%s · xuyunzhe.site",
  },
  description:
    "Personal site — projects, photography, and notes. 个人网站：项目、摄影与记录。",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: "xuyunzhe.site",
    title: "xuyunzhe.site",
    description:
      "Personal site — projects, photography, and notes. 个人网站：项目、摄影与记录。",
    images: [
      {
        url: "/og.png",
        width: 1376,
        height: 768,
        alt: "xuyunzhe.site — XYZ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "xuyunzhe.site",
    description:
      "Personal site — projects, photography, and notes. 个人网站：项目、摄影与记录。",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
