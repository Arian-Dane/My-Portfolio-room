import * as THREE from 'three'
import { useGLTF, useTexture, OrbitControls, useAnimations} from '@react-three/drei'
import { useEffect,useState,useRef, useMemo } from 'react'  
import HoverAnimations from './HoverAnimations.jsx'

export default function Experience() {
    const room = useGLTF('/model/room.glb')
    
    //state
    const[githubHitbox, setGithubHitbox] = useState(null)
    const[linkedInHitbox,setLinkedInHitbox] = useState(null)
    const[emailHitbox,setEmailHitbox] = useState(null)
    const [aboutMeHitbox, setAboutMeHitbox] = useState(null)
    const [contactMeHitbox, setContactMeHitbox] = useState(null)
    const [experienceHitbox, setExperienceHitbox] = useState(null)

    //refs
    const githubMeshRef = useRef()
    const linkedInMeshRef = useRef()
    const emailMeshRef = useRef()
    const aboutMeMeshRef = useRef()
    const contactMeMeshRef = useRef()
    const experienceMeshRef = useRef()
    

    //animation instance
    const animations = useAnimations(room.animations, room.scene)


    useEffect (()=> {
            const chair= animations.actions.Chair_Spin
            const cat= animations.actions.catt
            const vacuum= animations.actions.Vac_Animation
            chair.play().timeScale=0.9
            cat.play().timeScale = 1.5
            vacuum.play().timeScale = 0.5 
            
        }, [])
    
    

    
    const assets = {
        bake1: useTexture('/model/bake1.webp'),
        bake2: useTexture('/model/bake2.webp'),
        bake3: useTexture('/model/bake3.webp'),
        bake4: useTexture('/model/bake4.webp'),
        bake5: useTexture('/model/bake5.webp'),
        bake6: useTexture('/model/bake6.webp'),
        bake7: useTexture('/model/bake7.webp'),
    }

    useEffect(() => {
        // Setup videos
        const video1 = document.createElement('video')
        video1.src = '/model/cyberpunk.mp4'
        video1.crossOrigin = 'anonymous'
        video1.loop = true
        video1.muted = true
        video1.playsInline = true
        video1.autoplay = true

        const video2 = document.createElement('video')
        video2.src = '/model/arcane.mp4'
        video2.crossOrigin = 'anonymous'
        video2.loop = true
        video2.muted = true
        video2.playsInline = true
        video2.autoplay = true
        
        // Create video textures
        const cyberpunkTexture = new THREE.VideoTexture(video1)
        cyberpunkTexture.minFilter = THREE.LinearFilter
        cyberpunkTexture.magFilter = THREE.LinearFilter
        cyberpunkTexture.colorSpace = THREE.SRGBColorSpace
        cyberpunkTexture.flipY = false

        const arcaneTexture = new THREE.VideoTexture(video2)
        arcaneTexture.minFilter = THREE.LinearFilter
        arcaneTexture.magFilter = THREE.LinearFilter
        arcaneTexture.colorSpace = THREE.SRGBColorSpace
        arcaneTexture.flipY = false

        // Start video playback
        video1.play()
        video2.play()

        // Configure baked textures
        Object.values(assets).forEach(texture => {
            texture.flipY = false
            texture.colorSpace = THREE.SRGBColorSpace
            texture.needsUpdate = true
            texture.anisotropy = 16
            texture.magFilter = THREE.LinearFilter
            texture.minFilter = THREE.LinearMipmapLinearFilter
        })

        

        // Single traverse for target objects
        room.scene.traverse((child) => {
            if(child.isMesh) {
                // Handle video screens
                if(child.name.includes('Cyberpunk_Monitor_Screen')) {
                    child.material = new THREE.MeshBasicMaterial({
                        map: cyberpunkTexture,
                        toneMapped: false,
                        
                    })
                }
                if(child.name.includes('TV_Screen')) {
                    child.material = new THREE.MeshBasicMaterial({
                        map: arcaneTexture,
                        toneMapped: false,
            
                    })
                }
                if(child.name.includes('Interact')) {
                    child.visible = false
                }
                if(child.name.includes('Yellow')) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: '#9F9360',
                    })
                }
                if(child.name.includes('Github_Cube_Interact')) {
                    setGithubHitbox(child)
                }
                if(child.name.includes('Github_bake2')){
                   child.visible = false
                    githubMeshRef.current = child 
                }
                
                if(child.name.includes('Indeed_Cube_Interact')) {
                    
                    setLinkedInHitbox(child)
                }
                if(child.name.includes('Indeed_bake2')) {
                    
                    child.visible = false
                    linkedInMeshRef.current = child
                }
                if(child.name.includes('Email_Cube_Interact')) {
                    
                    setEmailHitbox(child)
                }
                if(child.name.includes('Email_bake2')) {
                    child.visible = false
                    emailMeshRef.current = child
                    
                }
                if(child.name.includes('About_Me_Cube_Interact')){
                    setAboutMeHitbox(child)
                }
                if(child.name.includes('About_me_Sphere_Glow')){
                    child.visible = false
                    aboutMeMeshRef.current = child
                }
                if(child.name.includes('Contact_Me_Cube_Interact')){
                    setContactMeHitbox(child)
                }
                if(child.name.includes('Contact_me_Sphere_Glow')){
                    child.visible = false
                    contactMeMeshRef.current = child
                    
                }
                if(child.name.includes('Experiance_Cube_Interact')){
                    setExperienceHitbox(child)
                }
                if(child.name.includes('experiance_Sphere_Glow')){
                    child.visible = false
                    experienceMeshRef.current = child
                }
                

                
                
                // Handle baked materials
                else {
                    const bakeNumber = Object.keys(assets).find(key => child.name.includes(key))
                    if(bakeNumber) {
                        child.material = new THREE.MeshBasicMaterial({
                            map: assets[bakeNumber],
                            toneMapped: false
                        })
                    }
                }
            }
        })
        // Add point light
        const light = new THREE.PointLight(0xffffff, 700)
        room.scene.add(light)
        light.position.set(20, 10, 10)

        room.scene.getObjectByName('Vacuum_Complete_bake3').scale.set(0.95, 0.95, 0.95)
        

   
    }, [room, assets])

    console.log(room)

    return (
        <>
            <OrbitControls minDistance={1} maxDistance={20000} />
            <primitive object={room.scene} />

            <HoverAnimations 
                Hitboxes={{
                    githubHitbox,
                    linkedInHitbox,
                    emailHitbox,
                    aboutMeHitbox,
                    contactMeHitbox,
                    experienceHitbox,
                }}
                Meshes={{
                    githubMeshRef,
                    linkedInMeshRef,
                    emailMeshRef,
                    aboutMeMeshRef,
                    contactMeMeshRef,
                    experienceMeshRef,
                }}
            />
        </>
    )
}