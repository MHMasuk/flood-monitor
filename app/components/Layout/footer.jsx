import RimesLogo from "@/app/components/Icons/RimesLogo";
import Image from "next/image";

const Footer = () => {
  return (
      <footer className="footer items-center fixed bottom-0 bg-neutral text-neutral-content p-1">
          <div className="items-center grid-flow-col">
              {/*<RimesLogo />*/}
              <p>Technical Partner & Implementing by <strong>Regional Integrated Multi-Hazard Early Warning System(RIMES)</strong></p>
          </div>
          <div className="flex items-center gap-4 md:place-self-center md:justify-self-end">
              <p>Partner</p>
              <Image className="bg-white" src='/icons/gku_logo.png' alt='GKU Logo' width={200} height={100} quality={100}/>
          </div>
      </footer>
  )
}

export default Footer;