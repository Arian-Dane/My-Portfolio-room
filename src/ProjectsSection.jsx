import { ExternalLink, GitBranch } from "lucide-react";

const GitHubIcon = GitBranch;

const projects = [
  {
    title: "Neural Dashboard",
    description: "AI-powered analytics dashboard with real-time data visualization and predictive modeling.",
    tech: ["React", "Three.js", "Python", "TensorFlow"],
    image: "🧠",
  },
  {
    title: "CyberChat",
    description: "End-to-end encrypted messaging platform with holographic UI and voice synthesis.",
    tech: ["TypeScript", "WebRTC", "Node.js", "Redis"],
    image: "💬",
  },
  {
    title: "Neon Riders — 3D Short Film",
    description: "Cyberpunk animated short film with fully rigged characters, VFX, and compositing in Blender.",
    tech: ["Blender", "Cycles", "After Effects", "DaVinci"],
    image: "🎬",
  },
  {
    title: "Mecha Character Pack",
    description: "Collection of 10 rigged mecha characters with PBR materials, ready for game engines.",
    tech: ["Blender", "Substance Painter", "Unity", "Unreal"],
    image: "🤖",
  },
  {
    title: "QuantumPay",
    description: "Next-gen payment gateway with blockchain integration and biometric authentication.",
    tech: ["Solidity", "React", "Rust", "GraphQL"],
    image: "⚡",
  },
  {
    title: "SynthOS",
    description: "Custom operating system interface built for creative professionals and developers.",
    tech: ["Electron", "Rust", "WebGL", "WASM"],
    image: "🖥️",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-32 px-6">
      {/* Decorative grid lines */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="font-display text-xs tracking-[0.4em] text-primary/60 uppercase block mb-4">
            // Featured Work
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            <span className="neon-text">Projects</span>
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="group glass-card rounded-xl p-8 hover:neon-glow transition-all duration-500 hover:-translate-y-1"
            >
              {/* Project icon */}
              <div className="text-4xl mb-5">{project.image}</div>

              <h3 className="font-display text-lg tracking-wide text-foreground mb-3 group-hover:neon-text transition-all duration-300">
                {project.title}
              </h3>
              <p className="font-body text-foreground/50 text-sm leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-display text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-primary/20 text-primary/60"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                <a href="#" className="text-foreground/30 hover:text-primary transition-colors duration-300">
                  <GitHubIcon className="inline-block" size={16} />
                </a>
                <a href="#" className="text-foreground/30 hover:text-primary transition-colors duration-300">
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
