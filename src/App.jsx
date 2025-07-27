import './App.css'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import StartScreen from "./StartingScreen.jsx"
import { Suspense, useState } from 'react'
import Loader from './Loader.jsx'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasWokenUp, setHasWokenUp] = useState(false)
  
  return (
    <>
      <Canvas id='canvas'

        camera={{ position: [-58.30438164380116, 32.174307365034554, 22.54386735152263], near: 0.6, far: 1000, fov: 40 }}
        gl={{
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.NoToneMapping,
          antialias: true 
        }}>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>

      {/* Loader overlay */}
      {/*
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}*/}
      
      {/* Start screen overlay */}
      {/*{!isLoading && !hasWokenUp && (
        <StartScreen onWakeUp={() => setHasWokenUp(true)} />
      )}*/}
      
    </>
  )
}

export default App