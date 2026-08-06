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

export default function Webpage({ minimizedCanvas, isMuted, onToggleMute }) {

    return (
        <div className="webpage-root overflow-y-auto overflow-x-hidden h-screen w-screen relative ">
        
            <CyberNav isMuted={isMuted} onToggleMute={onToggleMute} />
            <HeroSection/>
            <AboutMePage />
            <Stats/>
            <Services/>
            <Projects/>
            <Process/>
            <Skills/>
            <TechStack/>
            <Testimonial/>
            <Contact/>
            <Footer/>
        
        </div>
    
  )
}
