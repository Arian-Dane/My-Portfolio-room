import { useEffect, useRef } from "react";
import { GitBranch, Link2, Mail, ArrowDown } from "lucide-react";

const socialLinks = [
  { icon: GitBranch, href: "#", label: "GitHub" },
  { icon: Link2, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

const HeroSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const attemptPlay = async () => {
      try {
        video.currentTime = 0;
        await video.play();
      } catch (error) {
        console.warn("Hero video autoplay was blocked:", error);
      }
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener("canplay", attemptPlay, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", attemptPlay);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden p-8"
    >
      {/* Background VIDEO */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          webkit-playsinline="true"
          className="w-full h-full object-cover"
        >
          <source src="/model/veo3.mp4" type="video/mp4" />
        </video>

        {/* PINK CENTER GLOW */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.10),transparent_55%)]" />

        {/* BLOOM */}
        <div className="absolute inset-0 blur-2xl bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.12),transparent_60%)]" />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/30" />

        {/* DEPTH */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/60" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay z-[1] opacity-40" />

      {/* Scanlines */}
      <div className="absolute inset-0 scanlines z-[2] pointer-events-none" />

      {/* Moving scanline */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scanline" />
      </div>

      {/* CONTENT (FIXED LEFT ALIGN) */}
      <div className="relative z-20 w-full pl-4 md:pl-8 lg:pl-16 pr-6">
        <div className="max-w-2xl text-left">
          
          {/* Status */}
          <div className="flex items-center gap-2 mb-6 opacity-0 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-neon" />
            <span className="font-display text-xs tracking-[0.3em] text-primary/80 uppercase neon-text">
              System Online
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black leading-tight mb-6 opacity-0 animate-fade-in-up">
            <span className="text-foreground">Hi, I'm a</span>
            <br />
            <span className="neon-text animate-glitch-skew inline-block">
              Software Developer
            </span>
          </h1>

          {/* Subtext */}
          <p className="font-body text-lg sm:text-xl md:text-2xl text-foreground/60 tracking-wide mb-10 opacity-0 animate-fade-in-up">
            Full-Stack Developer{" "}
            <span className="neon-text-purple">|</span> JavaScript, React,
            Three.js, AI
          </p>

          {/* CTA */}
          <div className="mb-10 opacity-0 animate-fade-in-up">
            <a
              href="#projects"
              className="inline-block font-display text-sm tracking-[0.2em] uppercase px-10 py-4 rounded-full border border-primary/50 text-primary neon-button hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:shadow-[0_0_30px_hsl(var(--neon-pink)/0.5),0_0_60px_hsl(var(--neon-pink)/0.3)] hover:scale-105"
            >
              View Projects
            </a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-6 opacity-0 animate-fade-in-up">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="group relative p-3 rounded-lg glass-card icon-glow transition-all duration-500"
              >
                <Icon
                  size={20}
                  className="text-foreground/50 group-hover:text-primary transition-colors duration-300"
                />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-display text-[10px] tracking-widest text-primary/0 group-hover:text-primary/80 transition-all duration-300">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-float">
        <ArrowDown size={20} className="text-primary/40" />
      </div>

      {/* Side decorations */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-[2px] h-8 bg-gradient-to-b from-primary/40 to-transparent"
            style={{ opacity: 1 - i * 0.15 }}
          />
        ))}
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-[2px] h-8 bg-gradient-to-b from-accent/40 to-transparent"
            style={{ opacity: 1 - i * 0.15 }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;