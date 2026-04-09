import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

const targetDate = new Date("2026-04-16T09:00:00").getTime();

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-[hsl(225_40%_5%)] to-background" />
      <div className="absolute inset-0 circuit-pattern" />
      <div className="absolute inset-0 hex-pattern opacity-50" />

      <div className="absolute top-20 left-10 w-80 h-80 bg-primary/8 rounded-full blur-[140px] animate-pulse-glow" />
      <div
        className="absolute bottom-20 right-10 w-64 h-64 bg-secondary/8 rounded-full blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[160px]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" style={{ animation: "scan-line 4s linear infinite" }} />
      </div>

      <div className="absolute top-20 left-6 w-20 h-20 border-l-2 border-t-2 border-primary/20 rounded-tl-lg" />
      <div className="absolute top-20 right-6 w-20 h-20 border-r-2 border-t-2 border-secondary/20 rounded-tr-lg" />
      <div className="absolute bottom-6 left-6 w-20 h-20 border-l-2 border-b-2 border-secondary/20 rounded-bl-lg" />
      <div className="absolute bottom-6 right-6 w-20 h-20 border-r-2 border-b-2 border-primary/20 rounded-br-lg" />

      <div className="relative container text-center z-10 px-4">
        <div className="mx-auto mb-4 max-w-[320px] overflow-hidden rounded-xl border border-white/10 bg-white/90 p-1 shadow-[0_14px_36px_rgba(0,0,0,0.24)] backdrop-blur-sm md:max-w-[380px]">
          <img
            src="/college-banner.jpeg"
            alt="Siddhartha Institute of Technology and Sciences banner"
            className="w-full rounded-[10px] object-cover"
          />
        </div>

        <div className="inline-flex max-w-4xl flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-2xl glass border-primary/20 mb-6">
          <Zap className="w-3.5 h-3.5 text-secondary" />
          <span className="font-accent text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            <span className="rounded-full border border-primary/35 bg-primary/15 px-3 py-1 text-base md:text-lg text-primary">
              UCCC
            </span>{" "}
            x{" "}
            <span className="rounded-full border border-secondary/35 bg-secondary/15 px-3 py-1 text-sm md:text-base text-secondary">
              Siddhartha Institute of Technology and Sciences
            </span>{" "}
            presents
          </span>
        </div>

        <h1 className="font-heading text-5xl sm:text-7xl md:text-9xl font-black tracking-widest text-glow-blue text-primary mb-1 leading-none">
          SIDNOVA
        </h1>
        <p className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold text-secondary text-glow-orange mb-4 leading-none">
          2026
        </p>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <div className="h-px w-20 bg-gradient-to-r from-primary/60 via-accent/40 to-secondary/60" />
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-secondary/60" />
        </div>

        <p className="font-accent text-xl md:text-2xl font-semibold tracking-[0.2em] gradient-text mb-2">
          Ideas That Build the Future
        </p>
        <p className="font-accent text-sm tracking-[0.25em] text-muted-foreground uppercase mb-10">
          Technical & Cultural Fest - April 16-18, 2026
        </p>

        <div className="flex justify-center gap-3 md:gap-5 mb-12">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Min" },
            { value: timeLeft.seconds, label: "Sec" },
          ].map((item, i) => (
            <div key={item.label} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-primary/20 to-secondary/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative glass-strong rounded-xl p-3 md:p-5 min-w-[65px] md:min-w-[90px] border border-primary/10">
                <div className="font-heading text-2xl md:text-4xl font-bold text-primary">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="font-accent text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.2em]">
                  {item.label}
                </div>
              </div>
              {i < 3 && (
                <span className="absolute -right-2.5 top-1/2 -translate-y-1/2 font-heading text-primary/40 text-lg hidden md:block">:</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#events"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-accent font-bold text-sm uppercase tracking-widest overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-shimmer" />
            <span className="relative text-primary-foreground">Register Now</span>
          </a>
          <a
            href="#events"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-accent font-bold text-sm uppercase tracking-widest border border-secondary/40 text-secondary hover:bg-secondary/10 hover:border-secondary/60 transition-all"
          >
            Explore Events
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
