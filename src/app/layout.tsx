import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SceneYard - Premium Video Templates",
  description: "Access professional video templates for your projects. Download, customize, and create amazing content in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
