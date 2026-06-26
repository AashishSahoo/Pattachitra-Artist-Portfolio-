import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sudarshan Mohanty — Patachitra & Sketch Artist, Odisha",
  description:
    "Official portfolio of Sudarshan Mohanty — National Award-winning Patachitra and sketch artist from Raghurajpur, Odisha. Browse artworks and place custom orders.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
