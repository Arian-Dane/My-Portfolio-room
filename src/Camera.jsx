import { useThree,useFrame } from '@react-three/fiber' 
import * as THREE from 'three'
import { useEffect } from 'react'


export default function Camera(){

    const {camera} = useThree()

    //useFrame(() => {
      //  console.log('Camera position:', camera.position)
        //console.log('Rotation (degrees):', {
          //  x: THREE.MathUtils.radToDeg(camera.rotation.x).toFixed(2),
            //y: THREE.MathUtils.radToDeg(camera.rotation.y).toFixed(2),
            //z: THREE.MathUtils.radToDeg(camera.rotation.z).toFixed(2),
        //})
     //})


    useEffect(() => {
        camera.rotation.set(
        THREE.MathUtils.degToRad(59), // x-axis
        THREE.MathUtils.degToRad(70), // y-axis
        THREE.MathUtils.degToRad(57)  // z-axis
        )
    }, [camera])

    return(
        <></>
    )
}