# 技术架构文档

**项目名称**：朋友圈文案生成器  
**版本**：v1.0 (MVP)  
**日期**：2026-03-31

---

## 1. 技术选型

### 1.1 前端技术栈

| 技术 | 选型 | 版本 | 说明 |
|------|------|------|------|
| 跨端框架 | Taro | 3.x | 京东出品，支持多端（微信小程序、H5等） |
| UI 框架 | React | 18.x | Taro 内置 |
| 开发语言 | TypeScript | 5.x | 类型安全 |
| 样式方案 | Tailwind CSS | 3.x | 原子化 CSS，开发效率高 |
| UI 组件库 | NutUI | 4.x | 京东出品，Taro 友好 |

### 1.2 AI 服务选型

| 能力 | 选型 | 说明 |
|------|------|------|
| 图片理解 | 通义千问 Vision / GPT-4V | 识别图片内容、场景、主色调 |
| 文案生成 | 通义千问 / GPT-3.5 / Claude | 根据场景和风格生成文案 |

### 1.3 开发工具

| 工具 | 说明 |
|------|------|
| 微信开发者工具 | 小程序调试、预览、上传 |
| VS Code | 代码编辑 |
| Git | 版本控制 |

---

## 2. 项目目录结构

```
moments-copy-miniprogram/
├── config/                 # Taro 配置
│   ├── dev.js             # 开发环境配置
│   └── prod.js            # 生产环境配置
├── src/
│   ├── pages/             # 页面
│   │   ├── index/         # 首页 - 选择图片
│   │   │   ├── index.tsx
│   │   │   └── index.scss
│   │   └── editor/        # 编辑页 - 9宫格 + 文案
│   │       ├── editor.tsx
│   │       └── editor.scss
│   ├── components/        # 组件
│   │   ├── ImageGrid/     # 图片网格（选择/预览）
│   │   ├── NineGrid/      # 9宫格预览
│   │   ├── CopyCard/      # 文案卡片
│   │   └── SceneSelector/ # 场景选择器
│   ├── services/          # 服务层
│   │   ├── ai.ts          # AI 服务封装
│   │   └── storage.ts     # 本地存储封装
│   ├── utils/             # 工具函数
│   │   ├── image.ts       # 图片处理（压缩、主色调提取）
│   │   ├── sort.ts        # 9宫格排序算法
│   │   └── copy.ts        # 文案相关工具
│   ├── types/             # TypeScript 类型定义
│   │   ├── image.ts
│   │   ├── copy.ts
│   │   └── user.ts
│   ├── constants/         # 常量
│   │   ├── scenes.ts      # 场景配置
│   │   ├── styles.ts      # 风格配置
│   │   └── api.ts         # API 配置
│   ├── app.tsx            # 应用入口
│   └── app.scss           # 全局样式
├── project.config.json    # 微信小程序项目配置
├── package.json
├── tsconfig.json
└── README.md
```

---

## 3. 核心模块设计

### 3.1 图片处理模块 (utils/image.ts)

**功能**：
- 图片压缩（减少上传体积）
- 提取主色调（用于排序）
- 图片尺寸获取

```typescript
export interface ImageInfo {
  tempFilePath: string;
  width: number;
  height: number;
  dominantColor?: string;  // HEX 格式，如 "#FF5733"
}

export async function compressImage(filePath: string): Promise<string>;
export async function getImageInfo(filePath: string): Promise<ImageInfo>;
export async function extractDominantColor(filePath: string): Promise<string>;
```

### 3.2 9宫格排序模块 (utils/sort.ts)

**排序策略**：

1. **主图识别**：选择最突出的一张（画面占比大、颜色鲜明）放在中间（位置5）
2. **色调过渡**：按 HSL 色彩空间排序，实现视觉渐变
3. **内容平衡**：避免相似内容集中

```typescript
export interface SortableImage {
  id: string;
  dominantColor?: string;
  aspectRatio: number;  // 宽高比
  score?: number;       // 主图评分
}

export function sortNineGrid(images: SortableImage[]): string[];
```

### 3.3 AI 服务模块 (services/ai.ts)

**接口封装**：

```typescript
export interface SceneRecognitionResult {
  scene: 'travel' | 'life' | 'work' | 'other';
  confidence: number;
  description: string;  // 图片内容描述
}

export interface CopyGenerationResult {
  copies: Array<{
    style: 'simple' | 'literary' | 'humorous' | 'heartfelt';
    content: string;
  }>;
}

export async function recognizeScene(imagePaths: string[]): Promise<SceneRecognitionResult>;
export async function generateCopy(
  scene: string,
  imageDescription: string,
  styles: string[]
): Promise<CopyGenerationResult>;
```

---

## 4. API 设计

### 4.1 第三方 AI API 调用

**图片理解（Vision API）**

```
请求：
POST /vision/analyze
{
  "images": ["base64_encoded_image_1", "base64_encoded_image_2"],
  "prompt": "分析这组图片，识别场景（旅行/生活/工作/其他），并给出图片内容描述"
}

响应：
{
  "scene": "travel",
  "confidence": 0.92,
  "description": "一组海边风景照片，包含日落、沙滩、海浪等元素"
}
```

**文案生成（LLM API）**

```
请求：
POST /llm/generate
{
  "prompt": "根据以下信息生成4种不同风格的朋友圈文案：\n场景：旅行\n图片描述：海边风景，日落，沙滩\n风格：简洁、文艺、幽默、走心\n要求：每种风格1-2句话，适合朋友圈",
  "max_tokens": 500
}

响应：
{
  "copies": [
    { "style": "simple", "content": "海边日落，好美。" },
    { "style": "literary", "content": "海浪追逐着落日，我站在沙滩上，收集了一整片黄昏。" },
    { "style": "humorous", "content": "为了拍这张日落，我蹲在沙滩上喂了半小时蚊子，值了！" },
    { "style": "heartfelt", "content": "这一刻的宁静，想和你分享。" }
  ]
}
```

---

## 5. 状态管理

使用 React Context + useState 进行轻量级状态管理：

```typescript
// src/contexts/AppContext.tsx
import { createContext, useContext, useState } from 'react';

interface AppState {
  selectedImages: ImageInfo[];
  currentScene: string;
  generatedCopies: CopyItem[];
  selectedCopy: CopyItem | null;
}

interface AppContextType {
  state: AppState;
  actions: {
    setSelectedImages: (images: ImageInfo[]) => void;
    setCurrentScene: (scene: string) => void;
    setGeneratedCopies: (copies: CopyItem[]) => void;
    setSelectedCopy: (copy: CopyItem | null) => void;
    reset: () => void;
  };
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
```

---

## 6. 数据存储

使用微信小程序本地缓存：

```typescript
// src/services/storage.ts
const STORAGE_KEYS = {
  USER_PREFERENCE: 'user_preference',
  USAGE_HISTORY: 'usage_history',
};

export async function saveUserPreference(pref: UserPreference): Promise<void>;
export async function getUserPreference(): Promise<UserPreference | null>;
export async function addUsageHistory(record: UsageRecord): Promise<void>;
```

---

## 7. 性能优化

### 7.1 图片优化

- 上传前压缩图片（长边限制 1920px）
- 使用 WebP 格式（小程序支持）
- 图片懒加载

### 7.2 AI 调用优化

- 图片先压缩再转 base64
- 合并多次调用（一次请求完成场景识别 + 文案生成）
- 本地缓存常用场景的文案模板

### 7.3 用户体验优化

- 加载状态提示
- 错误重试机制
- 离线友好（基础功能可用）

---

## 8. 安全考虑

- API Key 不暴露在前端（后续可考虑自建后端代理）
- 图片不上传到服务器，仅在本地处理
- 用户数据本地存储，不上传云端
- 内容安全：文案生成时增加过滤规则

---

## 9. 部署流程

### 9.1 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务
npm run dev:weapp

# 使用微信开发者工具打开项目根目录
```

### 9.2 生产环境

```bash
# 构建生产版本
npm run build:weapp

# 在微信开发者工具中上传代码
# 提交审核
```

---

## 10. 监控与埋点（可选，MVP 暂不实现）

- 用户操作流程埋点
- 错误监控
- 性能监控
- 用户反馈收集
