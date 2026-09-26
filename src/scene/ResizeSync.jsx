import { useThree } from '@react-three/fiber'
import { useLayoutEffect } from 'react'

// Forces the renderer's drawing buffer and the camera's aspect ratio
// to match the canvas's actual parent box size, on demand. This
// exists because R3F's built-in ResizeObserver-based auto-sizing can
// fall out of sync when the container is resized very frequently via
// direct style mutation (the inline-docking rAF loop in App.jsx) and
// then switched to a different sizing mode — the renderer can end up
// keeping an old drawing-buffer resolution while CSS reports a
// different box size, producing a warped/soft render.
export default function ResizeSync({ watch }) {

    const { gl, camera } = useThree()

    useLayoutEffect(() => {

        const canvasEl = gl.domElement
        const parent = canvasEl.parentElement
        if (!parent) return

        const applySize = () => {
            const rect = parent.getBoundingClientRect()
            if (rect.width === 0 || rect.height === 0) return

            gl.setSize(rect.width, rect.height, false)
            camera.aspect = rect.width / rect.height
            camera.updateProjectionMatrix()
        }

        // Run now, and again on the next frame — the "now" pass
        // covers most cases, the deferred pass catches it if this
        // effect fires a beat before the container's own layout
        // (top/left/width/height) has actually settled.
        applySize()
        const rafId = requestAnimationFrame(applySize)

        return () => cancelAnimationFrame(rafId)

    }, [watch, gl, camera])

    return null
}