import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import Loader from './Loader'
import StartingScreen from './StartingScreen'

function App() {
  const [showLoader, setShowLoader] = useState(true)
  const [showStartingScreen, setShowStartingScreen] = useState(false)
  const [isExperienceVisible, setIsExperienceVisible] = useState(false)

  // Handle loader completion
  const handleLoaderComplete = () => {
    setShowLoader(false)
    setShowStartingScreen(true)
  }

  // Handle wake up button click
  const handleWakeUp = () => {
    setShowStartingScreen(false)
    setIsExperienceVisible(true)
  }

  return (
    <>
      {/* Loader Screen */}
      {showLoader && (
        <Loader onComplete={handleLoaderComplete} />
      )}

      {/* Starting Screen */}
      {showStartingScreen && (
        <StartingScreen onWakeUp={handleWakeUp} />
      )}

      {/* Three.js Canvas - Always mounted but Experience knows when to activate */}
      <Canvas camera={{ position: [0, 15, 15], fov: 45 }}>
        <Experience isVisible={isExperienceVisible} />
      </Canvas>
    </>
  )
}

export default App

