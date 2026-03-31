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
  /** Preview images shown on launched idea detail pages. */
  previewImages?: Array<{
    src: string;
    alt?: string;
  }>;
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
    /** 仅追加新条目，勿删除或替换已有项，避免丢失历史图片 */
    photos: Array<{
      src: string;
      alt: string;
      caption: string;
    }>;
  };
  blog: {
    title: string;
    intro: string;
    items: PostItem[];
  };
  /** 首页「项目」区块上方的引言（左侧竖线 + 双行文案） */
  homeArticleLead: {
    line1: string;
    line2: string;
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
    role: "PM / 增长 / 收益 / 体验 / AI",
    intro:
      "大家好，我是徐赟哲，\n在这里你会看到我发布的一些项目，我的一些想法，一些小实验，还有一些图片。\n\n这个网站里所有页面搭建与项目落地，都源自我对 vibe coding 的实践；我会持续记录自己的思考和学习过程，以及那些无处安放的 idea。\n\n关于我的职业信息：PM / 增长 / 收益 / 体验 / AI\n关于我的其他信息：摄影师（希望成为）",
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
          "这次做个人网站，我给自己定的目标很简单：先把主页、项目页、摄影集和联系页跑起来，保证能稳定访问，不追求一步到位。\n\n技术栈我选了 Next.js App Router + TypeScript + Tailwind。最先做的是信息结构和导航，然后把中英文文案、想法和文章都收敛到 `site-content.ts`，这样每次改内容我都知道该去哪里改，维护成本低很多。\n\n开发过程里，我基本是「想清楚一段，就实现一段」。本地看效果没问题后就 `git commit` + `git push`，交给 Vercel 自动部署。域名这块我把 `xuyunzhe.site` 和 `www` 都接上，等 DNS 生效后，整个站点就正式可访问了。\n\n复盘下来，这个项目最大的收获不是技术难度，而是把「从想法到上线」这条链路完整走通。现在我的节奏就是：快速上线、小步迭代、持续记录，让网站跟着我的作品一起成长。",
        status: "launched",
        date: "2026-03-20",
        tech: "Next.js / TypeScript / Tailwind CSS / Vercel",
        link: "https://xuyunzhe.site",
        previewImages: [
          {
            src: "/previews/personal-site-1.png",
            alt: "首页：我、介绍与项目列表",
          },
          {
            src: "/previews/personal-site-2.png",
            alt: "项目页：想法与文章",
          },
          {
            src: "/previews/personal-site-3.png",
            alt: "摄影集：照片网格",
          },
        ],
      },
      {
        slug: "salary-timer",
        title: "收入实时计算器",
        summary:
          "如果把每一秒赚到的钱，在电脑上面实时展示，我上班的动力一定很强",
        content:
          "**Idea：**在 Mac **菜单栏**里实时看到自己的**每秒收入**，在工位坐着的时候心情也许会好一点？\n+1 元 +1 元 +1 元 +1 元…\n\n第一次做**落地 App** 的尝试，首选 **Mac**：不需要先打通 iOS 端各种 App 限制，**成本很低**；开发完成后**只要打包即可**，整条流程都在视野范围之内，**踩坑的概率**应该比较小。\n\n**网站迭代计划：**如果要在网站上**上传自己的作品**供人下载，应该增加一个**作品发布 / 下载**的能力，直接贴百度云链接，**可太不体面了**…\n\n**3月30日：**薪资这种敏感数据还是更适合放在手表这种私密性较高的端口使用，下一步希望把现在的功能点再做删减，变为更简洁的 MVP 版本，然后上线到 Apple Watch 端。",
        status: "launched",
        date: "2026-03-26",
        previewImages: [
          {
            src: "/previews/salary-timer-preview-1.png",
            alt: "SalaryTimer release files",
          },
          {
            src: "/previews/salary-timer-preview-2.png",
            alt: "SalaryTimer app main panel",
          },
          {
            src: "/previews/salary-timer-preview-3.png",
            alt: "SalaryTimer menu bar amount",
          },
        ],
        tech: "Swift / macOS",
      },
      {
        slug: "next-project-goals",
        title: "接下来的项目目标",
        summary:
          "ios客户端，微信小程序，apple watch端，每个端口都可以把路径跑通",
        content:
          "接下来我想把同一套核心能力往多端扩展：先做 iOS 客户端，再做微信小程序，最后补上 Apple Watch 端，验证「同一条业务链路」在不同入口都能跑通。\n\n第一阶段会先把数据结构和接口约束定清楚，保证三端看的是同一份核心数据；第二阶段再针对每个端的交互习惯做轻量适配，不追求一次做到最完整。\n\n我的目标不是一次铺得很大，而是先把最小可用路径打通：能登录、能看到核心信息、能完成关键操作。只要这条链路稳定，后续再逐端做体验和性能优化。",
        status: "journal",
        date: "2026-03-28",
      },
      {
        slug: "ios-long-screenshot",
        title: "ios 手机长截图功能",
        summary:
          "如果苹果手机可以更好的支持长截图就好了， 小目标是希望可以和截图一样，在控制中心唤出使用",
        content:
          "这个想法的核心是把「长截图」做成和普通截图一样顺手：不需要额外打开 App，不需要复杂步骤，最好能直接从控制中心一键唤起。\n\n第一版我会先聚焦一个最小可用场景：网页或聊天内容的连续截取 + 快速导出。只要把触发、拼接和保存这三步跑通，就已经有价值。\n\n后续再考虑细节体验，比如截取预览、局部重排、导出格式和隐私处理。目标不是功能堆满，而是让高频场景足够快、足够稳。",
        status: "idea",
        date: "2026-03-30",
      },
      {
        slug: "moments-copy-generator",
        title: "朋友圈strong文案生成",
        summary:
          "每次发朋友圈想一些既不土又很高级的文案都很难，还要搭配图片，这次希望我把所有p好的图片上传上去就帮我自动搭配好9格和文案",
        content:
          "这个项目想解决我每次发朋友圈前最耗时的环节：选图、排 9 宫格、想文案。理想状态是我只负责把修好的图片上传，系统自动完成编排和文案建议。\n\n第一版会先做两个核心能力：一是根据图片内容和色调自动组合 9 格顺序；二是基于场景（旅行、生活、工作）生成多种语气的文案草稿，保证「不土」但又有辨识度。\n\n交互上我希望尽量简单：上传图片 -> 选择风格 -> 一键生成。后续再加手动微调能力，比如替换单张、锁定某一格位置、文案长度控制和 emoji 风格开关，让效率和个性化同时成立。\n\n最后一个关键问题是：怎么判断文案和图片搭配到底「土不土」。这里我希望关联抖音 / 小红书上优质博主的公开内容，提取表达风格、用词密度、情绪节奏和图文匹配关系，让 AI 持续学习并做识别评分，给出更接近真实平台审美的建议。",
        status: "in_progress",
        date: "2026-03-29",
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
      {
        slug: "personal-website-interactive",
        title: "个人网站增加互动功能",
        summary:
          "应该增加一些评论，留言的功能，便于大家一起交流",
        content:
          "目前站点主要是单向展示：项目、想法、摄影集。接下来希望加上评论或留言能力，让访客可以留下想法、提问或补充资料，形成轻量的交流。\n\n第一版我会优先考虑实现成本低、维护成本可控的方案：例如基于第三方评论服务，或简单的留言表单与适度审核。重点是先把「能对话」这条链路打通，再迭代体验与风控。\n\n目标和独立博客的留言区类似：不追求大而全的社区，而是给志同道合的人一个方便交流的入口。",
        status: "in_progress",
        date: "2026-03-31",
      },
    ],
    articles: [
      {
        title: "Idea 到上线的最短路径",
        summary: "从需求澄清、原型验证到交付的轻量方法论。占位示例，更新中",
        coverSrc: "/previews/article-preview-red-cabin.png",
      },
      {
        title: "如何维护一个可持续的灵感库",
        summary: "记录、筛选与更新，让想法真正变成可执行的路线图。占位示例，更新中",
        coverSrc: "/previews/article-preview-red-cabin.png",
      },
    ],
  },
  gallery: {
    title: "摄影集",
    intro: "整理一些旅行与瞬间。后续会持续更新。",
    photos: [
      {
        src: "/hero-image.png",
        alt: "摩尔曼斯克极夜",
        caption: "拍摄于 摩尔曼斯克极夜时间",
      },
      {
        src: "/gallery/01-tokyo-nightscape.png",
        alt: "东京夜景与远处富士山轮廓",
        caption: "东京夜景与富士山轮廓",
      },
      {
        src: "/gallery/02-tokyo-bay-dusk.png",
        alt: "东京湾暮色，东京塔与彩虹桥",
        caption: "东京湾暮色，东京塔与彩虹桥",
      },
      {
        src: "/gallery/03-beach-from-above.png",
        alt: "俯瞰海滩与浪花",
        caption: "俯瞰海滩",
      },
      {
        src: "/gallery/04-beach-dinner-sunset.png",
        alt: "海滩日落时的露天晚餐",
        caption: "海滩日落与晚餐",
      },
      {
        src: "/gallery/05-street-cafe-twilight.png",
        alt: "街角咖啡馆与暮色天空",
        caption: "街角咖啡馆，暮色",
      },
      {
        src: "/gallery/06-winter-road.png",
        alt: "雪路与车灯暮色",
        caption: "雪路车行",
      },
      {
        src: "/gallery/07-mount-fuji-lake.png",
        alt: "河口湖与富士山",
        caption: "河口湖与富士山",
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
  homeArticleLead: {
    line1: "不附庸的思辨者 | INTP",
    line2: "喜欢把问题想清楚，也偏爱有结构、有巧思与美感的物与事",
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
    role: "PM / Growth / Revenue / Experience / AI",
    intro:
      "I switch between product thinking and indie building, turning fuzzy ideas into usable versions quickly, then refining them through continuous iteration.\n\nEvery page and shipped project here comes from my vibe coding practice. This site is where I document my learning process and all the ideas that need a place to live.\n\nProfessional focus: PM / Growth / Revenue / Experience / AI\nPersonal goal: Photographer (in progress).",
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
          "For this personal site, I set a simple goal: get four pages live first—Home, Projects, Gallery, and Contact—then improve in small steps instead of chasing perfection on day one.\n\nI chose Next.js App Router + TypeScript + Tailwind. I started with information architecture and navigation, then centralized bilingual copy, ideas, and articles in `site-content.ts`, which made content updates much easier to maintain.\n\nDuring development, my rhythm was straightforward: think through one chunk, implement one chunk. Once local checks looked good, I used `git commit` + `git push` and let Vercel deploy automatically. I also mapped both `xuyunzhe.site` and `www`, so the site became reachable after DNS propagation.\n\nLooking back, the biggest gain wasn’t technical complexity—it was completing the full loop from idea to launch. My current cadence is: ship fast, iterate steadily, and document along the way so the site grows together with my work.",
        status: "launched",
        date: "2026-03-20",
        tech: "Next.js / TypeScript / Tailwind CSS / Vercel",
        link: "https://xuyunzhe.site",
        previewImages: [
          {
            src: "/previews/personal-site-1.png",
            alt: "Home: Me section and project list",
          },
          {
            src: "/previews/personal-site-2.png",
            alt: "Projects page: ideas and articles",
          },
          {
            src: "/previews/personal-site-3.png",
            alt: "Photography gallery grid",
          },
        ],
      },
      {
        slug: "salary-timer",
        title: "Real-Time Income Calculator",
        summary:
          "If every cent I earn per second showed live on my Mac, I’d feel a lot more motivated at work.",
        content:
          "**Idea:** see your **per-second income** live in the Mac **menu bar**—maybe it cheers you up a little at your desk?\n+1 +1 +1 +1…\n\nThis was my first try at shipping a **real app**, and I picked **macOS** first: no need to fight through all the iOS store and permission hoops up front, so the **cost stayed low**; once it worked, I could **just package and ship**, with the **whole pipeline in sight** and a **smaller chance of nasty surprises**.\n\n**Site roadmap:** if I want people to **download my work** from this website, I should add a **proper upload / distribution** flow, dropping **only a Baidu Netdisk link** feels **pretty undignified**…\n\n**Mar 30:** salary is sensitive data, so it likely fits better on a more private surface like a watch. Next step is to trim the current feature set into a leaner MVP and ship it on Apple Watch.",
        status: "launched",
        date: "2026-03-26",
        previewImages: [
          {
            src: "/previews/salary-timer-preview-1.png",
            alt: "SalaryTimer release files",
          },
          {
            src: "/previews/salary-timer-preview-2.png",
            alt: "SalaryTimer app main panel",
          },
          {
            src: "/previews/salary-timer-preview-3.png",
            alt: "SalaryTimer menu bar amount",
          },
        ],
        tech: "Swift / macOS",
      },
      {
        slug: "next-project-goals",
        title: "Next Project Goals",
        summary:
          "iOS client, WeChat Mini Program, and Apple Watch app—make the core flow work end to end on each surface.",
        content:
          "My next step is to expand the same core capability across multiple surfaces: iOS first, then a WeChat Mini Program, and finally Apple Watch, to prove the same business flow can run end to end everywhere.\n\nPhase one is to lock down shared data models and API contracts so all clients read from the same source of truth. Phase two is lightweight UX adaptation for each platform, without trying to perfect everything in one pass.\n\nThe goal isn’t to go wide all at once; it’s to unblock the minimum viable path first: sign in, view key info, and complete the critical action. Once that path is stable, I can iterate on experience and performance per platform.",
        status: "journal",
        date: "2026-03-28",
      },
      {
        slug: "ios-long-screenshot",
        title: "iOS Long Screenshot Feature",
        summary:
          "I wish iPhone had better long screenshot support; the small goal is to invoke it from Control Center just like normal screenshots.",
        content:
          "The core idea is to make long screenshots as frictionless as regular screenshots: no extra app hopping, no complicated flow, ideally one tap from Control Center.\n\nFor v1, I would focus on a minimum useful path: continuous capture for web/chat content plus quick export. If trigger, stitch, and save work reliably, that already delivers real value.\n\nAfter that, I can iterate on details like preview, partial reorder, export formats, and privacy handling. The goal is not feature bloat, but speed and stability in high-frequency use cases.",
        status: "idea",
        date: "2026-03-30",
      },
      {
        slug: "moments-copy-generator",
        title: "Moments Strong Copy Generator",
        summary:
          "It is hard to write stylish-but-not-cringe Moments captions and match photos each time; I want to upload edited images and auto-generate both a 9-grid layout and copy.",
        content:
          "This project targets the most time-consuming part before posting to Moments: picking photos, arranging the 3x3 grid, and drafting copy. The ideal flow is simple: I upload edited images, and the system handles layout plus caption suggestions.\n\nV1 will focus on two core capabilities: auto-ordering a 9-grid based on image content/color rhythm, and generating caption drafts by scene (travel, daily life, work) with different tones that feel polished but not forced.\n\nInteraction should stay lightweight: upload -> choose style -> generate. Then I can add manual controls like replacing a single image, locking a slot, caption length tuning, and emoji style toggles for better speed and personalization.\n\nThe final key question is how to judge whether a caption-image combo feels “cringe” or actually good. I want this tied to high-quality public content from Douyin/Xiaohongshu creators, so AI can learn style signals (wording, emotional rhythm, visual-text fit) and output a more realistic quality score aligned with platform taste.",
        status: "in_progress",
        date: "2026-03-29",
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
      {
        slug: "personal-website-interactive",
        title: "Interactive Features for the Personal Site",
        summary:
          "Add comments or a guestbook so visitors can share ideas and discuss together.",
        content:
          "The site is mostly one-way today: projects, ideas, and photography. Next I want to add comments or a lightweight guestbook so visitors can leave thoughts, questions, or references—small conversations instead of a broadcast.\n\nFor v1 I’ll favor approaches that are cheap to ship and maintain: a third-party comment embed, or a simple message form with light moderation. The goal is to unblock \"people can talk back\" first, then iterate on UX and safety.\n\nI’m not aiming for a full community; I want a convenient place for like-minded people to connect, similar to classic blog comments.",
        status: "in_progress",
        date: "2026-03-31",
      },
    ],
    articles: [
      {
        title: "The Shortest Path from Idea to Launch",
        summary: "A lightweight workflow from clarification to delivery. Placeholder example, updating.",
        coverSrc: "/previews/article-preview-red-cabin.png",
      },
      {
        title: "Maintaining a Sustainable Idea Library",
        summary: "Capture, filter, and refresh so ideas become executable roadmaps. Placeholder example, updating.",
        coverSrc: "/previews/article-preview-red-cabin.png",
      },
    ],
  },
  gallery: {
    title: "Photography",
    intro: "A collection of travels and moments. More coming soon.",
    photos: [
      {
        src: "/hero-image.png",
        alt: "Polar night in Murmansk",
        caption: "Captured during the polar night in Murmansk",
      },
      {
        src: "/gallery/01-tokyo-nightscape.png",
        alt: "Tokyo at night with Mount Fuji on the horizon",
        caption: "Tokyo night, Fuji silhouette",
      },
      {
        src: "/gallery/02-tokyo-bay-dusk.png",
        alt: "Tokyo Bay at dusk with Tokyo Tower and Rainbow Bridge",
        caption: "Tokyo Bay at dusk",
      },
      {
        src: "/gallery/03-beach-from-above.png",
        alt: "Beach and surf from above",
        caption: "Beach from above",
      },
      {
        src: "/gallery/04-beach-dinner-sunset.png",
        alt: "Open-air dinner on the beach at sunset",
        caption: "Beach dinner at sunset",
      },
      {
        src: "/gallery/05-street-cafe-twilight.png",
        alt: "Street corner cafe at twilight",
        caption: "Street cafe, twilight",
      },
      {
        src: "/gallery/06-winter-road.png",
        alt: "Snow-covered road at dusk",
        caption: "Winter road at dusk",
      },
      {
        src: "/gallery/07-mount-fuji-lake.png",
        alt: "Mount Fuji above a lakeshore",
        caption: "Mount Fuji and the lake",
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
  homeArticleLead: {
    line1: "A thinker who won't just go along | INTP",
    line2: "I like getting to the bottom of things—and I lean toward structure, clever ideas, and things made with care.",
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

/**
 * 从 URL 查询解析界面语言。未传、空值或非 `zh` 时均为 **英文（默认）**。
 */
export function getLang(value?: string | string[] | null): Lang {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "zh" ? "zh" : "en";
}

/**
 * 生成带语言的路由：英文为干净路径（不加 query）；中文为 `?lang=zh`。
 */
export function withLang(path: string, lang: Lang): string {
  if (lang === "en") return path;
  return path.includes("?") ? `${path}&lang=zh` : `${path}?lang=zh`;
}

export function getCopy(lang: Lang): SiteCopy {
  return lang === "en" ? enCopy : zhCopy;
}
