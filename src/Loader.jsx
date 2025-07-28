import { useProgress } from "@react-three/drei"
import './Loader.css'
import "./index.css"
import { useEffect } from 'react'

export default function Loader({ onComplete }) {
  const { progress } = useProgress()
  
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        onComplete()
      }, 1000) // Small delay to show 100%
    }
  }, [progress, onComplete])
  
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black z-50 flex items-center justify-center">
      <div className="loader">
        <div data-glitch="Loading..." className="glitch">
          Loading... {Math.floor(progress)}%
        </div>
      </div>
    </div>
  )
}