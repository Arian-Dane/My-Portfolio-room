import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Chen",
    role: "CEO, NeuraTech",
    text: "Absolutely mind-blowing work. The UI felt like stepping into a sci-fi movie. Our users can't stop talking about it.",
    avatar: "A",
  },
  {
    name: "Sarah Kim",
    role: "CTO, QuantumLabs",
    text: "One of the most talented developers I've ever worked with. Delivers pixel-perfect, performant code every time.",
    avatar: "S",
  },
  {
    name: "Marcus Wright",
    role: "Lead Designer, SynthCorp",
    text: "The attention to detail is unreal. Every animation, every interaction — pure craftsmanship.",
    avatar: "M",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-32 px-6">
      {/* Decorative grid lines */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="font-display text-xs tracking-[0.4em] text-accent/60 uppercase block mb-4">
            // Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            <span className="neon-text-purple">What They Say</span>
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass-card rounded-xl p-8 hover:neon-glow-purple transition-all duration-500 hover:-translate-y-1 group relative"
            >
              <Quote size={24} className="text-accent/20 mb-4" />
              <p className="font-body text-sm text-foreground/50 leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center font-display text-sm text-accent/70 group-hover:neon-glow-purple transition-all duration-300">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-display text-xs tracking-widest text-foreground/70">{t.name}</p>
                  <p className="font-body text-xs text-foreground/30">{t.role}</p>
                </div>
              </div>
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent/20 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/20 rounded-bl-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
