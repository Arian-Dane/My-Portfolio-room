import * as THREE from 'three'
import gsap from "gsap"
import React from "react"

export default function HoverAnimations({ Hitboxes, Meshes }) {

  // Social media icons that grow bigger AND float up when hovered
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

  
  const animateSocialIcon = (meshRef, isHovering) => {
    if (!meshRef.current) return
    
    const mesh = meshRef.current

    // Remember starting position
    if (!mesh.userData.startingY) {
      mesh.userData.startingY = mesh.position.y
    }

    // Scale animation (make bigger/smaller)
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
    
    // Scale animation (make bigger/smaller)
    gsap.to(meshRef.current.scale, {
      x: isHovering ? 1.5 : 1,
      y: isHovering ? 1.5 : 1,
      z: isHovering ? 1.5 : 1,
      duration: 0.3
    })
    
    // Change cursor
    document.body.style.cursor = isHovering ? "pointer" : "default"
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
            <mesh
              geometry={mesh.current.geometry}
              position={mesh.current.position}
              scale={mesh.current.scale}
              rotation={mesh.current.rotation}
              material={mesh.current.material}
              ref={mesh}
            />
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
            onClick={()=> {console.log(name)}}
          />
        )}

        {/* Visible 3D object */}
        {mesh.current && (
          <mesh
            geometry={mesh.current.geometry}
            position={mesh.current.position}
            scale={mesh.current.scale}
            material={mesh.current.material}
            ref={mesh}
          />
        )}
      </React.Fragment>
    ))}
  </>
);

}