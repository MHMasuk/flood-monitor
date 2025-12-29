import Image from "next/image";

const TeestaFooter = () => {
    return (
        <footer className="footer items-center fixed bottom-0 bg-neutral text-neutral-content p-1 z-50">
            <div className="items-center grid-flow-col">
                {/* Add your custom footer content here */}
                <p>Technical Partner & Implementing by <strong>Regional Integrated Multi-Hazard Early Warning System (RIMES)</strong></p>
            </div>
            <div className="flex items-center gap-4 md:place-self-center md:justify-self-end">
                {/* Add your custom partner logos here */}
                <p>Partner</p>
                <Image className="bg-white" src='/icons/uk_aid.png' alt='UK International Development Logo' width={200} height={100} quality={100}/>
            </div>
        </footer>
    );
};

export default TeestaFooter;
