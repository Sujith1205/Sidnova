export interface EventInfo {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  eligible: string;
  description: string;
  courses: string[];
  registrationEnabled?: boolean;
}

export const eventsData: EventInfo[] = [
  {
    slug: "ai-summit",
    title: "AI Summit",
    subtitle: "Defence Tech",
    date: "April 16",
    time: "10:00 AM - 1:00 PM",
    eligible: "BTech & Diploma",
    description: "Explore AI in defence technology through expert talks, panel discussions, and innovation showcases.",
    courses: ["B.Tech", "Diploma"],
    registrationEnabled: true,
  },
  {
    slug: "hackathon",
    title: "Hackathon",
    subtitle: "Code for Impact",
    date: "April 16",
    time: "9:30 AM - 3:00 PM",
    eligible: "BTech & Diploma",
    description: "Solve real-world problems in teams. Build, pitch, and compete for exciting prizes.",
    courses: ["B.Tech", "Diploma"],
    registrationEnabled: true,
  },
  {
    slug: "parliament-simulation",
    title: "Parliament Simulation",
    subtitle: "Education System",
    date: "April 16",
    time: "2:00 PM - 4:15 PM",
    eligible: "BTech, Diploma, MBA, MCA",
    description: "Debate real education issues in a simulated Indian Parliament format.",
    courses: ["B.Tech", "Diploma", "MBA", "MCA"],
    registrationEnabled: true,
  },
  {
    slug: "pharmacy-events",
    title: "Pharmacy Events",
    subtitle: "Quiz - Models - Innovation",
    date: "April 16",
    time: "9:30 AM - 3:00 PM",
    eligible: "Pharmacy Students",
    description: "Pharma Quiz, Model Presentation, and Innovation Challenge - showcase pharmaceutical brilliance.",
    courses: ["B.Pharm", "Pharm-D"],
    registrationEnabled: false,
  },
  {
    slug: "auto-exotica",
    title: "Auto Exotica",
    subtitle: "Rev Your Souls",
    date: "April 17",
    time: "12:00 PM - 3:00 PM",
    eligible: "All Students",
    description: "A thrilling auto expo with superbikes, supercars, and special guest appearances by bikers Alex Binoy & Varsha.",
    courses: ["B.Tech", "Diploma", "B.Pharm", "Pharm-D", "M.Tech", "MBA", "MCA"],
    registrationEnabled: false,
  },
  {
    slug: "culturals",
    title: "Traditional Day & Cultural Night",
    subtitle: "Morning to Evening Celebrations",
    date: "April 18",
    time: "Morning & Evening",
    eligible: "All Students",
    description: "April 18 begins with Traditional Day in the morning and continues with Cultural Night in the evening, featuring performances, celebrations, and campus-wide energy.",
    courses: ["B.Tech", "Diploma", "B.Pharm", "Pharm-D", "M.Tech", "MBA", "MCA"],
    registrationEnabled: false,
  },
];
