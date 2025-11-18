import * as THREE from 'three'
import { useGLTF, useTexture, OrbitControls, useAnimations,} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useEffect,useState,useRef,useMemo } from 'react' 
import { useThree,useFrame } from '@react-three/fiber' 
import HoverAnimations from './HoverAnimations.jsx'
import CameraControls from "./CameraControls.jsx"
import Lights from "./Lights.jsx"
import RiotApiCall from './API/RiotAPI.js'


export default function Experience({ isVisible = false }) {
    const room = useGLTF('/model/room.glb')
    const { scene, invalidate } = useThree()    

    //state
    const[githubHitbox, setGithubHitbox] = useState(null)
    const[linkedInHitbox,setLinkedInHitbox] = useState(null)
    const[emailHitbox,setEmailHitbox] = useState(null)
    const [aboutMeHitbox, setAboutMeHitbox] = useState(null)
    const [contactMeHitbox, setContactMeHitbox] = useState(null)
    const [experienceHitbox, setExperienceHitbox] = useState(null)
    const [matchOutcome, setMatchOutcome] = useState(null)
    
    // Force a re-render when canvas size changes
    useEffect(() => {
        const handleResize = () => {
            invalidate()
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    
    //Fetch API data once
    useEffect(()=>{
        async function getMatchOutcome(){
            const result =await RiotApiCall()
            setMatchOutcome(result)
        }
        getMatchOutcome()
    },[])
    console.log(matchOutcome)
    
    
    
    const githubMeshRef = useRef()
    const linkedInMeshRef = useRef()
    const emailMeshRef = useRef()
    const aboutMeMeshRef = useRef()
    const contactMeMeshRef = useRef()
    const experienceMeshRef = useRef()
    const idleMonitorMeshRef = useRef()
    
    //animation instance
    const animations = useAnimations(room.animations, room.scene)

    
   
    useEffect(() => {
        const chair = animations.actions.Chair_Spin
        const cat = animations.actions.catt
        const vacuum = animations.actions.Vac_Animation
        
        chair.play().timeScale = 0.9
        cat.play().timeScale = 1.5
        vacuum.play().timeScale = 0.5 
            
        
    }, [animations])

    
    const isMounted = useRef(true)
    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])
    
    

    
    //const assets = {
        //bake1: useTexture('/model/bake1.webp'),
        //bake2: useTexture('/model/bake2.webp'),
        //bake3: useTexture('/model/bake3.webp'),
        //bake4: useTexture('/model/bake4.webp'),
        //bake5: useTexture('/model/bake5.webp'),
        //bake6: useTexture('/model/bake6.webp'),
        //bake7: useTexture('/model/bake7.webp'),
    //}

    const bake1 = useTexture('/model/bake1.webp')
    const bake2 = useTexture('/model/bake2.webp')
    const bake3 = useTexture('/model/bake3.webp')
    const bake4 = useTexture('/model/bake4.webp')
    const bake5 = useTexture('/model/bake5.webp')
    const bake6 = useTexture('/model/bake6.webp')
    const bake7 = useTexture('/model/bake7.webp')

    const assets = useMemo(() => ({
        bake1,
        bake2,
        bake3,
        bake4,
        bake5,
        bake6,
        bake7,
    }), [bake1, bake2, bake3, bake4, bake5, bake6, bake7])


    
    // Setup scene and textures 
    const videoRef1 = useRef()
    const videoRef2 = useRef()
    const videoRef3 = useRef()
    const videoTextureRef1 = useRef()
    const videoTextureRef2 = useRef()
    const videoTextureRef3 = useRef()

    // Initialize hitboxes and meshes
    useEffect(() => {
        if (!room || !room.scene || !isMounted.current) return

        // Create a cleanup function
        const cleanup = () => {
            if (isMounted.current) {
                setGithubHitbox(null)
                setLinkedInHitbox(null)
                setEmailHitbox(null)
                setAboutMeHitbox(null)
                setContactMeHitbox(null)
                setExperienceHitbox(null)
            }
        }

        // Initialize all meshes and hitboxes
        room.scene.traverse((child) => {
            if(child.isMesh) {
                if(child.name.includes('Github_Cube_Interact')) {
                    setGithubHitbox(child)
                }
                if(child.name.includes('Github_bake2')){
                    githubMeshRef.current = child 
                }
                if(child.name.includes('Indeed_Cube_Interact')) {
                    setLinkedInHitbox(child)
                }
                if(child.name.includes('Indeed_bake2')) {
                    linkedInMeshRef.current = child
                }
                if(child.name.includes('Email_Cube_Interact')) {
                    setEmailHitbox(child)
                }
                if(child.name.includes('Email_bake2')) {
                    emailMeshRef.current = child
                }
                if(child.name.includes('About_Me_Cube_Interact')){
                    setAboutMeHitbox(child)
                }
                if(child.name.includes('About_me_Sphere_Glow')){
                    aboutMeMeshRef.current = child
                }
                if(child.name.includes('Contact_Me_Cube_Interact')){
                    setContactMeHitbox(child)
                }
                if(child.name.includes('Contact_me_Sphere_Glow')){
                    contactMeMeshRef.current = child
                }
                if(child.name.includes('Experiance_Cube_Interact')){
                    setExperienceHitbox(child)
                }
                if(child.name.includes('experiance_Sphere_Glow')){
                    experienceMeshRef.current = child
                }
            }
        })
    }, [room.scene])

    useEffect(() => {
        if (!room || !room.scene) return
        
        //videos setup
        if (!videoRef1.current) {
            videoRef1.current = document.createElement('video')
            videoRef1.current.src = '/model/cyberpunk.mp4'
            videoRef1.current.crossOrigin = 'anonymous'
            videoRef1.current.loop = true
            videoRef1.current.muted = true
            videoRef1.current.playsInLine = true
            videoRef1.current.preload = 'auto'
            videoRef1.current.playbackRate = 1
            videoRef1.current.style.display = 'none'
            document.body.appendChild(videoRef1.current)
        }

        if (!videoRef2.current) {
            videoRef2.current = document.createElement('video')
            videoRef2.current.src = '/model/arcane.mp4'
            videoRef2.current.crossOrigin = 'anonymous'
            videoRef2.current.loop = true
            videoRef2.current.muted = true
            videoRef2.current.playsInline = true
            videoRef2.current.preload = 'auto'
            videoRef2.current.playbackRate = 1
            videoRef2.current.style.display = 'none'
            document.body.appendChild(videoRef2.current)
        }

        if (!videoRef3.current) {
            videoRef3.current = document.createElement('video')
            videoRef3.current.crossOrigin = 'anonymous'
            videoRef3.current.loop = true
            videoRef3.current.muted = true
            videoRef3.current.playsInline = true
            videoRef3.current.preload = 'auto'
            videoRef3.current.playbackRate = 1
            videoRef3.current.style.display = 'none'
            document.body.appendChild(videoRef3.current)
        }

        
        // Create video textures
        if (!videoTextureRef1.current && videoRef1.current) {
            videoTextureRef1.current = new THREE.VideoTexture(videoRef1.current)
            videoTextureRef1.current.minFilter = THREE.LinearFilter
            videoTextureRef1.current.magFilter = THREE.LinearFilter
            videoTextureRef1.current.colorSpace = THREE.SRGBColorSpace
            videoTextureRef1.current.flipY = false
            videoTextureRef1.current.generateMipmaps = false
        }

        if (!videoTextureRef2.current && videoRef2.current) {
            videoTextureRef2.current = new THREE.VideoTexture(videoRef2.current)
            videoTextureRef2.current.minFilter = THREE.LinearFilter
            videoTextureRef2.current.magFilter = THREE.LinearFilter
            videoTextureRef2.current.colorSpace = THREE.SRGBColorSpace
            videoTextureRef2.current.flipY = false
            videoTextureRef2.current.generateMipmaps = false
        }

        if (!videoTextureRef3.current && videoRef3.current) {
            videoTextureRef3.current = new THREE.VideoTexture(videoRef3.current)
            videoTextureRef3.current.minFilter = THREE.LinearFilter
            videoTextureRef3.current.magFilter = THREE.LinearFilter
            videoTextureRef3.current.colorSpace = THREE.SRGBColorSpace
            videoTextureRef3.current.flipY = false
            videoTextureRef3.current.generateMipmaps = false
        }

        // Start video playback when visible
        if (isVisible) {
            videoRef1.current?.play()
            videoRef2.current?.play()
        }

        // Configure baked textures
        Object.values(assets).forEach(texture => {
            texture.flipY = false
            texture.colorSpace = THREE.SRGBColorSpace
            texture.needsUpdate = true
            texture.anisotropy = 16
            texture.magFilter = THREE.LinearFilter
            texture.minFilter = THREE.LinearMipmapLinearFilter
        })

        

        // Single traverse target objects
        room.scene.traverse((child) => {
            if(child.isMesh) {
                // Log all Monitor screens for debugging
                if(child.name.includes('Monitor')) {
                    console.log('Found mesh with Monitor:', child.name);
                }
                if(child.name.includes('Cyberpunk_Monitor_Screen')) {
                    child.material = new THREE.MeshBasicMaterial({
                        map: videoTextureRef1.current,
                        toneMapped: false,
                    })
                }
                if(child.name.includes('TV_Screen')) {
                    child.material = new THREE.MeshBasicMaterial({
                        map: videoTextureRef2.current,
                        toneMapped: false,
                    })
                }
                if(child.name.includes("Idle_Monitor_Screen")){
                    idleMonitorMeshRef.current = child
                    child.material = new THREE.MeshBasicMaterial({
                        map:videoTextureRef3.current,
                        toneMapped:false,
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
                    githubMeshRef.current = child 
                }
                
                if(child.name.includes('Indeed_Cube_Interact')) {
                    setLinkedInHitbox(child)
                }
                if(child.name.includes('Indeed_bake2')) {
                    linkedInMeshRef.current = child
                }
                if(child.name.includes('Email_Cube_Interact')) {
                    setEmailHitbox(child)
                }
                if(child.name.includes('Email_bake2')) {
                    emailMeshRef.current = child
                }
                if(child.name.includes('About_Me_Cube_Interact')){
                    setAboutMeHitbox(child)
                }
                if(child.name.includes('About_me_Sphere_Glow')){
                    aboutMeMeshRef.current = child
                }
                if(child.name.includes('Contact_Me_Cube_Interact')){
                    setContactMeHitbox(child)
                }
                if(child.name.includes('Contact_me_Sphere_Glow')){
                    contactMeMeshRef.current = child
                }
                if(child.name.includes('Experiance_Cube_Interact')){
                    setExperienceHitbox(child)
                }
                if(child.name.includes('experiance_Sphere_Glow')){
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
        

        room.scene.getObjectByName('Vacuum_Complete_bake3').scale.set(0.95, 0.95, 0.95)
        

   
    }, [room, assets, isVisible])

    // Update video3 src when matchOutcome changes
    useEffect(() => {
        if (matchOutcome !== null && videoRef3.current) {
            const newSrc = matchOutcome
                ? '/model/leagueScreens/VictoryScreen.mp4'
                : '/model/leagueScreens/DefeatScreen.mp4';
            
            videoRef3.current.src = newSrc;
            videoRef3.current.play();
        }
    }, [matchOutcome]);


    // Enhanced cleanup function
    useEffect(() => {
        return () => {
            if (isMounted.current) {
                videoRef1.current?.pause()
                videoRef2.current?.pause()
                if (videoRef1.current && document.body.contains(videoRef1.current)) {
                    document.body.removeChild(videoRef1.current)
                }
                if (videoRef2.current && document.body.contains(videoRef2.current)) {
                    document.body.removeChild(videoRef2.current)
                }
                // Reset all hitboxes and meshes
                setGithubHitbox(null)
                setLinkedInHitbox(null)
                setEmailHitbox(null)
                setAboutMeHitbox(null)
                setContactMeHitbox(null)
                setExperienceHitbox(null)
            }
        }
    }, [])

    
    return (
        <>  
            {/* <EffectComposer>
                <Bloom 
                blendFunction={BlendFunction.LIGHTEN} // Makes it additive
                intensity={0.9} // Increase for more glow
                kernelSize={5} // Blur size
                luminanceThreshold={1} 
                luminanceSmoothing={0.025}
                />
            </EffectComposer> */}

            <Lights />
            <CameraControls/>
            <OrbitControls target={[0,11,0]} minDistance={1} maxDistance={20000} />
            <primitive object={room.scene} />

            {/* render hoverables - Always render when hitboxes are available */}
            {(githubHitbox || linkedInHitbox || emailHitbox || aboutMeHitbox || contactMeHitbox || experienceHitbox) && (
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
            )}
        </>
    )
}