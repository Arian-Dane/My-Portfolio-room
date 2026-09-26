import * as THREE from 'three'

// Hidden, muted, inline-playable <video> used as a texture source. It's
// attached to the DOM (1px, invisible) because some mobile browsers
// won't decode frames for detached video elements.
export function createHiddenVideo(src, preload = 'auto') {
    const v = document.createElement('video')
    v.src = src
    v.crossOrigin = 'anonymous'
    v.loop = true
    v.muted = true
    v.defaultMuted = true
    v.playsInline = true
    v.setAttribute('playsinline', 'true')
    v.setAttribute('webkit-playsinline', 'true')
    v.preload = preload

    Object.assign(v.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '1px',
        height: '1px',
        opacity: '0',
        pointerEvents: 'none',
        zIndex: '-1',
    })

    document.body.appendChild(v)
    return v
}

export function createVideoTexture(video) {
    const t = new THREE.VideoTexture(video)
    t.minFilter = THREE.LinearFilter
    t.magFilter = THREE.LinearFilter
    t.colorSpace = THREE.SRGBColorSpace
    t.flipY = false
    t.generateMipmaps = false
    return t
}

export function destroyHiddenVideo(v) {
    v.pause()
    v.removeAttribute('src')
    v.load()
    v.remove()
}

export function tryPlay(v, label) {
    v?.play().catch((err) => console.warn(`${label} play failed:`, err?.name, err?.message))
}
