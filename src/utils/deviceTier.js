// Rough heuristic for classifying device capability. None of these signals
// are perfectly reliable on their own (navigator.deviceMemory is Chrome-only
// and caps out at 8, hardwareConcurrency can lie on some mobile browsers),
// but combined they're a decent proxy for "should we spend less GPU/decode
// budget here."
export function getDeviceTier() {
    if (typeof navigator === 'undefined') return 'high'

    const memory = navigator.deviceMemory // GB, undefined on Safari/Firefox
    const cores = navigator.hardwareConcurrency
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

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

export const TIER_SETTINGS = {
    low: {
        maxAnisotropy: 1,
        useMipmaps: false,
        playAmbientVideos: false, // only the idle/league monitor plays
    },
    mid: {
        maxAnisotropy: 4,
        useMipmaps: true,
        playAmbientVideos: true,
    },
    high: {
        maxAnisotropy: 16,
        useMipmaps: true,
        playAmbientVideos: true,
    },
}
