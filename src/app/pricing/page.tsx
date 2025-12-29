import LandingPageWrapper from "@/src/components/layout/LandingPageWrapper";
import GridBackground from "@/src/components/layout/GridBackground";
import GoldenMemberSection from "@/src/components/payment/GoldenMemberSection";
import PricingSection from "@/src/components/payment/PricingSection";
import SecureCheckoutSection from "@/src/components/payment/SecureCheckoutSection";

export const metadata = {
    title: "Pricing | SceneYard",
    description: "Choose the perfect plan for your motion design workflow. Flexible credit-based plans and exclusive Golden Member perks.",
};

export default function PricingPage() {
    return (
        <LandingPageWrapper>
            <GridBackground>
                {/* 1. Golden Member Section - Adjusted padding */}
                <div className="pt-16 md:pt-24">
                    <GoldenMemberSection />
                </div>

                {/* 2. Pricing Section - Reduced gap from GoldenMember */}
                <div className="py-12 md:py-20">
                    <PricingSection />
                </div>

                {/* 3. Secure Checkout Section */}
                <div className="pb-24 md:pb-40">
                    <SecureCheckoutSection />
                </div>
            </GridBackground>
        </LandingPageWrapper>
    );
}
