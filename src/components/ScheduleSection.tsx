const days = [
  {
    date: "April 16",
    label: "Day 1 — Technical Events",
    color: "primary",
    events: [
      { time: "9:30 AM", title: "Hackathon Begins", desc: "Team registration & problem statements released" },
      { time: "10:00 AM", title: "AI Summit — Defence Tech", desc: "Expert talks on AI in defence" },
      { time: "9:30 AM", title: "Pharmacy Events", desc: "Quiz, Model Presentation, Innovation Challenge" },
      { time: "2:00 PM", title: "Parliament Simulation", desc: "Debate on education system reform" },
      { time: "3:00 PM", title: "Hackathon Judging", desc: "Final pitches and results" },
    ],
  },
  {
    date: "April 17",
    label: "Day 2 — Auto Exotica",
    color: "secondary",
    events: [
      { time: "12:00 PM", title: "Auto Exotica Opens", desc: "Superbikes, supercars & auto showcase" },
      { time: "12:30 PM", title: "Guest — Alex Binoy", desc: "Biker @binoy__xo" },
      { time: "1:00 PM", title: "Guest — Varsha", desc: "Biker @varshxxrevs" },
      { time: "3:00 PM", title: "Auto Exotica Closes", desc: "Wrap-up & photo ops" },
    ],
  },
  {
    date: "April 18",
    label: "Day 3 — Culturals",
    color: "accent",
    events: [
      { time: "Evening", title: "Musical Night", desc: "Live performances & cultural celebrations" },
    ],
  },
];

const ScheduleSection = () => (
  <section id="schedule" className="py-20 md:py-28 relative overflow-hidden">
    <div className="absolute inset-0 circuit-pattern opacity-30" />
    <div className="container max-w-3xl relative z-10">
      <div className="text-center mb-14">
        <p className="font-accent text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3">Plan Your Visit</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Schedule</h2>
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
        </div>
      </div>

      <div className="space-y-10">
        {days.map((day) => (
          <div key={day.date} className="glass-strong rounded-2xl p-6 md:p-8 border border-border/30">
            <div className="flex items-center gap-3 mb-6">
              <div className={`px-4 py-1.5 rounded-full bg-${day.color}/15 border border-${day.color}/25 font-heading text-[10px] font-bold text-${day.color} tracking-widest uppercase`}>
                {day.date}
              </div>
              <span className="font-accent text-sm font-semibold text-muted-foreground">{day.label}</span>
            </div>
            <div className={`relative border-l-2 border-${day.color}/20 ml-4 pl-8 space-y-5`}>
              {day.events.map((ev, i) => (
                <div key={i} className="relative group">
                  <div className={`absolute -left-[calc(2rem+5px)] top-1.5 w-3 h-3 rounded-full bg-${day.color}/80 border-2 border-background shadow-[0_0_8px_hsl(195_100%_50%/0.3)] group-hover:scale-125 transition-transform`} />
                  <p className={`font-accent text-[11px] font-bold text-${day.color} tracking-widest mb-0.5`}>{ev.time}</p>
                  <h4 className="font-semibold text-foreground text-sm">{ev.title}</h4>
                  <p className="text-xs text-muted-foreground">{ev.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ScheduleSection;
