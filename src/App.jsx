import { useState, useEffect, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './scene/Experience.jsx'
import ResizeSync from './scene/ResizeSync.jsx'
import Loader from './components/Loader.jsx'
import StartingScreen from './components/StartingScreen.jsx'
import FadeOverlay from './components/FadeOverlay.jsx'
import CanvasWindow from './components/CanvasWindow.jsx'
import Webpage from './webpage/Webpage.jsx'
import { preloadHeroVideo } from './webpage/heroVideo.js'
import { bufferIntroMusic, playIntroMusic, setMusicMuted } from './audio/backgroundMusic.js'
import { useIntroSequence } from './hooks/useIntroSequence.js'
import { useIsPhone } from './hooks/useIsPhone.js'
import { useDeferredScroll } from './hooks/useDeferredScroll.js'

function App() {
    const intro = useIntroSequence()
    const isPhone = useIsPhone()

    const [isCanvasMinimized, setIsCanvasMinimized] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    // On phones the minimized canvas sits inline in the webpage, glued
    // to a placeholder <div> that Webpage reserves for it.
    const isPhoneMinimizedInline = isPhone && isCanvasMinimized
    const [placeholderEl, setPlaceholderEl] = useState(null)

    // The webpage (and every section in it) only exists while minimized.
    const isWebpageShown = isCanvasMinimized && intro.isExperienceVisible
    const scrollToSection = useDeferredScroll(isWebpageShown)

    useEffect(() => setMusicMuted(isMuted), [isMuted])

    useEffect(() => {
        if (intro.showStartingScreen) bufferIntroMusic()
    }, [intro.showStartingScreen])

    const handleToggleMute = useCallback((e) => {
        e?.stopPropagation()
        setIsMuted((prev) => !prev)
    }, [])

    // Clicking the email mesh in the 3D scene jumps to the contact form.
    const handleEmailMeshClick = useCallback(() => {
        setIsCanvasMinimized(true)
        scrollToSection('contact')
    }, [scrollToSection])

    const handleWakeUp = () => {
        playIntroMusic()

        // Start buffering the webpage's hero video now so it's ready to
        // play instantly the first time the canvas is minimized.
        preloadHeroVideo()

        window.dispatchEvent(new Event('user-wakeup'))
        intro.reveal(isMuted)
    }

    return (
        <div
            style={{
                background: '#000000',
                width: '100%',
                minHeight: '100vh',
                position: isPhone ? 'relative' : 'fixed',
                top: 0,
                left: 0,
                overflow: isPhone ? 'visible' : 'hidden',
            }}
        >
            {intro.showLoader && <Loader onComplete={intro.onGltfReady} />}

            {intro.showStartingScreen && (
                <StartingScreen
                    onWakeUp={handleWakeUp}
                    isMuted={isMuted}
                    onToggleMute={handleToggleMute}
                />
            )}

            <FadeOverlay visible={intro.showBlackOverlay} />

            <CanvasWindow
                isHidden={intro.showLoader || intro.showStartingScreen}
                isPhone={isPhone}
                isMinimized={isCanvasMinimized}
                isInline={isPhoneMinimizedInline}
                inlineTargetEl={placeholderEl}
                onToggleMinimize={() => setIsCanvasMinimized(!isCanvasMinimized)}
                isMuted={isMuted}
                onToggleMute={handleToggleMute}
            >
                <Canvas
                    style={{ width: '100%', height: '100%' }}
                    gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
                >
                    <ResizeSync watch={isPhoneMinimizedInline} />
                    <Experience
                        isVisible={intro.isExperienceVisible}
                        onVideosReady={intro.onVideosReady}
                        isMinimized={isCanvasMinimized}
                        onEmailClick={handleEmailMeshClick}
                    />
                </Canvas>
            </CanvasWindow>

            {isWebpageShown && (
                <Webpage
                    isMuted={isMuted}
                    onToggleMute={handleToggleMute}
                    isPhoneMinimizedInline={isPhoneMinimizedInline}
                    placeholderRef={setPlaceholderEl}
                />
            )}
        </div>
    )
}

export default App
