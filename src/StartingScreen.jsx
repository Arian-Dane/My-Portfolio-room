import "./StartingScreen.css"
import "./index.css"

export default function StartingScreen({ onWakeUp }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black z-50 flex flex-col justify-center items-center">
        <h1 className="text-white text-3xl text-center mb-16 font-audiowide" >You've been asleep for far too long</h1>

        <button className="text-white border-white" onClick={onWakeUp}>Wake up</button>
        
    
    </div>
  )
}