"use client";

import { HeroModern } from "./Hero";
import { SectorMarquee } from "./SectorMarquee";
import { StatsStrip } from "./StatsStrip";
import { AboutSection } from "./AboutSection";
import { ServicesSection } from "./ServicesSection";
import { ContactSection } from "./ContactSection";

export function HomeModern() {
  return (
    <>
      <HeroModern />
      <SectorMarquee />
      <StatsStrip />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
