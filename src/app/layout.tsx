import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";

const epilogueSans = Epilogue({
  variable: "--font-epilogue-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Mythoria – Craft & Discover Magical Stories",
  description:
    "Mythoria is a mystical storytelling platform where creators write comics, manga, manhwa, and magical tales with a page-flip reading experience. Read and publish stories like never before.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${epilogueSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
