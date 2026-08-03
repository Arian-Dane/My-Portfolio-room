import { useState, useEffect, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import Loader from './Loader.jsx'
import StartingScreen from './StartingScreen.jsx'
import CollapsedSvg from './CollapsedSvg.jsx'
import ExpandSvg from './ExpandSvg.jsx'
import Webpage from "./Webpage.jsx"

const bgMusic = new Audio("/model/bg-music.MP3")
bgMusic.preload = "auto"
bgMusic.loop = true
bgMusic.volume = 0.2
bgMusic.load()

function App() {
    const [gltfReady, setGltfReady] = useState(false)
    const [videosReady, setVideosReady] = useState(false)

    const [showLoader, setShowLoader] = useState(true)
    const [showStartingScreen, setShowStartingScreen] = useState(false)
    const [isExperienceVisible, setIsExperienceVisible] = useState(false)
    const [isCanvasMinimized, setIsCanvasMinimized] = useState(false)

    const handleGltfComplete = useCallback(() => {
        setGltfReady(true)
    }, [])

    const handleVideosReady = useCallback(() => {
        setVideosReady(true)
    }, [])

    useEffect(() => {
        if (gltfReady && videosReady && showLoader) {
            setShowLoader(false)
            setShowStartingScreen(true)
        }
    }, [gltfReady, videosReady, showLoader])

    const handleWakeUp = () => {
        const startingScreen = document.querySelector('.starting-screen')
        if (startingScreen) {
            startingScreen.style.opacity = '0'
            startingScreen.style.transition = 'opacity 0.5s ease-out'
        }

        bgMusic.play().catch((error) => {
            console.warn('Audio playback failed:', error)
        })

        window.dispatchEvent(new Event('user-wakeup'))

        setTimeout(() => {
            setShowStartingScreen(false)
            setIsExperienceVisible(true)
        }, 100)
    }

    return (
        <div style={{ background: '#000000', width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, overflow: 'hidden' }}>
            {showLoader && (
                <Loader onComplete={handleGltfComplete} />
            )}

            {showStartingScreen && (
                <StartingScreen onWakeUp={handleWakeUp} />
            )}

            <div
                style={{
                    position: 'absolute',
                    top: isCanvasMinimized ? '50px' : '0px',
                    right: isCanvasMinimized ? '20px' : '0px',
                    width: isCanvasMinimized ? '320px' : '100vw',
                    height: isCanvasMinimized ? '240px' : '100vh',
                    zIndex: isCanvasMinimized ? 60 : 1,
                    borderRadius: isCanvasMinimized ? '9px' : '0px',
                    overflow: 'hidden',
                    opacity: showLoader || showStartingScreen ? 0 : 1,
                    transition: 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    pointerEvents: showLoader || showStartingScreen ? 'none' : 'auto',
                    background: '#000000'
                }}
            >
                <div
                    onClick={() => setIsCanvasMinimized(!isCanvasMinimized)}
                    className="absolute z-50 top-1 right-1 px-1 py-1 transition-transform duration-150 ease-linear cursor-pointer hover:scale-110"
                >
                    {isCanvasMinimized ? <ExpandSvg /> : <CollapsedSvg />}
                </div>

                <Canvas
                    style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
                    gl={{
                        antialias: true,
                        alpha: false
                    }}>

                    {/* keep Experience mounted so hitboxes/refs persist */}
                    <Experience
                        isVisible={isExperienceVisible}
                        onVideosReady={handleVideosReady}
                        isMinimized={isCanvasMinimized}
                    />
                </Canvas>
            </div>

            {isCanvasMinimized && isExperienceVisible && (
                <Webpage />
            )}
        </div>
    )
}

export default App