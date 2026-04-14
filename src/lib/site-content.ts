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
  /** 有正文时用于 `/projects/articles/[slug]` */
  slug?: string;
  title: string;
  summary: string;
  coverSrc: string;
  content?: string;
  date?: string;
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
        slug: "claude-managed-agents-thoughts",
        title: "Claude Managed Agents 随想：Harness 的托管化",
        summary:
          "读下来，核心是把最难自行搭建的 **Harness** 交给平台托管；Prompt 调优耗时且难事先验收，若这部分成本能明显下降，日常工作会轻松不少。",
        content:
          "**2026 年 4 月 8 日**，Anthropic 正式发布 **Claude Managed Agents**。我读完材料的理解是：把工程上最重的 **Harness** 层，从自建转为平台托管。\n\n在实际使用里，瓶颈往往不在「模型是否足够强」，而在画布与流程如何编排、Prompt 与 **Skill** 如何配置与迭代——背后是一整套工程链路。其中 Prompt 调优尤其棘手：效果与风险难以事前量化，通常只能依赖上线后的真实反馈，以 **T+1**、**逐 Case** 的方式回收与调整。\n\n新产品形态可以概括为 **Harness 的云服务化**：用自然语言描述需求，由系统组装可运行的 Agent，从而降低从零搭建与联调的成本。\n\n传统路径大致是：人设计流程 → 撰写 Prompt → 接入工具 → 自建 **Harness** → 测试与持续调优。\n\n若托管模式成熟，链路会收束为：一句话描述目标 → 系统生成完整 Agent → 自动运行与交付。对我而言，关键变化在于 **不必再自行搭建 Harness**，这部分工作交由平台侧完成。\n\n官方仍用同一框架拆解：`Agent = Model + Harness`。**Model** 承担推理与生成等基础能力；**Harness** 则覆盖 Prompt 治理、工具与 MCP、记忆与上下文、任务编排、权限与安全、监控与评测等——多是进入生产环境后才会逐项暴露的工程问题。\n\n这与 **Prompt Engineering** 侧重不同：前者偏向「如何写好单轮或单任务指令」；后者偏向「多轮、长周期场景下如何保证稳定运行与可治理」。一个是指令层面的优化，一个是运行与治理层面的建设。",
        status: "journal",
        date: "2026-04-14",
      },
      {
        slug: "recreate-assessment-with-ai",
        title: "用 AI 逆向复刻测试类产品",
        summary:
          "想复刻一个类似 SBTI 的测试，核心逻辑能否让 AI 自主全网搜集、推理并完成代码实现？",
        content:
          "最近在思考：如果我想复刻一个类似 SBTI 等测试类产品，其核心的问卷逻辑、计分规则和结果判定，是否还需要我手动去梳理和编写？\n\n我的设想是：既然这类测试的原理在网上有大量公开信息，能否直接让 AI 充当 Agent，自主去全网搜集相关的百科、资料和讨论，然后通过大模型强大的推理能力，自动逆向还原出整套计分逻辑和判定树。\n\n甚至更进一步，不仅是推理逻辑，连最终的前端问卷页面、背后的算分代码，也全部由 AI 基于推理出的规则直接生成。在这个过程中，人类只负责提出目标（“帮我复刻一个某某测试”），而 AI 完成从“知识检索 -> 逻辑逆向 -> 代码实现”的完整闭环。如果能跑通，这将是 AI 替代传统业务逻辑梳理的一个极佳尝试。",
        status: "idea",
        date: "2026-04-10",
      },
      {
        slug: "personal-website",
        title: "创建个人网站",
        summary:
          "我觉得尝试vibe coding最简单的方式，搭建一个属于自己的空间",
        content:
          "这次做个人网站，我给自己定的目标很简单：先把主页、项目页、摄影集和联系页跑起来，保证能稳定访问，不追求一步到位。\n\n技术栈我选了 Next.js App Router + TypeScript + Tailwind。最先做的是信息结构和导航，然后把中英文文案、想法和文章都收敛到 `site-content.ts`，这样每次改内容我都知道该去哪里改，维护成本低很多。\n\n开发过程里，我基本是「想清楚一段，就实现一段」。本地看效果没问题后就 `git commit` + `git push`，交给 Vercel 自动部署。域名这块我把 `xuyunzhe.site` 和 `www` 都接上，等 DNS 生效后，整个站点就正式可访问了。\n\n复盘下来，这个项目最大的收获不是技术难度，而是把「从想法到上线」这条链路完整走通。现在我的节奏就是：快速上线、小步迭代、持续记录，让网站跟着我的作品一起成长。",
        status: "launched",
        date: "2026-03-16",
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
        date: "2026-03-21",
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
        slug: "salary-timer-2-0",
        title: "工资计时器 2.0",
        summary:
          "路径跑通后，我希望把它从“能用”升级成“能展示给用户的产品”，引入多 agent 协作来做方案、设计和体验升级。",
        content:
          "第一个版本把从想法到上线的路径跑通了，但现在回看，产品还比较简陋：信息结构薄、交互层次少、视觉表达也偏工具化，不太像一个可以放心拿给用户体验和评价的软件。\n\n这次做 2.0，我想重点尝试前端层面的改动：把信息排版、视觉层级、按钮反馈和关键状态做得更清晰，让它看起来不再像一个内部小工具，而是一个可以直接展示给用户的应用。对我来说，这一版的目标是“先把观感和使用感拉到及格线以上”，再继续细化功能。\n\n另外一个重点是把安装下载体验补齐。相比只放一句说明，我希望用户能在页面里直接看到预览图、知道它现在长什么样，并且通过体验链接一键下载安装包。这样从“看到项目”到“真正装上试用”的路径就完整了，产品价值也更容易被感知。",
        status: "launched",
        date: "2026-03-31",
        previewImages: [
          {
            src: "/previews/salary-timer-2-0-preview-1.png",
            alt: "Salary Timer 2.0 preview 1",
          },
          {
            src: "/previews/salary-timer-2-0-preview-2.png",
            alt: "Salary Timer 2.0 preview 2",
          },
          {
            src: "/previews/salary-timer-2-0-preview-3.png",
            alt: "Salary Timer 2.0 preview 3",
          },
          {
            src: "/previews/salary-timer-2-0-preview-4.png",
            alt: "Salary Timer 2.0 preview 4",
          },
        ],
        link: "/downloads/SalaryTimer-Installer-v1.0.pkg",
      },
      {
        slug: "next-project-goals",
        title: "接下来的项目目标",
        summary:
          "ios客户端，微信小程序，apple watch端，每个端口都可以把路径跑通",
        content:
          "接下来我想把同一套核心能力往多端扩展：先做 iOS 客户端，再做微信小程序，最后补上 Apple Watch 端，验证「同一条业务链路」在不同入口都能跑通。\n\n第一阶段会先把数据结构和接口约束定清楚，保证三端看的是同一份核心数据；第二阶段再针对每个端的交互习惯做轻量适配，不追求一次做到最完整。\n\n我的目标不是一次铺得很大，而是先把最小可用路径打通：能登录、能看到核心信息、能完成关键操作。只要这条链路稳定，后续再逐端做体验和性能优化。",
        status: "journal",
        date: "2026-03-24",
      },
      {
        slug: "ios-long-screenshot",
        title: "ios 手机长截图功能",
        summary:
          "如果苹果手机可以更好的支持长截图就好了， 小目标是希望可以和截图一样，在控制中心唤出使用",
        content:
          "这个想法的核心是把「长截图」做成和普通截图一样顺手：不需要额外打开 App，不需要复杂步骤，最好能直接从控制中心一键唤起。\n\n第一版我会先聚焦一个最小可用场景：网页或聊天内容的连续截取 + 快速导出。只要把触发、拼接和保存这三步跑通，就已经有价值。\n\n后续再考虑细节体验，比如截取预览、局部重排、导出格式和隐私处理。目标不是功能堆满，而是让高频场景足够快、足够稳。",
        status: "idea",
        date: "2026-03-28",
      },
      {
        slug: "moments-copy-generator",
        title: "朋友圈strong文案生成",
        summary:
          "每次发朋友圈想一些既不土又很高级的文案都很难，还要搭配图片，这次希望我把所有p好的图片上传上去就帮我自动搭配好9格和文案",
        content:
          "这个项目想解决我每次发朋友圈前最耗时的环节：选图、排 9 宫格、想文案。理想状态是我只负责把修好的图片上传，系统自动完成编排和文案建议。\n\n第一版会先做两个核心能力：一是根据图片内容和色调自动组合 9 格顺序；二是基于场景（旅行、生活、工作）生成多种语气的文案草稿，保证「不土」但又有辨识度。\n\n交互上我希望尽量简单：上传图片 -> 选择风格 -> 一键生成。后续再加手动微调能力，比如替换单张、锁定某一格位置、文案长度控制和 emoji 风格开关，让效率和个性化同时成立。\n\n最后一个关键问题是：怎么判断文案和图片搭配到底「土不土」。这里我希望关联抖音 / 小红书上优质博主的公开内容，提取表达风格、用词密度、情绪节奏和图文匹配关系，让 AI 持续学习并做识别评分，给出更接近真实平台审美的建议。",
        status: "in_progress",
        date: "2026-03-25",
      },
      {
        slug: "human-drive-vibe-coding",
        title: "Human-Drive的实际感受",
        summary: "落地了两个项目之后，对于Vibe coding 的一些想法",
        content:
          "最开始搞vibe coding尝试的时候，因为注册成本这些问题，没选Claude code，选了**Cursor**来做第一次尝试。\n\n第一感觉就是**“兴奋”**，用自然语言交互，能把各种想法变成能看到的项目。但搞了两个实操项目之后，我觉得**工作流程本质上其实没啥变化**。跟在公司里推动需求流程比，省了评审排期这些复杂的流程，就只要**文档交付然后查收**就行，但整个流程还是**人在主导**。\n\n相比于直接和研发进行沟通，我的**试错成本反而少了很多**，更能直观的感受到**每一个字符的思考&开发成本**，我的操作模式逐渐从**“想一步实现一步”**变成**“想清楚——描述清楚”**，果然**当家了才知道柴米油盐贵**。\n\n目前的两个项目还不够复杂，也没有涉及到前端样式美化的短板，处于**门外汉的阶段**，所以下次想要**尝试一些更复杂的idea**，看看是否有新的感受",
        status: "journal",
        date: "2026-03-22",
      },
      {
        slug: "personal-website-interactive",
        title: "个人网站增加互动功能",
        summary:
          "应该增加一些评论，留言的功能，便于大家一起交流",
        content:
          "目前站点主要是单向展示：项目、想法、摄影集。接下来希望加上评论或留言能力，让访客可以留下想法、提问或补充资料，形成轻量的交流。\n\n第一版我会优先考虑实现成本低、维护成本可控的方案：例如基于第三方评论服务，或简单的留言表单与适度审核。重点是先把「能对话」这条链路打通，再迭代体验与风控。\n\n目标和独立博客的留言区类似：不追求大而全的社区，而是给志同道合的人一个方便交流的入口。\n\n更新 01：现在评论的功能已经上线了，但是我觉得还是需要一些情绪价值，比如点赞的功能，下面继续把点赞的功能加上，等作品比较多了再增加「想要」的能力。",
        status: "launched",
        date: "2026-03-29",
      },
      {
        slug: "debug-first-experience",
        title: "debug 初体验",
        summary:
          "功能越加越多之后，一改就容易冒出体验或展示上的问题；我开始习惯先把现象说清楚，再决定从哪里下手收敛。",
        content:
          "给网站加上留言之后，我关心的其实是两件事：**访客能不能顺畅地完成「想说一句话」**，以及 **页面上呈现的信息是否可信、且没有明显 bug**。最开始，留言区域在首屏和后续交互里表现不一致，这时候我先把问题描述成「用户第一眼看到的东西，和真正用起来是否自洽」，而不是急着钻到实现里。最后的选择是：让表单在访客真实使用的那一侧完整出现，避免「首屏一套、点进去又一套」的割裂感。\n\n另一条线是时间：如果评论旁边赫然写着 **Invalid Date**，对访客来说等于「这条信息不可信」。我的判断很简单：**明显错误的内容，不应该原样摆在用户面前。** 先搞清楚第三方服务到底返回了什么，再决定展示什么：能显示人类可读的时间就显示，对不上就宁可留白，也不拿一串错误字符串糊弄过去。\n\n还有几次是「体验成本」的问题：发帖成功后，上面的留言列表会整段闪一下，但新留言本来就要审核，列表里本来也不会立刻多一条——那次刷新几乎没有带来信息增量，只是在消耗注意力，于是拿掉。表单里去掉邮箱，也是减少「要填什么」的犹豫。项目列表上给每条想法加评论数，是为了让我一眼看到**哪些地方真的在产生对话**，更像在做反馈闭环，而不是只看静态介绍。\n\n在多次改动后遇到了一种场景；**我这边已经改好了，怎么线上还是旧的？** 后来才理清：有时是**改完没 commit、没 push**，远端自然还是上一版；有时是**线上已经跟着部署变了，本地预览却像没动**，要先确认是不是**同一套仓库、同一分支**，再用稳定的开发命令起预览，必要时清一次本地构建缓存。还有几次是**端口被占用**，终端自动换到 3001、3002，浏览器还盯着旧的 localhost，误以为没更新。再后来我会把 **本机预览** 和 **正式站点** 当成两条环境——**没走到发布，访客看到的就不是你手里的那一版**；本地和线上对不上时，我先对齐「代码有没有同步、预览是不是这一个进程、地址有没有看错」，再怀疑是不是改错了。\n\n所以这段 debug 对我来说，更像产品经理日常的那套：**先把问题说清楚（影响谁、表现是什么、期望是什么），再决定先动展示、先动数据，还是先动发布链路。** 少做「试一下行不行」的盲动，多做一点「这一步到底解决的是哪一类问题」的自问——算是我自己的一点入门心得。",
        status: "journal",
        date: "2026-03-30",
      },
      {
        slug: "human-ai-collab-iteration-note",
        title: "人机协作方式调整记录",
        summary:
          "工资计时 2.0 之后，我意识到当前的人+AI协作过于复杂，正在调整为更明确的双 Agent 分工。",
        content:
          "工资计时 2.0 这轮做完后，我有一个很明显的感受：现在这种人 + AI 的协作方式还是太复杂了。虽然自然语言沟通很方便，但人在描述想法时，很多关键条件和边界其实并没有说得足够精准，最后常常要在反复来回里补齐。\n\n所以我决定把正在做的另一个项目，直接换一种交互方式：引入 trae 和另一个 agent，做明确分工。\n\n第一个 agent 定位为“产品经理 + 项目经理”：把我的 idea 转成可落地的需求文档，补齐目标、范围、优先级、验收标准，并打通后续上线和部署流程。\n\n第二个 agent 定位为“设计 + 前端”：专注样式美化和交互呈现，把产品体验做得更完整、可展示。\n\n我希望这次调整解决的是协作链路问题：不是继续堆更多对话，而是让每个角色对结果负责，让想法从描述到交付更稳定。",
        status: "journal",
        date: "2026-03-30",
      },
      {
        slug: "vibecoding-inspiration-agent",
        title: "Vibe Coding 灵感收集助手",
        summary:
          "每天在小红书上看大家的vibecoding作品太麻烦，垃圾信息太多，希望做一个每天自动收集和推送vibecoding作品与灵感的agent",
        content:
          "想要做一些agent尝试，每天都在小红书上看大家的vibecoding作品，但是现在觉得收集信息太麻烦了，垃圾信息太多。为什么AI时代还要我自己收集信息找灵感？希望这次做一个每天自动收集vibecoding作品和提供灵感的软件，每天自动给我推送。\n\n核心需求很简单：自动筛选高质量的vibe coding作品，每天定时推送，帮我节省找灵感的时间，让我专注在真正的创作上。",
        status: "in_progress",
        date: "2026-04-01",
      },
    ],
    articles: [
      {
        slug: "personal-website-journey",
        title: "个人网站复盘：从 Vibe Coding 到产品闭环",
        summary:
          "这次我把个人网站当成一个完整产品来做：先上线，再迭代；记录我怎么拆需求、怎么推进、踩过哪些坑。",
        coverSrc: "/previews/personal-site-1.png",
        date: "2026-03-31",
        content:
          "这次做个人网站，我没有把它当作品集页面来随便堆内容，而是当成一个小产品来推进。\n\n我先给自己定了一个很具体的目标：别人点进来，能快速看懂我是谁、我在做什么、有什么在持续更新。这个目标定住以后，很多事情就好判断了。比如第一版不追求花哨，先把首页、项目页、摄影集、联系页跑通；先保证能稳定打开，再谈精细优化。\n\n这段过程，和我在「Human-Drive 的实际感受」里写的一样：**工具很新，但流程本质没变，还是人在主导**。vibe coding 让我从「想一步做一步」慢慢变成「先想清楚，再描述清楚」。写代码确实更快了，但对需求表达和验收标准的要求反而更高。\n\n比如「留言功能上线」听起来只有一句话，真正落地时要回答很多问题：发完留言后用户看到什么？什么时候能看到自己那条？时间显示错了怎么处理？这些如果不提前想清楚，上线后就会全变成线上问题。这个阶段我也更理解了「debug 初体验」里那种感受：很多看起来是技术问题，拆开看其实是展示策略、环境认知和发布节奏的问题。\n\n过程里踩了不少坑，也学到一些实战经验。\n\n第一类坑是**体验一致性**。我遇到过页面首屏和实际交互不一致的情况，用户看到的和我以为交付的不一样。后来我会先从用户视角验收一遍，再去看代码。\n\n第二类坑是**数据展示可信度**。评论时间出现过异常字符串，技术上能解释，但用户不会管原因，只会觉得这个页面不可靠。我的处理原则也变得简单：宁可少展示，也不要展示明显错误的信息。\n\n第三类坑是**发布与环境认知**。有几次我以为改好了，其实没走到发布；也有几次线上更新了，本地却像没变。后来我给自己定了固定排查顺序：先看代码是否同步，再看是不是同一个预览进程，再看地址和端口对不对，最后才怀疑改动本身。\n\n这个版本里我补了评论区、评论数角标、状态筛选这些能力。它们不算大功能，但都在解决同一件事：让网站从「我在展示」变成「我和访客有来有回」。下一步我会按「接下来的项目目标」那条随记去推进——先把同一套核心能力在不同入口跑通，再逐端做轻量适配，不追求一次做到最完整。后面我也会继续按 **想法 -> 上线 -> 观察反馈 -> 再迭代** 的节奏往下做。",
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
      "Hi everyone, I'm XuYunZhe,\nHere you will see some projects I've launched, some of my ideas, small experiments, and some photos.\n\nEvery page and shipped project here comes from my vibe coding practice; I will continue to document my thinking and learning process, as well as those ideas that have nowhere else to go.\n\nAbout my professional info: PM / Growth / Revenue / Experience / AI\nAbout my other info: Photographer (wannabe)",
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
      "Documenting some of my ideas and their implementation progress, and I will summarize some of the implementation processes into articles.",
    ideas: [
      {
        slug: "claude-managed-agents-thoughts",
        title: "Thoughts on Claude Managed Agents: Outsourcing the Harness",
        summary:
          "My reading: the heavy **Harness** layer moves from self-hosted to managed. Prompt tuning is slow and hard to specify upfront—if that burden drops, day-to-day work gets easier.",
        content:
          "On **April 8, 2026**, Anthropic launched **Claude Managed Agents**. After reading the materials, my takeaway is straightforward: the **Harness** layer—often the heaviest part to build yourself—becomes a managed responsibility of the platform.\n\nIn practice, the bottleneck is frequently not raw model capability but engineering around canvases and workflows, **Prompt** and **Skill** configuration, and iteration—an end-to-end build chain. **Prompt** tuning is especially difficult to evaluate before launch; impact and risk are hard to quantify in advance, so teams often iterate **T+1**, **case by case**, from production feedback.\n\nThe product shape is **Harness as a cloud service**: describe the requirement in natural language, and the system assembles a runnable Agent, reducing the cost of greenfield integration and wiring.\n\nThe traditional loop looks like: design the flow → write the Prompt → connect tools → build the **Harness** → test and tune continuously.\n\nIf the managed model matures, the path compresses to: state the goal in one sentence → the system generates a complete Agent → it runs and delivers. For me, the shift is that **I no longer need to build the Harness myself**; that work sits with the platform.\n\nThe official decomposition is unchanged: `Agent = Model + Harness`. **Model** covers reasoning and generation. **Harness** covers Prompt governance, tools and MCP, memory and context, orchestration, permissions and security, monitoring and evaluation—mostly the production concerns that surface after a first successful demo.\n\nThis is distinct from **Prompt Engineering** in emphasis: one focuses on how to phrase instructions for a single turn or task; the other on stable operation and governance across many turns and longer horizons. Instruction tuning versus runtime engineering.",
        status: "journal",
        date: "2026-04-14",
      },
      {
        slug: "recreate-assessment-with-ai",
        title: "Reverse-Engineering Assessments with AI",
        summary:
          "Can an AI agent gather public data, infer the scoring logic, and code a complete clone of an assessment tool like SBTI entirely on its own?",
        content:
          "I've been thinking: if I want to recreate an assessment product like SBTI, do I still need to manually map out and code the questionnaire logic, scoring rules, and result algorithms?\n\nMy hypothesis: Since the principles of these tests are widely available online, could I just prompt an AI Agent to autonomously crawl wikis, papers, and discussions, and use LLM reasoning to reverse-engineer the entire scoring matrix and decision tree?\n\nTaking it a step further—not just inferring the logic, but having the AI directly generate the frontend questionnaire and backend calculation code based on those inferred rules. In this workflow, the human only sets the goal ('clone this test for me'), while AI handles the full loop of 'knowledge retrieval -> logic reverse-engineering -> code implementation'. If this works, it would be a fantastic use case for AI replacing traditional business logic mapping.",
        status: "idea",
        date: "2026-04-10",
      },
      {
        slug: "personal-website",
        title: "Building a Personal Website",
        summary:
          "I think the simplest way to try vibe coding is to build a space of your own.",
        content:
          "For this personal site, I set a simple goal: get four pages live first—Home, Projects, Gallery, and Contact—then improve in small steps instead of chasing perfection on day one.\n\nI chose Next.js App Router + TypeScript + Tailwind. I started with information architecture and navigation, then centralized bilingual copy, ideas, and articles in `site-content.ts`, which made content updates much easier to maintain.\n\nDuring development, my rhythm was straightforward: think through one chunk, implement one chunk. Once local checks looked good, I used `git commit` + `git push` and let Vercel deploy automatically. I also mapped both `xuyunzhe.site` and `www`, so the site became reachable after DNS propagation.\n\nLooking back, the biggest gain wasn’t technical complexity—it was completing the full loop from idea to launch. My current cadence is: ship fast, iterate steadily, and document along the way so the site grows together with my work.",
        status: "launched",
        date: "2026-03-16",
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
        date: "2026-03-21",
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
        slug: "salary-timer-2-0",
        title: "Salary Timer 2.0",
        summary:
          "Now that the core path is proven, I want to evolve it from “usable” to a product I can confidently demo, using multi-agent collaboration for strategy, design, and UX polish.",
        content:
          "V1 proved the idea-to-launch path, but in hindsight the product is still rough: thin information architecture, shallow interaction depth, and a visual layer that still feels like an internal tool rather than something I can confidently present to users.\n\nSo the 2.0 goal is not “add a few features,” but upgrade it into something demo-ready, explainable, and iteration-friendly. My approach is multi-agent collaboration: one agent for product decomposition (user scenarios, core flows, prioritization), one for interaction/UI outputs (key screens, feedback states, edge cases), and one for implementation constraints (technical boundaries, release cadence, risk list).\n\nThe value is that I no longer get a single “code answer”; I get aligned perspectives on why this direction, what to build first, and how to evaluate completion. The expected output is an optimized product plan, reviewable design drafts, and a software version that is genuinely ready to show to users.",
        status: "launched",
        date: "2026-03-31",
        previewImages: [
          {
            src: "/previews/salary-timer-2-0-preview-1.png",
            alt: "Salary Timer 2.0 preview 1",
          },
          {
            src: "/previews/salary-timer-2-0-preview-2.png",
            alt: "Salary Timer 2.0 preview 2",
          },
          {
            src: "/previews/salary-timer-2-0-preview-3.png",
            alt: "Salary Timer 2.0 preview 3",
          },
          {
            src: "/previews/salary-timer-2-0-preview-4.png",
            alt: "Salary Timer 2.0 preview 4",
          },
        ],
        link: "/downloads/SalaryTimer-Installer-v1.0.pkg",
      },
      {
        slug: "next-project-goals",
        title: "Next Project Goals",
        summary:
          "iOS client, WeChat Mini Program, and Apple Watch app—make the core flow work end to end on each surface.",
        content:
          "My next step is to expand the same core capability across multiple surfaces: iOS first, then a WeChat Mini Program, and finally Apple Watch, to prove the same business flow can run end to end everywhere.\n\nPhase one is to lock down shared data models and API contracts so all clients read from the same source of truth. Phase two is lightweight UX adaptation for each platform, without trying to perfect everything in one pass.\n\nThe goal isn’t to go wide all at once; it’s to unblock the minimum viable path first: sign in, view key info, and complete the critical action. Once that path is stable, I can iterate on experience and performance per platform.",
        status: "journal",
        date: "2026-03-24",
      },
      {
        slug: "ios-long-screenshot",
        title: "iOS Long Screenshot Feature",
        summary:
          "I wish iPhone had better long screenshot support; the small goal is to invoke it from Control Center just like normal screenshots.",
        content:
          "The core idea is to make long screenshots as frictionless as regular screenshots: no extra app hopping, no complicated flow, ideally one tap from Control Center.\n\nFor v1, I would focus on a minimum useful path: continuous capture for web/chat content plus quick export. If trigger, stitch, and save work reliably, that already delivers real value.\n\nAfter that, I can iterate on details like preview, partial reorder, export formats, and privacy handling. The goal is not feature bloat, but speed and stability in high-frequency use cases.",
        status: "idea",
        date: "2026-03-28",
      },
      {
        slug: "moments-copy-generator",
        title: "Moments Strong Copy Generator",
        summary:
          "It is hard to write stylish-but-not-cringe Moments captions and match photos each time; I want to upload edited images and auto-generate both a 9-grid layout and copy.",
        content:
          "This project targets the most time-consuming part before posting to Moments: picking photos, arranging the 3x3 grid, and drafting copy. The ideal flow is simple: I upload edited images, and the system handles layout plus caption suggestions.\n\nV1 will focus on two core capabilities: auto-ordering a 9-grid based on image content/color rhythm, and generating caption drafts by scene (travel, daily life, work) with different tones that feel polished but not forced.\n\nInteraction should stay lightweight: upload -> choose style -> generate. Then I can add manual controls like replacing a single image, locking a slot, caption length tuning, and emoji style toggles for better speed and personalization.\n\nThe final key question is how to judge whether a caption-image combo feels “cringe” or actually good. I want this tied to high-quality public content from Douyin/Xiaohongshu creators, so AI can learn style signals (wording, emotional rhythm, visual-text fit) and output a more realistic quality score aligned with platform taste.",
        status: "in_progress",
        date: "2026-03-25",
      },
      {
        slug: "human-drive-vibe-coding",
        title: "Human-Drive: What It Actually Feels Like",
        summary:
          "After shipping two projects, some thoughts on vibe coding.",
        content:
          "When I first tried vibe coding, signup friction and similar issues led me to skip Claude Code and use **Cursor** for the first run.\n\nMy first feeling was **“excitement”**: natural language could turn ideas into something you could see. After two hands-on projects, though, I think **the workflow itself hasn’t really changed**. Compared to pushing requirements at a company, I skip reviews and scheduling—mostly **write the spec and accept delivery**—but **humans still run the whole show**.\n\nVersus talking directly to engineers, my **trial-and-error cost actually dropped**, and I feel **the thinking and implementation cost behind every character** more clearly. My mode shifted from **“think one step, build one step”** to **“think it through—describe it clearly”**—**you only learn what groceries cost when you run the household**.\n\nThese two projects aren’t complex yet and barely touch front-end polish; I’m still **very much a beginner**, so next I want to **try a more ambitious idea** and see if anything feels different.",
        status: "journal",
        date: "2026-03-22",
      },
      {
        slug: "personal-website-interactive",
        title: "Interactive Features for the Personal Site",
        summary:
          "Add comments or a guestbook so visitors can share ideas and discuss together.",
        content:
          "The site is mostly one-way today: projects, ideas, and photography. Next I want to add comments or a lightweight guestbook so visitors can leave thoughts, questions, or references—small conversations instead of a broadcast.\n\nFor v1 I’ll favor approaches that are cheap to ship and maintain: a third-party comment embed, or a simple message form with light moderation. The goal is to unblock \"people can talk back\" first, then iterate on UX and safety.\n\nI’m not aiming for a full community; I want a convenient place for like-minded people to connect, similar to classic blog comments.\n\nUpdate 01: Comments are live now, but I still want more emotional payoff—likes, for example. Next I’ll add likes; once there’s more work on the site, I’ll add a “want it” signal too.",
        status: "launched",
        date: "2026-03-29",
      },
      {
        slug: "debug-first-experience",
        title: "Debug: First Real Session",
        summary:
          "As I shipped more, small changes started surfacing UX or display issues; I learned to name the problem first, then pick where to fix.",
        content:
          "After I added comments, what I really cared about was whether **visitors could finish “leave a note” smoothly**, and whether **what they saw felt trustworthy and free of obvious bugs**. At first, the comment area felt inconsistent between the first paint and what happened after you interacted. I framed it as a product question first: **does the first screen match the actual experience**, not as an implementation puzzle. The direction I chose was to let the form show up fully in the environment where people actually type, so we don’t get two different stories between “landing” and “using.”\n\nTime stamps were another issue: if a comment says **Invalid Date**, that reads as “this information is broken.” My rule became simple: **don’t mirror obvious junk to users.** Understand what the third-party service actually returns, then decide what to show—show a human-readable time when we can; when we can’t, I’d rather show nothing than a scary string.\n\nA few fixes were about **experience cost**: after posting, the whole list flashed, but moderated comments don’t appear instantly anyway—so that refresh added motion without new information. I removed it. Dropping the email field reduced hesitation at submit. On the projects list I added a comment count badge so I can see **where conversations are actually happening**—more like closing the feedback loop than staring at static blurbs.\n\nAfter many iterations I hit a recurring situation: **“I already changed it—why hasn’t the site moved?”** Sometimes I simply **hadn’t committed or pushed**, so production stayed on the previous release. Sometimes **production was already updated** while **local preview looked stale**—then I check I’m on the **same repo and branch**, restart dev with a reliable setup, and occasionally clear the local build cache. A few times **the port shifted** (3001, 3002…) because the default was taken, and I was still staring at the old URL, thinking nothing had changed. I now treat **localhost preview** and the **live domain** as two environments: **if it isn’t shipped, visitors don’t see your version**. When local and production disagree, I first align **code sync, which dev process I’m actually running, and whether I’m on the right address**—before I doubt that I edited the wrong thing.\n\nSo this round of debugging feels closer to day-to-day product work: **state the problem clearly (who it hits, what it looks like, what “good” is), then decide whether to fix presentation, data, or the release path.** Fewer blind “try one line” attempts; more asking **which class of problem this step actually solves**—a small but real step for me.",
        status: "journal",
        date: "2026-03-30",
      },
      {
        slug: "human-ai-collab-iteration-note",
        title: "Adjusting My Human+AI Collaboration Model",
        summary:
          "After Salary Timer 2.0, I realized my current human+AI workflow is too complex, so I am moving to clearer two-agent role ownership.",
        content:
          "After finishing Salary Timer 2.0, one thing became obvious to me: my current human+AI collaboration model is still too complex. Natural-language interaction is convenient, but many critical constraints and boundaries are not described precisely enough in the first pass, so too much effort goes into back-and-forth clarification.\n\nSo for the project I am building now, I am changing the interaction model and introducing trae plus another agent with explicit role ownership.\n\nThe first agent acts as “PM + project manager”: turn my ideas into executable requirement docs, clarify goals/scope/priorities/acceptance criteria, and connect the remaining launch and deployment workflow.\n\nThe second agent acts as “design + frontend”: own visual polish and interaction presentation, and make the product feel complete and demo-ready.\n\nWhat I want to improve is the collaboration chain itself: not more conversations, but clearer responsibility per role, so ideas can move from description to delivery with less drift.",
        status: "journal",
        date: "2026-03-30",
      },
      {
        slug: "vibecoding-inspiration-agent",
        title: "Vibe Coding Inspiration Agent",
        summary:
          "Browsing Xiaohongshu for vibe coding works every day is tedious with too much noise—want an agent that automatically collects and pushes vibe coding works and inspirations daily.",
        content:
          "Want to try some agent experiments. I browse Xiaohongshu every day for people's vibe coding works, but collecting information is too tedious now with too much noise. Why do I still have to collect information and find inspiration manually in the AI era? Hope to build a software that automatically collects vibe coding works and provides inspirations every day, pushing them to me automatically.\n\nThe core need is simple: automatically filter high-quality vibe coding works, push them on a daily schedule, save me time finding inspirations, and let me focus on actual creation.",
        status: "in_progress",
        date: "2026-04-01",
      },
    ],
    articles: [
      {
        slug: "personal-website-journey",
        title: "Personal Site Retrospective: From Vibe Coding to Product Loops",
        summary:
          "Vibe-coding the site from idea to shipped—how I scoped it, ran the loops, hit the walls, and judged “done.”",
        coverSrc: "/previews/personal-site-1.png",
        date: "2026-03-31",
        content:
          "I treated this site as **the first product I fully shipped on my own cadence**: I wrote the requirements, and I also made the cuts. The starting point wasn’t “pick the coolest stack,” but **one sentence**—visitors should know who I am, what I’m building, and how to reach me. Everything else is a trade-off against that.\n\n**Vibe coding, for me, is “think a slice → describe it clearly → accept it.”** I chose **Next.js + TypeScript + Tailwind** and centralized bilingual copy and structure in **`site-content.ts`**—a **single source of truth** for content so I’m not hunting strings across the repo. It’s the same discipline as insisting on one authoritative PRD.\n\nFor v1 I only accepted one outcome: **it loads reliably on the public internet.** After Home, Projects, Gallery, and Contact were wired, I hooked up **Vercel**, the domain, and DNS—and for the first time I closed the loop from “a sentence in my head” to “a screen in someone else’s browser.” The win wasn’t memorizing an API; it was **proving the loop**.\n\nLater the roadmap forked: the ideas area had to carry **ideas, progress, and notes**, and “interactivity” had to become **post, render, moderate** in the real world. I wired **Cusdis** for comments, but the PM work kept going: trust in what we show, whether posting feels shaky, and how we guard third-party payloads—all **acceptance criteria**. That’s where the traps showed up: some bugs were really **first paint vs real use**; some “bad data” was a **presentation rule we never wrote**; sometimes **I thought I shipped** but production didn’t move—then I learned to ask **same code, same release, same environment** before doubting myself.\n\nOn the projects page I added **comment counts** and **status filters** because I needed a **tiny dashboard for myself**—where feedback is, what’s moving. Dev had its own tax: **hot reload** drama (bundler quirks, ports, local vs remote drift)—I treat it as **integration cost** and default to “align first, panic second.”\n\nAt this version I care about three checks: **did I state the problem clearly**, **does the visitor experience pass acceptance**, and **is “live” real delivery or self-congratulation**. This is my **PM-shaped field note** on shipping with vibe coding—I’ll keep iterating, and I’ll keep writing.",
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
    line1: "An independent thinker | INTP",
    line2: "I like to think problems through, and also prefer things with structure, ingenuity, and aesthetic appeal.",
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
