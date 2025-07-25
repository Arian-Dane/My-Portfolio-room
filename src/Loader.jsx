import { useProgress,Html } from "@react-three/drei"
import './Loader.css'
import { color } from "three/tsl"

export default function Loader(){
    const {progress} = useProgress()
    
    return(
        <Html center >
            <div className="loader">
               <div data-glitch="Loading..." className="glitch">Loading... {Math.floor(progress)}% </div>
            </div>
        </Html>
        
    )
}