import { useEffect } from 'react'
import { useAnimations } from '@react-three/drei'

// Animation clip name → playback speed.
const CLIP_SPEEDS = {
    Chair_Spin: 0.9,
    catt: 1.5,
    Vac_Animation: 0.5,
}

export function useRoomAnimations(room) {
    const { actions } = useAnimations(room.animations, room.scene)

    useEffect(() => {
        for (const [clip, speed] of Object.entries(CLIP_SPEEDS)) {
            const action = actions[clip]
            if (!action) continue
            action.play()
            action.timeScale = speed
        }
    }, [actions])
}
