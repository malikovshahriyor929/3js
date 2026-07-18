import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { companyConfig, seo } from "@/config/company";
import { SmoothScrollProvider } from "@/lib/SmoothScroll";
import { MotionProvider } from "@/lib/MotionProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(companyConfig.siteUrl),
  title: seo.title,
  description: seo.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: companyConfig.name,
    title: seo.title,
    description: seo.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: seo.title,
    description: seo.description,
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
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        {process.env.NODE_ENV !== "production" && (
          // Dev-only: ?static=1 renders the page in its final state at first
          // paint, for screenshot verification in throttled environments.
          <script
            dangerouslySetInnerHTML={{
              __html:
                "if(location.search.indexOf('static=1')>-1)document.documentElement.classList.add('debug-static');",
            }}
          />
        )}
        <MotionProvider>
          <SmoothScrollProvider>
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            {children}
          </SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
