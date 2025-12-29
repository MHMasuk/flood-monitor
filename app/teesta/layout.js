import TeestaHeader from "./components/TeestaHeader";
import TeestaFooter from "./components/TeestaFooter";
import Footer from "@/app/components/Layout/footer";
import Headers from "@/app/components/Layout/headers";

export default function TeestaLayout({ children }) {
  return (
    <>
      <Headers />
        {children}
      <Footer />
    </>
  );
}
