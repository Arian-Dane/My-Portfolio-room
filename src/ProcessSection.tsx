import { Lightbulb, PenTool, Code2, Rocket, TestTube, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    phase: "01",
    title: "Discovery",
    desc: "Deep-dive into your vision, goals, and audience. Research & mood boards.",
    color: "primary" as const,
  },
  {
    icon: PenTool,
    phase: "02",
    title: "Design",
    desc: "Wireframes → high-fidelity mockups. 3D concepts & UI prototypes in Figma + Blender.",
    color: "accent" as const,
  },
  {
    icon: Code2,
    phase: "03",
    title: "Develop",
    desc: "Clean, modular code. React frontends, Node backends, Blender-to-web pipelines.",
    color: "primary" as const,
  },
  {
    icon: TestTube,
    phase: "04",
    title: "Test",
    desc: "Cross-browser QA, performance audits, accessibility & security checks.",
    color: "accent" as const,
  },
  {
    icon: Rocket,
    phase: "05",
    title: "Deploy",
    desc: "CI/CD pipelines, CDN setup, monitoring. Zero-downtime launch.",
    color: "primary" as const,
  },
  {
    icon: RefreshCw,
    phase: "06",
    title: "Iterate",
    desc: "Analytics-driven improvements, A/B testing, continuous optimization.",
    color: "accent" as const,
  },
];

const ProcessSection = () => {
  return (
    <section className="relative py-32 px-6">
      {/* Decorative grid lines */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-20">
          <span className="font-display text-xs tracking-[0.4em] text-primary/60 uppercase block mb-4">
            // How I Work
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            <span className="neon-text">Process</span>
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, phase, title, desc, color }) => (
            <div
              key={phase}
              className="glass-card rounded-xl p-8 group hover:neon-glow transition-all duration-500 hover:-translate-y-1 relative"
            >
              {/* Phase number */}
              <span className={`absolute top-4 right-4 font-display text-[10px] tracking-widest ${color === "primary" ? "text-primary/30" : "text-accent/30"}`}>
                {phase}
              </span>

              <div className={`w-12 h-12 rounded-lg border ${color === "primary" ? "border-primary/20" : "border-accent/20"} flex items-center justify-center mb-5 group-hover:neon-glow transition-all duration-500`}>
                <Icon size={22} className={`${color === "primary" ? "text-primary/60 group-hover:text-primary" : "text-accent/60 group-hover:text-accent"} transition-colors duration-300`} />
              </div>

              <h3 className={`font-display text-sm tracking-widest uppercase text-foreground/80 mb-3 ${color === "primary" ? "group-hover:neon-text" : "group-hover:neon-text-purple"} transition-all duration-300`}>
                {title}
              </h3>
              <p className="font-body text-sm text-foreground/40 leading-relaxed">
                {desc}
              </p>

              {/* Connector line */}
              <div className={`absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-l ${color === "primary" ? "from-primary/20" : "from-accent/20"} to-transparent`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
