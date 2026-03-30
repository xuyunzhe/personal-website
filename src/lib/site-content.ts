export type Lang = "zh" | "en";

type NavItem = {
  href: string;
  label: string;
};

type IdeaStatus = "idea" | "in_progress" | "launched" | "journal";

type IdeaItem = {
  /** URL path segment when `toSlug(title)` would be empty (e.g. Chinese-only titles). */
  slug?: string;
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
    name: "大家好，我是徐赟哲",
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
    intro: "记录了我的一些idea，以及落地进度，会把一些落地的过程整理为文章记录下来。",
    ideas: [
      {
        slug: "personal-website",
        title: "创建个人网站",
        summary:
          "我觉得尝试vibe coding最简单的方式，搭建一个属于自己的空间",
        content:
          "用 Next.js App Router、TypeScript 和 Tailwind 搭了这个站点，内容集中在代码里，改完推上去就能更新。部署在 Vercel，绑了自己的域名。算是一次从零到可访问的完整小闭环。",
        status: "launched",
        date: "2026-03-20",
        tech: "Next.js / TypeScript / Tailwind CSS / Vercel",
        link: "https://xuyunzhe.site",
      },
      {
        slug: "salary-timer",
        title: "收入实时计算器",
        summary:
          "如果把每一秒赚到的钱，在电脑上面实时展示，我上班的动力一定很强",
        content:
          "**Idea：**在 Mac **菜单栏**里实时看到自己的**每秒收入**，在工位坐着的时候心情也许会好一点？\n+1 元 +1 元 +1 元 +1 元…\n\n第一次做**落地 App** 的尝试，首选 **Mac**：不需要先打通 iOS 端各种 App 限制，**成本很低**；开发完成后**只要打包即可**，整条流程都在视野范围之内，**踩坑的概率**应该比较小。\n\n**网站迭代计划：**如果要在网站上**上传自己的作品**供人下载，应该增加一个**作品发布 / 下载**的能力，直接贴百度云链接，**可太不体面了**…",
        status: "launched",
        date: "2026-03-26",
        tech: "Swift / macOS",
      },
      {
        slug: "human-drive-vibe-coding",
        title: "Human-Drive的实际感受",
        summary: "落地了两个项目之后，对于Vibe coding 的一些想法",
        content:
          "最开始搞vibe coding尝试的时候，因为注册成本这些问题，没选Claude code，选了**Cursor**来做第一次尝试。\n\n第一感觉就是**“兴奋”**，用自然语言交互，能把各种想法变成能看到的项目。但搞了两个实操项目之后，我觉得**工作流程本质上其实没啥变化**。跟在公司里推动需求流程比，省了评审排期这些复杂的流程，就只要**文档交付然后查收**就行，但整个流程还是**人在主导**。\n\n相比于直接和研发进行沟通，我的**试错成本反而少了很多**，更能直观的感受到**每一个字符的思考&开发成本**，我的操作模式逐渐从**“想一步实现一步”**变成**“想清楚——描述清楚”**，果然**当家了才知道柴米油盐贵**。\n\n目前的两个项目还不够复杂，也没有涉及到前端样式美化的短板，处于**门外汉的阶段**，所以下次想要**尝试一些更复杂的idea**，看看是否有新的感受",
        status: "journal",
        date: "2026-03-28",
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
  footer: "© 2026 徐赟哲. All rights reserved.",
  langSwitchLabel: "English",
};

const enCopy: SiteCopy = {
  siteTitle: "XuYunZhe",
  nav: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/gallery", label: "Photography" },
    { href: "/contact", label: "Contact" },
  ],
  hero: {
    imageSrc: "/hero-image.png",
    imageAlt: "Hero image",
    name: "Hi, I'm XuYunZhe",
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
    intro:
      "This section tracks some of my ideas and their delivery progress, and I document selected implementation journeys as articles.",
    ideas: [
      {
        slug: "personal-website",
        title: "Building a Personal Website",
        summary:
          "I think the simplest way to try vibe coding is to build a space of your own.",
        content:
          "Built with Next.js App Router, TypeScript, and Tailwind. Copy lives in the codebase—edit, push, and it’s live. Deployed on Vercel with a custom domain. A small end-to-end loop from zero to something you can visit.",
        status: "launched",
        date: "2026-03-20",
        tech: "Next.js / TypeScript / Tailwind CSS / Vercel",
        link: "https://xuyunzhe.site",
      },
      {
        slug: "salary-timer",
        title: "Real-Time Income Calculator",
        summary:
          "If every cent I earn per second showed live on my Mac, I’d feel a lot more motivated at work.",
        content:
          "**Idea:** see your **per-second income** live in the Mac **menu bar**—maybe it cheers you up a little at your desk?\n+1 +1 +1 +1…\n\nThis was my first try at shipping a **real app**, and I picked **macOS** first: no need to fight through all the iOS store and permission hoops up front, so the **cost stayed low**; once it worked, I could **just package and ship**, with the **whole pipeline in sight** and a **smaller chance of nasty surprises**.\n\n**Site roadmap:** if I want people to **download my work** from this website, I should add a **proper upload / distribution** flow, dropping **only a Baidu Netdisk link** feels **pretty undignified**…",
        status: "launched",
        date: "2026-03-26",
        tech: "Swift / macOS",
      },
      {
        slug: "human-drive-vibe-coding",
        title: "Human-Drive: What It Actually Feels Like",
        summary:
          "After shipping two projects, some thoughts on vibe coding.",
        content:
          "When I first tried vibe coding, signup friction and similar issues led me to skip Claude Code and use **Cursor** for the first run.\n\nMy first feeling was **“excitement”**: natural language could turn ideas into something you could see. After two hands-on projects, though, I think **the workflow itself hasn’t really changed**. Compared to pushing requirements at a company, I skip reviews and scheduling—mostly **write the spec and accept delivery**—but **humans still run the whole show**.\n\nVersus talking directly to engineers, my **trial-and-error cost actually dropped**, and I feel **the thinking and implementation cost behind every character** more clearly. My mode shifted from **“think one step, build one step”** to **“think it through—describe it clearly”**—**you only learn what groceries cost when you run the household**.\n\nThese two projects aren’t complex yet and barely touch front-end polish; I’m still **very much a beginner**, so next I want to **try a more ambitious idea** and see if anything feels different.",
        status: "journal",
        date: "2026-03-28",
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
  footer: "© 2026 XuYunZhe. All rights reserved.",
  langSwitchLabel: "中文",
};

export function getLang(value?: string): Lang {
  return value === "zh" ? "zh" : "en";
}

export function getCopy(lang: Lang): SiteCopy {
  return lang === "en" ? enCopy : zhCopy;
}
