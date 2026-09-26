import { useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import CollapsedSvg from './icons/CollapsedSvg.jsx'
import ExpandSvg from './icons/ExpandSvg.jsx'
import { useFollowElement } from '../hooks/useFollowElement.js'

const TRANSITION = 'all 0.4s cubic-bezier(0.4,0,0.2,1)'

// Three layouts:
//   inline  — phone + minimized: fixed, glued to the webpage placeholder
//   phone   — full-screen, in document flow
//   desktop — full-screen, or a 320×240 picture-in-picture when minimized
function getWindowStyle({ isHidden, isPhone, isMinimized, isInline }) {
    const shared = {
        overflow: 'hidden',
        background: '#000000',
        opacity: isHidden ? 0 : 1,
        pointerEvents: isHidden ? 'none' : 'auto',
    }

    if (isInline) {
        return {
            ...shared,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '250px',
            zIndex: 5,
            borderRadius: '12px',
        }
    }

    if (isPhone) {
        return {
            ...shared,
            position: 'relative',
            top: '0px',
            left: '0px',
            display: 'block',
            width: '100vw',
            height: '100vh',
            borderRadius: '0px',
            transition: TRANSITION,
        }
    }

    return {
        ...shared,
        position: 'absolute',
        top: isMinimized ? '50px' : '0px',
        left: 'auto',
        right: isMinimized ? '20px' : '0px',
        width: isMinimized ? '320px' : '100vw',
        height: isMinimized ? '240px' : '100vh',
        zIndex: isMinimized ? 60 : 1,
        borderRadius: isMinimized ? '9px' : '0px',
        transition: TRANSITION,
    }
}

// The frame around the 3D <Canvas>: positions it for the current layout
// and overlays the minimize/expand and mute buttons.
export default function CanvasWindow({
    isHidden,
    isPhone,
    isMinimized,
    isInline,
    inlineTargetEl,
    onToggleMinimize,
    isMuted,
    onToggleMute,
    children,
}) {
    const containerRef = useRef(null)
    useFollowElement(containerRef, inlineTargetEl, isInline)

    return (
        <div ref={containerRef} style={getWindowStyle({ isHidden, isPhone, isMinimized, isInline })}>
            <div
                onClick={onToggleMinimize}
                className="absolute z-50 top-1 right-1 px-1 py-1 cursor-pointer hover:scale-110 transition-transform"
            >
                {isMinimized ? <ExpandSvg /> : <CollapsedSvg />}
            </div>

            <button
                type="button"
                onClick={onToggleMute}
                className="absolute z-50 top-1 left-1 p-3 rounded-lg bg-white/5 border border-white/10 text-white/70"
            >
                {isMuted ? <VolumeX size={35} /> : <Volume2 size={35} />}
            </button>

            {children}
        </div>
    )
}
