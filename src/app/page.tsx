import Navbar from "@/src/components/Navbar";
import HeroSection from "@/src/components/landing-page/HeroSection";
import RealitySection from "@/src/components/landing-page/RealitySection";
import GridBackground from "@/src/components/layout/GridBackground";

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
      </GridBackground>
    </main>
  );
}