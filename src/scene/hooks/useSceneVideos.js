import { useEffect, useRef } from 'react'
import { VIDEO_URLS } from '../config.js'
import { createHiddenVideo, createVideoTexture, destroyHiddenVideo, tryPlay } from '../videoElements.js'

// If the gating video never reports `canplay`, let the loader finish anyway.
const READY_FALLBACK_MS = 4000

// Owns the three in-room screens:
//   idle      — League monitor. Gates the loading screen; paused while
//               minimized; swaps to Victory/Defeat once the match is known.
//   cyberpunk,
//   arcane    — ambient screens. Only buffer once idle can play, and only
//               play while the full-size room is on screen.
// Returns a ref holding the VideoTextures, keyed by screen name.
export function useSceneVideos({ tierSettings, isVisible, isMinimized, matchOutcome, onVideosReady }) {
    const videosRef = useRef({})
    const texturesRef = useRef({})

    const onVideosReadyRef = useRef(onVideosReady)
    useEffect(() => {
        onVideosReadyRef.current = onVideosReady
    }, [onVideosReady])

    useEffect(() => {
        const idle = createHiddenVideo(VIDEO_URLS.defeat)
        const cyberpunk = createHiddenVideo(VIDEO_URLS.cyberpunk, 'metadata')
        const arcane = createHiddenVideo(VIDEO_URLS.arcane, 'metadata')
        const ambient = [cyberpunk, arcane]

        videosRef.current = { idle, cyberpunk, arcane }
        texturesRef.current = {
            idle: createVideoTexture(idle),
            cyberpunk: createVideoTexture(cyberpunk),
            arcane: createVideoTexture(arcane),
        }

        tryPlay(idle, 'idle initial')

        // Low tier never plays the ambient screens; a play/pause kick
        // makes them show their first frame instead of black.
        if (!tierSettings.playAmbientVideos) {
            ambient.forEach((v) => v.play().then(() => v.pause()).catch(() => {}))
        }

        let settled = false
        const markReady = () => {
            if (settled) return
            settled = true
            onVideosReadyRef.current?.()
        }
        if (idle.readyState >= 3) markReady()
        else idle.addEventListener('canplay', markReady, { once: true })
        const fallbackTimer = setTimeout(markReady, READY_FALLBACK_MS)

        // Once the idle monitor can play, let the ambient screens buffer so
        // they're ready by the time the person hits "Wake up".
        const bufferAmbient = () => ambient.forEach((v) => { v.preload = 'auto' })
        idle.addEventListener('canplay', bufferAmbient, { once: true })

        // "Wake up" is a user gesture — the moment iOS will allow playback.
        const forcePlayAll = () => [cyberpunk, arcane, idle].forEach((v) => tryPlay(v, 'iOS forced'))
        window.addEventListener('user-wakeup', forcePlayAll)

        return () => {
            clearTimeout(fallbackTimer)
            window.removeEventListener('user-wakeup', forcePlayAll)
            idle.removeEventListener('canplay', markReady)
            idle.removeEventListener('canplay', bufferAmbient)
            Object.values(videosRef.current).forEach(destroyHiddenVideo)
            Object.values(texturesRef.current).forEach((t) => t.dispose())
        }
    }, [tierSettings.playAmbientVideos])

    useEffect(() => {
        if (!tierSettings.playAmbientVideos) return
        const { cyberpunk, arcane } = videosRef.current

        if (isVisible && !isMinimized) {
            tryPlay(cyberpunk, 'cyberpunk')
            tryPlay(arcane, 'arcane')
        } else {
            cyberpunk?.pause()
            arcane?.pause()
        }
    }, [isVisible, isMinimized, tierSettings.playAmbientVideos])

    // Pause the League monitor while minimized so it doesn't hog the
    // decoder the webpage's hero video needs.
    const isMinimizedRef = useRef(isMinimized)
    useEffect(() => {
        isMinimizedRef.current = isMinimized
        const { idle } = videosRef.current
        if (!idle) return
        if (isMinimized) idle.pause()
        else tryPlay(idle, 'idle re-play on minimize toggle')
    }, [isMinimized])

    useEffect(() => {
        const { idle } = videosRef.current
        if (matchOutcome === null || !idle) return
        idle.src = matchOutcome ? VIDEO_URLS.victory : VIDEO_URLS.defeat
        if (!isMinimizedRef.current) tryPlay(idle, 'idle swap')
    }, [matchOutcome])

    return texturesRef
}
