import { Suspense } from "react";
import Navbar from "@/src/components/Navbar";
import HeroSection from "@/src/components/landing-page/HeroSection";
import RealitySection from "@/src/components/landing-page/RealitySection";
import GridBackground from "@/src/components/layout/GridBackground";
import FeaturedTemplates from "@/src/components/landing-page/FeaturedTemplates";
import SkillValueSection from "@/src/components/landing-page/SkillValueSection";
import MidCTA from "@/src/components/landing-page/MidCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Rest of the page content starts here */}
      <GridBackground>
        <RealitySection />

        <Suspense fallback={<div className="h-[400px] w-full bg-black" />}>
          <FeaturedTemplates />
        </Suspense>

        <SkillValueSection />

        <MidCTA />
      </GridBackground>
    </main>
  );
}