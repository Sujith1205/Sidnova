import { Award, DollarSign, Users, Globe } from "lucide-react";

const reasons = [
  { icon: Award, title: "Certificates", desc: "Get recognized with participation & winner certificates.", color: "primary" },
  { icon: DollarSign, title: "Cash Prizes", desc: "Win exciting cash prizes across multiple events.", color: "secondary" },
  { icon: Users, title: "Networking", desc: "Connect with peers, mentors, and industry experts.", color: "accent" },
  { icon: Globe, title: "Real-World Exposure", desc: "Tackle real challenges and gain practical experience.", color: "cultural-gold" },
];

const WhyParticipate = () => (
  <section className="py-20 md:py-28 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
    <div className="absolute inset-0 hex-pattern opacity-30" />
    <div className="container relative z-10">
      <div className="text-center mb-14">
        <p className="font-accent text-sm font-semibold tracking-[0.3em] uppercase text-secondary mb-3">Why Join</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Why Participate?</h2>
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-secondary/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-secondary/40" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {reasons.map((r) => (
          <div key={r.title} className="group glass-strong rounded-2xl p-6 text-center border border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_hsl(195_100%_50%/0.08)]">
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-${r.color}/10 border border-${r.color}/15 mb-4 group-hover:scale-110 transition-transform`}>
              <r.icon className={`w-6 h-6 text-${r.color}`} />
            </div>
            <h3 className="font-heading text-xs font-bold text-foreground mb-2 tracking-wider">{r.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyParticipate;
