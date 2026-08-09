import gsap from "gsap"
import React, {useState} from "react"
import CameraSections from "./CameraSections.jsx"

export default function HoverAnimations({ Hitboxes, Meshes, onEmailClick }) {

  const [selectedSection,setSelectedSection] = useState(null)
  const [activeSection,setActiveSection] = useState(false)
  
  const socialIcons = [
    { name: 'github', hitbox: Hitboxes.githubHitbox, mesh: Meshes.githubMeshRef, URL:'https://github.com' },
    { name: 'linkedIn', hitbox: Hitboxes.linkedInHitbox, mesh: Meshes.linkedInMeshRef, URL:'https://www.linkedin.com/' },
    { name: 'email', hitbox: Hitboxes.emailHitbox, mesh: Meshes.emailMeshRef },
  ]

 
  const sections = [
    { name: 'aboutMe', hitbox: Hitboxes.aboutMeHitbox, mesh: Meshes.aboutMeMeshRef },
    { name: 'contactMe', hitbox: Hitboxes.contactMeHitbox, mesh: Meshes.contactMeMeshRef },
    { name: 'experience', hitbox: Hitboxes.experienceHitbox, mesh: Meshes.experienceMeshRef },
  ]

  const animateSocialIcon = (meshRef, isHovering) => {
    if (!meshRef.current) return
    
    const mesh = meshRef.current

    if (!mesh.userData.startingY) {
      mesh.userData.startingY = mesh.position.y
    }

    gsap.to(mesh.scale, {
      x: isHovering ? 1.2 : 1,
      y: isHovering ? 1.2 : 1,
      z: isHovering ? 1.2 : 1,
      duration: 0.3
    })
    
    gsap.to(mesh.position, {
      y: isHovering ? mesh.userData.startingY + 2.5 : mesh.userData.startingY,
      duration: 0.3
    })

    document.body.style.cursor = isHovering ? "pointer" : "default"
  }

  const animateSection = (meshRef, isHovering) => {
    if (!meshRef.current) return
    
    gsap.to(meshRef.current.scale, {
      x: isHovering ? 1.5 : 1,
      y: isHovering ? 1.5 : 1,
      z: isHovering ? 1.5 : 1,
      duration: 0.3
    })
    
    document.body.style.cursor = isHovering ? "pointer" : "default"
  }

  
  

  return (
  <>
    
    {socialIcons.map(({ name, hitbox, mesh, URL }) => {
      const socialLink = () => {
        // The email icon has no external URL — instead of opening a
        // tab, it minimizes the canvas and scrolls the page down to
        // the contact section (handled up in App via onEmailClick).
        if (name === 'email') {
          onEmailClick?.()
          return
        }

        if (URL) window.open(URL, '_blank');
      }

      return (
        <React.Fragment key={name}>
          
          {hitbox && (
            <mesh
              geometry={hitbox.geometry}
              position={hitbox.position}
              scale={hitbox.scale}
              visible={false}
              onPointerOver={() => animateSocialIcon(mesh, true)}
              onPointerOut={() => animateSocialIcon(mesh, false)}
              onClick={socialLink}
            />
          )}

          {/*
            NOTE: no <primitive object={mesh.current} /> here anymore.
            These meshes are already rendered by `<primitive object=
            {room.scene} />` in Experience.jsx — re-rendering them here
            via <primitive> would call Object3D.add(), which silently
            detaches them from their current parent (room.scene) and
            reparents them under this component's subtree instead.
            That reparenting is fragile: any incidental unmount of this
            component (a canvas resize, a portal target change, a fast
            refresh, etc.) tears them out with it, and traversal never
            finds them again since they're no longer children of
            room.scene. GSAP mutates mesh.current.scale / .position
            directly, which is picked up on the next render frame
            regardless of where the object lives in the React tree —
            so this primitive was never required for the animation to
            work, only for the (unwanted) reparenting.
          */}
        </React.Fragment>
      );
    })}

    {/* Section Buttons*/}
    {sections.map(({ name, hitbox, mesh }) => (
      <React.Fragment key={name}>
        {/* Invisible button area */}
        {hitbox && (
          <mesh
            geometry={hitbox.geometry}
            position={hitbox.position}
            scale={hitbox.scale}
            visible={false}
            onPointerOver={() => animateSection(mesh, true)}
            onPointerOut={() => animateSection(mesh, false)}
            onClick= {()=> {setSelectedSection(name)
              setActiveSection(!activeSection)}}
          />
        )}

        {/* Same as above — no duplicate <primitive> render for the
            section glow meshes; they're already part of room.scene. */}
      </React.Fragment>
    ))}

    <CameraSections cameraSections={selectedSection} active={activeSection}/>
  </>
);

}