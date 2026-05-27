export type ProfileLink = {
  name: string
  url: string
}

export type SkillGroup = {
  title: string
  items: string[]
}

export type ExperienceEntry = {
  role: string
  organization: string
  dates: string
  bullets: string[]
}

export type CertificationEntry = {
  title: string
  issuer: string
  url?: string
}

export type EducationEntry = {
  institution: string
  dates: string
  degree: string
  note: string
}

const splitParagraphs = (s: string) =>
  s
    .trim()
    .split(/\r?\n\s*\n/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean)

export const siteContent = {
  title: 'Viswamedha Nalabotu',
  headline: 'Graduate AI + Software Engineer',
  profile: {
    name: 'Viswamedha Nalabotu',
    summary: [
      'Welcome to my portfolio!',
      'I am a graduate AI & Software Engineer with experience in many disciplines, including software development, applied machine learning, cyber security and web development.',
      'Have a look around and feel free to reach out if you want to connect or collaborate on pretty much anything. :)',
    ],
    links: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/viswamedha-nalabotu/' },
      { name: 'GitHub', url: 'https://github.com/NV-9/' },
      { name: 'CV', url: 'https://links.viswamedha.com/cv1' },
    ] satisfies ProfileLink[],
  },
  about: splitParagraphs(`
    To start with, my name... I typically go by 'Vish' or 'Viswa', either is fine with me. If you really want to pronounce my full name, the pronuciation is something like "viss-wuh-may-dah" or "viss-wuh-may-duh" (with a soft 'd' like in 'the'). The name has a meaning along the lines of "all-encompassing knowledge".

    Never really understood how reduction is suitable for describing people, but if I had to describe myself in a few words, I would say I'm a highly adaptable person who loves learning and trying things out (except climbing...).

    The purpose of this site is to have a single central location where I can share my projects, experiences and thoughts, and also to have a bit of fun building and designing websites. I didn't really have a clear vision for the site when I first built in 2021/22 as I just did it since a friend reccomended to and walked me through hosting it. As my skills grew and I understood more about the web, I kept adding and rewriting the codebase and content until it reached its current state. 

    My current zen is to keep this site content-focused and minimal, and to have it be a reflection of me.

    In terms of interests, I tend to have a wide variety, but here is an unofficial list: coding (duh..), infratstrucure management, PC building, self-hosting/homelabbing, AI development and applications, reading webtoons/manga/fiction, binging Kdramas/TV shows, gaming and definitely food. Below is a bit about each one:

    - Coding: Been doing so for about 11 years now, and while the landscape as changed to support more vibe-coding and less traditional "programming", the underlying skill is still very much the same and I've picked up quite a few languages and frameworks. I am biased towards Python and more recently Rust and Go for backend and TypeScript for frontend.

    - Homelabbing: I have a small homelab setup with a couple servers that I use for self-hosting, with some external VPSes for stuff that I need to reliabily keep up in case I need to be cleaning my room. I plan to expand this to eventually have a full rack setup when I have the space and time to dedicate to it.

    - AI: My entire degree has literally prepared me for this and I have enjoyed every moment of it. <- That was a lie, there were some moments of pure suffering but overall, I do see many of the benefits of it and have found it to be rewarding within my own projects. Agentic AI was something an uncle of mine introduced me to in early 2025 and this is probably some of the coolest tech I've seen.

    - Reading: More recently, I have been reading a lot of webtoons and manga, with some novels on the side. I do end up binging a lot of series at once and can personally reccomend some good ones depending on your taste. Some of my all time favourites are: Omniscient Reader's Viewpoint, all the Wolyaverse books/manwha, The Braided Path by Chris Wooding, the Demonata by Darrent Shan, and pretty much all the Dima Zales book (love that Russian dude). I also have a habit of rereading my favourite series multiple times, with some of them being on their 5th or 6th reread.

    - Gaming: I have been gaming for as long as I can remember, with some of my earliest memories being of playing games on the family laptop. I have a pretty wide range of games that I enjoy, but some of my favourites are: Assassin's Creed (especially Origins, yes I understand the general hate for the later entries of this series), Ghost of Tsushima, Cyberpunk 2077 (completed it three times, couldn't betray Songbird :( ) and RDR2. I also have a soft spot for COD WW2 zombies as I spent a lot of time playing that with my brother.
    
    I have been meditating for over a year now and it has been helpful in keeping a calm heart and a clear mind. I recommend this to anyone with any trouble managing stress or anxiety like I do, even just 30 minutes a day gives a noticeable improvement in overall wellbeing. 
  `),
  skills: [
    {
      title: 'Programming Languages',
      items: ['C', 'C#', 'Java', 'JavaScript', 'Python', 'R', 'Rust', 'Ruby', 'TypeScript'],
    },
    {
      title: 'Technologies Used',
      items: ['AWS', 'Azure DevOps', 'Docker', 'Git', 'React', 'React Router', 'Tailwind CSS', 'Vite'],
    },
    {
      title: 'AI/ML',
      items: ["LangChain", "NLP", "Agentic AI", "MCP", "Feature Engineering", "TensorFlow", "PyTorch", "Scikit-Learn", "Pandas", "NumPy", 'LLMs', "Prompting", "Automation", "Data Pipelines", "Applied AI",],
    }
  ] satisfies SkillGroup[],
  experience: [
    {
      role: 'Software Engineer & Tester Intern',
      organization: 'Simcenter Flomaster, Siemens DISW',
      dates: 'Jul. 2024 - Sep. 2025',
      bullets: [
        'Collaborated in an agile DevOps environment, with tasks covering all parts of the SDLC, with 3 teams abroad for internal queries and features.',
        'Designed and delivered a configurable installer, integrated with automated testing to support future product releases.',
        'Developed four newly released features, including Turn Off System Sections and Min Max, with unit and integration tests.',
        'Enhanced performance of the internal benchmarking website, achieving 3x faster render speeds which enabled subsequent analysis of 2-3x larger datasets.',
        'Resolved 70+ security and code-quality issues, with many stemming from user reports.',
      ],
    },
    {
      role: 'Lab Demonstrator',
      organization: 'University of Birmingham',
      dates: 'Sep. 2023 - Apr. 2024',
      bullets: [
        'Guided first-year students in Java programming and OOP concepts, improving problem-solving and coding proficiency.',
      ],
    },
    {
      role: 'Teaching Intern',
      organization: 'Bishop Challoner Catholic College',
      dates: 'Jun. 2023 - Jul. 2023',
      bullets: [
        'Designed engaging starter and plenary activities to enhance participation for a more engaging learning environment.',
        'Collaborated with teachers to provide essential student support during practical laboratory activities.',
      ],
    },
    {
      role: 'Cyber Security Intern',
      organization: 'Smallpeice Trust, Birmingham, West Midlands (Virtual)',
      dates: 'Aug. 2020 - Aug. 2020',
      bullets: [
        'Incorporated critical thinking to analyse and address cybersecurity challenges, ensuring accurate decision-making on exploit prevention.',
      ],
    },
    {
      role: 'Computer Science Tutor',
      organization: 'Online, Part-Time',
      dates: 'Jun. 2020 - Present',
      bullets: [
        'Achieved an average grade improvement of 21% across over 18 students through GCSE and A-Level tutoring.',
      ],
    },
  ] satisfies ExperienceEntry[],
  certifications: [
    { title: 'AWS Cloud Practitioner', issuer: 'Credly', url: 'https://www.credly.com/badges/63df8cdb-91c7-413a-a189-2e53b33fcb26' },
    { title: 'AWS AI Practitioner', issuer: 'Credly', url: 'https://www.credly.com/badges/6b3c13fd-9f94-421c-94a0-47ac0276e110' },
    { title: 'AWS ML Engineer', issuer: 'Credly', url: 'https://www.credly.com/badges/1175b371-8fde-4187-a23b-0a37a0e1b922' },
  ] satisfies CertificationEntry[],
  education: [
    {
      institution: 'University of Birmingham',
      dates: 'Sep. 2022 - July 2026',
      degree: 'BSc AI & Computer Science FT',
      note: 'On track to receiving a First Class Degree',
    },
  ] satisfies EducationEntry[],
  github: {
    username: 'NV-9',
  },
}
