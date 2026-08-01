import * as THREE from 'three'
import { useGLTF, useTexture, useAnimations } from '@react-three/drei'
import { useEffect, useState, useRef, useMemo } from 'react'
import HoverAnimations from './HoverAnimations.jsx'
import CameraControls from './CameraControls.jsx'
import Lights from './Lights.jsx'
import RiotApiCall from './API/RiotAPI.js'

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

export default function Experience({ isVisible = false }) {
    const room = useGLTF('/model/room.glb')
    const animations = useAnimations(room.animations, room.scene)

    // single state object instead of 6 separate useState calls -> 1 re-render instead of up to 12
    const [hitboxes, setHitboxes] = useState(EMPTY_HITBOXES)
    const [matchOutcome, setMatchOutcome] = useState(null)

    // mesh refs never need to trigger a re-render, so they stay as refs
    const githubMeshRef = useRef()
    const linkedInMeshRef = useRef()
    const emailMeshRef = useRef()
    const aboutMeMeshRef = useRef()
    const contactMeMeshRef = useRef()
    const experienceMeshRef = useRef()
    const idleMonitorMeshRef = useRef()

    const videoElsRef = useRef({})
    const videoTexturesRef = useRef({})

    // ---- fetch match outcome once ----
    useEffect(() => {
        let cancelled = false
        RiotApiCall().then((result) => {
            if (!cancelled) setMatchOutcome(result)
        })
        return () => { cancelled = true }
    }, [])

    // ---- play looping animations once they're available ----
    useEffect(() => {
        const { Chair_Spin, catt, Vac_Animation } = animations.actions
        if (Chair_Spin) { Chair_Spin.play(); Chair_Spin.timeScale = 0.9 }
        if (catt) { catt.play(); catt.timeScale = 1.5 }
        if (Vac_Animation) { Vac_Animation.play(); Vac_Animation.timeScale = 0.5 }
    }, [animations])

    // ---- load + configure baked textures once ----
    const rawTextures = useTexture(BAKE_URLS)
    const assets = useMemo(() => {
        Object.values(rawTextures).forEach((tex) => {
            tex.flipY = false
            tex.colorSpace = THREE.SRGBColorSpace
            tex.anisotropy = 16
            tex.magFilter = THREE.LinearFilter
            tex.minFilter = THREE.LinearMipmapLinearFilter
            tex.needsUpdate = true
        })
        return rawTextures
    }, [rawTextures])

    // ---- one shared material per bake texture (not one per mesh) ----
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

    // ---- create video elements + video textures exactly once ----
    useEffect(() => {
        const makeVideo = (src) => {
            const v = document.createElement('video')
            if (src) v.src = src
            v.crossOrigin = 'anonymous'
            v.loop = true
            v.muted = true
            v.playsInline = true
            v.preload = 'auto'
            v.style.display = 'none'
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
        // fallback source so the screen isn't blank while/if the Riot API call
        // is slow or fails; the matchOutcome effect below overwrites this once
        // (or if) the real result comes back
        const idle = makeVideo('/model/leagueScreens/DefeatScreen.mp4')
        idle.play().catch(() => {})

        videoElsRef.current = { cyberpunk, arcane, idle }
        videoTexturesRef.current = {
            cyberpunk: makeVideoTexture(cyberpunk),
            arcane: makeVideoTexture(arcane),
            idle: makeVideoTexture(idle),
        }

        return () => {
            Object.values(videoElsRef.current).forEach((v) => {
                v.pause()
                v.removeAttribute('src')
                v.load()
                if (document.body.contains(v)) document.body.removeChild(v)
            })
            Object.values(videoTexturesRef.current).forEach((t) => t.dispose())
        }
    }, [])

    // ---- traverse the scene exactly ONCE per model load ----
    // (previously this ran again on every isVisible toggle, recreating every
    // material/texture binding in the scene — that was the source of the
    // "textures reloading" flicker)
    useEffect(() => {
        if (!room?.scene) return

        const videoTex = videoTexturesRef.current
        const nextHitboxes = { ...EMPTY_HITBOXES }

        room.scene.traverse((child) => {
            if (!child.isMesh) return
            const name = child.name

            // interaction proxies are invisible triggers, never rendered
            if (name.includes('Interact')) {
                child.visible = false
            }

            // hitboxes (drive HoverAnimations)
            if (name.includes('Github_Cube_Interact')) nextHitboxes.githubHitbox = child
            else if (name.includes('Indeed_Cube_Interact')) nextHitboxes.linkedInHitbox = child
            else if (name.includes('Email_Cube_Interact')) nextHitboxes.emailHitbox = child
            else if (name.includes('About_Me_Cube_Interact')) nextHitboxes.aboutMeHitbox = child
            else if (name.includes('Contact_Me_Cube_Interact')) nextHitboxes.contactMeHitbox = child
            else if (name.includes('Experiance_Cube_Interact')) nextHitboxes.experienceHitbox = child

            // accent / glow meshes referenced by HoverAnimations
            if (name.includes('Github_bake2')) githubMeshRef.current = child
            else if (name.includes('Indeed_bake2')) linkedInMeshRef.current = child
            else if (name.includes('Email_bake2')) emailMeshRef.current = child
            else if (name.includes('About_me_Sphere_Glow')) aboutMeMeshRef.current = child
            else if (name.includes('Contact_me_Sphere_Glow')) contactMeMeshRef.current = child
            else if (name.includes('experiance_Sphere_Glow')) experienceMeshRef.current = child

            // video screens
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

            // solid color override
            if (name.includes('Yellow')) {
                child.material = new THREE.MeshStandardMaterial({ color: '#9F9360' })
                return
            }

            // baked textures: reuse the ONE shared material for this bake key
            // instead of allocating a new material per mesh
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

    // ---- visibility only controls play/pause, never re-touches materials ----
    useEffect(() => {
        const { cyberpunk, arcane } = videoElsRef.current
        if (isVisible) {
            cyberpunk?.play().catch(() => {})
            arcane?.play().catch(() => {})
        } else {
            cyberpunk?.pause()
            arcane?.pause()
        }
    }, [isVisible])

    // ---- swap the idle monitor's video once the match result is known ----
    useEffect(() => {
        const idle = videoElsRef.current.idle
        if (matchOutcome === null || !idle) return
        idle.src = matchOutcome
            ? '/model/leagueScreens/VictoryScreen.mp4'
            : '/model/leagueScreens/DefeatScreen.mp4'
        idle.play().catch(() => {})
    }, [matchOutcome])

    const hasHitboxes = Object.values(hitboxes).some(Boolean)

    return (
        <>
            <Lights />
            <CameraControls />
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
