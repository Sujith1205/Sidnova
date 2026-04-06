import { useEffect, useState } from "react";
import { Download, LogOut, ShieldCheck } from "lucide-react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  AdminEventOverview,
  adminLogin,
  adminLogout,
  getAdminExportUrl,
  getAdminOverview,
  getAdminSession,
} from "@/lib/api";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [events, setEvents] = useState<AdminEventOverview[]>([]);

  const loadOverview = async () => {
    const data = await getAdminOverview();
    setEvents(data.events);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const session = await getAdminSession();
        setAuthenticated(session.authenticated);
        if (session.authenticated) {
          await loadOverview();
        }
      } catch (error) {
        toast({
          title: "Unable to load admin",
          description: error instanceof Error ? error.message : "Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    void initialize();
  }, [toast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      toast({ title: "Password required", description: "Enter the admin password.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      await adminLogin(password.trim());
      await loadOverview();
      setAuthenticated(true);
      setPassword("");
      toast({ title: "Admin access granted", description: "Registration dashboard loaded successfully." });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await adminLogout();
      setAuthenticated(false);
      setEvents([]);
      toast({ title: "Logged out", description: "Admin session closed." });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-24">
          <div className="glass neon-border rounded-2xl p-8 text-center text-muted-foreground">Loading admin dashboard...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-10 md:py-16">
        <div className="glass neon-border rounded-3xl p-6 md:p-8 mb-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-accent text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-2">Admin Dashboard</p>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Sidnova Registration Control Room</h1>
              <p className="text-sm text-muted-foreground">Review event-wise registrations and download Excel sheets for the admin team.</p>
            </div>
            {authenticated && (
              <div className="flex gap-3">
                <a
                  href={getAdminExportUrl()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-accent font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-[0_0_25px_hsl(195_100%_50%/0.3)] transition-all"
                >
                  <Download className="w-4 h-4" /> Download All Excel
                </a>
                <Button type="button" variant="outline" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" /> Logout
                </Button>
              </div>
            )}
          </div>
        </div>

        {!authenticated ? (
          <div className="max-w-md mx-auto glass neon-border rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">Admin Access</h2>
                <p className="text-sm text-muted-foreground">Enter the admin password to continue.</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-accent text-sm font-semibold text-foreground/80 mb-1.5">Password</label>
                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl font-accent font-bold text-sm uppercase tracking-widest bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-[0_0_25px_hsl(195_100%_50%/0.3)] transition-all disabled:opacity-50"
              >
                {submitting ? "Checking..." : "Open Admin Dashboard"}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <section key={event.slug} className="glass rounded-3xl border border-border/50 p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-foreground">{event.title}</h2>
                    <p className="text-sm text-muted-foreground">{event.subtitle}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {event.date} | {event.time} | {event.registrationCount} registrations
                    </p>
                  </div>
                  <a
                    href={getAdminExportUrl(event.slug)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-accent font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-[0_0_25px_hsl(195_100%_50%/0.3)] transition-all"
                  >
                    <Download className="w-4 h-4" /> Download Excel
                  </a>
                </div>

                {event.registrations.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border/60 bg-muted/20 px-4 py-6 text-sm text-muted-foreground">
                    No registrations yet for this event.
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-border/50">
                    <table className="min-w-full text-sm">
                      <thead className="bg-muted/40 text-left">
                        <tr>
                          <th className="px-4 py-3 font-accent text-xs uppercase tracking-widest text-muted-foreground">Participant</th>
                          <th className="px-4 py-3 font-accent text-xs uppercase tracking-widest text-muted-foreground">Academic</th>
                          <th className="px-4 py-3 font-accent text-xs uppercase tracking-widest text-muted-foreground">Team</th>
                          <th className="px-4 py-3 font-accent text-xs uppercase tracking-widest text-muted-foreground">Contact</th>
                          <th className="px-4 py-3 font-accent text-xs uppercase tracking-widest text-muted-foreground">Submitted</th>
                        </tr>
                      </thead>
                      <tbody>
                        {event.registrations.map((registration) => (
                          <tr key={registration.id} className="border-t border-border/40 align-top">
                            <td className="px-4 py-4">
                              <div className="font-semibold text-foreground">{registration.name}</div>
                              <div className="text-muted-foreground">{registration.college}</div>
                              <div className="text-muted-foreground">{registration.course}</div>
                            </td>
                            <td className="px-4 py-4 text-muted-foreground">
                              <div>Hall Ticket: {registration.hallTicketNumber || "-"}</div>
                              <div>Branch: {registration.branch || "-"}</div>
                              <div>Year: {registration.year || "-"}</div>
                            </td>
                            <td className="px-4 py-4 text-muted-foreground">
                              <div>Team Name: {registration.teamName || "-"}</div>
                              <div>
                                Team Members:{" "}
                                {registration.teamMembers.length > 0
                                  ? registration.teamMembers.map((member) => `${member.name} (${member.hallTicketNumber})`).join(", ")
                                  : "-"}
                              </div>
                              <div>
                                Extra Details:{" "}
                                {Object.keys(registration.extraDetails).length > 0
                                  ? Object.entries(registration.extraDetails)
                                      .map(([key, value]) => `${key}: ${String(value)}`)
                                      .join(", ")
                                  : "-"}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-muted-foreground">
                              <div>{registration.email}</div>
                              <div>{registration.phone}</div>
                            </td>
                            <td className="px-4 py-4 text-muted-foreground whitespace-nowrap">
                              {new Date(registration.submittedAt).toLocaleString("en-IN")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
