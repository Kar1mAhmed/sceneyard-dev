import { ToastProvider } from '@/src/components/ToastProvider';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <ToastProvider>{children}</ToastProvider>;
}
