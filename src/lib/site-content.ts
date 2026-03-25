export type Lang = "zh" | "en";

type NavItem = {
  href: string;
  label: string;
};

type ProjectItem = {
  name: string;
  description: string;
  tech: string;
  link: string;
};

type PostItem = {
  title: string;
  summary: string;
  date: string;
};

export type SiteCopy = {
  siteTitle: string;
  nav: NavItem[];
  hero: {
    name: string;
    role: string;
    intro: string;
    primaryCta: string;
    secondaryCta: string;
  };
  about: {
    title: string;
    content: string;
  };
  projects: {
    title: string;
    intro: string;
    items: ProjectItem[];
  };
  blog: {
    title: string;
    intro: string;
    items: PostItem[];
  };
  contact: {
    title: string;
    intro: string;
    emailLabel: string;
    locationLabel: string;
  };
  footer: string;
  langSwitchLabel: string;
};

const zhCopy: SiteCopy = {
  siteTitle: "你的名字",
  nav: [
    { href: "/", label: "首页" },
    { href: "/about", label: "关于" },
    { href: "/projects", label: "项目" },
    { href: "/blog", label: "博客" },
    { href: "/contact", label: "联系" },
  ],
  hero: {
    name: "你好，我是你的名字",
    role: "产品工程师 / 独立开发者",
    intro:
      "我专注于构建简洁、可靠、体验友好的数字产品，喜欢把复杂问题变成清晰可用的解决方案。",
    primaryCta: "查看项目",
    secondaryCta: "联系我",
  },
  about: {
    title: "关于我",
    content:
      "我目前专注于 Web 应用开发，擅长 React、Next.js 和产品体验设计。工作之外，我会写技术文章、做开源尝试，并持续优化自己的创作流程。",
  },
  projects: {
    title: "精选项目",
    intro: "这里是我近期最有代表性的三个项目。",
    items: [
      {
        name: "FocusFlow",
        description: "一个帮助你规划深度工作和复盘节奏的任务管理工具。",
        tech: "Next.js / Prisma / PostgreSQL",
        link: "https://example.com/focusflow",
      },
      {
        name: "Design Snippets",
        description: "收集和整理可复用 UI 片段的组件文档站。",
        tech: "React / Tailwind CSS / Storybook",
        link: "https://example.com/design-snippets",
      },
      {
        name: "ReadLite",
        description: "一个支持高亮和摘录导出的轻量阅读应用。",
        tech: "TypeScript / Supabase / Vercel",
        link: "https://example.com/readlite",
      },
    ],
  },
  blog: {
    title: "最新文章",
    intro: "我会记录开发实践、产品思考与效率方法。",
    items: [
      {
        title: "如何从 0 到 1 设计个人项目架构",
        summary: "一套适用于独立开发者的轻量架构决策流程。",
        date: "2026-03-10",
      },
      {
        title: "Next.js App Router 的实战经验",
        summary: "总结我在真实项目中踩过的坑与优化手段。",
        date: "2026-02-21",
      },
      {
        title: "写给开发者的内容创作工作流",
        summary: "把零散想法系统化为文章和可复用知识。",
        date: "2026-01-15",
      },
    ],
  },
  contact: {
    title: "联系我",
    intro: "欢迎交流产品、技术合作，或任何你正在尝试的新点子。",
    emailLabel: "邮箱",
    locationLabel: "城市",
  },
  footer: "© 2026 你的名字. All rights reserved.",
  langSwitchLabel: "English",
};

const enCopy: SiteCopy = {
  siteTitle: "Your Name",
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  hero: {
    name: "Hi, I'm Your Name",
    role: "Product Engineer / Indie Builder",
    intro:
      "I build clean and reliable digital products, turning complex problems into clear and useful experiences.",
    primaryCta: "View Projects",
    secondaryCta: "Get In Touch",
  },
  about: {
    title: "About Me",
    content:
      "I focus on modern web applications with React, Next.js, and product thinking. Outside work, I write technical posts, experiment with open-source ideas, and refine my maker workflow.",
  },
  projects: {
    title: "Selected Projects",
    intro: "Three representative projects I have worked on recently.",
    items: [
      {
        name: "FocusFlow",
        description: "A task system for planning deep work and meaningful review loops.",
        tech: "Next.js / Prisma / PostgreSQL",
        link: "https://example.com/focusflow",
      },
      {
        name: "Design Snippets",
        description: "A component docs site for collecting reusable UI patterns.",
        tech: "React / Tailwind CSS / Storybook",
        link: "https://example.com/design-snippets",
      },
      {
        name: "ReadLite",
        description: "A lightweight reading app with highlights and exportable notes.",
        tech: "TypeScript / Supabase / Vercel",
        link: "https://example.com/readlite",
      },
    ],
  },
  blog: {
    title: "Latest Posts",
    intro: "I write about development, product decisions, and productivity.",
    items: [
      {
        title: "Designing a Solo Project Architecture from Scratch",
        summary: "A lightweight decision framework for indie developers.",
        date: "2026-03-10",
      },
      {
        title: "Practical Lessons with Next.js App Router",
        summary: "Pitfalls and optimizations from production experience.",
        date: "2026-02-21",
      },
      {
        title: "A Content Workflow for Developers",
        summary: "How to turn scattered notes into reusable knowledge.",
        date: "2026-01-15",
      },
    ],
  },
  contact: {
    title: "Contact",
    intro: "Open to product discussions, technical collaboration, and new ideas.",
    emailLabel: "Email",
    locationLabel: "Location",
  },
  footer: "© 2026 Your Name. All rights reserved.",
  langSwitchLabel: "中文",
};

export function getLang(value?: string): Lang {
  return value === "en" ? "en" : "zh";
}

export function getCopy(lang: Lang): SiteCopy {
  return lang === "en" ? enCopy : zhCopy;
}
