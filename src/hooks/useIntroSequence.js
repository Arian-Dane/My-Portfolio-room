import { useCallback, useEffect, useState } from 'react'

export const FADE_TO_BLACK_MS = 800
export const FADE_FROM_BLACK_MS = 800
const REVEAL_DELAY_MS = 3400

// Loader → starting screen → (fade through black) → 3D experience.
//
// The loader stays up until both the GLB/textures and the gating video
// are ready. `reveal(skipFade)` is called from the "Wake up" button;
// muted visitors skip the black fade, which is timed to the intro music.
export function useIntroSequence() {
    const [gltfReady, setGltfReady] = useState(false)
    const [videosReady, setVideosReady] = useState(false)

    const [showLoader, setShowLoader] = useState(true)
    const [showStartingScreen, setShowStartingScreen] = useState(false)
    const [isExperienceVisible, setIsExperienceVisible] = useState(false)
    const [showBlackOverlay, setShowBlackOverlay] = useState(false)

    const onGltfReady = useCallback(() => setGltfReady(true), [])
    const onVideosReady = useCallback(() => setVideosReady(true), [])

    useEffect(() => {
        if (gltfReady && videosReady && showLoader) {
            setShowLoader(false)
            setShowStartingScreen(true)
        }
    }, [gltfReady, videosReady, showLoader])

    const reveal = (skipFade) => {
        if (skipFade) {
            setShowStartingScreen(false)
            setIsExperienceVisible(true)
            return
        }

        setShowBlackOverlay(true)
        setTimeout(() => {
            setShowStartingScreen(false)
            setIsExperienceVisible(true)
            setShowBlackOverlay(false)
        }, FADE_TO_BLACK_MS + REVEAL_DELAY_MS)
    }

    return {
        showLoader,
        showStartingScreen,
        isExperienceVisible,
        showBlackOverlay,
        onGltfReady,
        onVideosReady,
        reveal,
    }
}
