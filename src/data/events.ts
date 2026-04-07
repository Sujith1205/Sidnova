import autoExoticaImage from "../../images/Auto Expo.png";

export interface EventScheduleItem {
  time: string;
  title: string;
  description: string;
}

export interface EventAgendaItem {
  title: string;
  description: string;
  bullets?: string[];
}

export interface EventGuestItem {
  name: string;
  role: string;
  note?: string;
}

export interface EventContactItem {
  name: string;
  phone: string;
}

export interface EventStatItem {
  label: string;
  value: string;
}

export interface EventInfo {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  eligible: string;
  description: string;
  longDescription?: string;
  venue?: string;
  venueUrl?: string;
  courses: string[];
  registrationEnabled?: boolean;
  image?: string;
  gallery?: string[];
  highlights?: string[];
  schedule?: EventScheduleItem[];
  rules?: string[];
  agendas?: EventAgendaItem[];
  guests?: EventGuestItem[];
  contacts?: EventContactItem[];
  stats?: EventStatItem[];
}

export const eventsData: EventInfo[] = [
  {
    slug: "ai-summit",
    title: "AI Summit",
    subtitle: "Defence Tech",
    date: "April 16",
    time: "10:00 AM - 1:00 PM",
    eligible: "BTech & Diploma",
    venue: "Siddhartha Institute of Technology, Sciences and Pharmacy",
    description: "Explore AI in defence technology through expert talks, panel discussions, and innovation showcases.",
    longDescription:
      "A focused technical summit on how artificial intelligence is shaping the future of defence, surveillance, strategy, autonomy, and national security innovation. The session brings students face to face with founders and defence-tech leaders for an interactive discussion on emerging opportunities in AI and security systems.",
    courses: ["B.Tech", "Diploma"],
    registrationEnabled: true,
    highlights: [
      "Summit theme: AI in Defence: Shaping the Future of Security and Innovation",
      "Interactive panel discussion with industry leaders",
      "Student-expert interaction and awards ceremony",
      "Capacity planned for around 300 participants",
    ],
    guests: [
      { name: "Col. Narendra Tripathi (Retd.)", role: "Chief Guest", note: "Chief Executive Officer, Zenerative Minds" },
      { name: "Jayant Khatri", role: "Chief Guest", note: "Chief Executive Officer, Apollyon Dynamics" },
    ],
    schedule: [
      {
        time: "10:00 AM - 10:20 AM",
        title: "Opening Performance",
        description: "Inaugural cultural performance to open the summit.",
      },
      {
        time: "10:20 AM - 11:00 AM",
        title: "Welcome Address",
        description: "Introduction of guests, dignitaries, and summit context.",
      },
      {
        time: "11:00 AM - 1:00 PM",
        title: "Panel Discussion and Interactive Session",
        description: "Discussion on AI in defence, future innovation, career pathways, and student Q&A.",
      },
    ],
    agendas: [
      {
        title: "AI Applications in Modern Defence Systems",
        description: "Explore practical uses of AI in intelligence, surveillance, decision support, and defence operations.",
      },
      {
        title: "Future Opportunities in Defence Technology",
        description: "Understand how startups, research labs, and students can contribute to next-generation defence innovation.",
      },
      {
        title: "Security Innovation and Startups",
        description: "See how emerging ventures are building AI-powered systems for aerospace, autonomy, and security.",
      },
      {
        title: "Student and Expert Interaction",
        description: "Direct questions, open discussion, and exposure to real-world defence-tech pathways.",
      },
    ],
    stats: [
      { label: "Seats", value: "300" },
      { label: "Chief Guests", value: "2" },
      { label: "Duration", value: "3 Hours" },
      { label: "Focus", value: "AI + Defence" },
    ],
  },
  {
    slug: "hackathon",
    title: "Hackathon",
    subtitle: "Code for Impact",
    date: "April 16",
    time: "9:30 AM - 5:00 PM",
    eligible: "BTech & Diploma",
    venue: "Sidnova 2026 Technical Events Venue",
    description: "Solve real-world problems in teams. Build, pitch, and compete for exciting prizes.",
    longDescription:
      "The hackathon challenges student teams to solve meaningful problems through rapid design, development, and collaborative execution. Teams will build live solutions, submit their work through GitHub, and present for evaluation before final selection and prize distribution.",
    courses: ["B.Tech", "Diploma"],
    registrationEnabled: true,
    highlights: [
      "Team-based event with 1 to 4 members per team",
      "Approximate capacity of 40 total seats",
      "Self-defined problem option available alongside provided challenges",
      "Expected outcomes include real-world solutions, technical skills, startup ideas, and competitive exposure",
    ],
    schedule: [
      {
        time: "9:30 AM - 10:00 AM",
        title: "Welcome and Instructions",
        description: "Opening briefing, problem statement release, and team guidance.",
      },
      {
        time: "10:00 AM - 3:00 PM",
        title: "Hackathon Development Phase",
        description: "Teams build, iterate, and prepare their solution submissions.",
      },
      {
        time: "3:00 PM - 4:00 PM",
        title: "Project Evaluation and Review",
        description: "Judges review projects, walkthroughs, implementation quality, and impact.",
      },
      {
        time: "4:00 PM - 5:00 PM",
        title: "Final Selection and Prize Distribution",
        description: "Winning teams are announced and recognised.",
      },
    ],
    rules: [
      "Original code only; copied work is not allowed.",
      "GitHub upload is required for submission.",
      "No cheating or plagiarism.",
      "Teams must complete submission within the time limit.",
      "This is a team event, not a solo open participation format.",
    ],
    agendas: [
      {
        title: "Challenge Structure",
        description: "Teams can work on provided problem statements or choose one self-defined problem option.",
        bullets: ["20 problem statements provided", "1 self-defined problem option", "Hands-on team development focus"],
      },
    ],
    stats: [
      { label: "Seats", value: "40" },
      { label: "Team Size", value: "1 - 4" },
      { label: "Volunteers", value: "20" },
      { label: "Submission", value: "GitHub" },
    ],
  },
  {
    slug: "parliament-simulation",
    title: "Parliament Simulation",
    subtitle: "Education System",
    date: "April 16",
    time: "2:00 PM - 4:15 PM",
    eligible: "BTech, Diploma, MBA, MCA",
    venue: "Sidnova 2026 Debate Venue",
    description: "Debate real education issues in a simulated Indian Parliament format.",
    longDescription:
      "A structured parliamentary debate on pressing issues in the Indian education system. Teams will argue, oppose, question, and propose solutions agenda by agenda under a formal house format, with judging based on confidence, content, communication, and solutions proposed.",
    courses: ["B.Tech", "Diploma", "MBA", "MCA"],
    registrationEnabled: true,
    highlights: [
      "Formal parliament-style debate with speaker-led proceedings",
      "10 education agendas discussed in a structured flow",
      "English-only event format",
      "Judging based on confidence, content, communication, and solutions proposed",
    ],
    schedule: [
      {
        time: "2:00 PM - 2:05 PM",
        title: "Opening by Speaker",
        description: "Welcome note, rules, decorum, and start of proceedings.",
      },
      {
        time: "2:05 PM - 3:25 PM",
        title: "Debate Session",
        description: "Ten agendas are discussed in an 80-minute debate block.",
      },
      {
        time: "3:25 PM - 3:30 PM",
        title: "Final Summary by Speaker",
        description: "Key observations and house closure.",
      },
      {
        time: "3:30 PM - 4:15 PM",
        title: "Prize Distribution and Closing",
        description: "Guest speeches, recognition, and closing remarks.",
      },
    ],
    rules: [
      "Speaking time must be strictly followed.",
      "No interrupting while another member is speaking.",
      "Respectful language is mandatory; offensive or inappropriate words are not allowed.",
      "Speaker's decision is final and binding.",
      "English only: speaking in another language can lead to team disqualification.",
      "No personal attacks on any participant.",
    ],
    agendas: [
      {
        title: "Education Management",
        description: "Debate poor planning, administration gaps, and accountability in the system.",
        bullets: ["Digital management systems", "Regular audits", "Efficient governance"],
      },
      {
        title: "School Infrastructure Issues",
        description: "Focus on inadequate facilities, especially in rural schools.",
        bullets: ["Labs and facilities", "Rural access", "Lower dropout rates"],
      },
      {
        title: "Teaching Quality",
        description: "Discuss untrained teachers and outdated methods.",
        bullets: ["Teacher training", "Performance review", "Improved learning outcomes"],
      },
      {
        title: "College Curriculum Problem",
        description: "Examine the gap between syllabus design and industry relevance.",
        bullets: ["Industry-based syllabus", "Mandatory internships", "Practical readiness"],
      },
      {
        title: "Education Finance Misuse",
        description: "Address fund leakage, corruption, and lack of transparency.",
        bullets: ["Digital tracking", "Strict monitoring", "Public trust"],
      },
      {
        title: "Private Colleges Regulation",
        description: "Debate high fees, profit focus, and weak quality checks.",
        bullets: ["Fee regulation", "Quality monitoring", "Equal opportunity"],
      },
      {
        title: "Unemployment After Degree",
        description: "Explore the skill gap and weak placement support after graduation.",
        bullets: ["Skill-based learning", "Placement programs", "Youth empowerment"],
      },
      {
        title: "Sports in Education",
        description: "Discuss the neglect of sports and holistic student development.",
        bullets: ["Sports infrastructure", "Compulsory participation", "Health benefits"],
      },
      {
        title: "Innovation and Startups",
        description: "Debate how education can better support creativity and entrepreneurship.",
        bullets: ["Innovation labs", "Startup funding", "Job creation"],
      },
      {
        title: "Mental Health and Student Pressure",
        description: "Examine stress, depression, and the need for institutional support.",
        bullets: ["Counselling support", "Flexible evaluation", "Student well-being"],
      },
    ],
    stats: [
      { label: "Agendas", value: "10" },
      { label: "Debate Flow", value: "8 Min / Agenda" },
      { label: "Language", value: "English Only" },
      { label: "Awards", value: "4 Categories" },
    ],
  },
  {
    slug: "pharmacy-events",
    title: "Pharmacy Events",
    subtitle: "Quiz - Models - Innovation",
    date: "April 16",
    time: "9:30 AM - 3:00 PM",
    eligible: "Pharmacy Students",
    venue: "Pharmacy Event Block",
    description: "Pharma Quiz, Model Presentation, and Innovation Challenge - showcase pharmaceutical brilliance.",
    longDescription:
      "A dedicated event cluster for pharmacy students featuring quiz rounds, model presentations, and innovation-led participation. This space is designed to spotlight domain expertise, practical understanding, and presentation strength from the pharmacy stream.",
    courses: ["B.Pharm", "Pharm-D"],
    registrationEnabled: false,
    highlights: [
      "Quiz, model presentation, and innovation-focused activities",
      "Dedicated to pharmacy participants",
      "Additional round-wise rules and format to be announced at the venue",
    ],
  },
  {
    slug: "auto-exotica",
    title: "Auto Exotica",
    subtitle: "Rev Your Souls",
    date: "April 17",
    time: "12:00 PM - 3:00 PM",
    eligible: "All Students",
    venue: "Siddhartha Institute of Sciences and Technology",
    venueUrl: "https://maps.app.goo.gl/ZpQRtVA6bBKu8F1U8?g_st=aw",
    description: "A thrilling auto expo with superbikes, supercars, and special guest appearances by bikers Alex Binoy & Varsha.",
    longDescription:
      "Auto Exotica is Sidnova's high-energy auto expo experience, bringing together superbikes, supercars, and special guest riders for a live event built around design, machine culture, and campus excitement.",
    courses: ["B.Tech", "Diploma", "B.Pharm", "Pharm-D", "M.Tech", "MBA", "MCA"],
    registrationEnabled: false,
    image: autoExoticaImage,
    highlights: [
      "Special guest appearances by biker Alex Binoy and Varsha",
      "Campus auto expo featuring bikes, cars, and rider showcases",
      "Open to students across all listed courses",
    ],
    guests: [
      { name: "Alex Binoy", role: "Special Guest Biker", note: "@binoy__xo" },
      { name: "Varsha", role: "Special Guest Biker", note: "@varshxxrevs" },
    ],
    contacts: [
      { name: "Harsha", phone: "7995210554" },
      { name: "Ajay Rangaraju", phone: "9133536130" },
    ],
    stats: [
      { label: "Date", value: "17 April" },
      { label: "Time", value: "12 PM - 3 PM" },
      { label: "Guests", value: "2 Riders" },
      { label: "Access", value: "Open Event" },
    ],
  },
  {
    slug: "culturals",
    title: "Traditional Day & Cultural Night",
    subtitle: "Morning to Evening Celebrations",
    date: "April 18",
    time: "Morning & Evening",
    eligible: "All Students",
    venue: "Main Campus Event Spaces",
    description:
      "April 18 begins with Traditional Day in the morning and continues with Cultural Night in the evening, featuring performances, celebrations, and campus-wide energy.",
    longDescription:
      "A full-day celebration that blends campus tradition, student expression, and evening stage energy. Traditional Day starts the celebration, while Cultural Night closes Sidnova with performances, crowd moments, and institute-wide participation.",
    courses: ["B.Tech", "Diploma", "B.Pharm", "Pharm-D", "M.Tech", "MBA", "MCA"],
    registrationEnabled: false,
    highlights: [
      "Morning Traditional Day celebration",
      "Evening Cultural Night performances",
      "Open campus participation across departments",
    ],
  },
];
