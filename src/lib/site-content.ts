export type Lang = "zh" | "en";

type NavItem = {
  href: string;
  label: string;
};

type IdeaStatus = "idea" | "in_progress" | "launched";

type IdeaItem = {
  title: string;
  summary: string;
  content: string;
  status: IdeaStatus;
  date: string; // YYYY-MM-DD
  tech?: string;
  link?: string;
};

type ArticleItem = {
  title: string;
  summary: string;
  coverSrc: string;
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
    imageSrc: string;
    imageAlt: string;
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
    ideas: IdeaItem[];
    articles: ArticleItem[];
  };
  gallery: {
    title: string;
    intro: string;
    caption: string;
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
  siteTitle: "徐赟哲",
  nav: [
    { href: "/", label: "首页" },
    { href: "/projects", label: "项目" },
    { href: "/gallery", label: "摄影集" },
    { href: "/contact", label: "联系" },
  ],
  hero: {
    imageSrc: "/hero-image.png",
    imageAlt: "Hero image",
    name: "你好，我是你的名字",
    role: "产品经理 / 产品运营 / 独立开发者 / 独立摄影师",
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
    title: "项目与文章",
    intro: "用来记录想法的演进：Idea 带状态，文章只展示标题/概览/预览图。",
    ideas: [
      {
        title: "FocusFlow",
        summary: "详情为只读展示。你可以通过编辑项目内容并重新发布到线上更新。",
        content: "深度工作规划 + 复盘节奏的任务管理工具。",
        status: "idea",
        date: "2026-03-01",
        tech: "Next.js / Prisma / PostgreSQL",
        link: "https://example.com/focusflow",
      },
      {
        title: "Design Snippets",
        summary: "详情为只读展示。你可以通过编辑项目内容并重新发布到线上更新。",
        content: "把可复用 UI 片段沉淀成组件文档与检索系统。",
        status: "launched",
        date: "2026-02-01",
        tech: "React / Tailwind CSS / Storybook",
        link: "https://example.com/design-snippets",
      },
      {
        title: "ReadLite",
        summary: "详情为只读展示。你可以通过编辑项目内容并重新发布到线上更新。",
        content: "支持高亮/摘录导出的轻量阅读应用。",
        status: "in_progress",
        date: "2026-01-15",
        tech: "TypeScript / Supabase / Vercel",
        link: "https://example.com/readlite",
      },
    ],
    articles: [
      {
        title: "Idea 到上线的最短路径",
        summary: "从需求澄清、原型验证到交付的轻量方法论。",
        coverSrc: "/hero-image.png",
      },
      {
        title: "如何维护一个可持续的灵感库",
        summary: "记录、筛选与更新，让想法真正变成可执行的路线图。",
        coverSrc: "/hero-image.png",
      },
    ],
  },
  gallery: {
    title: "摄影集",
    intro: "整理一些旅行与瞬间。后续会持续更新。",
    caption: "拍摄于 摩尔曼斯克极夜时间",
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
    { href: "/projects", label: "Projects" },
    { href: "/gallery", label: "Photography" },
    { href: "/contact", label: "Contact" },
  ],
  hero: {
    imageSrc: "/hero-image.png",
    imageAlt: "Hero image",
    name: "Hi, I'm Your Name",
    role: "Product Manager / Product Ops / Indie Builder / Independent Photographer",
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
    title: "Projects & Articles",
    intro: "A place to track the evolution of ideas: Ideas have status, Articles show title/summary/preview only.",
    ideas: [
      {
        title: "FocusFlow",
        summary:
          "Read-only details. You can update by editing the project content and redeploying.",
        content: "A task system for planning deep work and review loops.",
        status: "idea",
        date: "2026-03-01",
        tech: "Next.js / Prisma / PostgreSQL",
        link: "https://example.com/focusflow",
      },
      {
        title: "Design Snippets",
        summary:
          "Read-only details. You can update by editing the project content and redeploying.",
        content:
          "A component docs and search system for reusable UI patterns.",
        status: "launched",
        date: "2026-02-01",
        tech: "React / Tailwind CSS / Storybook",
        link: "https://example.com/design-snippets",
      },
      {
        title: "ReadLite",
        summary:
          "Read-only details. You can update by editing the project content and redeploying.",
        content: "A lightweight reading app with highlights and exportable notes.",
        status: "in_progress",
        date: "2026-01-15",
        tech: "TypeScript / Supabase / Vercel",
        link: "https://example.com/readlite",
      },
    ],
    articles: [
      {
        title: "The Shortest Path from Idea to Launch",
        summary: "A lightweight workflow from clarification to delivery.",
        coverSrc: "/hero-image.png",
      },
      {
        title: "Maintaining a Sustainable Idea Library",
        summary: "Capture, filter, and refresh so ideas become executable roadmaps.",
        coverSrc: "/hero-image.png",
      },
    ],
  },
  gallery: {
    title: "Photography",
    intro: "A collection of travels and moments. More coming soon.",
    caption: "Captured during the Midnight Sun in Murmansk",
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
  return value === "zh" ? "zh" : "en";
}

export function getCopy(lang: Lang): SiteCopy {
  return lang === "en" ? enCopy : zhCopy;
}
