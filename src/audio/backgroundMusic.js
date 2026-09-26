// Background music: a one-off intro that hands over to a looping track.
//
// Nothing is fetched at page load — these files are large and would
// compete with the GLB/textures for bandwidth. The intro starts
// buffering once the starting screen is shown; the loop streams on
// demand when the intro ends.

const VOLUME = 0.3

const intro = new Audio('/model/bg-music.MP3')
intro.preload = 'none'
intro.loop = false
intro.volume = VOLUME

const loop = new Audio('/model/bg-loop.MP3')
loop.preload = 'none'
loop.loop = true
loop.volume = VOLUME

intro.addEventListener('ended', () => {
    loop.currentTime = 0
    loop.play().catch((error) => console.warn('Background loop audio failed to start:', error))
})

export function bufferIntroMusic() {
    intro.preload = 'auto'
    intro.load()
}

export function playIntroMusic() {
    intro.play().catch((error) => console.warn('Audio failed', error))
}

export function setMusicMuted(muted) {
    intro.muted = muted
    loop.muted = muted
}
