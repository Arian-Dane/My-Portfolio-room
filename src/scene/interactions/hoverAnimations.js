import gsap from 'gsap'

const DURATION = 0.3

const setCursor = (isHovering) => {
    document.body.style.cursor = isHovering ? 'pointer' : 'default'
}

// Social icons grow slightly and float up.
export function animateSocialIcon(mesh, isHovering) {
    if (!mesh) return

    if (!mesh.userData.startingY) {
        mesh.userData.startingY = mesh.position.y
    }

    const scale = isHovering ? 1.2 : 1
    gsap.to(mesh.scale, { x: scale, y: scale, z: scale, duration: DURATION })
    gsap.to(mesh.position, {
        y: isHovering ? mesh.userData.startingY + 2.5 : mesh.userData.startingY,
        duration: DURATION,
    })

    setCursor(isHovering)
}

// Section glow spheres swell.
export function animateSectionGlow(mesh, isHovering) {
    if (!mesh) return

    const scale = isHovering ? 1.5 : 1
    gsap.to(mesh.scale, { x: scale, y: scale, z: scale, duration: DURATION })

    setCursor(isHovering)
}
