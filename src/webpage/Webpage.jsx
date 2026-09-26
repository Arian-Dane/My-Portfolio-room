import AboutMePage from "./sections/AboutSection.jsx"
import CyberNav from "./sections/CyberNav.jsx";
import HeroSection from "./sections/HeroSection.jsx";
import Stats from "./sections/StatsSection.tsx"
import Services from "./sections/ServicesSection.jsx"
import Projects from "./sections/ProjectsSection.jsx"
import Process from "./sections/ProcessSection.tsx"
import TechStack from "./sections/TechStackSection.jsx"
import Contact from "./sections/ContactSection.tsx"
import Footer from "./sections/FooterSection.jsx"

// Reserves the space the real canvas visually occupies. The actual
// <canvas> is never rendered here — it lives permanently in App, and
// is just position:fixed + synced to this element's on-screen rect
// every frame. This div only needs to take up the right amount of
// space so the rest of the page flows correctly around it.
const placeholderStyle = {
    width: '100%',
    height: '250px',
    marginTop: '20px',
}

export default function Webpage({
    isMuted,
    onToggleMute,
    isPhoneMinimizedInline,
    placeholderRef,
}) {

    return (
        <div className="webpage-root overflow-y-auto overflow-x-hidden h-screen w-screen relative ">
        
            <CyberNav isMuted={isMuted} onToggleMute={onToggleMute} />
            <HeroSection/>

            {
                isPhoneMinimizedInline &&

                <div
                    ref={placeholderRef}
                    style={placeholderStyle}
                />
            }

            <AboutMePage />
            <Stats/>
            <Services/>
            <Projects/>
            <Process/>
            <TechStack/>
            <Contact/>
            <Footer/>
        
        </div>
    
  )
}