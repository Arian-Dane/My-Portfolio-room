const techCategories = [
  {
    title: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Three.js", "Tailwind CSS", "GSAP"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Python", "Express", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    title: "3D & Creative",
    items: ["Blender", "Cycles", "EEVEE", "Geometry Nodes", "Substance Painter", "Animation"],
  },
  {
    title: "DevOps & Tools",
    items: ["Docker", "AWS", "Git", "CI/CD", "Figma"],
  },
];

const TechStackSection = () => {
  return (
    <section className="relative py-32 px-6">
      {/* Decorative grid lines */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="font-display text-xs tracking-[0.4em] text-accent/60 uppercase block mb-4">
            // Arsenal
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            <span className="neon-text-purple">Tech Stack</span>
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((cat, ci) => (
            <div key={cat.title} className="glass-card rounded-xl p-6 group hover:neon-glow-purple transition-all duration-500">
              <h3 className="font-display text-[10px] tracking-[0.3em] uppercase text-accent/60 mb-5 text-center">
                {cat.title}
              </h3>
              <div className="space-y-2">
                {cat.items.map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-accent/5 transition-colors duration-300 group/item"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover/item:bg-accent transition-colors" />
                    <span className="font-body text-sm text-foreground/50 group-hover/item:text-foreground/80 transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
