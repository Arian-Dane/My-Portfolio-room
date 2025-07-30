import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import Loader from './Loader.jsx'
import StartingScreen from './StartingScreen.jsx'
import CollapsedSvg from './CollapsedSvg.jsx'
import ExpandSvg from './ExpandSvg.jsx'
import Webpage from "./Webpage.jsx"


function App() {
  const [showLoader, setShowLoader] = useState(true)
  const [showStartingScreen, setShowStartingScreen] = useState(false)
  const [isExperienceVisible, setIsExperienceVisible] = useState(false)
  const [isCanvasMinimized, setIsCanvasMinimized] = useState(false)

  const handleLoaderComplete = () => {
    setShowLoader(false)
    setShowStartingScreen(true)
  }

  const handleWakeUp = () => {
    setShowStartingScreen(false)
    setIsExperienceVisible(true)
  }

   

  return (
    <>
      {showLoader && (
        <Loader onComplete={handleLoaderComplete} />
      )}

      {showStartingScreen && (
        <StartingScreen onWakeUp={handleWakeUp} />
      )}

      
        {/*true: false*/}
      <div 
        className="absolute bg-black "
        style={{
          top: isCanvasMinimized ? '68px' : '0px',
          right: isCanvasMinimized ? '6px' : '0px',
          left: isCanvasMinimized ? 'auto' : '0px',
          width: isCanvasMinimized ? '320px' : '100vw',
          height: isCanvasMinimized ? '240px' : '100vh',
          transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
          zIndex: isCanvasMinimized ? 20 : 1,
          overflow: isCanvasMinimized ? 'visible':'hidden',
          borderRadius: isCanvasMinimized ? "9px":"0px"
          
          
        }}
      >

        <div
        onClick={() => setIsCanvasMinimized(!isCanvasMinimized)}
        className={`absolute z-50 px-1 py-1 transition-transform duration-150 ease-linear ${
          isCanvasMinimized ? 'top-1 right-1' : 'top-1 right-1'
        } cursor-pointer hover:scale-110`}
      >
        {isCanvasMinimized ? <ExpandSvg /> : <CollapsedSvg />}
      </div>
        
        <Canvas 
          camera={{ position: [-63, 31, 11], fov: 45 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Experience isVisible={isExperienceVisible} />
        </Canvas>
      </div>

      {isCanvasMinimized && isExperienceVisible && (
        <Webpage />
      )}
    </>
  )
}

export default App