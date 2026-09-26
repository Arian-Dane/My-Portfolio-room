import { Globe, Palette, Database, Bot, Box, Lock } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "High-performance web apps with cutting-edge frameworks and immersive UI.",
  },
  {
    icon: Box,
    title: "3D Characters & Renders",
    desc: "Stylized characters, hard-surface models, and cinematic renders in Blender.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Futuristic interfaces that blend aesthetics with seamless user experiences.",
  },
  {
    icon: Database,
    title: "Backend & APIs",
    desc: "Scalable architectures, real-time systems, and robust data pipelines.",
  },
  {
    icon: Bot,
    title: "AI Integration",
    desc: "Machine learning models and intelligent features woven into your product.",
  },
  {
    icon: Lock,
    title: "Security",
    desc: "Secure-by-design systems with encryption, auth, and vulnerability hardening.",
  },
];

const ServicesSection = () => {
  return (
    <section className="relative py-32 px-6">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      {/* Animated background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-20">
          <span className="font-display text-xs tracking-[0.4em] text-primary/60 uppercase block mb-4">
            // What I Do
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            <span className="neon-text">Services</span>
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="glass-card rounded-xl p-8 group hover:neon-glow transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="w-12 h-12 rounded-lg border border-primary/20 flex items-center justify-center mb-5 group-hover:neon-glow transition-all duration-500">
                  <Icon size={22} className="text-primary/60 group-hover:text-primary transition-colors duration-300" />
                </div>
                <h3 className="font-display text-sm tracking-widest uppercase text-foreground/80 mb-3 group-hover:neon-text transition-all duration-300">
                  {title}
                </h3>
                <p className="font-body text-sm text-foreground/40 leading-relaxed">{desc}</p>
              </div>

              {/* Corner line decoration */}
              <div className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-l from-primary/30 to-transparent" />
              <div className="absolute top-0 right-0 h-12 w-[1px] bg-gradient-to-b from-primary/30 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
