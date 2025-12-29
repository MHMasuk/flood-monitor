import Headers from "@/app/components/Layout/headers";
import Footer from "@/app/components/Layout/footer";

export default function MainLayout({ children }) {
    return (
        <>
            <Headers />
            {children}
            <Footer />
        </>
    );
}
