// Single, long-lived <video> for the hero section. <Webpage> only mounts
// when the canvas is minimized, so a fresh <video> in HeroSection would
// have to fetch + decode from scratch every time (≈1s frozen frame).
// Instead we create this once on "Wake up", let it buffer while the
// person is in the 3D room, and HeroSection just moves it into place.

const HERO_SRC = '/model/veo3.mp4'

let heroVideo = null

export function getHeroVideo() {
    if (heroVideo) return heroVideo

    const v = document.createElement('video')
    v.muted = true
    v.defaultMuted = true
    v.loop = true
    v.playsInline = true
    v.setAttribute('playsinline', 'true')
    v.setAttribute('webkit-playsinline', 'true')
    v.preload = 'auto'
    v.poster = '/model/veo3-poster.webp'
    v.className = 'w-full h-full object-cover'
    v.src = HERO_SRC

    heroVideo = v
    return v
}

// Call from a user gesture: the play/pause kick makes iOS actually buffer
// and decode the first frame instead of ignoring preload.
export function preloadHeroVideo() {
    const v = getHeroVideo()
    v.play().then(() => v.pause()).catch(() => {})
}
