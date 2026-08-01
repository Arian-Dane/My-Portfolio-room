import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

const MOBILE_FOV = 65
const DESKTOP_FOV = 31
// how far back to pull the camera along its own facing direction on mobile,
// in scene units — tweak to taste
const MOBILE_PULLBACK = 8

export default function CameraControls({ isMobile = false }) {
    const { camera } = useThree()

    useEffect(() => {
        camera.fov = isMobile ? MOBILE_FOV : DESKTOP_FOV

        if (isMobile) {
            // translateZ moves along the camera's own local axis (positive Z
            // is "backward" from where it's facing), so this works no matter
            // what absolute position/rotation was set upstream (e.g. via the
            // Canvas camera prop in App.jsx)
            camera.translateZ(MOBILE_PULLBACK)
        }

        camera.updateProjectionMatrix()

        // reverse the pullback on cleanup so this stays idempotent — without
        // this, React 18 Strict Mode's double-invoke in dev (and any future
        // isMobile toggle) would compound the offset each time the effect reruns
        return () => {
            if (isMobile) {
                camera.translateZ(-MOBILE_PULLBACK)
            }
        }
    }, [camera, isMobile])

    return null
}
