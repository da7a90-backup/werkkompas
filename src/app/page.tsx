"use client";

import { useLayout } from "@/lib/layout-variant";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { HomeModern } from "@/components/marketing/modern";
import { HomeEditorial } from "@/components/marketing/editorial";
import { HomeMaximalist } from "@/components/marketing/maximalist";

export default function LandingPage() {
  const { variant } = useLayout();
  return (
    <main className="min-h-screen bg-canvas">
      <MarketingNav />
      {variant === "editorial" ? (
        <HomeEditorial />
      ) : variant === "maximalist" ? (
        <HomeMaximalist />
      ) : (
        <HomeModern />
      )}
      <MarketingFooter />
    </main>
  );
}
