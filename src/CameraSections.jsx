
import { useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { CameraControls } from "@react-three/drei"

export default function CameraSections({ cameraSections, active }) {
  const { camera } = useThree()
  const controlsRef = useRef()

  // Original home camera position + target
  const original = {
    cam: { x: -76, y: 26, z: 12 },
    target: { x: 7.5, y: 13.5, z: 0 }
  }

  // Section positions converted to CameraControls-friendly sets
  const sections = {
    contactMe: {
      cam: { x: -22, y: 36.4, z: -2.2 },
      target: { x: 100, y: -11.9, z: -0.03 }
    },
    aboutMe: {
      cam: { x: -6, y: 27.5, z: 20.6 },
      target: { x: -7, y: 10.5, z: -100 }
    },
    experience: {
      cam: { x: 6.5, y: 17.1, z: 5.2 },
      target: { x: 7.99, y: -22.1, z: 74.2 }
    }
  }

  // Apply camera positions on mount
  useEffect(() => {
    if (!controlsRef.current) return
    controlsRef.current.setLookAt(
      original.cam.x,
      original.cam.y,
      original.cam.z,
      original.target.x,
      original.target.y,
      original.target.z,
      true // set instantly on load
    )
  }, [])

  // Handle active section changes
  useEffect(() => {
    const c = controlsRef.current
    

    if (active) {
      // Animate to selected section
      const sec = sections[cameraSections]
      

      c.setLookAt(
        sec.cam.x,
        sec.cam.y,
        sec.cam.z,
        sec.target.x,
        sec.target.y,
        sec.target.z,
        true // animate smoothly
      )
    } else {
      // Animate back to original position
      c.setLookAt(
        original.cam.x,
        original.cam.y,
        original.cam.z,
        original.target.x,
        original.target.y,
        original.target.z,
        true
      )
    }
  }, [cameraSections, active])

  return (
    <CameraControls
      ref={controlsRef}
      smoothTime={1}
      enabled={!active}   
      dollySpeed={0}
      truckSpeed={0}
      minAzimuthAngle={-Math.PI /1.8}  
      maxAzimuthAngle={-0.3}
    //   minAzimuthAngle={Math.PI * 1.5}  
    //   maxAzimuthAngle={Math.PI * 1.85}   
      minPolarAngle={Math.PI / 2.2}     
      maxPolarAngle={Math.PI / 2.2}    
    />
  )
}
