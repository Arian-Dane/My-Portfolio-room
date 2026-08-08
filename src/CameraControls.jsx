import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

const MOBILE_FOV = 68
const MOBILE_MINIMIZED_FOV = 35
const DESKTOP_FOV = 31

// how far back to pull the camera along its own facing direction on
// mobile, in scene units — tweak to taste
const MOBILE_PULLBACK = 8
const MOBILE_MINIMIZED_PULLBACK = 8

export default function CameraControls({ isMobile = false, isMinimized = false }) {
    const { camera } = useThree()

    // only relevant when isMobile is true — desktop ignores isMinimized
    const isMobileMinimized = isMobile && isMinimized

    const fov = isMobile
        ? (isMinimized ? MOBILE_MINIMIZED_FOV : MOBILE_FOV)
        : DESKTOP_FOV

    const pullback = isMobileMinimized
        ? MOBILE_MINIMIZED_PULLBACK
        : MOBILE_PULLBACK

    useEffect(() => {
        camera.fov = fov

        if (isMobile) {
            // translateZ moves along the camera's own local axis
            // (positive Z is "backward" from where it's facing), so
            // this works no matter what absolute position/rotation
            // was set upstream (e.g. via the Canvas camera prop)
            camera.translateZ(pullback)
        }

        camera.updateProjectionMatrix()

        // reverse the pullback on cleanup so this stays idempotent —
        // without this, any isMobile/isMinimized toggle would
        // compound the offset each time the effect reruns
        return () => {
            if (isMobile) {
                camera.translateZ(-pullback)
            }
        }
    }, [camera, isMobile, fov, pullback])

    return null
}