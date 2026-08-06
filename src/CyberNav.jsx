import { useState } from "react";
import { Menu, X, Volume2, VolumeX } from "lucide-react";

const navItems = ["Home", "Projects", "Skills", "Contact"];

const CyberNav = ({ isMuted, onToggleMute }) => {
  console.log('CyberNav rendered with isMuted =', isMuted, 'onToggleMute =', typeof onToggleMute)
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl">
      
      {/* Navbar */}
      <div className="glass-nav rounded-full px-8 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <span className="font-display text-sm tracking-[0.3em] neon-text animate-pulse-neon">
          DEV
        </span>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-display text-xs tracking-[0.2em] text-gray-400 hover:text-pink-400 hover:drop-shadow-[0_0_6px_rgba(255,0,150,0.8)] transition-all duration-300 uppercase"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right-side controls: mute (always visible) + mobile toggle */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            aria-pressed={isMuted}
            className="text-gray-400 hover:text-pink-400 hover:drop-shadow-[0_0_6px_rgba(255,0,150,0.8)] transition-all duration-300"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-400 hover:text-pink-400 transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-nav rounded-2xl mt-2 p-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="font-display text-sm tracking-[0.2em] text-gray-400 hover:text-pink-400 hover:drop-shadow-[0_0_6px_rgba(255,0,150,0.8)] transition-all duration-300 uppercase"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default CyberNav;
