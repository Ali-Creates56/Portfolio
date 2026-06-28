export const personalInfo = {
  name: "Muhammad Ali",
  role: "Software Engineer",
  tagline: "Crafting Pixel-Perfect Digital Experiences",
  bio: `Motivated Software Engineering student at the University of Gujrat with a strong foundation in frontend development and UI/UX design. Experienced in building responsive, user-centric web applications using modern JavaScript technologies. Certified in Google AI Essentials and passionate about leveraging AI tools to accelerate development workflows. First-position winner at the SRE Competition 2025.`,
  email: "ma7114338@gmail.com",
  phone: "23011598-063@uog.edu.pk",
  location: "Gujrat, Punjab, Pakistan",
  github: "https://github.com/Ali-Creates56",
  linkedin: "https://www.linkedin.com/in/muhammad-ali-a4581622a",
  resumeUrl: "/Portfolio/resume/Muhammad_Ali_Resume.pdf",
  profileImage: "/Portfolio/images/profile.jpg",
};

export const skills = [
  { name: "HTML5", category: "frontend", level: 95, icon: "html" },
  { name: "CSS3", category: "frontend", level: 90, icon: "css" },
  { name: "JavaScript", category: "frontend", level: 88, icon: "js" },
  { name: "React", category: "frontend", level: 75, icon: "react" },
  { name: "Bootstrap", category: "frontend", level: 85, icon: "bootstrap" },
  { name: "C++", category: "language", level: 80, icon: "cpp" },
  { name: "DSA", category: "cs", level: 78, icon: "dsa" },
  { name: "OOP", category: "cs", level: 82, icon: "oop" },
  { name: "REST APIs", category: "tools", level: 80, icon: "api" },
  { name: "Mapbox API", category: "tools", level: 72, icon: "map" },
  { name: "Git & GitHub", category: "tools", level: 85, icon: "git" },
];

export const defaultProjects = [
  {
    id: "1",
    title: "Tikka Mahal",
    description:
      "Static website for a restaurant business — clean menu display, fully responsive layout, and smooth navigation built using vanilla web technologies.",
    techStack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://ali-creates56.github.io/Tikka-Mehal/",
    githubUrl: "https://github.com/Ali-Creates56/Tikka-Mehal",
    featured: true,
  },
  {
    id: "2",
    title: "Pizza Website",
    description:
      "Dynamic restaurant website with a rich, interactive ordering experience, leveraging Bootstrap components for a polished cross-device presentation.",
    techStack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    liveUrl: "https://ali-creates56.github.io/Pizza/",
    githubUrl: "https://github.com/Ali-Creates56/Pizza",
    featured: true,
  },
  {
    id: "3",
    title: "PulseHealth Gujrat",
    description:
      "Online appointment booking system for healthcare providers, featuring integrated Mapbox maps to help patients locate clinics and specialists nearby.",
    techStack: ["HTML", "CSS", "JavaScript", "Mapbox API"],
    liveUrl: "https://ali-creates56.github.io/Pulsehealth-Gujrat/",
    githubUrl: "https://github.com/Ali-Creates56/Pulsehealth-Gujrat",
    featured: true,
  },
  {
    id: "4",
    title: "LifeFlow",
    description:
      "Online blood request and donation platform connecting donors with patients in need, with live API integration for real-time data updates.",
    techStack: ["HTML", "CSS", "JavaScript", "REST API"],
    liveUrl: "https://ali-creates56.github.io/LifeFlow/",
    githubUrl: "https://github.com/Ali-Creates56/LifeFlow",
    featured: true,
  },
  {
    id: "5",
    title: "SpliMate",
    description:
      "Expense-splitting app for groups that tracks shared costs, balances owed between members, and settles up with a clean, intuitive interface.",
    techStack: ["React"],
    liveUrl: "",
    githubUrl: "https://github.com/Ali-Creates56/SpliMate",
    featured: false,
  },
];

export const education = [
  {
    degree: "BS Software Engineering",
    institution: "University of Gujrat",
    period: "Oct 2023 — Present",
    cgpa: "3.33",
    description: "Currently enrolled in BSSE program, building strong foundations in software engineering principles, web development, and data structures.",
  },
  {
    degree: "Intermediate — Pre Medical",
    institution: "Aspire Group of Colleges, Gujrat",
    period: "Sep 2020 — May 2022",
    description: "Completed pre-medical intermediate studies with strong academic performance.",
  },
  {
    degree: "Matriculation",
    institution: "Workers Welfare Higher Secondary School, Gujrat",
    period: "Mar 2018 — May 2020",
    description: "Completed matriculation with distinction.",
  },
];

export const achievements = [
  {
    title: "1st Position — SRE Competition 2025",
    description: "Secured first place as a winning team member in the SRE (Software Requirements Engineering) Competition organised by the Department of Software Engineering, University of Gujrat.",
  },
  {
    title: "Tech Competition Participant",
    description: "Actively participated in the Tech Competition organised by the Software Engineering Department, University of Gujrat, showcasing applied development skills.",
  },
  {
    title: "Google AI Essentials — Coursera",
    description: "Completed a five-course specialisation covering AI fundamentals, productivity tools, responsible AI practices, and prompt engineering (Jun 2026).",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
