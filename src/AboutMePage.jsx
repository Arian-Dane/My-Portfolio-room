import "./AboutMePage.css"
import "./index.css"

export default function AboutMePage(){
    return(
        <div className="h-[100vh] w-[60vw] mx-auto ">
            <div className="flex pt-[4rem] justify-center h-[80vh] bg-[#1b0b2f] shadow-[0_0_40px_10px_rgba(27,11,47,0.6)] backdrop-blur-sm bg-opacity-90" >
                
                <div className=" h-[35vh] w-[25rem] mx-9 top-left-bottom-right-clip rounded-xl bg-white backgroundGradient text-center mt-[2.5rem]" >
                    
                    <h1 className="font-extrabold text-[2rem] text-midnight">Inventive</h1>
                    <img className="mx-auto pink-glow w-[14rem] " src="./model/SVGs/abstract1.png" alt="rappit head outline" />
                    <p className="text-[0.8rem] mt-[0.1rem] ">
                        I’m Arian, a 23-year-old Computer Science student, freelancer, and full-stack developer.  
                    </p>
                </div >

                <div className="h-[40vh] w-[20vw] mx-9 cyberpunk-box rounded-xl bg-deepPurple text-center">
                    <h1 className="font-extrabold text-[2rem] mt-[-1.5rem] ">Focused</h1>
                    <img className="mx-auto pink-glow w-[14rem] h-[14rem] mt-[0.2rem]" src="./model/SVGs/rabbitImage.png" alt="rappit head outline" />
                    <p className="text-[0.8rem] text-center mt-[1rem] ">I’m Arian, a 23-year-old Computer Science student, freelancer, and full-stack developer.  
                         
                    </p>
                </div>

                

                <div className="h-[35vh] w-[25rem] mx-9 top-left-clip top-right-bottom-left-clip rounded-xl bg-white backgroundGradient mt-[2.5rem] text-center">
                    <h1 className="font-extrabold text-[2rem]  ">Focused</h1>
                    <img className="mx-auto pink-glow w-[14rem] h-[14rem] mt-[-1rem]" src="./model/SVGs/abstract2.png" alt="rappit head outline" />
                    <p className="text-[0.8rem] text-center mt-[0.5rem] ">I’m Arian, a 23-year-old Computer Science student, freelancer, and full-stack developer.  
                    </p>
                </div>

            </div>
        </div>
    )
}