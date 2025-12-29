import TeestaHeader from "./components/TeestaHeader";
import TeestaFooter from "./components/TeestaFooter";

export default function TeestaLayout({ children }) {
  return (
    <>
      <TeestaHeader />
        {children}
      <TeestaFooter />
    </>
  );
}
