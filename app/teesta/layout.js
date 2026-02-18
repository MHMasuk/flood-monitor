import TeestaHeader from "./components/TeestaHeader";
import TeestaFooter from "./components/TeestaFooter";
import Footer from "@/app/components/Layout/footer";
import Headers from "@/app/components/Layout/headers";

export default function TeestaLayout({ children }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Headers />
      <main className="flex-1 overflow-hidden pt-16 pb-14">
        {children}
      </main>
      <Footer />
    </div>
  );
}
