import * as THREE from 'three'
import gsap from "gsap"
import React, { useRef, useState, useEffect } from "react"
import { useThree } from '@react-three/fiber'

export default function HoverAnimations({ Hitboxes, Meshes }) {

  
  const socialIcons = [
    { name: 'github', hitbox: Hitboxes.githubHitbox, mesh: Meshes.githubMeshRef, URL:'https://github.com/Arian-Dane' },
    { name: 'linkedIn', hitbox: Hitboxes.linkedInHitbox, mesh: Meshes.linkedInMeshRef, URL:'https://www.linkedin.com/' },
    { name: 'email', hitbox: Hitboxes.emailHitbox, mesh: Meshes.emailMeshRef },
  ]

 
  const sections = [
    { name: 'aboutMe', hitbox: Hitboxes.aboutMeHitbox, mesh: Meshes.aboutMeMeshRef },
    { name: 'contactMe', hitbox: Hitboxes.contactMeHitbox, mesh: Meshes.contactMeMeshRef },
    { name: 'experience', hitbox: Hitboxes.experienceHitbox, mesh: Meshes.experienceMeshRef },
  ]

  // Camera control: toggle camera to section position and back
  const { camera } = useThree()
  const originalCameraRef = useRef({ position: null, rotation: null })
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    // store original camera transform once
    if (!originalCameraRef.current.position) {
      originalCameraRef.current.position = camera.position.clone()
      originalCameraRef.current.rotation = camera.rotation.clone()
    }
  }, [camera])

  // Define target camera transforms per section 
  const sectionCameraTargets = {
    aboutMe: {
      position: { x: -50, y: 6, z: 30 },
      rotation: {
        x: THREE.MathUtils.degToRad(45),
        y: THREE.MathUtils.degToRad(-30),
        z: 0,
      }
    },
    contactMe: {
      position: { x: 5, y: 4, z: 6 },
      rotation: {
        x: THREE.MathUtils.degToRad(40),
        y: THREE.MathUtils.degToRad(10),
        z: 0,
      }
    },
    experience: {
      position: { x: -20, y: 8, z: 12 },
      rotation: {
        x: THREE.MathUtils.degToRad(50),
        y: THREE.MathUtils.degToRad(-10),
        z: 0,
      }
    }
  }

  const moveCameraTo = (target, duration = 1) => {
    if (!camera || !target) return
    gsap.killTweensOf(camera.position)
    gsap.killTweensOf(camera.rotation)
    gsap.to(camera.position, { x: target.position.x, y: target.position.y, z: target.position.z, duration, ease: 'power2.out' })
    gsap.to(camera.rotation, { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z, duration, ease: 'power2.out' })
  }

  const resetCamera = (duration = 1) => {
    const orig = originalCameraRef.current
    if (!orig || !orig.position) return
    gsap.killTweensOf(camera.position)
    gsap.killTweensOf(camera.rotation)
    gsap.to(camera.position, { x: orig.position.x, y: orig.position.y, z: orig.position.z, duration, ease: 'power2.out' })
    gsap.to(camera.rotation, { x: orig.rotation.x, y: orig.rotation.y, z: orig.rotation.z, duration, ease: 'power2.out' })
  }

  
  const animateSocialIcon = (meshRef, isHovering) => {
    if (!meshRef.current) return
    
    const mesh = meshRef.current

    // Remember starting position
    if (!mesh.userData.startingY) {
      mesh.userData.startingY = mesh.position.y
    }

    // Scale animation
    gsap.to(mesh.scale, {
      x: isHovering ? 1.2 : 1,
      y: isHovering ? 1.2 : 1,
      z: isHovering ? 1.2 : 1,
      duration: 0.3
    })
    
    // Float animation (move up/down)
    gsap.to(mesh.position, {
      y: isHovering ? mesh.userData.startingY + 2.5 : mesh.userData.startingY,
      duration: 0.3
    })

    // Change cursor
    document.body.style.cursor = isHovering ? "pointer" : "default"
  }

  // Make section buttons bigger only
  const animateSection = (meshRef, isHovering) => {
    if (!meshRef.current) return
    
    // Scale animation 
    gsap.to(meshRef.current.scale, {
      x: isHovering ? 1.5 : 1,
      y: isHovering ? 1.5 : 1,
      z: isHovering ? 1.5 : 1,
      duration: 0.3
    })
    
    // Change cursor
    document.body.style.cursor = isHovering ? "pointer" : "default"
  }

  // Toggle camera on section click
  const handleSectionClick = (name) => {
    if (activeSection === name) {
      // currently focused on this section -> reset
      resetCamera(0.9)
      setActiveSection(null)
    } else {
      const target = sectionCameraTargets[name]
      if (target) {
        moveCameraTo(target, 1)
        setActiveSection(name)
      }
    }
  }

  return (
  <>
    
    {socialIcons.map(({ name, hitbox, mesh, URL }) => {
      const socialLink = () => {
        if (URL) window.location.href = URL;
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

          {/* Visible 3D object */}
          {mesh.current && (
            <primitive object={mesh.current} />
          )}
        </React.Fragment>
      );
    })}

    {/* Section Buttons - hover to make bigger only */}
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
            onClick={() => handleSectionClick(name)}
          />
        )}

        {/* Visible 3D object */}
        {mesh.current && (
          <primitive object={mesh.current} />
        )}
      </React.Fragment>
    ))}
  </>
);

}