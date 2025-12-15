import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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

      </head>
      <body className={`antialiased ${geistMono.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
