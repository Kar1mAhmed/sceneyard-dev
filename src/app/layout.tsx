import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SceneYard - Premium After Effects Templates",
  description: "Access professional After Effects templates for your projects. Download, customize, and create stunning video content in minutes with our credit-based marketplace.",
  keywords: "After Effects templates, video templates, motion graphics, video editing, AE templates, SceneYard",
  authors: [{ name: "SceneYard" }],
  openGraph: {
    title: "SceneYard - Premium After Effects Templates",
    description: "Access professional After Effects templates for your projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload BR Sonoma Fonts for better performance */}
        <link
          rel="preload"
          href="/fonts/BRSonoma-Regular-BF654c45266c042.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/BRSonoma-Medium-BF654c45266edd1.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/BRSonoma-SemiBold-BF654c45268c340.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/BRSonoma-Bold-BF654c4526823f5.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`antialiased ${geistMono.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
