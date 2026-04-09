import { Cpu, Sparkles } from "lucide-react";

const AboutSection = () => (
  <section id="about" className="py-20 md:py-28 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
    <div className="absolute inset-0 hex-pattern opacity-30" />

    <div className="container relative z-10 max-w-4xl">
      <div className="text-center mb-10">
        <p className="font-accent text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3">
          About The Fest
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 text-foreground">
          What is <span className="text-primary text-glow-blue">SIDNOVA</span>?
        </h2>
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-strong rounded-2xl p-6 border border-primary/10 hover:border-primary/25 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-primary">Technical</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            From cutting-edge AI summits and intense hackathons to thought-provoking parliament simulations — Day 1 is pure innovation. Push boundaries, solve real problems, and showcase your technical brilliance.
          </p>
        </div>

        <div className="glass-strong rounded-2xl p-6 border border-secondary/10 hover:border-secondary/25 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-secondary/10">
              <Sparkles className="w-5 h-5 text-secondary" />
            </div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-secondary">Cultural</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Auto Exotica revs up Day 2 with superbikes and supercars, while Day 3 brings the grand Musical Night — live performances, energy, and celebration. Where tech meets culture.
          </p>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed">
        Organized by the{" "}
        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-base font-semibold text-primary text-glow-blue">
          Unified College Clubs Council (UCCC)
        </span>
        ,{" "}
        <span className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-base font-semibold text-secondary text-glow-orange">
          Siddhartha Institute of Technology and Sciences
        </span>{" "}
        brings B.Tech, Diploma, B.Pharm, Pharm-D, M.Tech, MBA & MCA students together for three unforgettable days.
      </p>
    </div>
  </section>
);

export default AboutSection;
