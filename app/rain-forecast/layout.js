import TeestaHeader from "@/app/feni/components/TeestaHeader";
import TeestaFooter from "@/app/feni/components/TeestaFooter";

export default function TeestaLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <TeestaHeader />
            <main className="flex-1 pb-12">
                {children}
            </main>
            <TeestaFooter />
        </div>
    );
}
