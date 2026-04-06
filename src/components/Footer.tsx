import { Zap } from "lucide-react";

const Footer = () => (
  <footer className="relative border-t border-border/20 py-12 overflow-hidden">
    <div className="absolute inset-0 hex-pattern opacity-20" />
    <div className="container relative z-10 text-center space-y-5">
      <div className="flex items-center justify-center gap-2">
        <Zap className="w-4 h-4 text-primary" />
        <p className="font-heading text-lg font-bold text-primary tracking-[0.2em]">SIDNOVA 2026</p>
      </div>
      <p className="text-xs text-muted-foreground">
        Siddhartha Institute of Technology, Sciences & Pharmacy
      </p>
      <div className="flex justify-center gap-6">
        {["Instagram", "YouTube", "LinkedIn"].map((s) => (
          <a key={s} href="#" className="text-[11px] font-accent font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            {s}
          </a>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
        <p className="text-[10px] text-muted-foreground/40 tracking-widest uppercase">
          © 2026 SIDNOVA. All rights reserved.
        </p>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
      </div>
    </div>
  </footer>
);

export default Footer;
