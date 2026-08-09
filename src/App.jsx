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

bgMusicIntro.addEventListener('ended', () => {
    bgMusicLoop.currentTime = 0
    bgMusicLoop.play().catch((error) =>
        console.warn("Background loop audio failed to start:", error)
    )
})

const FADE_TO_BLACK_MS = 800
const REVEAL_DELAY_MS = 3400
const FADE_FROM_BLACK_MS = 800


function App() {

    const [gltfReady, setGltfReady] = useState(false)
    const [videosReady, setVideosReady] = useState(false)

    const [showLoader, setShowLoader] = useState(true)
    const [showStartingScreen, setShowStartingScreen] = useState(false)
    const [isExperienceVisible, setIsExperienceVisible] = useState(false)

    const [isCanvasMinimized, setIsCanvasMinimized] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    const [showBlackOverlay, setShowBlackOverlay] = useState(false)

    // NEW: id of a section (e.g. 'contact') to scroll to once the
    // Webpage view is actually mounted and on screen. Set by any
    // trigger that both minimizes the canvas AND wants to jump to a
    // specific section — currently just the email mesh/icon.
    const [pendingScrollTarget, setPendingScrollTarget] = useState(null)


    const [isPhone, setIsPhone] = useState(
        window.innerWidth <= 430
    )


    const containerRef = useRef(null)

    const [placeholderEl, setPlaceholderEl] = useState(null)

    const handlePlaceholderRef = useCallback((node) => {
        setPlaceholderEl(node)
    }, [])


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


    // NEW: fired when the person clicks the email mesh in the 3D
    // scene. Minimizes the canvas (if not already) and queues up a
    // scroll to the contact section once the webpage view is ready.
    const handleEmailMeshClick = useCallback(() => {
        setIsCanvasMinimized(true)
        setPendingScrollTarget('contact')
    }, [])


    // NEW: once the canvas is minimized AND the experience is
    // visible (meaning <Webpage> — and everything inside it,
    // including the contact section — is actually mounted), scroll to
    // whatever section was requested. The extra frame delay gives the
    // just-mounted DOM a chance to lay out before we measure it.
    useEffect(() => {

        if (!pendingScrollTarget) return
        if (!(isCanvasMinimized && isExperienceVisible)) return

        const rafId = requestAnimationFrame(() => {
            const el = document.getElementById(pendingScrollTarget)
            el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setPendingScrollTarget(null)
        })

        return () => cancelAnimationFrame(rafId)

    }, [pendingScrollTarget, isCanvasMinimized, isExperienceVisible])



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



    const isPhoneMinimizedInline =
        isPhone && isCanvasMinimized



    const dockedCanvasStyle =

        isPhone

        ?

        {

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


    const inlineBaseStyle = {

        position: 'fixed',

        top: 0,

        left: 0,

        width: '100%',

        height: '250px',

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

                        onEmailClick={
                            handleEmailMeshClick
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