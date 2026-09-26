// Rough heuristic for classifying device capability. None of these signals
// are perfectly reliable on their own (navigator.deviceMemory is Chrome-only
// and caps out at 8, hardwareConcurrency can lie on some mobile browsers),
// but combined they're a decent proxy for "should we spend less GPU/decode
// budget here."
export function isMobileDevice() {
    return typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export function getDeviceTier() {
    if (typeof navigator === 'undefined') return 'high'

    const memory = navigator.deviceMemory // GB, undefined on Safari/Firefox
    const cores = navigator.hardwareConcurrency
    const isMobile = isMobileDevice()

    let score = 0

    if (memory !== undefined) {
        if (memory <= 2) score -= 2
        else if (memory <= 4) score -= 1
        else score += 1
    }

    if (cores !== undefined) {
        if (cores <= 4) score -= 1
        else if (cores >= 8) score += 1
    }

    if (isMobile) score -= 1

    if (score <= -2) return 'low'
    if (score >= 1) return 'high'
    return 'mid'
}

// Mipmaps and antialiasing stay on for every tier: the baked textures are
// detailed enough that turning either off causes visible shimmering/jaggies.
//
// downscaleBigBakes: swap the two 4096² bakes (bake1, bake5) for the 2048²
// copies in /model/mobile. Those two alone are ~170MB of GPU memory with
// mipmaps, which is what stalls mobile WebGL; the 2048² bakes stay full-res.
export const TIER_SETTINGS = {
    low: {
        maxAnisotropy: 4,
        useMipmaps: true,
        playAmbientVideos: false, // only the idle/league monitor plays
        downscaleBigBakes: true,
    },
    mid: {
        maxAnisotropy: 8,
        useMipmaps: true,
        playAmbientVideos: true,
        downscaleBigBakes: true,
    },
    high: {
        maxAnisotropy: 16,
        useMipmaps: true,
        playAmbientVideos: true,
        downscaleBigBakes: false,
    },
}
