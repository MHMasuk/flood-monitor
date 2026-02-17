import TeestaHeader from "./components/TeestaHeader";
import TeestaFooter from "./components/TeestaFooter";

export default function TeestaLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TeestaHeader />
      <main className="flex-1 pt-16 pb-12">
        {children}
      </main>
      <TeestaFooter />
    </div>
  );
}
