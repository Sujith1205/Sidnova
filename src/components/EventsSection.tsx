import { ArrowRight, Brain, Car, Code, FlaskConical, Landmark, Music } from "lucide-react";
import { Link } from "react-router-dom";

import { eventsData } from "@/data/events";
import concertImage from "../../images/concert.webp";
import traditionalImage from "../../images/traditional.webp";

const iconMap: Record<string, React.ElementType> = {
  "ai-summit": Brain,
  "hackathon": Code,
  "parliament-simulation": Landmark,
  "pharmacy-events": FlaskConical,
  "auto-exotica": Car,
  "culturals": Music,
};

const themeMap: Record<string, { border: string; iconBg: string; iconText: string; badge: string; glow: string; lineClass: string }> = {
  "ai-summit": {
    border: "border-primary/20 hover:border-primary/40",
    iconBg: "bg-primary/10",
    iconText: "text-primary",
    badge: "bg-primary/15 text-primary border border-primary/20",
    glow: "group-hover:shadow-[0_0_30px_hsl(195_100%_50%/0.1)]",
    lineClass: "bg-gradient-to-r from-transparent via-primary/60 to-transparent",
  },
  "hackathon": {
    border: "border-accent/20 hover:border-accent/40",
    iconBg: "bg-accent/10",
    iconText: "text-accent",
    badge: "bg-accent/15 text-accent border border-accent/20",
    glow: "group-hover:shadow-[0_0_30px_hsl(280_70%_55%/0.1)]",
    lineClass: "bg-gradient-to-r from-transparent via-accent/60 to-transparent",
  },
  "parliament-simulation": {
    border: "border-cultural-gold/20 hover:border-cultural-gold/40",
    iconBg: "bg-cultural-gold/10",
    iconText: "text-cultural-gold",
    badge: "bg-cultural-gold/15 text-cultural-gold border border-cultural-gold/20",
    glow: "group-hover:shadow-[0_0_30px_hsl(42_90%_55%/0.1)]",
    lineClass: "bg-gradient-to-r from-transparent via-cultural-gold/60 to-transparent",
  },
  "pharmacy-events": {
    border: "border-primary/20 hover:border-primary/40",
    iconBg: "bg-primary/10",
    iconText: "text-primary",
    badge: "bg-primary/15 text-primary border border-primary/20",
    glow: "group-hover:shadow-[0_0_30px_hsl(195_100%_50%/0.1)]",
    lineClass: "bg-gradient-to-r from-transparent via-primary/60 to-transparent",
  },
  "auto-exotica": {
    border: "border-secondary/20 hover:border-secondary/40",
    iconBg: "bg-secondary/10",
    iconText: "text-secondary",
    badge: "bg-secondary/15 text-secondary border border-secondary/20",
    glow: "group-hover:shadow-[0_0_30px_hsl(30_100%_55%/0.1)]",
    lineClass: "bg-gradient-to-r from-transparent via-secondary/60 to-transparent",
  },
  "culturals": {
    border: "border-accent/20 hover:border-accent/40",
    iconBg: "bg-accent/10",
    iconText: "text-accent",
    badge: "bg-accent/15 text-accent border border-accent/20",
    glow: "group-hover:shadow-[0_0_30px_hsl(280_70%_55%/0.1)]",
    lineClass: "bg-gradient-to-r from-transparent via-accent/60 to-transparent",
  },
};

const visualMap: Record<string, { shell: string; glow: string; accent: string }> = {
  "ai-summit": {
    shell: "bg-[radial-gradient(circle_at_top,_hsl(195_100%_50%/0.25),_transparent_45%),linear-gradient(135deg,#02111f_10%,#06253e_55%,#0a1425_100%)]",
    glow: "shadow-[inset_0_0_40px_hsl(195_100%_50%/0.12)]",
    accent: "text-primary",
  },
  "hackathon": {
    shell: "bg-[radial-gradient(circle_at_top,_hsl(280_70%_55%/0.28),_transparent_40%),linear-gradient(135deg,#120a1f_0%,#182d63_48%,#090d1c_100%)]",
    glow: "shadow-[inset_0_0_40px_hsl(280_70%_55%/0.14)]",
    accent: "text-accent",
  },
  "parliament-simulation": {
    shell: "bg-[radial-gradient(circle_at_top,_hsl(42_90%_55%/0.22),_transparent_42%),linear-gradient(135deg,#120f1f_0%,#262033_52%,#0a0f22_100%)]",
    glow: "shadow-[inset_0_0_40px_hsl(42_90%_55%/0.12)]",
    accent: "text-cultural-gold",
  },
  "pharmacy-events": {
    shell: "bg-[radial-gradient(circle_at_top,_hsl(195_100%_50%/0.2),_transparent_42%),linear-gradient(135deg,#081325_0%,#123746_48%,#0a1824_100%)]",
    glow: "shadow-[inset_0_0_40px_hsl(195_100%_50%/0.12)]",
    accent: "text-primary",
  },
  "auto-exotica": {
    shell: "bg-[radial-gradient(circle_at_top,_hsl(30_100%_55%/0.28),_transparent_42%),linear-gradient(135deg,#1d0906_0%,#552018_48%,#150f1c_100%)]",
    glow: "shadow-[inset_0_0_40px_hsl(30_100%_55%/0.16)]",
    accent: "text-secondary",
  },
  "culturals": {
    shell: "bg-[radial-gradient(circle_at_top,_hsl(330_80%_65%/0.22),_transparent_42%),linear-gradient(135deg,#1a0d18_0%,#46203a_52%,#0e1627_100%)]",
    glow: "shadow-[inset_0_0_40px_hsl(330_80%_65%/0.12)]",
    accent: "text-accent",
  },
};

const CulturalsPreview = () => (
  <div className="relative h-44 overflow-hidden bg-[linear-gradient(180deg,#43203b_0%,#211833_48%,#0d1426_100%)]">
    <div className="absolute inset-y-0 left-0 w-1/2 border-r border-white/8">
      <img src={traditionalImage} alt="Traditional Day" className="h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.56))]" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.78))]" />
      <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-2 py-1 text-[9px] font-accent uppercase tracking-[0.28em] text-white">
        Traditional Day
      </div>
    </div>

    <div className="absolute inset-y-0 right-0 w-1/2">
      <img src={concertImage} alt="Musical Night" className="h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.4))]" />
      <div className="absolute right-5 top-3 rounded-full border border-white/10 bg-black/35 px-2 py-1 text-[9px] font-accent uppercase tracking-[0.28em] text-white/80">
        Live Concert
      </div>
    </div>

    <div className="absolute inset-x-0 bottom-0 p-5">
      <p className="font-accent text-[10px] uppercase tracking-[0.35em] text-white/55 mb-2">Sidnova 2026</p>
      <h3 className="font-heading text-2xl font-bold text-white leading-tight">Traditional Day & Cultural Night</h3>
      <p className="mt-2 text-xs uppercase tracking-[0.25em] text-accent">Morning to Evening Celebrations</p>
    </div>
  </div>
);

const EventsSection = () => (
  <section id="events" className="py-20 md:py-28 relative overflow-hidden">
    <div className="absolute inset-0 circuit-pattern opacity-50" />
    <div className="container relative z-10">
      <div className="text-center mb-14">
        <p className="font-accent text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3">What's Happening</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Events</h2>
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsData.map((event) => {
          const theme = themeMap[event.slug] || themeMap["ai-summit"];
          const Icon = iconMap[event.slug] || Brain;
          const image = event.image;
          const visual = visualMap[event.slug] || visualMap["ai-summit"];
          const subtitleClass = event.slug === "culturals" ? "text-secondary" : "text-muted-foreground";

          return (
            <Link
              key={event.slug}
              to={`/register/${event.slug}`}
              className={`group relative glass-strong rounded-2xl overflow-hidden border ${theme.border} ${theme.glow} transition-all duration-500 flex h-full flex-col hover:-translate-y-2 hover:scale-[1.01] hover:ring-1 hover:ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60`}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,_hsl(195_100%_50%/0.12),_transparent_55%)]" />
              <div className={`h-0.5 w-full ${theme.lineClass}`} />

              {image && (
                <div className="h-44 overflow-hidden relative">
                  <img src={image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
              )}
              {!image && (
                event.slug === "culturals" ? (
                  <CulturalsPreview />
                ) : (
                <div className={`relative h-44 overflow-hidden ${visual.shell} ${visual.glow}`}>
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.08)_35%,transparent_70%)] opacity-60 group-hover:translate-x-6 transition-transform duration-700" />
                  <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/20 p-3 backdrop-blur-sm">
                    <Icon className={`h-6 w-6 ${visual.accent}`} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-accent text-[10px] uppercase tracking-[0.35em] text-white/55 mb-2">Sidnova 2026</p>
                    <h3 className="font-heading text-2xl font-bold text-white leading-tight">{event.title}</h3>
                    <p className={`mt-2 text-xs uppercase tracking-[0.25em] ${visual.accent}`}>{event.subtitle}</p>
                  </div>
                </div>
                )
              )}

              <div className="relative p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-xl ${theme.iconBg} border border-border/30`}>
                    <Icon className={`w-5 h-5 ${theme.iconText}`} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xs font-bold text-foreground tracking-wide">{event.title}</h3>
                    <p className={`text-[11px] font-accent ${subtitleClass}`}>{event.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{event.description}</p>

                <div className="flex flex-wrap gap-2 text-[11px] mb-3">
                  <span className={`px-2.5 py-1 rounded-full ${theme.badge} font-medium`}>{event.date}</span>
                  <span className="px-2.5 py-1 rounded-full bg-muted/80 text-muted-foreground border border-border/30">{event.time}</span>
                </div>

                <p className="text-[11px] text-muted-foreground mb-5">
                  <span className="font-semibold text-foreground/60 uppercase tracking-wider">Eligible:</span> {event.eligible}
                </p>

                <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-accent font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-primary to-accent text-primary-foreground group-hover:shadow-[0_0_25px_hsl(195_100%_50%/0.3)] transition-all">
                  {event.registrationEnabled ? "Register" : "View Details"} <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

export default EventsSection;
