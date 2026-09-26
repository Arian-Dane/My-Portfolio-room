import { useGLTF } from '@react-three/drei'
import { useEffect, useMemo, useState } from 'react'
import SceneInteractions from './interactions/SceneInteractions.jsx'
import ResponsiveCamera from './ResponsiveCamera.jsx'
import Lights from './Lights.jsx'
import { ROOM_URL } from './config.js'
import { setupRoom } from './setupRoom.js'
import { useBakedMaterials } from './hooks/useBakedMaterials.js'
import { useSceneVideos } from './hooks/useSceneVideos.js'
import { useRoomAnimations } from './hooks/useRoomAnimations.js'
import { useMatchOutcome } from './hooks/useMatchOutcome.js'
import { useRendererStats } from './hooks/useRendererStats.js'
import { getDeviceTier, isMobileDevice, TIER_SETTINGS } from '../utils/deviceTier.js'

export default function Experience({ isVisible = false, onVideosReady, isMinimized = false, onEmailClick }) {
    const room = useGLTF(ROOM_URL)
    const tierSettings = useMemo(() => TIER_SETTINGS[getDeviceTier()], [])
    const isMobile = useMemo(() => isMobileDevice(), [])

    useRendererStats()
    useRoomAnimations(room)

    const bakedMaterials = useBakedMaterials(tierSettings)
    const matchOutcome = useMatchOutcome()
    const videoTexturesRef = useSceneVideos({ tierSettings, isVisible, isMinimized, matchOutcome, onVideosReady })

    // Must stay after useSceneVideos: its effect creates the video
    // textures this one assigns to the screens.
    const [interactives, setInteractives] = useState([])
    useEffect(() => {
        setInteractives(setupRoom(room.scene, {
            bakedMaterials,
            videoTextures: videoTexturesRef.current,
        }))
    }, [room.scene, bakedMaterials, videoTexturesRef])

    return (
        <>
            <Lights />
            <ResponsiveCamera isMobile={isMobile} isMinimized={isMinimized} />
            <primitive object={room.scene} />

            {interactives.length > 0 && (
                <SceneInteractions interactives={interactives} onEmailClick={onEmailClick} />
            )}
        </>
    )
}

useGLTF.preload(ROOM_URL)
