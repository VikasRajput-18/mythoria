import type { Metadata } from "next";
import { Epilogue, Josefin_Sans as JosefinSans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import AppProvider from "../context/app-context";
import UserProvider from "../context/user-context";

const epilogueSans = Epilogue({
  variable: "--font-epilogue-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const josefinSans = JosefinSans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mythoria – Craft & Discover Magical Stories",
  description:
    "Mythoria is a mystical storytelling platform where creators write comics, manga, manhwa, and magical tales with a page-flip reading experience. Read and publish stories like never before.",
  openGraph: {
    title: "Mythoria – Craft & Discover Magical Stories",
    description:
      "Mythoria is a mystical storytelling platform where creators write comics, manga, manhwa, and magical tales with a page-flip reading experience.",
    url: "https://mythoria-stories.com",
    siteName: "Mythoria",
    images: [
      {
        url: "https://mythoria-stories.com/assets/mythoria.jpg", // 🔁 Replace with actual logo URL
        width: 1200,
        height: 630,
        alt: "Mythoria Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mythoria – Craft & Discover Magical Stories",
    description:
      "Craft, read, and explore magical stories in a beautiful page-flip experience.",
    images: ["https://mythoria-stories.com/assets/mythoria.jpg"], // 🔁 Replace if needed
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
      className={`${epilogueSans.className} ${josefinSans.variable} antialiased`}
    >
      <head>
        {/* ✅ Google Site Verification Meta */}
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GSC_VERIFICATION}
        />
      </head>
      <body>
        <AppProvider>
          <UserProvider>{children}</UserProvider>
        </AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
