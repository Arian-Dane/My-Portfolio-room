import * as THREE from 'three'
import { useEffect, useMemo } from 'react'
import { useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { BAKE_KEYS, bakeUrls } from '../config.js'

// Loads the baked lighting textures for this device tier and wraps each
// in an unlit material. Suspends until the textures are loaded.
export function useBakedMaterials(tierSettings) {
    const { gl } = useThree()
    const textures = useTexture(useMemo(() => bakeUrls(tierSettings.downscaleBigBakes), [tierSettings]))

    const materials = useMemo(() => {
        const anisotropy = Math.min(gl.capabilities.getMaxAnisotropy(), tierSettings.maxAnisotropy)

        return Object.fromEntries(BAKE_KEYS.map((key) => {
            const tex = textures[key]
            tex.flipY = false
            tex.colorSpace = THREE.SRGBColorSpace
            tex.anisotropy = anisotropy
            tex.magFilter = THREE.LinearFilter
            tex.minFilter = tierSettings.useMipmaps ? THREE.LinearMipmapLinearFilter : THREE.LinearFilter
            tex.generateMipmaps = tierSettings.useMipmaps
            tex.needsUpdate = true

            return [key, new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })]
        }))
    }, [textures, gl, tierSettings])

    useEffect(() => () => {
        Object.values(materials).forEach((mat) => mat.dispose())
    }, [materials])

    return materials
}
