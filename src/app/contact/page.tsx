import LandingPageWrapper from "@/src/components/layout/LandingPageWrapper";
import ContactBackground from "@/src/components/contact/ContactBackground";
import ContactHero from "@/src/components/contact/ContactHero";

export const metadata = {
    title: "Contact Us | SceneYard",
    description: "Ready to elevate your project? Get in touch with SceneYard for premium After Effects templates and custom solutions.",
};

export default function ContactPage() {
    return (
        <LandingPageWrapper>
            <div className="relative min-h-screen bg-[#070708] overflow-hidden">
                <ContactBackground />
                <ContactHero />
            </div>
        </LandingPageWrapper>
    );
}
