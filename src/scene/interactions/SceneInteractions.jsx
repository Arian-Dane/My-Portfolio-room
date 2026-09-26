import { useState } from 'react'
import CameraSections from '../CameraSections.jsx'
import { animateSocialIcon, animateSectionGlow } from './hoverAnimations.js'

// Invisible pointer target placed over an interactive object. The real
// hitbox mesh stays hidden inside room.scene; this copy receives events.
function Hitbox({ hitbox, onHover, onClick }) {
    return (
        <mesh
            geometry={hitbox.geometry}
            position={hitbox.position}
            scale={hitbox.scale}
            visible={false}
            onPointerOver={() => onHover(true)}
            onPointerOut={() => onHover(false)}
            onClick={onClick}
        />
    )
}

// `interactives` comes from setupRoom(): INTERACTIVES entries with their
// `hitbox` and `mesh` resolved from the loaded scene.
export default function SceneInteractions({ interactives, onEmailClick }) {
    const [selectedSection, setSelectedSection] = useState(null)
    const [activeSection, setActiveSection] = useState(false)

    const handleClick = ({ key, kind, url }) => {
        if (kind === 'section') {
            setSelectedSection(key)
            setActiveSection(!activeSection)
            return
        }
        // Email has no URL — App minimizes the canvas and scrolls the
        // webpage to its contact section instead.
        if (key === 'email') {
            onEmailClick?.()
            return
        }
        if (url) window.open(url, '_blank')
    }

    return (
        <>
            {interactives.map((item) => (
                <Hitbox
                    key={item.key}
                    hitbox={item.hitbox}
                    onHover={(isHovering) =>
                        item.kind === 'social'
                            ? animateSocialIcon(item.mesh, isHovering)
                            : animateSectionGlow(item.mesh, isHovering)
                    }
                    onClick={() => handleClick(item)}
                />
            ))}

            <CameraSections cameraSections={selectedSection} active={activeSection} />
        </>
    )
}
