// Asset paths and the Blender object names the scene code looks for.
// If an object is renamed in Blender, this is the only file to update.

export const ROOM_URL = '/model/room.glb'

export const BAKE_KEYS = ['bake1', 'bake2', 'bake3', 'bake4', 'bake5', 'bake6', 'bake7']

// The 4096² bakes; low/mid devices get the 2048² copies in /model/mobile.
const BIG_BAKES = ['bake1', 'bake5']

export const bakeUrls = (downscaleBigBakes) =>
    Object.fromEntries(BAKE_KEYS.map((key) => [
        key,
        downscaleBigBakes && BIG_BAKES.includes(key)
            ? `/model/mobile/${key}.webp`
            : `/model/${key}.webp`,
    ]))

export const VIDEO_URLS = {
    cyberpunk: '/model/cyberpunk.mp4',
    arcane: '/model/arcane.mp4',
    defeat: '/model/leagueScreens/DefeatScreen.mp4',
    victory: '/model/leagueScreens/VictoryScreen.mp4',
}

// Mesh name → which video texture it displays.
export const VIDEO_SCREENS = [
    { meshName: 'Cyberpunk_Monitor_Screen', video: 'cyberpunk' },
    { meshName: 'TV_Screen', video: 'arcane' },
    { meshName: 'Idle_Monitor_Screen', video: 'idle' },
]

// Clickable objects. `hitboxName` is the invisible *_Interact cube that
// receives pointer events; `meshName` is the visible object it animates.
//   kind 'social'  — hover lifts the icon; click opens `url` (or, for
//                    email, jumps to the webpage's contact section)
//   kind 'section' — hover grows the glow sphere; click flies the camera
export const INTERACTIVES = [
    { key: 'github', kind: 'social', hitboxName: 'Github_Cube_Interact', meshName: 'Github_bake2', url: 'https://github.com' },
    { key: 'linkedIn', kind: 'social', hitboxName: 'Indeed_Cube_Interact', meshName: 'Indeed_bake2', url: 'https://www.linkedin.com/' },
    { key: 'email', kind: 'social', hitboxName: 'Email_Cube_Interact', meshName: 'Email_bake2' },
    { key: 'aboutMe', kind: 'section', hitboxName: 'About_Me_Cube_Interact', meshName: 'About_me_Sphere_Glow' },
    { key: 'contactMe', kind: 'section', hitboxName: 'Contact_Me_Cube_Interact', meshName: 'Contact_me_Sphere_Glow' },
    { key: 'experience', kind: 'section', hitboxName: 'Experiance_Cube_Interact', meshName: 'experiance_Sphere_Glow' },
]
