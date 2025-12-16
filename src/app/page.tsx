import { Suspense } from "react";
import LandingPageWrapper from "@/src/components/layout/LandingPageWrapper";
import HeroSection from "@/src/components/landing-page/HeroSection";
import RealitySection from "@/src/components/landing-page/RealitySection";
import GridBackground from "@/src/components/layout/GridBackground";
import FeaturedTemplates from "@/src/components/landing-page/FeaturedTemplates";
import SkillValueSection from "@/src/components/landing-page/SkillValueSection";
import FeaturesSection from "@/src/components/landing-page/FeaturesSection";
import ForWhoSection from '@/src/components/landing-page/ForWhoSection';
import PricingSection from '@/src/components/landing-page/PricingSection';
import GoldenMemberSection from "@/src/components/landing-page/GoldenMemberSection";
import FAQSection from "@/src/components/landing-page/FAQSection";
import { Ribbon } from "@/src/components/ui/Ribbon";

export default function Home() {
  return (
    <LandingPageWrapper>
      {/* Hero Section */}
      <HeroSection />

      {/* Rest of the page content starts here */}
      <GridBackground>
        <RealitySection />

        <Suspense fallback={<div className="h-[400px] w-full bg-black" />}>
          <FeaturedTemplates />
        </Suspense>

        <SkillValueSection />

        <Ribbon
          items={[
            { text: "CREATIVE FREEDOM", icon: "sun" },
            { text: "FAST WORKFLOW", icon: "timer" },
            { text: "NO PLUGINS", icon: "cpu" },
            { text: "DRAG & DROP", icon: "cursor" },
            { text: "SAVE TIME", icon: "hour-glass" },
            { text: "HANDLE MORE PROJECTS", icon: "box" }
          ]}
          backgroundColor="transparent"
          textColor="var(--color-grid-line)"
          borderColor="var(--color-grid-line)"
          iconColor="var(--color-grid-line)"
          className="opacity-80 my-64"
        />

        <FeaturesSection />

        <Ribbon
          items={[
            { text: "CREATIVE FREEDOM", icon: "sun" },
            { text: "FAST WORKFLOW", icon: "timer" },
            { text: "NO PLUGINS", icon: "cpu" },
            { text: "DRAG & DROP", icon: "cursor" },
            { text: "SAVE TIME", icon: "hour-glass" },
            { text: "HANDLE MORE PROJECTS", icon: "box" }
          ]}
          backgroundColor="transparent"
          textColor="var(--color-grid-line)"
          borderColor="var(--color-grid-line)"
          iconColor="var(--color-grid-line)"
          className="opacity-80 my-64"
        />

        <ForWhoSection />

        <Ribbon
          items={[
            { text: "CREATIVE FREEDOM", icon: "sun" },
            { text: "FAST WORKFLOW", icon: "timer" },
            { text: "NO PLUGINS", icon: "cpu" },
            { text: "DRAG & DROP", icon: "cursor" },
            { text: "SAVE TIME", icon: "hour-glass" },
            { text: "HANDLE MORE PROJECTS", icon: "box" }
          ]}
          backgroundColor="transparent"
          textColor="var(--color-grid-line)"
          borderColor="var(--color-grid-line)"
          iconColor="var(--color-grid-line)"
          className="opacity-80 my-64"
        />

        <PricingSection />
        <GoldenMemberSection />
        <FAQSection />
      </GridBackground>
    </LandingPageWrapper>
  );
}