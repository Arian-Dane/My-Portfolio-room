import { useEffect, useState } from 'react'

// Queue a scroll to an element id that may not be mounted yet. Returns a
// setter; the scroll happens once `isReady` is true. The frame delay lets
// the just-mounted DOM lay out before we measure it.
export function useDeferredScroll(isReady) {
    const [targetId, setTargetId] = useState(null)

    useEffect(() => {
        if (!targetId || !isReady) return

        const rafId = requestAnimationFrame(() => {
            document.getElementById(targetId)
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setTargetId(null)
        })
        return () => cancelAnimationFrame(rafId)
    }, [targetId, isReady])

    return setTargetId
}
