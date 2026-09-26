import { useThree, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

// Logs renderer.info to the console every `intervalSeconds`. Dev-only —
// gated on import.meta.env.DEV so it's a no-op in production builds.
// Use this to get real draw-call/triangle/texture-memory numbers instead
// of guessing from polycount alone.
export function useRendererStats(intervalSeconds = 3) {
    const { gl } = useThree()
    const elapsed = useRef(0)

    useFrame((_, delta) => {
        if (!import.meta.env.DEV) return

        elapsed.current += delta
        if (elapsed.current < intervalSeconds) return
        elapsed.current = 0

        const info = gl.info
        console.log(
            `[renderer] drawCalls=${info.render.calls} ` +
            `triangles=${info.render.triangles} ` +
            `geometries=${info.memory.geometries} ` +
            `textures=${info.memory.textures} ` +
            `programs=${info.programs?.length ?? 0}`
        )
    })
}
