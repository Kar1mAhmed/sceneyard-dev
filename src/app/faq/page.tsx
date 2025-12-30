import LandingPageWrapper from "@/src/components/layout/LandingPageWrapper";
import GridBackground from "@/src/components/layout/GridBackground";
import FAQHero from "@/src/components/faq/FAQHero";
import FAQList from "@/src/components/faq/FAQList";
import FAQContactCTA from "@/src/components/faq/FAQContactCTA";

export const metadata = {
    title: "FAQ | SceneYard",
    description: "Find answers to frequently asked questions about SceneYard, our After Effects templates, licensing, and credits system.",
};

export default function FAQPage() {
    return (
        <LandingPageWrapper>
            <GridBackground>
                <div className="pt-40 md:pt-64">
                    <FAQHero />
                </div>

                <div className="pt-4 md:pt-8 pb-12 md:pb-20">
                    <FAQList />
                </div>

                <FAQContactCTA />
            </GridBackground>
        </LandingPageWrapper>
    );
}
