import "./Webpage.css";

import AboutMePage from "./AboutSection.jsx"
import CyberNav from "./CyberNav.jsx";
import HeroSection from "./HeroSection.jsx";
import Stats from "./StatsSection.tsx"
import Services from"./ServicesSection.jsx" 
import Projects from "./ProjectsSection.jsx"
import Process from "./ProcessSection.tsx"
import Skills from "./SkillsSection.jsx"
import TechStack from "./TeckStackSection.jsx"
import Testimonial from "./TestimonialsSection.jsx"
import Contact from "./ContactSection.tsx"
import Footer from "./FooterSection.jsx"

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
            {/* <Skills/> */}
            <TechStack/>
            {/* <Testimonial/> */}
            <Contact/>
            <Footer/>
        
        </div>
    
  )
}