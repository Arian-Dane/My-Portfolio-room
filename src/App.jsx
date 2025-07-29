import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import Loader from './Loader'
import StartingScreen from './StartingScreen'
import CollapsedSvg from './CollapsedSvg'
import ExpandSvg from './ExpandSvg'


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
        className="absolute bg-black"
        style={{
          top: isCanvasMinimized ? '16px' : '0px',
          right: isCanvasMinimized ? '16px' : '0px',
          left: isCanvasMinimized ? 'auto' : '0px',
          width: isCanvasMinimized ? '320px' : '100vw',
          height: isCanvasMinimized ? '240px' : '100vh',
          transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
          zIndex: isCanvasMinimized ? 20 : 1,
          overflow: isCanvasMinimized ? 'visible':'hidden'
          
        }}
      >

        <div
        onClick={() => setIsCanvasMinimized(!isCanvasMinimized)}
        className={`absolute z-30 px-1 py-1 transition-transform duration-150 ease-linear ${
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
        <div className="  text-white bg-black">
          <h1 className="text-4xl mt-16">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt alias numquam unde repudiandae magni, quae</h1>
        </div>
      )}
    </>
  )
}

export default App