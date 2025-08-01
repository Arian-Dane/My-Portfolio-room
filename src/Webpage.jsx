import "./Webpage.css";

export default function Webpage() {

    

  return (
    <div className="mx-1 overflow-hidden">
        
        <div className="flex mask z-10 justify-between w-screen h-[2.8rem] relative shadow overflow-hidden rounded-bl rounded-br font-quantico">
            <div className="Navbar1 py-2 flex relative z-10  w-[60%] bg-midnight h-full items-center justify-between ">
                <div className="ml-[7%]  ">
                    
                    <div className=" pt-4 pb-2 mb-[2px] ">
                        <h1 className="  my-[-10px] text-[1.4rem] tracking-[0.25rem] font-bold text-left normpink">異体同心</h1>
                        <h2 className=" text-white custom-H2 text-[0.8rem] text-right pr-[6px]">Dare To Dream</h2>
                    </div>

                </div>

                
                <ul className=" flex mt-4 text-xs pt-3 gap-[10rem] ">
                    <div className="nav-item flex flex-col items-center">
                        <li className="navLink text-white mb-[-0.5rem]">Home</li>
                        <span className="navDecor text-[1rem] font-bold ">.</span>
                    </div>
                    <div className="nav-item flex flex-col items-center pb-3">
                        <li className="navLink text-white mb-[-0.5rem]">About Me</li>
                        <span className="navDecor text-[1rem]  font-bold">.</span>
                    </div>
                    <div className="nav-item flex flex-col items-center pb-3">
                        <li className="navLink text-white tracking-widest ">Projects</li>
                        <span className="navDecor text-[1rem] font-bold mt-[-0.5rem]">.</span>
                    </div>
                </ul>
                
    
            </div>

            {/* Right Navbar */}
            <div className="Navbar2 flex z-10 relative h-full mr-[4rem]">
                <div className=" text-white w-full flex gap-[3.8rem]">
                        <button className="rounded-[4px] p-2 my-1 font-extrabold text-white">Get In Touch</button>
                        <button className="h-[35px] w-[105px] p-[8px] my-1 font-extrabold">Github</button>
                        <button className="h-[35px] w-[105px] p-[8px] my-1 font-extrabold">LinkedIn</button>
                </div>
            </div>
        </div>

        <div className="w-full h-[50vh] overflow-hidden relative rounded-l shadow-2xl">
            <video 
                src="./model/veo3.mp4" 
                className="w-full h-full object-cover" 
                autoPlay 
                muted 
                loop
                
            />
            <div className="absolute mt-[1rem] top-0 left-0 text-white font-bold w-full h-full flex items-center flex-col font-ethnocentric">
                {/* for gradient only */}
                <div className="accentText w-auto h-auto ">
                    <h1 className="soft-shadow mx-auto font-bold text-[2rem] text-[black]"> Arian Dane</h1>
                </div>
            </div>
            
           

            <div className="absolute inset-0 bg-pink-500/30 mix-blend-overlay pointer-events-none"/>
        </div>

    </div>)
    
  
}
