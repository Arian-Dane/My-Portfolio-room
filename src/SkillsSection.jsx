const skills = [
  { name: "JavaScript / TypeScript", level: 95 },
  { name: "React / Next.js", level: 92 },
  { name: "Blender / 3D Modeling", level: 88 },
  { name: "Three.js / WebGL", level: 80 },
  { name: "Node.js / Express", level: 88 },
  { name: "Python / AI & ML", level: 75 },
  { name: "Cycles / EEVEE Rendering", level: 85 },
];

const tools = ["Git", "Docker", "AWS", "Figma", "Linux", "CI/CD", "Substance Painter", "ZBrush"];

const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-32 px-6">
        {/* Decorative grid lines */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="font-display text-xs tracking-[0.4em] text-accent/60 uppercase block mb-4">
            // Tech Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            <span className="neon-text-purple">Skills</span>
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-6" />
        </div>

        {/* Skill bars */}
        <div className="space-y-6 mb-16">
          {skills.map((skill) => (
            <div key={skill.name} className="group">
              <div className="flex justify-between mb-2">
                <span className="font-display text-xs tracking-widest text-foreground/70 uppercase">
                  {skill.name}
                </span>
                <span className="font-display text-xs text-primary/60">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full h-[3px] bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-neon-purple transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div className="text-center">
          <span className="font-display text-xs tracking-[0.3em] text-foreground/40 uppercase block mb-6">
            Tools & Platforms
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="glass-card px-5 py-2 rounded-full font-display text-[11px] tracking-widest uppercase text-foreground/50 hover:text-primary hover:neon-glow transition-all duration-500 cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
