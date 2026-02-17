import TeestaHeader from "./components/TeestaHeader";
import TeestaFooter from "./components/TeestaFooter";
import Footer from "@/app/components/Layout/footer";
import Headers from "@/app/components/Layout/headers";

export default function TeestaLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Headers />
      <main className="flex-1 pt-16 pb-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
