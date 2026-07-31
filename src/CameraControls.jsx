// import { useThree,useFrame } from '@react-three/fiber' 
// import * as THREE from 'three'
// import { useEffect,useRef} from 'react'


// export default function CameraControls(){

//     const {camera} = useThree()
//     const controlsRef = useRef()

//     // useFrame(() => {
//     //   console.log('Camera position:', camera.position)
//     //   console.log('Rotation (degrees):', {
//     //     x: THREE.MathUtils.radToDeg(camera.rotation.x).toFixed(2),
//     //     y: THREE.MathUtils.radToDeg(camera.rotation.y).toFixed(2),
//     //     z: THREE.MathUtils.radToDeg(camera.rotation.z).toFixed(2),
//     //     })

        
//     // })

//     useFrame(() => {
//       if (controlsRef.current) {
//         console.log('=== COPY THESE VALUES ===')
//         console.log('Position:', {
//           x: camera.position.x.toFixed(2),
//           y: camera.position.y.toFixed(2),
//           z: camera.position.z.toFixed(2),
//         })
//         console.log('Target:', {
//           x: controlsRef.current.target.x.toFixed(2),
//           y: controlsRef.current.target.y.toFixed(2),
//           z: controlsRef.current.target.z.toFixed(2),
//         })
//         console.log('========================')
//       }
//     })


//     useEffect(() => {

//        //camera.position.set(-63, 31, 11)
//        camera.position.set(-59, 26, 12.7)

//         camera.fov = 40

        

//         camera.rotation.set(
//         THREE.MathUtils.degToRad(-49), // x
//         THREE.MathUtils.degToRad(-73), // y
//         THREE.MathUtils.degToRad(-47)  // z
//         )

//         camera.updateProjectionMatrix()
//     }, [camera])

//     return(
//         <></>
//     )
// }
import { useThree, useFrame } from '@react-three/fiber' 
import { useEffect, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

export default function CameraControls(){
     const {camera} = useThree()
    // const controlsRef = useRef()

    // // Interactive GUI controls!
    // const { posX, posY, posZ, targetX, targetY, targetZ, fov } = useControls({
    //   posX: { value: -76, min: -100, max: 100, step: 0.01 },
    //   posY: { value: 26, min: -100, max: 100, step: 0.01 },
    //   posZ: { value: 12.7, min: -100, max: 100, step: 0.01 },
    //   targetX: { value: 7.5, min: -100, max: 100, step: 0.01 },
    //   targetY: { value: 13.5, min: -100, max: 100, step: 0.01 },
    //   targetZ: { value: 0, min: -100, max: 100, step: 0.01 },
    //   fov: { value: 31, min: 10, max: 120, step: 1 }
    // })

    // // Update camera in real-time as you drag sliders
     useEffect(() => {
    //    camera.position.set(posX, posY, posZ)
        camera.fov = 31
       
    //    if (controlsRef.current) {
    //      controlsRef.current.target.set(targetX, targetY, targetZ)
    //      controlsRef.current.update()
        //}
       
       camera.updateProjectionMatrix()
    }, [])
    //, [camera, posX, posY, posZ, targetX, targetY, targetZ, fov])

    // return <OrbitControls ref={controlsRef} />
}
