import LandingPageWrapper from "@/src/components/layout/LandingPageWrapper";
import GridBackground from "@/src/components/layout/GridBackground";
import LegalHero from "@/src/components/legal/LegalHero";
import LegalSection from "@/src/components/legal/LegalSection";

export const metadata = {
    title: "Terms & Conditions | SceneYard",
    description: "Read the terms and conditions for using SceneYard's After Effects templates and services.",
};

export default function TermsPage() {
    return (
        <LandingPageWrapper>
            <GridBackground>
                <div className="pt-40 md:pt-64">
                    <LegalHero
                        title="Terms & Conditions"
                        subtitle="By using SceneYard, you agree to follow these rules and terms. Please read them carefully to understand your rights and responsibilities."
                    />
                </div>

                <div
                    className="mx-auto px-6 pb-32 max-w-[1240px] w-full"
                    style={{ width: 'calc(100% - (var(--grid-margin) * 2))' }}
                >
                    <LegalSection
                        number="1"
                        title="Commercial License"
                        content={
                            <>
                                <p>Every download includes a non-exclusive, worldwide commercial license. You can use our templates in personal and professional projects for your clients.</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li><span className="text-white font-semibold">Original Designs:</span> All templates are SceneYard originals, designed for performance and mostly plugin-free.</li>
                                    <li><span className="text-white font-semibold">Prohibitions:</span> You cannot resell, redistribute, or share the raw project files. One account is for one individual user only. Account sharing is strictly prohibited.</li>
                                </ul>
                            </>
                        }
                    />

                    <LegalSection
                        number="2"
                        title="Credits and Rollover"
                        content={
                            <>
                                <p>Access to templates is managed via our credit system:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Plus Plan: Credits roll over for 1 month.</li>
                                    <li>Pro Plan: Credits roll over for 2 months.</li>
                                    <li>Ultimate Plan: Credits roll over for 3 months.</li>
                                    <li><span className="text-white font-semibold">Golden Members:</span> Eligible early supporters receive a +15% credit bonus on all recurring plans for life.</li>
                                </ul>
                            </>
                        }
                    />

                    <LegalSection
                        number="3"
                        title="Billing and Refunds"
                        content={
                            <>
                                <p>Billing is handled via secure third-party providers. By completing a purchase, you acknowledge and agree that:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Subscriptions can be cancelled at any time via account settings.</li>
                                    <li><span className="text-white font-semibold">Refund Policy:</span> Due to the digital nature of our assets, refunds are not possible once credits from the current billing cycle have been used to download a template.</li>
                                </ul>
                            </>
                        }
                    />

                    <LegalSection
                        number="4"
                        title="Acceptable Use"
                        content={
                            <>
                                <p>To maintain a fair platform, we enforce the following:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Sharing a single account among multiple individuals is prohibited.</li>
                                    <li>Creating multiple accounts to repeatedly exploit the 10-credit free trial is considered fraud.</li>
                                    <li>We reserve the right to suspend accounts that violate these terms without prior notice.</li>
                                </ul>
                            </>
                        }
                    />
                </div>
            </GridBackground>
        </LandingPageWrapper>
    );
}
