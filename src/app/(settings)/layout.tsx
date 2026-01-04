import GridBackground from '@/src/components/layout/GridBackground';
import Navbar from '@/src/components/layout/Navbar';
import BigColumnsHeader from '@/src/components/ui/BigColumnsHeader';
import AccountHeader from '@/src/components/settings/AccountHeader';
import SettingsNav from '@/src/components/settings/SettingsNav';
import Footer from '@/src/components/layout/Footer';

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <GridBackground>
            <Navbar />
            <main className="min-h-screen relative">
                {/* Background Effect - Absolute positioned */}
                <div className="absolute inset-0 z-0">
                    <BigColumnsHeader title="" height="70vh">
                        <div></div>
                    </BigColumnsHeader>
                </div>

                {/* Actual Content - Flows naturally */}
                <div className="relative z-10 pt-24 md:pt-32">
                    <AccountHeader />
                    <SettingsNav />

                    {/* Page Content */}
                    <div className="w-full py-16">
                        <div
                            className="mx-auto px-4"
                            style={{ width: 'calc(100% - (var(--grid-margin) * 2))', maxWidth: '1200px' }}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </GridBackground>
    );
}
