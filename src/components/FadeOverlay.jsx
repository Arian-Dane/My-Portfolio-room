import { FADE_TO_BLACK_MS, FADE_FROM_BLACK_MS } from '../hooks/useIntroSequence.js'

// Full-screen black layer used for the fade between the starting screen
// and the 3D room.
export default function FadeOverlay({ visible }) {
    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: '#000000',
                zIndex: 9999,
                opacity: visible ? 1 : 0,
                transition: `opacity ${visible ? FADE_TO_BLACK_MS : FADE_FROM_BLACK_MS}ms ease-in-out`,
                pointerEvents: visible ? 'auto' : 'none',
            }}
        />
    )
}
