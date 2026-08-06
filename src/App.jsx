import { useState, useEffect, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Volume2, VolumeX } from 'lucide-react'
import Experience from './Experience.jsx'
import Loader from './Loader.jsx'
import StartingScreen from './StartingScreen.jsx'
import CollapsedSvg from './CollapsedSvg.jsx'
import ExpandSvg from './ExpandSvg.jsx'
import Webpage from "./Webpage.jsx"

const bgMusic = new Audio("/model/bg-music.MP3")
bgMusic.preload = "auto"
bgMusic.loop = true
bgMusic.volume = 0.5
bgMusic.load()

function App() {
    const [gltfReady, setGltfReady] = useState(false)
    const [videosReady, setVideosReady] = useState(false)

    const [showLoader, setShowLoader] = useState(true)
    const [showStartingScreen, setShowStartingScreen] = useState(false)
    const [isExperienceVisible, setIsExperienceVisible] = useState(false)
    const [isCanvasMinimized, setIsCanvasMinimized] = useState(false)

    // Unmuted by default — the person can mute from the loader (and later
    // wherever else this control is surfaced) before the music ever starts.
    const [isMuted, setIsMuted] = useState(false)

    const handleGltfComplete = useCallback(() => {
        setGltfReady(true)
    }, [])

    const handleVideosReady = useCallback(() => {
        setVideosReady(true)
    }, [])

    const handleToggleMute = useCallback(() => {
        console.log('handleToggleMute fired')
        setIsMuted((prev) => {
            console.log('isMuted changing from', prev, 'to', !prev)
            return !prev
        })
    }, [])

    // Keep the actual <audio> element's muted state in sync with the toggle,
    // whether or not it's already playing.
    useEffect(() => {
        bgMusic.muted = isMuted
    }, [isMuted])

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

        bgMusic.muted = isMuted
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
                <StartingScreen
                    onWakeUp={handleWakeUp}
                    isMuted={isMuted}
                    onToggleMute={handleToggleMute}
                />
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

                <button
                    type="button"
                    onClick={handleToggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    aria-pressed={isMuted}
                    className="absolute z-50 top-1 left-1 p-3 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                    {isMuted ? <VolumeX size={35} /> : <Volume2 size={35} />}
                </button>

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
                <Webpage isMuted={isMuted} onToggleMute={handleToggleMute} />
            )}
        </div>
    )
}

export default App
