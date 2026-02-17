import ComillaHeader from "./components/ComillaHeader";
import ComillaFooter from "./components/ComillaFooter";

export default function ComillaLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ComillaHeader />
      <main className="flex-1 pt-16 pb-12">
        {children}
      </main>
      <ComillaFooter />
    </div>
  );
}
