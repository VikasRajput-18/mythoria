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
  title: "Mythoria | Craft & Discover Magical Stories", // Brand name first
  description:
    "Mythoria - The premier platform for magical storytelling. Create and read comics, manga, manhwa, and fantasy stories with our unique page-flip experience.",
  openGraph: {
    title: "Mythoria | Craft & Discover Magical Stories", // Brand name first
    description:
      "Mythoria - The premier platform for magical storytelling. Create and read comics, manga, manhwa, and fantasy stories with our unique page-flip experience.",
    url: "https://mythoria-stories.com",
    siteName: "Mythoria",
    images: [
      {
        url: "https://mythoria-stories.com/assets/mythoria.webp", // 🔁 Replace with actual logo URL
        width: 1200,
        height: 630,
        alt: "Mythoria Logo - Craft and Discover Magical Stories",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mythoria | Craft & Discover Magical Stories", // Brand name first
    description:
      "Mythoria - The premier platform for magical storytelling. Create and read comics, manga, manhwa, and fantasy stories with our unique page-flip experience.",
    images: ["https://mythoria-stories.com/assets/mythoria.webp"], // 🔁 Replace if needed
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
        {/* ✅ Google Site Verification Meta - Good practice */}
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GSC_VERIFICATION}
        />

        {/* Keywords meta - Less important today but harmless */}
        <meta
          name="keywords"
          content="Mythoria, Mythoria stories, fantasy stories, webcomics, create manga, make manhwa, digital storytelling, comic creator, story platform"
        />

        {/* Essential viewport tag - Correct */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Author and copyright - Good for brand recognition */}
        <meta name="author" content="Mythoria Team" />
        <meta name="copyright" content="Mythoria" />

        {/* Canonical URL - Correct */}
        <link rel="canonical" href="https://mythoria-stories.com" />

        {/* Favicon - Consider adding multiple sizes */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Web App Manifest - Good for PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* Improved Schema.org markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Mythoria",
                url: "https://mythoria-stories.com",
                potentialAction: {
                  "@type": "SearchAction",
                  target:
                    "https://mythoria-stories.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Mythoria",
                url: "https://mythoria-stories.com",
                logo: "https://mythoria-stories.com/assets/mythoria.webp",
                sameAs: [
                  "https://twitter.com/mythoria",
                  "https://facebook.com/mythoria",
                  "https://instagram.com/mythoria.stories",
                ],
              },
            ]),
          }}
        />

        {/* Additional recommended tags */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="robots" content="index, follow" />
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
