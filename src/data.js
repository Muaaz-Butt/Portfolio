export const profile = {
  name: 'Muaaz Butt',
  role: 'Software Engineer',
  focus: 'Python & Backend Development',
  email: 'muaazbutt585@gmail.com',
  location: 'Lahore, Pakistan',
  github: 'https://github.com/Muaaz-Butt',
  linkedin: 'https://linkedin.com/in/muaaz-butt-192a45265',
}

export const stats = [
  { value: 280, suffix: '+', label: 'problems solved on LeetCode & Codeforces' },
  { value: 5, prefix: 'Top ', label: 'in a UET programming competition' },
  { value: 3.49, decimals: 2, label: 'CGPA, BS Computer Science at UET' },
  { value: 3, pad: 2, label: 'shipped projects, one live in production' },
]

export const projects = [
  {
    number: '01',
    kind: 'AI SYSTEM',
    date: 'Sep 2025 — May 2026',
    title: 'AikApply',
    tone: 'lime',
    visual: 'form',
    description: 'A university application assistant for Pakistani students. Fill one form, get Gemini-powered recommendations from your preferred fields, then let an agent map your data onto unfamiliar admission portals, log in and submit.',
    highlights: [
      'Intelligent form mapping with LangChain + Gemini on portals it has never seen',
      'Automated login and submission workflows driven by Selenium',
      'Chatbot guidance, deadline tracking and error logging',
    ],
    tags: ['Python', 'Django', 'React', 'LangChain', 'Selenium', 'Docker', 'PostgreSQL'],
    links: [
      { label: 'Live demo', href: 'https://aikapply.onrender.com' },
      { label: 'Source code', href: 'https://github.com/Muaaz-Butt/AikApply' },
    ],
  },
  {
    number: '02',
    kind: 'BACKEND',
    date: 'Aug 2026',
    title: 'TaskFlow API',
    tone: 'coral',
    visual: 'api',
    description: 'A task-management REST API built the production way: stateless JWT auth, BCrypt hashing, validated requests and one consistent error shape, plus smart triage with priorities, overdue tracking and a workload summary.',
    highlights: [
      'Server-side search, filtering and sorting with JPA Specifications',
      'Centralized exception handling and request validation',
      'Integration-tested end to end against H2 with a fixed clock',
    ],
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'JPA', 'JUnit'],
    links: [
      { label: 'Source code', href: 'https://github.com/Muaaz-Butt/TaskFlow-API' },
    ],
  },
  {
    number: '03',
    kind: 'SOFTWARE DESIGN',
    date: 'May 2023',
    title: 'Chess Game',
    tone: 'blue',
    visual: 'chess',
    description: 'Complete chess logic in C++: every piece, every rule, and game-state validation, designed around a clean class hierarchy rather than one giant switch statement.',
    highlights: [
      'Abstraction, inheritance and polymorphism through a Piece hierarchy',
      'Modular classes for board, moves and game state',
      'Game-state validation for legal moves, check and checkmate',
    ],
    tags: ['C++', 'OOP', 'Game Logic'],
    links: [
      { label: 'Source code', href: 'https://github.com/Muaaz-Butt/Chess-project' },
    ],
  },
]

export const experience = [
  {
    company: 'Educative',
    role: 'Technical Content Engineer',
    date: 'Aug 2026 — Present',
    place: 'Lahore',
    current: true,
    points: [
      'Build and evaluate Python-based LLM applications, including a coding-editorial generator and a live mock-interview agent, using structured prompts and function calling.',
      'Test generated outputs for correctness, diagnose issues, and refine implementations for reliability, clarity and maintainability.',
      'Work hands-on with APIs, AWS services, Docker, Kubernetes, Helm and MongoDB.',
    ],
    tags: ['Python', 'LLMs', 'Function calling', 'AWS', 'Docker', 'Kubernetes', 'Helm', 'MongoDB'],
  },
  {
    company: 'Deutics Global',
    role: 'Backend Developer Intern',
    date: 'Aug 2024 — Dec 2024',
    place: 'Lahore',
    points: [
      'Developed and maintained Django REST Framework APIs for user management, JWT authentication and password-reset workflows.',
      'Fixed backend issues and shipped production features with modular, reusable code, input validation and consistent API behavior.',
      'Implemented WebSocket-based real-time communication and integrated OpenCV for product requirements.',
      'Collaborated through Git branching, code reviews, debugging, testing and deployment cycles.',
    ],
    tags: ['Django REST Framework', 'JWT', 'WebSockets', 'OpenCV', 'Git'],
  },
]

export const skillGroups = [
  { name: 'Languages', items: ['Python', 'Java', 'C++', 'JavaScript', 'SQL', 'Rust'] },
  { name: 'Backend', items: ['Django', 'Django REST Framework', 'Spring Boot', 'ASP.NET', 'REST APIs', 'WebSockets'] },
  { name: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
  { name: 'Tools & Cloud', items: ['Git', 'GitHub', 'Postman', 'Docker', 'Docker Hub', 'Kubernetes', 'Helm', 'AWS'] },
  { name: 'Engineering', items: ['Data structures & algorithms', 'OOP', 'Database design', 'Debugging', 'Testing', 'Code reviews', 'HTTP', 'API validation', 'Auth & authorization'] },
  { name: 'AI Development', items: ['LLM applications', 'Function calling', 'Structured prompting', 'Claude Code', 'Context management', 'Iterative refinement'] },
]

export const featuredSkills = new Set(['Python', 'Django', 'Spring Boot', 'PostgreSQL', 'Docker', 'LLM applications'])

export const marquee = ['Python', 'Django', 'Spring Boot', 'PostgreSQL', 'REST APIs', 'JWT', 'WebSockets', 'Docker', 'Kubernetes', 'AWS', 'LangChain', 'Selenium', 'Redis', 'LLM agents', 'Function calling']
