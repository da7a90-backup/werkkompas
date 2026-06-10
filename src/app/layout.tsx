import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, Archivo_Black } from "next/font/google";
import { StoreProvider } from "@/lib/store";
import { LanguageProvider } from "@/lib/i18n";
import { LayoutVariantProvider } from "@/lib/layout-variant";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Variant B (Editorial) display serif — Fraunces variable.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Variant C (Maximalist) condensed display.
const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo-black",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Werkkompas — Diensten & Beschikbaarheid",
  description:
    "Bekijk je diensten, geef je beschikbaarheid door en blijf in contact met de planning.",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.svg" }],
  },
  appleWebApp: {
    capable: true,
    title: "Werkkompas",
    statusBarStyle: "black-translucent",
  },
  applicationName: "Werkkompas",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1a2f47",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="nl-NL"
      data-layout="modern"
      className={`${inter.variable} ${fraunces.variable} ${archivoBlack.variable}`}
    >
      <body className="font-sans">
        <LanguageProvider>
          <LayoutVariantProvider>
            <StoreProvider>{children}</StoreProvider>
          </LayoutVariantProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
