import "./Webpage.css";

export default function Webpage() {
  return (
    <div className="mx-1 overflow-hidden">
        
        <div className="flex mask z-10 justify-between w-screen h-[3rem] relative shadow overflow-hidden rounded-bl rounded-br font-quantico mt-1">
            <div className="Navbar1 py-2 flex relative z-10  w-[60%] bg-midnight h-full items-center justify-between ">
                <div className="ml-[10%]  ">
                    <div className="mr-8 pt-3 pb-2 mb-[2px]">
                        <h1 className="  my-[-4px] text-[1.5rem] tracking-[0.2rem] font-[200] text-left neon-pink">異体同心</h1>
                        <h2 className=" text-white custom-H2 text-[0.6rem]  tracking-normal text-right pr-[6px]">Dare To Dream</h2>
                    </div>

                </div>

                <div>
                    <ul className="flex mt-4 gap-[9rem] text-white text-xs">
                        <li>Home</li>
                        <li>About Me</li>
                        <li>Projects</li>
                    </ul>
                </div>
    
            </div>

            {/* Right Navbar */}
            <div className="Navbar2 flex z-10 relative h-full  mr-[5rem]">
                <ul className=" text-black flex gap-[3.8rem] text-s  mt-[1.25rem]">
                        <li>Email</li>
                        <li>Github</li>
                        <li>LinkedIn</li>
                </ul>
            </div>
        </div>

        <div className="w-full h-[50vh] overflow-hidden relative rounded-l">
            <video 
                src="./model/veo3.mp4" 
                className="w-full h-full object-cover" 
                autoPlay 
                muted 
                loop
            />

             <div className="absolute inset-0 bg-pink-500/30 mix-blend-overlay pointer-events-none" />
        </div>

    </div>)
  
}
