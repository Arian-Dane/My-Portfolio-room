import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Volume2, VolumeX } from 'lucide-react'
import Experience from './Experience.jsx'
import Loader from './Loader.jsx'
import StartingScreen from './StartingScreen.jsx'
import CollapsedSvg from './CollapsedSvg.jsx'
import ExpandSvg from './ExpandSvg.jsx'
import Webpage from "./Webpage.jsx"
import ResizeSync from './ResizeSync.jsx'

const bgMusicIntro = new Audio("/model/bg-music.MP3")
const bgMusicLoop = new Audio("/model/bg-loop.MP3")

bgMusicIntro.preload = "auto"
bgMusicIntro.loop = false
bgMusicIntro.volume = 0.3
bgMusicIntro.load()

bgMusicLoop.preload = "auto"
bgMusicLoop.loop = true
bgMusicLoop.volume = 0.3
bgMusicLoop.load()

// bg-music.MP3 has the welcome voice line and plays once, on
// wake-up. When it ends, hand off to bg-loop.MP3 (no welcome
// message) which then loops natively forever.
bgMusicIntro.addEventListener('ended', () => {
    bgMusicLoop.currentTime = 0
    bgMusicLoop.play().catch((error) =>
        console.warn("Background loop audio failed to start:", error)
    )
})

// how long the fade-to-black takes
const FADE_TO_BLACK_MS = 800
// how long the screen stays fully black before revealing the scene
const REVEAL_DELAY_MS = 3400
// how long the fade-from-black (revealing the scene) takes
const FADE_FROM_BLACK_MS = 800


function App() {

    const [gltfReady, setGltfReady] = useState(false)
    const [videosReady, setVideosReady] = useState(false)

    const [showLoader, setShowLoader] = useState(true)
    const [showStartingScreen, setShowStartingScreen] = useState(false)
    const [isExperienceVisible, setIsExperienceVisible] = useState(false)

    const [isCanvasMinimized, setIsCanvasMinimized] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    // drives the black transition overlay's opacity
    const [showBlackOverlay, setShowBlackOverlay] = useState(false)


    const [isPhone, setIsPhone] = useState(
        window.innerWidth <= 430
    )


    // The canvas container is ALWAYS this exact DOM node — never
    // reparented, never portaled, never conditionally rendered. Only
    // its CSS changes.
    const containerRef = useRef(null)

    // The Webpage placeholder's DOM node, used only to *measure* where
    // the inline slot currently is on screen — never as a mount target.
    const [placeholderEl, setPlaceholderEl] = useState(null)

    const handlePlaceholderRef = useCallback((node) => {
        setPlaceholderEl(node)
    }, [])


    // Kept as a defensive backstop — not currently needed given how
    // StartingScreen wires its two buttons as plain siblings, but
    // harmless to leave in case a click ever fires out of order (e.g.
    // via keyboard activation or assistive tech).
    const suppressNextWakeUpRef = useRef(false)


    useEffect(() => {

        const handleResize = () => {
            setIsPhone(window.innerWidth <= 430)
        }

        window.addEventListener(
            "resize",
            handleResize
        )

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            )
        }

    }, [])



    const handleGltfComplete = useCallback(() => {
        setGltfReady(true)
    }, [])


    const handleVideosReady = useCallback(() => {
        setVideosReady(true)
    }, [])


    const handleToggleMute = useCallback((e) => {
        e?.stopPropagation()
        setIsMuted(prev => !prev)
    }, [])



    useEffect(() => {
        bgMusicIntro.muted = isMuted
        bgMusicLoop.muted = isMuted
    }, [isMuted])



    useEffect(() => {

        if (
            gltfReady &&
            videosReady &&
            showLoader
        ) {

            setShowLoader(false)
            setShowStartingScreen(true)

        }

    }, [
        gltfReady,
        videosReady,
        showLoader
    ])



    const handleWakeUp = () => {

        if (suppressNextWakeUpRef.current) {
            suppressNextWakeUpRef.current = false
            return
        }


        const startingScreen =
            document.querySelector(
                '.starting-screen'
            )


        if (startingScreen) {

            startingScreen.style.opacity = '0'

            startingScreen.style.transition =
                'opacity 0.5s ease-out'

        }


        bgMusicIntro.muted = isMuted


        bgMusicIntro.play()
            .catch(error =>
                console.warn(
                    "Audio failed",
                    error
                )
            )


        window.dispatchEvent(
            new Event("user-wakeup")
        )


        // If the person muted before waking up, there's no audio to
        // build tension around — skip the black-screen fade/delay
        // entirely and reveal the scene right away.
        if (isMuted) {
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



    // true only when we want the canvas to visually sit inline under
    // the Hero section (phone + minimized)
    const isPhoneMinimizedInline =
        isPhone && isCanvasMinimized



    const dockedCanvasStyle =

        isPhone

        ?

        {

            // PHONE FULLSCREEN
            // top/left/width/height are ALL explicit here, on
            // purpose — this is the single source of truth for
            // fullscreen sizing. React fully owns and resets these on
            // every commit; nothing else should ever touch them while
            // this branch is active.

            position:'relative',

            top: '0px',

            left: '0px',

            display:'block',

            width:'100vw',

            height:'100vh',

            borderRadius:'0px',

            overflow:'hidden',

            opacity:
                showLoader ||
                showStartingScreen
                    ? 0
                    : 1,

            transition:
                'all 0.4s cubic-bezier(0.4,0,0.2,1)',

            pointerEvents:
                showLoader ||
                showStartingScreen
                    ? 'none'
                    : 'auto',

            background:'#000000'

        }


        :

        {

            // DESKTOP

            position:'absolute',

            top:
                isCanvasMinimized
                    ? '50px'
                    : '0px',

            left: 'auto',

            right:
                isCanvasMinimized
                    ? '20px'
                    : '0px',


            width:
                isCanvasMinimized
                    ? '320px'
                    : '100vw',


            height:
                isCanvasMinimized
                    ? '240px'
                    : '100vh',


            zIndex:
                isCanvasMinimized
                    ? 60
                    : 1,


            borderRadius:
                isCanvasMinimized
                    ? '9px'
                    : '0px',


            overflow:'hidden',


            opacity:
                showLoader ||
                showStartingScreen
                    ? 0
                    : 1,


            transition:
                'all 0.4s cubic-bezier(0.4,0,0.2,1)',


            pointerEvents:
                showLoader ||
                showStartingScreen
                    ? 'none'
                    : 'auto',


            background:'#000000'

        }


    // base style applied via React when docked inline (phone +
    // minimized) — top/left/width/height start at sane defaults so
    // there's never a frame with an unset/NaN position before the
    // sync effect's first frame runs.
    const inlineBaseStyle = {

        position: 'fixed',

        top: 0,

        left: 0,

        width: '100%',

        height: '250px',

        // kept below the desktop floating-widget's zIndex (60) on
        // purpose — this only needs to clear other fixed-position
        // page chrome (e.g. CyberNav), not sit above everything
        zIndex: 5,

        borderRadius: '12px',

        overflow: 'hidden',

        background: '#000000',

        opacity:
            showLoader ||
            showStartingScreen
                ? 0
                : 1,

        pointerEvents:
            showLoader ||
            showStartingScreen
                ? 'none'
                : 'auto',

    }



    // Keeps the (never-reparented) canvas container's fixed position
    // glued to wherever the Webpage placeholder currently sits on
    // screen, including as the page scrolls. Only ever runs its
    // imperative sync loop while docked inline. When NOT docked
    // inline, this effect intentionally does nothing — dockedCanvasStyle
    // already fully specifies top/left/width/height itself via React,
    // so React's own commit has already applied the correct values by
    // the time this effect runs.
    useLayoutEffect(() => {

        const el = containerRef.current
        if (!el) return

        if (!isPhoneMinimizedInline || !placeholderEl) {
            return
        }

        let rafId

        const sync = () => {
            const rect = placeholderEl.getBoundingClientRect()
            el.style.top = `${rect.top}px`
            el.style.left = `${rect.left}px`
            el.style.width = `${rect.width}px`
            el.style.height = `${rect.height}px`
            rafId = requestAnimationFrame(sync)
        }

        rafId = requestAnimationFrame(sync)

        return () => {
            cancelAnimationFrame(rafId)
        }

    }, [isPhoneMinimizedInline, placeholderEl])




    return (

        <div

            style={{

                background:'#000000',

                width:'100%',

                minHeight:'100vh',

                position:
                    isPhone
                        ? 'relative'
                        : 'fixed',

                top:0,

                left:0,

                overflow:
                    isPhone
                        ? 'visible'
                        : 'hidden'

            }}

        >


            {
                showLoader &&
                <Loader
                    onComplete={
                        handleGltfComplete
                    }
                />
            }



            {
                showStartingScreen &&

                <StartingScreen

                    onWakeUp={
                        handleWakeUp
                    }

                    isMuted={
                        isMuted
                    }

                    onToggleMute={
                        handleToggleMute
                    }

                />

            }




            {
                // Black transition overlay. Always mounted (so the
                // opacity transition can animate both in and out) —
                // only its opacity/pointerEvents toggle.
            }
            <div

                style={{

                    position: 'fixed',

                    inset: 0,

                    background: '#000000',

                    zIndex: 9999,

                    opacity:
                        showBlackOverlay
                            ? 1
                            : 0,

                    transition:
                        `opacity ${
                            showBlackOverlay
                                ? FADE_TO_BLACK_MS
                                : FADE_FROM_BLACK_MS
                        }ms ease-in-out`,

                    pointerEvents:
                        showBlackOverlay
                            ? 'auto'
                            : 'none',

                }}

            />




            <div

                ref={containerRef}

                style={
                    isPhoneMinimizedInline
                        ? inlineBaseStyle
                        : dockedCanvasStyle
                }

            >


                <div

                    onClick={() =>
                        setIsCanvasMinimized(
                            !isCanvasMinimized
                        )
                    }

                    className="
                    absolute z-50 top-1 right-1
                    px-1 py-1
                    cursor-pointer
                    hover:scale-110
                    transition-transform
                    "

                >

                    {
                        isCanvasMinimized
                            ?
                            <ExpandSvg/>
                            :
                            <CollapsedSvg/>
                    }

                </div>




                <button

                    type="button"

                    onClick={
                        handleToggleMute
                    }

                    className="
                    absolute z-50 top-1 left-1
                    p-3 rounded-lg
                    bg-white/5
                    border border-white/10
                    text-white/70
                    "

                >

                    {
                        isMuted
                            ?
                            <VolumeX size={35}/>
                            :
                            <Volume2 size={35}/>
                    }

                </button>




                <Canvas

                    style={{
                        width:'100%',
                        height:'100%'
                    }}

                    gl={{
                        antialias:true,
                        alpha:false
                    }}

                >

                    <ResizeSync
                        watch={
                            isPhoneMinimizedInline
                        }
                    />

                    <Experience

                        isVisible={
                            isExperienceVisible
                        }

                        onVideosReady={
                            handleVideosReady
                        }

                        isMinimized={
                            isCanvasMinimized
                        }

                    />


                </Canvas>


            </div>




            {
                isCanvasMinimized &&
                isExperienceVisible &&

                <Webpage

                    isMuted={isMuted}

                    onToggleMute={
                        handleToggleMute
                    }

                    isPhoneMinimizedInline={
                        isPhoneMinimizedInline
                    }

                    placeholderRef={
                        handlePlaceholderRef
                    }

                />

            }


        </div>

    )

}


export default App