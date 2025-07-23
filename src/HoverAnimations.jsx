import * as THREE from 'three'
import gsap from "gsap"
import React from "react"

export default function HoverAnimations({ Hitboxes, Meshes }) {

  // Direct mapping to match your exact hitbox state names
  const socialMappings = [
    { hitboxKey: 'githubHitbox', animationKey: 'github Hitbox', meshRef: Meshes.githubMeshRef },
    { hitboxKey: 'linkedInHitbox', animationKey: 'linkedIn Hitbox', meshRef: Meshes.linkedInMeshRef },
    { hitboxKey: 'emailHitbox', animationKey: 'email Hitbox', meshRef: Meshes.emailMeshRef },
  ]

  const sectionMappings = [
    { hitboxKey: 'aboutMeHitbox', animationKey: 'aboutMe Hitbox', meshRef: Meshes.aboutMeMeshRef },
    { hitboxKey: 'contactMeHitbox', animationKey: 'contactMe Hitbox', meshRef: Meshes.contactMeMeshRef },
    { hitboxKey: 'experienceHitbox', animationKey: 'experience Hitbox', meshRef: Meshes.experienceMeshRef },
  ]

  const onHover = (animationKey, isHovering) => {
    const mapping = socialMappings.find(m => m.animationKey === animationKey)
    if (!mapping || !mapping.meshRef.current) return
    
    const mesh = mapping.meshRef.current

    if (mesh.userData.originalY === undefined) {
      mesh.userData.originalY = mesh.position.y
    }

    gsap.to(mapping.meshRef.current.scale, {
      x: isHovering ? 1.2 : 1,
      y: isHovering ? 1.2 : 1,
      z: isHovering ? 1.2 : 1,
      duration: 0.3
    })
    
    gsap.to(mapping.meshRef.current.position, {
      y: isHovering ? mesh.userData.originalY + 2.5 : mesh.userData.originalY,
      duration: 0.3
    })

    document.body.style.cursor = isHovering ? "pointer" : "default"
  }

  const onSectionHover = (animationKey, isHovering) => {
    const mapping = sectionMappings.find(m => m.animationKey === animationKey)
    if (!mapping || !mapping.meshRef.current) return
    
    gsap.to(mapping.meshRef.current.scale, {
      x: isHovering ? 1.5 : 1,
      y: isHovering ? 1.5 : 1,
      z: isHovering ? 1.5 : 1,
      duration: 0.3
    })
    
    document.body.style.cursor = isHovering ? "pointer" : "default"
  }

  return (
    <>
      {/* Dynamically render social media hitboxes and meshes */}
      {socialMappings.map(({ hitboxKey, animationKey, meshRef }) => {
        const hitbox = Hitboxes[hitboxKey]
        
        return (
          <React.Fragment key={hitboxKey}>
            {/* Hitbox */}
            {hitbox && (
              <mesh
                geometry={hitbox.geometry}
                position={hitbox.position}
                scale={hitbox.scale}
                visible={false}
                onPointerOver={() => onHover(animationKey, true)}
                onPointerOut={() => onHover(animationKey, false)}
              />
            )}

            {/* Mesh */}
            {meshRef.current && (
              <mesh
                geometry={meshRef.current.geometry}
                position={meshRef.current.position}
                scale={meshRef.current.scale}
                rotation={meshRef.current.rotation}
                material={meshRef.current.material}
                ref={meshRef}
              />
            )}
          </React.Fragment>
        )
      })}

      {/* Dynamically render section hitboxes and meshes */}
      {sectionMappings.map(({ hitboxKey, animationKey, meshRef }) => {
        const hitbox = Hitboxes[hitboxKey]
        
        return (
          <React.Fragment key={hitboxKey}>
            {/* Hitbox */}
            {hitbox && (
              <mesh
                geometry={hitbox.geometry}
                position={hitbox.position}
                scale={hitbox.scale}
                visible={false}
                onPointerOver={() => onSectionHover(animationKey, true)}
                onPointerOut={() => onSectionHover(animationKey, false)}
              />
            )}

            {/* Mesh */}
            {meshRef.current && (
              <mesh
                geometry={meshRef.current.geometry}
                position={meshRef.current.position}
                scale={meshRef.current.scale}
                material={meshRef.current.material}
                ref={meshRef}
              />
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}