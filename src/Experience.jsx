import * as THREE from 'three'
import { useGLTF, useTexture, useAnimations } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useState, useRef, useMemo } from 'react'
import HoverAnimations from './HoverAnimations.jsx'
import CameraControls from './CameraControls.jsx'
import Lights from './Lights.jsx'
import RiotApiCall from './API/RiotAPI.js'
import { getDeviceTier, TIER_SETTINGS } from './utils/deviceTier.js'
import { useRendererStats } from './hooks/useRendererStats.js'

const BAKE_URLS = {
    bake1: '/model/bake1.webp',
    bake2: '/model/bake2.webp',
    bake3: '/model/bake3.webp',
    bake4: '/model/bake4.webp',
    bake5: '/model/bake5.webp',
    bake6: '/model/bake6.webp',
    bake7: '/model/bake7.webp',
}

const EMPTY_HITBOXES = {
    githubHitbox: null,
    linkedInHitbox: null,
    emailHitbox: null,
    aboutMeHitbox: null,
    contactMeHitbox: null,
    experienceHitbox: null,
}

export default function Experience({ isVisible = false, onVideosReady, isMinimized = false }) {
    const room = useGLTF('/model/room.glb')
    const animations = useAnimations(room.animations, room.scene)
    const { gl } = useThree()

    useRendererStats()

    const deviceTier = useMemo(() => getDeviceTier(), [])
    const tierSettings = TIER_SETTINGS[deviceTier]
    const isMobile = useMemo(
        () => typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
        []
    )

    const [hitboxes, setHitboxes] = useState(EMPTY_HITBOXES)
    const [matchOutcome, setMatchOutcome] = useState(null)

    const githubMeshRef = useRef()
    const linkedInMeshRef = useRef()
    const emailMeshRef = useRef()
    const aboutMeMeshRef = useRef()
    const contactMeMeshRef = useRef()
    const experienceMeshRef = useRef()
    const idleMonitorMeshRef = useRef()

    const videoElsRef = useRef({})
    const videoTexturesRef = useRef({})

    const onVideosReadyRef = useRef(onVideosReady)
    useEffect(() => {
        onVideosReadyRef.current = onVideosReady
    }, [onVideosReady])

    useEffect(() => {
        let cancelled = false
        RiotApiCall()
            .then((result) => {
                if (!cancelled) setMatchOutcome(result)
            })
            .catch((err) => {
                if (!cancelled) console.error('RiotApiCall failed:', err)
            })
        return () => { cancelled = true }
    }, [])

    useEffect(() => {
        const { Chair_Spin, catt, Vac_Animation } = animations.actions
        if (Chair_Spin) { Chair_Spin.play(); Chair_Spin.timeScale = 0.9 }
        if (catt) { catt.play(); catt.timeScale = 1.5 }
        if (Vac_Animation) { Vac_Animation.play(); Vac_Animation.timeScale = 0.5 }
    }, [animations])

    const rawTextures = useTexture(BAKE_URLS)
    const assets = useMemo(() => {
        const maxAniso = gl.capabilities.getMaxAnisotropy()
        const anisotropy = Math.min(maxAniso, tierSettings.maxAnisotropy)

        Object.values(rawTextures).forEach((tex) => {
            tex.flipY = false
            tex.colorSpace = THREE.SRGBColorSpace
            tex.anisotropy = anisotropy
            tex.magFilter = THREE.LinearFilter
            tex.minFilter = tierSettings.useMipmaps
                ? THREE.LinearMipmapLinearFilter
                : THREE.LinearFilter
            tex.generateMipmaps = tierSettings.useMipmaps
            tex.needsUpdate = true
        })
        return rawTextures
    }, [rawTextures, gl, tierSettings])

    const bakedMaterials = useMemo(() => {
        const materials = {}
        for (const key of Object.keys(BAKE_URLS)) {
            materials[key] = new THREE.MeshBasicMaterial({ map: assets[key], toneMapped: false })
        }
        return materials
    }, [assets])

    useEffect(() => {
        return () => {
            Object.values(bakedMaterials).forEach((mat) => mat.dispose())
        }
    }, [bakedMaterials])

    useEffect(() => {
        const makeVideo = (src) => {
            const v = document.createElement('video')
            if (src) v.src = src
            v.crossOrigin = 'anonymous'
            v.loop = true
            v.muted = true
            v.defaultMuted = true
            v.playsInline = true
            v.setAttribute('playsinline', 'true')
            v.setAttribute('webkit-playsinline', 'true')
            v.preload = 'auto'

            v.style.position = 'absolute'
            v.style.top = '0'
            v.style.left = '0'
            v.style.width = '1px'
            v.style.height = '1px'
            v.style.opacity = '0'
            v.style.pointerEvents = 'none'
            v.style.zIndex = '-1'

            document.body.appendChild(v)
            return v
        }

        const makeVideoTexture = (video) => {
            const t = new THREE.VideoTexture(video)
            t.minFilter = THREE.LinearFilter
            t.magFilter = THREE.LinearFilter
            t.colorSpace = THREE.SRGBColorSpace
            t.flipY = false
            t.generateMipmaps = false
            return t
        }

        const cyberpunk = makeVideo('/model/cyberpunk.mp4')
        const arcane = makeVideo('/model/arcane.mp4')
        const idle = makeVideo('/model/leagueScreens/DefeatScreen.mp4')
        // Hero section background video — created here WITHOUT a src. It's
        // only visible after the user presses "wake up" and later scrolls to
        // the Hero section, so it must not make any network request during
        // the loading screen. Its src is assigned ONLY inside the
        // 'user-wakeup' handler below (loadHeroVideo), i.e. the moment the
        // person actually clicks through — not before, not automatically.
        // It's never mapped onto a Three.js mesh (no VideoTexture); it exists
        // purely to warm the browser's HTTP cache for HeroSection's own
        // <video> element.
        const hero = makeVideo()

        idle.play().catch((err) => console.warn('idle initial play failed:', err?.name, err?.message))

        if (!tierSettings.playAmbientVideos) {
            ;[cyberpunk, arcane].forEach((v) => {
                v.play().then(() => v.pause()).catch(() => {})
            })
        }

        videoElsRef.current = { cyberpunk, arcane, idle, hero }
        videoTexturesRef.current = {
            cyberpunk: makeVideoTexture(cyberpunk),
            arcane: makeVideoTexture(arcane),
            idle: makeVideoTexture(idle),
        }

        // Only the video visible the instant the loader closes needs to gate
        // it. cyberpunk/arcane sit on monitors inside the room the user
        // hasn't looked at yet, and hero isn't even created with a src (see
        // above) — so only 'idle' blocks onVideosReady. This matters a lot on
        // iOS Safari, which throttles concurrent video buffering hard.
        const criticalVideos = [idle]

        let readyCount = 0
        let settled = false

        const markReady = () => {
            readyCount += 1
            if (readyCount === criticalVideos.length && !settled) {
                settled = true
                onVideosReadyRef.current?.()
            }
        }

        const fallbackTimer = setTimeout(() => {
            if (!settled) {
                settled = true
                onVideosReadyRef.current?.()
            }
        }, isMobile ? 6000 : 10000)

        // 'canplay' just needs the first frame decodable — far cheaper than
        // 'canplaythrough', which waits for enough buffer to estimate playing
        // the whole file through without stalling.
        criticalVideos.forEach((v) => {
            if (v.readyState >= 3) {
                markReady()
            } else {
                v.addEventListener('canplay', markReady, { once: true })
            }
        })

        // Kick off the hero video's fetch. Only ever called from the
        // 'user-wakeup' handler below — never during the loading screen.
        const loadHeroVideo = () => {
            if (hero.src) return // already kicked off
            hero.src = '/model/veo3.mp4'
            hero.load()
            // Nudge iOS into actually buffering it (a bare src + preload
            // often isn't enough on iOS without a play() call), then pause
            // immediately — HeroSection's own <video> owns real playback.
            hero.play().then(() => hero.pause()).catch(() => {})
        }

        const forcePlayAll = () => {
            // This fires when the person presses "wake up" — the first
            // moment it's safe for the hero video to start loading at all.
            loadHeroVideo()
            ;[cyberpunk, arcane, idle].forEach((v) => {
                v.play().catch((err) =>
                    console.warn('iOS forced play failed:', v.src, err?.name, err?.message)
                )
            })
        }
        window.addEventListener('user-wakeup', forcePlayAll)

        return () => {
            clearTimeout(fallbackTimer)
            window.removeEventListener('user-wakeup', forcePlayAll)
            criticalVideos.forEach((v) => v.removeEventListener('canplay', markReady))
            Object.values(videoElsRef.current).forEach((v) => {
                v.pause()
                v.removeAttribute('src')
                v.load()
                if (document.body.contains(v)) document.body.removeChild(v)
            })
            Object.values(videoTexturesRef.current).forEach((t) => t.dispose())
        }
    }, [tierSettings.playAmbientVideos])

    useEffect(() => {
        if (!room?.scene) return

        const videoTex = videoTexturesRef.current
        const nextHitboxes = { ...EMPTY_HITBOXES }

        room.scene.traverse((child) => {
            if (!child.isMesh) return
            const name = child.name

            if (name.includes('Interact')) {
                child.visible = false
            }

            if (name.includes('Github_Cube_Interact')) nextHitboxes.githubHitbox = child
            else if (name.includes('Indeed_Cube_Interact')) nextHitboxes.linkedInHitbox = child
            else if (name.includes('Email_Cube_Interact')) nextHitboxes.emailHitbox = child
            else if (name.includes('About_Me_Cube_Interact')) nextHitboxes.aboutMeHitbox = child
            else if (name.includes('Contact_Me_Cube_Interact')) nextHitboxes.contactMeHitbox = child
            else if (name.includes('Experiance_Cube_Interact')) nextHitboxes.experienceHitbox = child

            if (name.includes('Github_bake2')) githubMeshRef.current = child
            else if (name.includes('Indeed_bake2')) linkedInMeshRef.current = child
            else if (name.includes('Email_bake2')) emailMeshRef.current = child
            else if (name.includes('About_me_Sphere_Glow')) aboutMeMeshRef.current = child
            else if (name.includes('Contact_me_Sphere_Glow')) contactMeMeshRef.current = child
            else if (name.includes('experiance_Sphere_Glow')) experienceMeshRef.current = child

            if (name.includes('Cyberpunk_Monitor_Screen')) {
                child.material = new THREE.MeshBasicMaterial({ map: videoTex.cyberpunk, toneMapped: false })
                return
            }
            if (name.includes('TV_Screen')) {
                child.material = new THREE.MeshBasicMaterial({ map: videoTex.arcane, toneMapped: false })
                return
            }
            if (name.includes('Idle_Monitor_Screen')) {
                idleMonitorMeshRef.current = child
                child.material = new THREE.MeshBasicMaterial({ map: videoTex.idle, toneMapped: false })
                return
            }

            if (name.includes('Yellow')) {
                child.material = new THREE.MeshStandardMaterial({ color: '#9F9360' })
                return
            }

            const bakeKey = Object.keys(BAKE_URLS).find((key) => name.includes(key))
            if (bakeKey) {
                child.material = bakedMaterials[bakeKey]
            }
        })

        setHitboxes(nextHitboxes)

        const vacuum = room.scene.getObjectByName('Vacuum_Complete_bake3')
        if (vacuum) {
            vacuum.scale.set(0.95, 0.95, 0.95)
        }
    }, [room.scene, bakedMaterials])

    // ---- visibility + minimized state control play/pause for ambient videos ----
    // When minimized, cyberpunk/arcane are barely visible in a 320x240 corner
    // canvas anyway, and freeing their decoders is what keeps the idle
    // (League result) video + the Hero page's video from getting starved on
    // iOS Safari's limited concurrent-video-decoder budget.
    useEffect(() => {
        if (!tierSettings.playAmbientVideos) return

        const { cyberpunk, arcane } = videoElsRef.current
        const shouldPlayAmbient = isVisible && !isMinimized

        if (shouldPlayAmbient) {
            cyberpunk?.play().catch((err) => console.warn('cyberpunk play failed:', err?.name, err?.message))
            arcane?.play().catch((err) => console.warn('arcane play failed:', err?.name, err?.message))
        } else {
            cyberpunk?.pause()
            arcane?.pause()
        }
    }, [isVisible, isMinimized, tierSettings.playAmbientVideos])

    // ---- keep the idle/League monitor explicitly alive across minimize
    // transitions — re-assert play() any time isMinimized changes, since
    // this is the one screen that should always be visible ----
    useEffect(() => {
        const idle = videoElsRef.current.idle
        if (!idle) return
        idle.play().catch((err) => console.warn('idle re-play on minimize toggle failed:', err?.name, err?.message))
    }, [isMinimized])

    useEffect(() => {
        const idle = videoElsRef.current.idle
        if (matchOutcome === null || !idle) return
        idle.src = matchOutcome
            ? '/model/leagueScreens/VictoryScreen.mp4'
            : '/model/leagueScreens/DefeatScreen.mp4'
        idle.play().catch((err) => console.warn('idle swap play failed:', err?.name, err?.message))
    }, [matchOutcome])

    const hasHitboxes = Object.values(hitboxes).some(Boolean)

    return (
        <>
            <Lights />
            <CameraControls isMobile={isMobile} isMinimized={isMinimized} />
            <primitive object={room.scene} />

            {hasHitboxes && (
                <HoverAnimations
                    Hitboxes={hitboxes}
                    Meshes={{
                        githubMeshRef,
                        linkedInMeshRef,
                        emailMeshRef,
                        aboutMeMeshRef,
                        contactMeMeshRef,
                        experienceMeshRef,
                    }}
                />
            )}
        </>
    )
}

useGLTF.preload('/model/room.glb')