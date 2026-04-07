import { Phone, Mail, MapPin } from "lucide-react";

const contacts = [
  { name: "Harsha Vardhan", phone: "+91 79952 10554" },
  { name: "Ajay Rangaraju", phone: "+91 91335 36130" },
];

const ContactSection = () => (
  <section id="contact" className="py-20 md:py-28">
    <div className="container max-w-4xl">
      <div className="text-center mb-14">
        <p className="font-accent text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3">
          Get In Touch
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Contact Us
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass rounded-xl p-6 space-y-4">
            {contacts.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.phone}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <p className="text-sm text-muted-foreground">sidnova2026@sits.ac.in</p>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Siddhartha Institute of Technology & Sciences, Narapally, Hyderabad, Telangana
              </p>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl overflow-hidden min-h-[280px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.0!2d78.5!3d17.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI3JzAwLjAiTiA3OMKwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "280px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Siddhartha Institute Location"
          />
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
