import { ArrowRight, Brain, Car, Code, FlaskConical, Landmark, Music } from "lucide-react";
import { Link } from "react-router-dom";

import autoExotica from "@/assets/auto-exotica.jpeg";
import { eventsData } from "@/data/events";

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

const imageMap: Record<string, string> = { "auto-exotica": autoExotica };

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
          const image = imageMap[event.slug];

          return (
            <div
              key={event.slug}
              className={`group relative glass-strong rounded-2xl overflow-hidden border ${theme.border} ${theme.glow} transition-all duration-500 flex flex-col`}
            >
              <div className={`h-0.5 w-full ${theme.lineClass}`} />

              {image && (
                <div className="h-44 overflow-hidden relative">
                  <img src={image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-xl ${theme.iconBg} border border-border/30`}>
                    <Icon className={`w-5 h-5 ${theme.iconText}`} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xs font-bold text-foreground tracking-wide">{event.title}</h3>
                    <p className="text-[11px] text-muted-foreground font-accent">{event.subtitle}</p>
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

                {event.registrationEnabled ? (
                  <Link
                    to={`/register/${event.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-accent font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-[0_0_25px_hsl(195_100%_50%/0.3)] transition-all"
                  >
                    Register <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <Link
                    to={`/register/${event.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-accent font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-[0_0_25px_hsl(195_100%_50%/0.3)] transition-all"
                  >
                    Click For More Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default EventsSection;
