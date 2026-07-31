import { Terminal, Shield, Cpu, Zap, Code2, Braces } from "lucide-react";
import "./AboutSection.css"

const timeline = [
  { year: "2024", title: "Senior Full-Stack Engineer", desc: "Leading AI-powered product development" },
  { year: "2022", title: "Full-Stack Developer", desc: "Built scalable SaaS platforms & APIs" },
  { year: "2020", title: "Frontend Developer", desc: "Crafted immersive web experiences with React & WebGL" },
  { year: "2018", title: "Started Coding", desc: "First line of code → instant addiction" },
];

const traits = [
  { icon: Terminal, label: "CLI Enthusiast" },
  { icon: Shield, label: "Security Minded" },
  { icon: Cpu, label: "Performance Obsessed" },
  { icon: Zap, label: "Fast Learner" },
  { icon: Code2, label: "Clean Code" },
  { icon: Braces, label: "Open Source" },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-32 px-6">
      {/* Decorative grid lines */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="font-display text-xs tracking-[0.4em] text-primary/60 uppercase block mb-4">
            // About Me
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            <span className="neon-text">Who Am I</span>
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Terminal-style about card */}
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border/30">
              <div className="w-3 h-3 rounded-full bg-primary/60" />
              <div className="w-3 h-3 rounded-full bg-accent/60" />
              <div className="w-3 h-3 rounded-full bg-neon-blue/60" />
              <span className="ml-3 font-display text-[10px] tracking-widest text-foreground/30 uppercase">
                ~/about.sh
              </span>
            </div>
            <div className="p-6 font-body text-sm leading-relaxed text-foreground/60 space-y-3">
              <p>
                <span className="text-primary">$</span> <span className="text-foreground/80">whoami</span>
              </p>
              <p className="pl-4">
                A passionate full-stack developer & 3D artist who lives at the intersection of creativity and code.
                I build immersive digital experiences and craft stylized characters & environments in Blender.
              </p>
              <p>
                <span className="text-primary">$</span> <span className="text-foreground/80">cat philosophy.txt</span>
              </p>
              <p className="pl-4">
                I believe great software is an art form — every pixel, every animation, every interaction
                matters. My goal is to create products that feel alive and make users say "wow."
              </p>
              <p>
                <span className="text-primary">$</span> <span className="text-foreground/80">echo $STATUS</span>
              </p>
              <p className="pl-4 text-primary animate-pulse-neon">
                Available for freelance & collaboration ▊
              </p>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-6">
            <span className="font-display text-xs tracking-[0.3em] text-foreground/40 uppercase block mb-6">
              Experience Timeline
            </span>
            {timeline.map((item, i) => (
              <div key={item.year} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors duration-300" />
                  {i < timeline.length - 1 && (
                    <div className="w-[1px] h-full bg-gradient-to-b from-primary/40 to-transparent" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="font-display text-[10px] tracking-widest text-primary/60">{item.year}</span>
                  <h4 className="font-display text-sm tracking-wide text-foreground group-hover:neon-text transition-all duration-300">
                    {item.title}
                  </h4>
                  <p className="font-body text-sm text-foreground/40">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trait badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {traits.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="glass-card flex items-center gap-3 px-5 py-3 rounded-full hover:neon-glow transition-all duration-500 group cursor-default"
            >
              <Icon size={16} className="text-primary/60 group-hover:text-primary transition-colors" />
              <span className="font-display text-[10px] tracking-widest uppercase text-foreground/50 group-hover:text-foreground/80 transition-colors">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;