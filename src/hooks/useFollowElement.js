import { useLayoutEffect } from 'react'

// While `enabled`, keeps a position:fixed element glued to `targetEl`'s
// on-screen rect every frame (so it scrolls with the page).
export function useFollowElement(followerRef, targetEl, enabled) {
    useLayoutEffect(() => {
        const el = followerRef.current
        if (!el || !enabled || !targetEl) return

        let rafId
        const sync = () => {
            const rect = targetEl.getBoundingClientRect()
            el.style.top = `${rect.top}px`
            el.style.left = `${rect.left}px`
            el.style.width = `${rect.width}px`
            el.style.height = `${rect.height}px`
            rafId = requestAnimationFrame(sync)
        }
        rafId = requestAnimationFrame(sync)

        return () => cancelAnimationFrame(rafId)
    }, [followerRef, targetEl, enabled])
}
