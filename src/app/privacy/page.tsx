import LandingPageWrapper from "@/src/components/layout/LandingPageWrapper";
import GridBackground from "@/src/components/layout/GridBackground";
import LegalHero from "@/src/components/legal/LegalHero";
import LegalSection from "@/src/components/legal/LegalSection";

export const metadata = {
    title: "Privacy Policy | SceneYard",
    description: "Learn how SceneYard collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
    return (
        <LandingPageWrapper>
            <GridBackground>
                <div className="pt-40 md:pt-64">
                    <LegalHero
                        title="Privacy Policy"
                        subtitle="Your privacy is important to us. This Privacy Policy explains how SceneYard collects, uses, stores, and protects your personal information."
                    />
                </div>

                <div
                    className="mx-auto px-6 pb-32 max-w-[1240px] w-full"
                    style={{ width: 'calc(100% - (var(--grid-margin) * 2))' }}
                >
                    <LegalSection
                        number="1"
                        title="Information We Collect"
                        content={
                            <>
                                <p>We collect minimal information required to provide our service:</p>
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-white/90">Identity & Authentication</p>
                                    <p>We use Google OAuth for secure login. We only store your name, email address, and profile picture URL from your Google account.</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-white/90">Transaction & Download History</p>
                                    <p>We maintain an idempotent ledger of every credit transaction and download. This ensures your balance is always accurate and you never lose credits due to technical errors.</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-white/90">Payment Processing</p>
                                    <p>Payments are handled securely by third-party providers. SceneYard never sees or stores your full credit card or payment method details.</p>
                                </div>
                            </>
                        }
                    />

                    <LegalSection
                        number="2"
                        title="Data Usage and Protection"
                        content={
                            <>
                                <p>Our primary goal is to provide a safe creative ecosystem:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li><span className="text-white font-semibold">Service Integrity:</span> Your data is used to track your credit balance and provide access to your download history across devices.</li>
                                    <li><span className="text-white font-semibold">Asset Privacy:</span> While template previews are public, all project files (.zip) are private. Access is strictly tied to your authenticated session.</li>
                                    <li><span className="text-white font-semibold">Communication:</span> We may send system updates or occasional promotional emails. You can opt-out of marketing at any time.</li>
                                </ul>
                            </>
                        }
                    />

                    <LegalSection
                        number="3"
                        title="Third-Party Disclosure"
                        content={
                            <>
                                <p>We do not sell or trade your data. We only share information with partners essential to our operations:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Payment processors (to fulfill orders and manage subscriptions).</li>
                                    <li>Authentication providers (Google) to secure your account.</li>
                                    <li>Cloud infrastructure (Cloudflare) for secure hosting and file delivery.</li>
                                </ul>
                            </>
                        }
                    />

                    <LegalSection
                        number="4"
                        title="User Rights and Control"
                        content={
                            <p>You have full control over your data. You can request to view, update, or permanently delete your account and all associated data by contacting us at support@sceneyard.com.</p>
                        }
                    />

                    <LegalSection
                        number="5"
                        title="Return & Refund Policy"
                        content={
                            <>
                                <p>SceneYard provides digital assets. Due to their nature, products cannot be returned once downloaded.</p>
                                <div className="mt-4 space-y-4">
                                    <div className="flex flex-col gap-2">
                                        <p className="font-semibold text-white/90">Refund Eligibility</p>
                                        <p>Refunds are considered only for technical defects that our team cannot resolve within 48 hours, or for unused subscription credits if requested within 14 days of purchase (provided <span className="underline">zero credits</span> have been used).</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="font-semibold text-white/90">Cancellations</p>
                                        <p>Subscriptions can be cancelled anytime. Access to remaining credits continues until the end of the billing period. Cancellation does not trigger an automatic refund.</p>
                                    </div>
                                    <p className="text-sm italic text-gray-400">Request a review by emailing support@sceneyard.com.</p>
                                </div>
                            </>
                        }
                    />
                </div>
            </GridBackground>
        </LandingPageWrapper>
    );
}
