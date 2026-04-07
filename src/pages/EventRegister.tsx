import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Clock, Users } from "lucide-react";

import { eventsData } from "@/data/events";
import { useToast } from "@/hooks/use-toast";
import { submitRegistration } from "@/lib/api";

const HACKATHON_WHATSAPP_URL = "https://chat.whatsapp.com/GgK7BqlZIrE3VKhVjDfoS3";

const PARLIAMENT_AGENDAS = [
  "Education Management",
  "School Infrastructure Issues",
  "Teaching Quality",
  "College Curriculum Problem",
  "Education Finance Misuse",
  "Private Colleges Regulation",
  "Unemployment After Degree",
  "Sports in Education",
  "Innovation & Startups",
  "Mental Health & Student Pressure",
];

const EventRegister = () => {
  const { slug } = useParams<{ slug: string }>();
  const event = eventsData.find((entry) => entry.slug === slug);
  const isHackathon = event?.slug === "hackathon";
  const isParliament = event?.slug === "parliament-simulation";
  const isTeamRegistration = isHackathon || isParliament;
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

  if (event.registrationEnabled === false) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="container max-w-2xl">
          <Link
            to="/#events"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 font-accent"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>

          <div className="glass neon-border rounded-2xl p-6 md:p-8 mb-8">
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-1">{event.title}</h1>
            <p className="text-sm text-muted-foreground mb-5">{event.subtitle}</p>
            <p className="text-sm text-foreground/80 leading-relaxed mb-5">{event.description}</p>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" /> {event.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary" /> {event.time}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-primary" /> {event.eligible}
              </span>
            </div>
          </div>

          <div className="glass neon-border rounded-2xl p-6 md:p-8">
            <h2 className="font-heading text-lg font-bold text-foreground mb-4">More Details Coming Soon</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              This page is ready for event-specific information. Share what you want added for {event.title}, and we can build it here.
            </p>
            <p className="text-sm text-foreground/80">
              Registration is not enabled online for this event right now, but attendees can click here to view updates, rules, schedules, venue info,
              and any instructions you want to publish next.
            </p>
          </div>
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
      <div className="container max-w-2xl">
        <Link
          to="/#events"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 font-accent"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>

        <div className="glass neon-border rounded-2xl p-6 md:p-8 mb-8">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-1">{event.title}</h1>
          <p className="text-sm text-muted-foreground mb-5">{event.subtitle}</p>
          <p className="text-sm text-foreground/80 leading-relaxed mb-5">{event.description}</p>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" /> {event.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" /> {event.time}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-primary" /> {event.eligible}
            </span>
          </div>
        </div>

        <div className="glass neon-border rounded-2xl p-6 md:p-8">
          <h2 className="font-heading text-lg font-bold text-foreground mb-6">Register for {event.title}</h2>
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
                      {PARLIAMENT_AGENDAS.map((agenda) => (
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
        </div>
      </div>
    </div>
  );
};

export default EventRegister;
