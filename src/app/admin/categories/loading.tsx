import Loading from "@/src/components/ui/Loading";

export default function AdminCategoriesLoading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <Loading text="LOADING CATEGORIES" />
        </div>
    );
}
