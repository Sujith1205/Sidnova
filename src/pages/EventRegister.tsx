import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Brain, Calendar, Car, Clock, Code, Landmark, MapPin, Music, Phone, Sparkles, Users } from "lucide-react";

import { EventAgendaItem, EventInfo, eventsData } from "@/data/events";
import { useToast } from "@/hooks/use-toast";
import { submitRegistration } from "@/lib/api";
import concertImage from "../../images/concert.webp";
import traditionalImage from "../../images/traditional.webp";

const HACKATHON_WHATSAPP_URL = "https://chat.whatsapp.com/GgK7BqlZIrE3VKhVjDfoS3";

const eventIconMap: Record<string, React.ElementType> = {
  "ai-summit": Brain,
  hackathon: Code,
  "parliament-simulation": Landmark,
  "auto-exotica": Car,
  culturals: Music,
};

const eventVisualMap: Record<string, { shell: string; accent: string; label: string }> = {
  "ai-summit": {
    shell: "bg-[radial-gradient(circle_at_top,_hsl(195_100%_50%/0.24),_transparent_45%),linear-gradient(135deg,#04111e_0%,#09233d_52%,#08121d_100%)]",
    accent: "text-primary",
    label: "Defence Tech Summit",
  },
  hackathon: {
    shell: "bg-[radial-gradient(circle_at_top,_hsl(280_70%_55%/0.28),_transparent_42%),linear-gradient(135deg,#120b21_0%,#183469_50%,#0a0f1a_100%)]",
    accent: "text-accent",
    label: "Build. Ship. Compete.",
  },
  "parliament-simulation": {
    shell: "bg-[radial-gradient(circle_at_top,_hsl(42_90%_55%/0.22),_transparent_42%),linear-gradient(135deg,#161120_0%,#2d2338_50%,#0c1020_100%)]",
    accent: "text-cultural-gold",
    label: "Structured House Debate",
  },
  "pharmacy-events": {
    shell: "bg-[radial-gradient(circle_at_top,_hsl(195_100%_50%/0.22),_transparent_42%),linear-gradient(135deg,#081527_0%,#123847_50%,#0a1720_100%)]",
    accent: "text-primary",
    label: "Quiz. Models. Innovation.",
  },
  "auto-exotica": {
    shell: "bg-[radial-gradient(circle_at_top,_hsl(30_100%_55%/0.26),_transparent_42%),linear-gradient(135deg,#1b0b08_0%,#592317_52%,#180f1a_100%)]",
    accent: "text-secondary",
    label: "Rev Your Souls",
  },
  culturals: {
    shell: "bg-[radial-gradient(circle_at_top,_hsl(330_80%_65%/0.22),_transparent_42%),linear-gradient(135deg,#180c1a_0%,#4b2540_52%,#0f172a_100%)]",
    accent: "text-accent",
    label: "Traditional Day & Cultural Night",
  },
};

const CulturalsHero = () => (
  <div className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden bg-[linear-gradient(180deg,#512744_0%,#211935_44%,#11192d_100%)] p-6 md:p-8">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,196,128,0.2),transparent_28%),radial-gradient(circle_at_78%_14%,rgba(142,228,255,0.18),transparent_26%),linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.05)_36%,transparent_74%)]" />

    <div className="relative grid gap-4 md:grid-cols-2">
      <div className="relative overflow-hidden rounded-3xl border border-white/10">
        <img src={traditionalImage} alt="Traditional Day" className="h-full min-h-[230px] w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.58))]" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.82))]" />
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[10px] font-accent uppercase tracking-[0.35em] text-white">
          Traditional Day
        </div>
        <div className="absolute right-3 bottom-4 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[10px] font-accent uppercase tracking-[0.28em] text-white">
          Traditional Wear
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10">
        <img src={concertImage} alt="Musical Night" className="h-full min-h-[230px] w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.44))]" />
        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-accent uppercase tracking-[0.35em] text-white/75">
          Musical Night
        </div>
        <div className="absolute right-3 bottom-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-accent uppercase tracking-[0.28em] text-white/80">
            Live Concert Crowd
          </div>
      </div>
    </div>

    <div className="relative mt-6">
      <p className="font-accent text-[11px] uppercase tracking-[0.4em] text-white/55 mb-3">Sidnova 2026</p>
      <h2 className="font-heading text-4xl md:text-5xl font-bold leading-none text-white">Traditional Day & Cultural Night</h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
        A full-day campus celebration that starts with traditional style, colour, and culture and closes with an evening concert atmosphere and stage performances.
      </p>
    </div>
  </div>
);

const DetailSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="glass neon-border rounded-2xl p-6 md:p-8">
    <div className="flex items-center gap-3 mb-5">
      <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
      <h2 className="font-heading text-lg md:text-xl font-bold text-foreground whitespace-nowrap">{title}</h2>
      <div className="h-px flex-1 bg-gradient-to-l from-primary/50 to-transparent" />
    </div>
    {children}
  </section>
);

const AgendaCard = ({ agenda }: { agenda: EventAgendaItem }) => (
  <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 hover:border-primary/40 transition-colors">
    <h3 className="font-heading text-base font-bold text-foreground mb-2">{agenda.title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{agenda.description}</p>
    {agenda.bullets && agenda.bullets.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {agenda.bullets.map((bullet) => (
          <span
            key={bullet}
            className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-accent uppercase tracking-wide text-primary"
          >
            {bullet}
          </span>
        ))}
      </div>
    )}
  </div>
);

const EventRegister = () => {
  const { slug } = useParams<{ slug: string }>();
  const event = eventsData.find((entry) => entry.slug === slug);
  const isHackathon = event?.slug === "hackathon";
  const isParliament = event?.slug === "parliament-simulation";
  const isTeamRegistration = isHackathon || isParliament;
  const parliamentAgendas = event?.agendas?.map((agenda) => agenda.title) ?? [];
  const EventIcon = event ? eventIconMap[event.slug] ?? Sparkles : Sparkles;
  const eventVisual = event ? eventVisualMap[event.slug] ?? eventVisualMap["ai-summit"] : eventVisualMap["ai-summit"];
  const subtitleClass = event?.slug === "culturals" ? "text-secondary" : "text-primary";
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showHackathonJoin, setShowHackathonJoin] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    course: "",
    hallTicketNumber: "",
    branch: "",
    year: "",
    teamName: "",
    speakerName: "",
    agendaPreference: "",
    englishOnlyConfirmed: false,
    teamMembers: [
      { name: "", hallTicketNumber: "" },
      { name: "", hallTicketNumber: "" },
      { name: "", hallTicketNumber: "" },
    ],
  });

  useEffect(() => {
    if (!showHackathonJoin) {
      return;
    }

    setRedirectCountdown(5);

    const countdownTimer = window.setInterval(() => {
      setRedirectCountdown((current) => {
        if (current <= 1) {
          window.clearInterval(countdownTimer);
          window.open(HACKATHON_WHATSAPP_URL, "_blank", "noopener,noreferrer");
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(countdownTimer);
  }, [showHackathonJoin]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-4">Event Not Found</h1>
          <p className="text-sm text-muted-foreground mb-5">We couldn&apos;t find the event you were looking for.</p>
          <Link to="/" className="text-primary hover:underline font-accent">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      college: "",
      course: "",
      hallTicketNumber: "",
      branch: "",
      year: "",
      teamName: "",
      speakerName: "",
      agendaPreference: "",
      englishOnlyConfirmed: false,
      teamMembers: [
        { name: "", hallTicketNumber: "" },
        { name: "", hallTicketNumber: "" },
        { name: "", hallTicketNumber: "" },
      ],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.college || !form.course) {
      toast({ title: "Missing fields", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email.", variant: "destructive" });
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      toast({ title: "Invalid phone", description: "Enter a 10-digit phone number.", variant: "destructive" });
      return;
    }

    const cleanedTeamMembers = form.teamMembers
      .map((member) => ({
        name: member.name.trim(),
        hallTicketNumber: member.hallTicketNumber.trim(),
      }))
      .filter((member) => member.name || member.hallTicketNumber);

    if (!form.hallTicketNumber.trim() || !form.branch.trim() || !form.year.trim()) {
      toast({
        title: "Missing academic details",
        description: isTeamRegistration
          ? "Please enter the team leader's hall ticket number, branch, and year."
          : "Please enter your hall ticket number, branch, and year.",
        variant: "destructive",
      });
      return;
    }

    if (isHackathon) {
      if (cleanedTeamMembers.some((member) => !member.name || !member.hallTicketNumber)) {
        toast({
          title: "Incomplete team details",
          description: "Each team member must include both a name and hall ticket number.",
          variant: "destructive",
        });
        return;
      }

      if (!form.teamName.trim() || cleanedTeamMembers.length === 0) {
        toast({
          title: "Missing team details",
          description: "Please add the team name and at least one team member with hall ticket number.",
          variant: "destructive",
        });
        return;
      }
    }

    if (isParliament) {
      if (!form.teamName.trim() || !form.speakerName.trim() || !form.agendaPreference.trim()) {
        toast({
          title: "Missing parliament details",
          description: "Please add team name, speaker name, and the selected agenda.",
          variant: "destructive",
        });
        return;
      }

      if (!form.englishOnlyConfirmed) {
        toast({
          title: "Rule confirmation required",
          description: "Please confirm the English-only rule before submitting.",
          variant: "destructive",
        });
        return;
      }
    }

    setLoading(true);

    try {
      await submitRegistration({
        eventSlug: event.slug,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        college: form.college.trim(),
        course: form.course.trim(),
        hallTicketNumber: form.hallTicketNumber.trim(),
        branch: form.branch.trim(),
        year: form.year.trim(),
        teamName: isHackathon || isParliament ? form.teamName.trim() : undefined,
        teamMembers: isHackathon ? cleanedTeamMembers : undefined,
        speakerName: isParliament ? form.speakerName.trim() : undefined,
        agendaPreference: isParliament ? form.agendaPreference.trim() : undefined,
        englishOnlyConfirmed: isParliament ? form.englishOnlyConfirmed : undefined,
      });

      toast({
        title: "Registration Successful!",
        description: `You've been registered for ${event.title}.`,
      });

      if (isHackathon) {
        setShowHackathonJoin(true);
      } else {
        resetForm();
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container max-w-6xl">
        <Link
          to="/#events"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 font-accent"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] mb-8">
          <div className="glass neon-border rounded-3xl p-6 md:p-8">
            <p className={`font-accent text-xs uppercase tracking-[0.35em] mb-3 ${subtitleClass}`}>{event.subtitle}</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">{event.title}</h1>
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed mb-6">{event.longDescription ?? event.description}</p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/50 bg-muted/20 p-4">
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="font-accent text-xs uppercase tracking-widest">Date</span>
                </div>
                <p className="text-sm text-foreground">{event.date}</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-muted/20 p-4">
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-accent text-xs uppercase tracking-widest">Time</span>
                </div>
                <p className="text-sm text-foreground">{event.time}</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-muted/20 p-4">
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Users className="w-4 h-4" />
                  <span className="font-accent text-xs uppercase tracking-widest">Eligible</span>
                </div>
                <p className="text-sm text-foreground">{event.eligible}</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-muted/20 p-4">
                <div className="flex items-center gap-2 text-primary mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="font-accent text-xs uppercase tracking-widest">Venue</span>
                </div>
                {event.venueUrl ? (
                  <a
                    href={event.venueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground hover:text-primary hover:underline"
                  >
                    {event.venue ?? "Open location"}
                  </a>
                ) : (
                  <p className="text-sm text-foreground">{event.venue ?? "Venue details will be shared soon."}</p>
                )}
              </div>
            </div>
          </div>

          <div className="glass neon-border rounded-3xl overflow-hidden min-h-[320px]">
            {event.slug === "culturals" ? (
              <CulturalsHero />
            ) : (
            <div className={`relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden p-6 md:p-8 ${eventVisual.shell}`}>
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.06)_38%,transparent_75%)]" />
              <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
              <div className="absolute -left-12 bottom-0 h-44 w-44 rounded-full bg-black/15 blur-3xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="font-accent text-[11px] uppercase tracking-[0.4em] text-white/55 mb-3">Sidnova 2026</p>
                  <p className={`text-sm uppercase tracking-[0.3em] ${eventVisual.accent}`}>{eventVisual.label}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
                  <EventIcon className={`h-8 w-8 ${eventVisual.accent}`} />
                </div>
              </div>
              <div className="relative">
                <h2 className="font-heading text-4xl md:text-5xl font-bold leading-none text-white">{event.title}</h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">{event.description}</p>
              </div>
              <div className="relative grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
                  <p className="font-accent text-[10px] uppercase tracking-[0.3em] text-white/45 mb-2">When</p>
                  <p className="text-sm text-white">{event.date}</p>
                  <p className="text-sm text-white/70 mt-1">{event.time}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
                  <p className="font-accent text-[10px] uppercase tracking-[0.3em] text-white/45 mb-2">Who</p>
                  <p className="text-sm text-white">{event.eligible}</p>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {event.highlights && event.highlights.length > 0 && (
            <DetailSection title="Event Highlights">
              <div className="grid gap-3 md:grid-cols-2">
                {event.highlights.map((highlight) => (
                  <div key={highlight} className="rounded-2xl border border-border/50 bg-muted/20 p-4 text-sm text-foreground/85 leading-relaxed">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </DetailSection>
          )}

          {event.stats && event.stats.length > 0 && (
            <DetailSection title="Quick Facts">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {event.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-center">
                    <p className="font-heading text-xl font-bold text-primary">{stat.value}</p>
                    <p className="font-accent text-xs uppercase tracking-widest text-muted-foreground mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
            </DetailSection>
          )}

          {event.guests && event.guests.length > 0 && (
            <DetailSection title="Guests">
              <div className="grid gap-4 md:grid-cols-2">
                {event.guests.map((guest) => (
                  <div key={guest.name} className="rounded-2xl border border-border/50 bg-muted/20 p-4">
                    <p className="font-heading text-lg font-bold text-foreground">{guest.name}</p>
                    <p className="text-sm text-primary mt-1">{guest.role}</p>
                    {guest.note && <p className="text-sm text-muted-foreground mt-2">{guest.note}</p>}
                  </div>
                ))}
              </div>
            </DetailSection>
          )}

          {event.schedule && event.schedule.length > 0 && (
            <DetailSection title="Schedule">
              <div className="space-y-4">
                {event.schedule.map((item) => (
                  <div key={`${item.time}-${item.title}`} className="grid gap-3 rounded-2xl border border-border/50 bg-muted/20 p-4 md:grid-cols-[220px_1fr]">
                    <div className="font-accent text-xs uppercase tracking-widest text-primary">{item.time}</div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DetailSection>
          )}

          {event.agendas && event.agendas.length > 0 && (
            <DetailSection title={isParliament ? "Debate Agendas" : "Discussion Topics"}>
              <div className="grid gap-4 md:grid-cols-2">
                {event.agendas.map((agenda) => (
                  <AgendaCard key={agenda.title} agenda={agenda} />
                ))}
              </div>
            </DetailSection>
          )}

          {event.rules && event.rules.length > 0 && (
            <DetailSection title="Rules and Guidelines">
              <div className="grid gap-3 md:grid-cols-2">
                {event.rules.map((rule) => (
                  <div key={rule} className="rounded-2xl border border-border/50 bg-muted/20 p-4 text-sm text-foreground/85 leading-relaxed">
                    {rule}
                  </div>
                ))}
              </div>
            </DetailSection>
          )}

          {event.contacts && event.contacts.length > 0 && (
            <DetailSection title="Contacts">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {event.contacts.map((contact) => (
                  <div key={contact.name} className="rounded-2xl border border-border/50 bg-muted/20 p-4">
                    <p className="font-heading text-base font-bold text-foreground">{contact.name}</p>
                    <a href={`tel:${contact.phone}`} className="mt-2 inline-flex items-center gap-2 text-sm text-primary hover:underline">
                      <Phone className="w-4 h-4" />
                      {contact.phone}
                    </a>
                  </div>
                ))}
              </div>
            </DetailSection>
          )}

          {event.registrationEnabled === false ? (
            <DetailSection title="Participation Note">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Online registration is not enabled for this event right now. Use this page for the event brief, rules, timing, guests, and venue updates.
                If more rounds or instructions are announced, this page can be extended with them as well.
              </p>
            </DetailSection>
          ) : (
            <DetailSection title={`Register for ${event.title}`}>
              {showHackathonJoin ? (
                <div className="space-y-5 text-center">
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                    <h3 className="font-heading text-xl text-primary mb-2">Team Registration Confirmed</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You&apos;ll be redirected to the official Hackathon WhatsApp group in {redirectCountdown} seconds.
                    </p>
                    <a
                      href={HACKATHON_WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-accent font-bold text-sm uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                    >
                      Join Hackathon WhatsApp Group
                    </a>
                  </div>
                  <p className="text-xs text-muted-foreground">If the redirect is blocked, use the button above to open the group directly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { label: isParliament ? "Representative Name" : isHackathon ? "Team Leader Name" : "Full Name", key: "name", type: "text", placeholder: "Your name" },
                    { label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
                    { label: "Phone", key: "phone", type: "tel", placeholder: "10-digit number" },
                    { label: "College", key: "college", type: "text", placeholder: "Your college name" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block font-accent text-sm font-semibold text-foreground/80 mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form] as string}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block font-accent text-sm font-semibold text-foreground/80 mb-1.5">Course</label>
                    <select
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">Select course</option>
                      {event.courses.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="block font-accent text-sm font-semibold text-foreground/80 mb-1.5">
                        {isTeamRegistration ? "Team Leader Hall Ticket" : "Hall Ticket Number"}
                      </label>
                      <input
                        type="text"
                        placeholder="Hall ticket number"
                        value={form.hallTicketNumber}
                        onChange={(e) => setForm({ ...form, hallTicketNumber: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block font-accent text-sm font-semibold text-foreground/80 mb-1.5">
                        {isTeamRegistration ? "Team Leader Branch" : "Branch"}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. CSE"
                        value={form.branch}
                        onChange={(e) => setForm({ ...form, branch: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block font-accent text-sm font-semibold text-foreground/80 mb-1.5">
                        {isTeamRegistration ? "Team Leader Year" : "Year"}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 3rd Year"
                        value={form.year}
                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  {isHackathon && (
                    <>
                      <div>
                        <label className="block font-accent text-sm font-semibold text-foreground/80 mb-1.5">Team Name</label>
                        <input
                          type="text"
                          placeholder="Your team name"
                          value={form.teamName}
                          onChange={(e) => setForm({ ...form, teamName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="block font-accent text-sm font-semibold text-foreground/80">Team Members</label>
                        {form.teamMembers.map((member, index) => (
                          <div key={index} className="grid gap-3 sm:grid-cols-2">
                            <input
                              type="text"
                              placeholder={`Team member ${index + 1} name`}
                              value={member.name}
                              onChange={(e) => {
                                const nextMembers = [...form.teamMembers];
                                nextMembers[index] = { ...nextMembers[index], name: e.target.value };
                                setForm({ ...form, teamMembers: nextMembers });
                              }}
                              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <input
                              type="text"
                              placeholder={`Hall ticket number ${index + 1}`}
                              value={member.hallTicketNumber}
                              onChange={(e) => {
                                const nextMembers = [...form.teamMembers];
                                nextMembers[index] = { ...nextMembers[index], hallTicketNumber: e.target.value };
                                setForm({ ...form, teamMembers: nextMembers });
                              }}
                              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                          </div>
                        ))}
                        <p className="text-xs text-muted-foreground">Team leader fills this form. Add at least one team member with their hall ticket number.</p>
                      </div>
                    </>
                  )}

                  {isParliament && (
                    <>
                      <div>
                        <label className="block font-accent text-sm font-semibold text-foreground/80 mb-1.5">Team Name</label>
                        <input
                          type="text"
                          placeholder="Parliament team name"
                          value={form.teamName}
                          onChange={(e) => setForm({ ...form, teamName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>

                      <div>
                        <label className="block font-accent text-sm font-semibold text-foreground/80 mb-1.5">Speaker Name</label>
                        <input
                          type="text"
                          placeholder="Name of the speaker for your team"
                          value={form.speakerName}
                          onChange={(e) => setForm({ ...form, speakerName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>

                      <div>
                        <label className="block font-accent text-sm font-semibold text-foreground/80 mb-1.5">Agenda Preference</label>
                        <select
                          value={form.agendaPreference}
                          onChange={(e) => setForm({ ...form, agendaPreference: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          <option value="">Select agenda</option>
                          {parliamentAgendas.map((agenda) => (
                            <option key={agenda} value={agenda}>
                              {agenda}
                            </option>
                          ))}
                        </select>
                      </div>

                      <label className="flex items-start gap-3 rounded-xl border border-border/50 bg-muted/30 px-4 py-3">
                        <input
                          type="checkbox"
                          checked={form.englishOnlyConfirmed}
                          onChange={(e) => setForm({ ...form, englishOnlyConfirmed: e.target.checked })}
                          className="mt-1 h-4 w-4 rounded border-border bg-background"
                        />
                        <span className="text-sm text-muted-foreground">
                          We understand that Parliament Simulation is English only, and speaking in any other language may lead to team disqualification.
                        </span>
                      </label>
                    </>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg font-accent font-bold text-sm uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-50 hover:shadow-[0_0_30px_hsl(199_100%_50%/0.3)]"
                  >
                    {loading ? "Submitting..." : "Submit Registration"}
                  </button>
                </form>
              )}
            </DetailSection>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventRegister;
