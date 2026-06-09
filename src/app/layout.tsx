import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { StoreProvider } from "@/lib/store";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
  themeColor: "#002F5C",
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
    <html lang="nl-NL" className={inter.variable}>
      <body className="font-sans">
        <LanguageProvider>
          <StoreProvider>{children}</StoreProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
