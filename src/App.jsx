import './App.css'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'


function App() {
  

  return (
  
    <Canvas id='canvas'
    camera={{ position: [-40, 40, 30] , near: 0.6, far: 1000, fov: 45 }}
    
      gl={{
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.NoToneMapping,
        antialias: true 
        
    }}>
      <Experience />
      
    </Canvas>
    
      
    
  )
}

export default App
