import { Volume2, VolumeX } from "lucide-react"
import "./StartingScreen.css"
import "./index.css"

export default function StartingScreen({ onWakeUp, isMuted, onToggleMute }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black z-50 flex flex-col justify-center items-center">
        <h1 className="text-white text-3xl text-center mb-16 font-audiowide" >You've been asleep for far too long</h1>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button className="startButton text-white border-white" onClick={onWakeUp}>Wake up</button>

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            aria-pressed={isMuted}
            className="startButton text-white border-white flex items-center justify-center"
          >
            {isMuted ? <VolumeX size={35} /> : <Volume2 size={35} />}
          </button>
        </div>
    
    </div>
  )
}
