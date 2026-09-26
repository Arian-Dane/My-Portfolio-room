import * as THREE from 'three'
import { BAKE_KEYS, VIDEO_SCREENS, INTERACTIVES } from './config.js'

// Walks the loaded room once: hides the *_Interact hitboxes, assigns
// baked / video / flat materials, and returns every entry of
// INTERACTIVES paired with the hitbox + visible mesh found for it.
export function setupRoom(scene, { bakedMaterials, videoTextures }) {
    const found = Object.fromEntries(INTERACTIVES.map((item) => [item.key, { ...item, hitbox: null, mesh: null }]))

    scene.traverse((child) => {
        if (!child.isMesh) return
        const name = child.name

        if (name.includes('Interact')) child.visible = false

        const hitboxOwner = INTERACTIVES.find((item) => name.includes(item.hitboxName))
        if (hitboxOwner) found[hitboxOwner.key].hitbox = child

        const meshOwner = INTERACTIVES.find((item) => name.includes(item.meshName))
        if (meshOwner) found[meshOwner.key].mesh = child

        const screen = VIDEO_SCREENS.find((s) => name.includes(s.meshName))
        if (screen) {
            child.material = new THREE.MeshBasicMaterial({ map: videoTextures[screen.video], toneMapped: false })
            return
        }

        if (name.includes('Yellow')) {
            child.material = new THREE.MeshStandardMaterial({ color: '#9F9360' })
            return
        }

        const bakeKey = BAKE_KEYS.find((key) => name.includes(key))
        if (bakeKey) child.material = bakedMaterials[bakeKey]
    })

    const vacuum = scene.getObjectByName('Vacuum_Complete_bake3')
    if (vacuum) vacuum.scale.set(0.95, 0.95, 0.95)

    return Object.values(found).filter((item) => item.hitbox)
}
