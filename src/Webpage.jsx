import "./Webpage.css";

export default function Webpage() {

    

  return (
    <div className="mx-1 overflow-hidden">
        
        <div className="flex mask z-10 justify-between w-screen h-[2.8rem] relative shadow overflow-hidden rounded-bl rounded-br font-ethnocentric">
            <div className="Navbar1 py-2 flex relative z-10  w-[60%] bg-midnight h-full items-center justify-between ">
                <div className="ml-[7%]  ">
                    
                    <div className=" pt-4 pb-2 mb-[2px] ">
                        <h1 className="  my-[-8px] text-[1.4rem] tracking-[0.25rem] font-bold text-left normpink">異体同心</h1>
                        <h2 className=" text-white custom-H2 text-[0.7rem] text-right pr-[6px]">Dare To Dream</h2>
                    </div>

                </div>

                
                <ul className=" flex mt-4 text-[0.8rem] pt-3 gap-[10rem] ">
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
            <div className="Navbar2 flex z-10 relative h-full mr-[2.2rem] text-[0.9rem] my-[1px] ">
                <div className="text-black w-full flex gap-[3.8rem]">
                        <button className="rounded-[4px] p-2 my-1">Get In Touch</button>
                        <button className="h-[35px] w-[105px] p-[8px] my-1 ">Github</button>
                        <button className="h-[35px] w-[105px] p-[8px] my-1 ">LinkedIn</button>
                </div>
            </div>
        </div>

        <div className="w-full h-[50vh] overflow-hidden relative rounded-l shadow-2xl">
            <video 
                src="./model/veo3.mp4" 
                className="w-full h-full object-cover brightness-[0.8] " 
                autoPlay 
                muted 
                loop
                
            />
            <div className="absolute mt-[4rem] top-0 left-0 text-white font-bold w-full h-full flex items-center flex-col font-ethnocentric">
                {/* for gradient only */}
                <div className="accentText w-auto h-auto ">
                    <h1 className="soft-shadow mx-auto font-bold text-[2rem] "> Arian Dane</h1>
                </div>
                <hr className="w-[30%] h-[2px] my-1 border-0 bg-gradient-to-r from-transparent via-white to-transparent " />
                <h2 className="text-white text-[3rem] text-center drop-shadow-2xl"> <span className="accentText drop-shadow-2xl">Fullstack</span> Software <br /> Developer </h2>
                <hr className="w-[30%] h-[2px] my-[1rem] border-0 bg-gradient-to-r from-transparent via-white to-transparent drop-shadow-2xl" />
                <p className="text-gray-100 text-[1.1rem] leading-[1rem] drop-shadow-2xl">Compiling Dreams Since <span className="accentText text-[1.7rem]">2002</span></p>
            </div>
            
           

            <div className="absolute inset-0 bg-pink-500/30 mix-blend-overlay pointer-events-none"/>
            
        </div>

    </div>)
    
  
}
