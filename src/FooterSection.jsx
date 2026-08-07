import { GitBranch, Link, Mail, ArrowUp } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="relative py-16 px-6 border-t border-border/20">
      {/* Glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] blur-sm bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div>
            <span className="font-display text-sm tracking-[0.3em] neon-text block">DEV</span>
            <span className="font-body text-[10px] text-foreground/30">Code · Create · Render</span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-6">
            {["Home", "About", "3D", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-display text-[10px] tracking-[0.2em] uppercase text-foreground/30 hover:text-primary transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            {[GitBranch, Link, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-lg border border-border/20 text-foreground/30 hover:text-primary hover:border-primary/30 transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-border/10 my-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-[9px] tracking-[0.3em] text-foreground/20 uppercase">
            © 2026 — Your journey starts here
          </p>
          <a
            href="#home"
            className="flex items-center gap-2 font-display text-[9px] tracking-widest uppercase text-foreground/20 hover:text-primary transition-colors duration-300"
          >
            Back to top <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
