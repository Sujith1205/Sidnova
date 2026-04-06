import { useState } from "react";

import { useToast } from "@/hooks/use-toast";

const courses = ["B.Tech", "Diploma", "B.Pharm", "Pharm-D", "M.Tech", "MBA", "MCA"];
const eventsList = ["AI Summit", "Hackathon", "Parliament Simulation", "Pharmacy Events", "Auto Exotica", "Culturals"];

const RegistrationSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    course: "",
    events: [] as string[],
  });

  const handleEventToggle = (eventName: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      events: currentForm.events.includes(eventName)
        ? currentForm.events.filter((entry) => entry !== eventName)
        : [...currentForm.events, eventName],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.college || !form.course || form.events.length === 0) {
      toast({ title: "Missing fields", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email.", variant: "destructive" });
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      toast({ title: "Invalid phone", description: "Please enter a 10-digit phone number.", variant: "destructive" });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Registration Successful!", description: "You've been registered for SIDNOVA 2026." });
      setForm({ name: "", email: "", phone: "", college: "", course: "", events: [] });
    }, 1200);
  };

  return (
    <section id="register" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      <div className="container relative z-10 max-w-2xl">
        <div className="text-center mb-14">
          <p className="font-accent text-sm font-semibold tracking-[0.3em] uppercase text-secondary mb-3">Be Part of It</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Register Now</h2>
        </div>

        <form onSubmit={handleSubmit} className="glass neon-border rounded-2xl p-6 md:p-8 space-y-5">
          {[
            { label: "Full Name", key: "name", type: "text", placeholder: "Your name" },
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
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-accent text-sm font-semibold text-foreground/80 mb-2">Events</label>
            <div className="flex flex-wrap gap-2">
              {eventsList.map((eventName) => (
                <button
                  type="button"
                  key={eventName}
                  onClick={() => handleEventToggle(eventName)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    form.events.includes(eventName) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {eventName}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-accent font-bold text-sm uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-50 hover:shadow-[0_0_30px_hsl(199_100%_50%/0.3)]"
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationSection;
