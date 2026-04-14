"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, Download, Monitor, Sparkles, Zap } from "lucide-react";

interface SalaryTimerShowcaseProps {
  lang: "zh" | "en";
  downloadLink?: string;
}

export default function SalaryTimerShowcase({
  lang,
  downloadLink,
}: SalaryTimerShowcaseProps) {
  const [mounted, setMounted] = useState(false);
  const [earnings, setEarnings] = useState(288.5); // 直接使用初始值 288.5，避免在 useEffect 中同步 setState

  useEffect(() => {
    // 异步更新 mounted，避免由于 SSR 不匹配导致的 hydration warning 时报 useEffect 内同步 setState
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // 模拟实时收入计算动画
  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings((prev) => prev + Math.random() * 0.05);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const content = useMemo(() => {
    if (lang === "zh") {
      return {
        title: "工资计时器",
        subtitle: "实时收入可视化工具",
        description: "在 Mac 菜单栏实时查看你的每秒收入，让工作更有动力",
        features: [
          { icon: Monitor, text: "菜单栏实时显示" },
          { icon: Clock, text: "精确到秒的计算" },
          { icon: Zap, text: "轻量无感知运行" },
          { icon: Sparkles, text: "极简优雅设计" },
        ],
        stats: [
          { label: "版本", value: "2.0" },
          { label: "平台", value: "macOS" },
          { label: "大小", value: "12MB" },
        ],
        downloadText: "下载安装包",
        previewAlt: "应用预览",
      };
    }
    return {
      title: "Salary Timer",
      subtitle: "Real-time Income Visualizer",
      description: "Watch your earnings tick in real-time on your Mac menu bar",
      features: [
        { icon: Monitor, text: "Menu Bar Display" },
        { icon: Clock, text: "Second-precision" },
        { icon: Zap, text: "Lightweight" },
        { icon: Sparkles, text: "Minimal Design" },
      ],
      stats: [
        { label: "Version", value: "2.0" },
        { label: "Platform", value: "macOS" },
        { label: "Size", value: "12MB" },
      ],
      downloadText: "Download",
      previewAlt: "App Preview",
    };
  }, [lang]);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat(lang === "zh" ? "zh-CN" : "en-US", {
      style: "currency",
      currency: "CNY",
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    }).format(amount);
  };

  if (!mounted) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20" />
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="relative rounded-[22px] bg-white/95 p-6 backdrop-blur-xl dark:bg-zinc-900/95 sm:p-8">
        {/* 头部区域 */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-xs font-medium text-white">
              <Sparkles className="h-3 w-3" />
              {lang === "zh" ? "已上线" : "Launched"}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              {content.title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {content.subtitle}
            </p>
          </div>

          {/* 实时收入展示 */}
          <div className="relative">
            <div className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-5 text-white shadow-2xl dark:from-zinc-800 dark:to-zinc-700">
              <div className="mb-1 text-xs text-zinc-400">
                {lang === "zh" ? "今日已赚" : "Earned Today"}
              </div>
              <div className="font-mono text-3xl font-bold tabular-nums sm:text-4xl">
                {formatMoney(earnings)}
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {lang === "zh" ? "实时计算中" : "Live"}
              </div>
            </div>
          </div>
        </div>

        {/* 功能特性 */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {content.features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl bg-zinc-50 p-4 transition-all hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
            >
              <feature.icon className="mb-2 h-5 w-5 text-indigo-500 transition-transform group-hover:scale-110" />
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {feature.text}
              </p>
            </div>
          ))}
        </div>

        {/* 应用预览区域 */}
        <div className="mb-8 rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800/50">
          <div className="relative overflow-hidden rounded-xl bg-zinc-900 shadow-2xl">
            {/* 模拟菜单栏 */}
            <div className="flex h-8 items-center justify-between bg-zinc-800 px-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span>⌘</span>
                <span className="rounded bg-zinc-700 px-2 py-0.5 text-emerald-400">
                  +¥0.05/s
                </span>
                <span>🔋</span>
                <span>📶</span>
                <span>{new Date().toLocaleTimeString(lang === "zh" ? "zh-CN" : "en-US", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>
            {/* 应用主界面 */}
            <div className="flex min-h-[200px] items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8">
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div className="mb-2 text-4xl font-bold text-white">
                  {formatMoney(earnings)}
                </div>
                <p className="text-sm text-zinc-400">{content.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex gap-6 text-sm text-zinc-500 dark:text-zinc-400">
            {content.stats.map((stat, index) => (
              <div key={index} className="text-center sm:text-left">
                <div className="text-xs uppercase tracking-wider">{stat.label}</div>
                <div className="font-semibold text-zinc-900 dark:text-white">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {downloadLink && (
            <a
              href={downloadLink}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110 active:scale-95"
            >
              <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              {content.downloadText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
