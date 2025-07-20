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
  title: {
    default: "Mythoria Stories | Create & Read Fantasy Books, Comics & Manga",
    template: "%s | Mythoria Stories", // For dynamic page titles
  },
  description:
    "Create, read and share magical stories, books, comics and manga. Mythoria offers the best platform for fantasy storytelling with a unique page-flip experience.",
  keywords: [
    "Mythoria",
    "Mythoria stories",
    "fantasy stories",
    "create books online",
    "comic creator",
    "manga maker",
    "story platform",
    "read stories online",
    "digital storytelling",
    "webcomics platform",
  ],
  openGraph: {
    title: "Mythoria Stories | Fantasy Books & Comics Creator",
    description:
      "The premier platform for creating and reading magical stories, books, comics and manga. Start your storytelling journey today!",
    url: "https://mythoria-stories.com",
    siteName: "Mythoria Stories",
    images: [
      {
        url: "https://mythoria-stories.com/assets/mythoria.webp",
        width: 1200,
        height: 630,
        alt: "Create and Read Stories on Mythoria - The Ultimate Storytelling Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mythoria Stories | Where Stories Come to Life",
    description:
      "Platform for creating and reading fantasy stories, books, comics and manga. Join our community of storytellers!",
    images: ["https://mythoria-stories.com/assets/mythoria.webp"],
  },
  alternates: {
    canonical: "https://mythoria-stories.com",
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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

        {/* Web App Manifest - Good for PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* Improved Schema.org markup */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Mythoria Stories",
              url: "https://mythoria-stories.com",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://mythoria-stories.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Mythoria",
                    item: "https://mythoria-stories.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "My Stories",
                    item: "https://mythoria-stories.com/my-stories",
                  },
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Mythoria Stories", // ⭐ Changed
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
                name: "Mythoria Stories", // ⭐ Changed
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
