import { Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";

const ContactSection = () => {
  const [state, handleSubmit] = useForm("mdenaqlj");
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state.succeeded && formRef.current) {
      formRef.current.reset();
    }
  }, [state.succeeded]);

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-display text-xs tracking-[0.4em] text-primary/60 uppercase block mb-4">
            // Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            <span className="neon-text">Contact</span>
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
          <p className="font-body text-foreground/40 mt-6 text-lg">
            Have a project in mind? Let's build something amazing together.
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 md:p-10 space-y-6 border-[#160925]" style={{ borderColor: '#160925' }}>
          <div>
            <label className="font-display text-[10px] tracking-[0.3em] text-foreground/40 uppercase block mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full bg-[hsl(240,18.37%,9.61%)] border border-[#160925] rounded-lg px-4 py-3 font-body text-foreground/80 placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 focus:neon-glow transition-all duration-300"
              placeholder="Your name"
            />
            <ValidationError field="name" errors={state.errors} />
          </div>
          <div>
            <label className="font-display text-[10px] tracking-[0.3em] text-foreground/40 uppercase block mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-[hsl(240,18.37%,9.61%)] border border-[#160925] rounded-lg px-4 py-3 font-body text-foreground/80 placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 focus:neon-glow transition-all duration-300"
              placeholder="your@email.com"
            />
            <ValidationError field="email" errors={state.errors} />
          </div>
          <div>
            <label className="font-display text-[10px] tracking-[0.3em] text-foreground/40 uppercase block mb-2">
              Message
            </label>
            <textarea
              required
              name="message"
              rows={5}
              className="w-full bg-[hsl(240,18.37%,9.61%)] border border-[#160925] rounded-lg px-4 py-3 font-body text-foreground/80 placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 focus:neon-glow transition-all duration-300 resize-none"
              placeholder="Tell me about your project..."
            />
            <ValidationError field="message" errors={state.errors} />
          </div>
          <button
            type="submit"
            disabled={state.submitting}
            className="w-full flex items-center justify-center gap-3 font-display text-sm tracking-[0.2em] uppercase px-8 py-4 rounded-full border border-primary/50 text-primary neon-glow hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:shadow-[0_0_30px_hsl(var(--neon-pink)/0.5),0_0_60px_hsl(var(--neon-pink)/0.3)] hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {state.succeeded ? "Message Sent ✓" : (
              <>
                Send Message <Send size={14} />
              </>
            )}
          </button>
          {state.succeeded && (
            <p className="mt-4 text-center text-sm text-primary">
              Thanks! Your message is on its way.
            </p>
          )}
        </form>
      </div>

      {/* Footer */}
      <div className="text-center mt-20">
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-6" />
        <p className="font-display text-[10px] tracking-[0.3em] text-foreground/20 uppercase">
          your turn
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
