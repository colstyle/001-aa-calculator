<div align="center">

# 🍽️ AA 计算器

**多人聚餐分账，一秒搞定，支持 Web / Windows / Android 三端。**

![100APP计划](https://img.shields.io/badge/100%20APP%20计划-001%20%2F%20100-ff6b6b?style=flat-square&logo=rocket)
![作者](https://img.shields.io/badge/作者-小石谈什么记-blueviolet?style=flat-square)
![版本](https://img.shields.io/badge/版本-0.1.0-blue?style=flat-square)
![平台](https://img.shields.io/badge/平台-Web%20%7C%20Windows%20%7C%20Android-brightgreen?style=flat-square)
![技术栈](https://img.shields.io/badge/技术栈-Next.js%2016%20%2B%20Tauri%202-blueviolet?style=flat-square)

> 🚀 **100 APP 量产计划** 第 001 个作品 · 作者：[小石谈什么记](#)

</div>

---

## ✨ 功能特点

- 👥 **人均平摊** — 填写总金额，自动除以人数，每人到账金额即刻显示
- ✏️ **自定义金额** — 某人预先垫付了部分？单独填写，其余人均摊剩余差额
- ➕ **动态添加人员** — 随时增减参与者，最少 2 人，人数不设上限
- 📋 **一键复制账单** — 生成格式化账单文本，直接粘贴到微信群
- 🌙 **深色界面** — 精心调校的深色配色，夜晚聚餐结账不刺眼

---

## 🚀 快速开始

### 环境要求

| 工具 | 版本要求 |
|------|---------|
| Node.js | ≥ 20 |
| Rust / Cargo | ≥ 1.80（Windows 桌面端必须） |

### 安装与运行

```bash
# 克隆项目
git clone <仓库地址>
cd 001-aa-calculator

# 安装依赖
npm install

# 浏览器预览（最快）
npm run dev
# → 打开 http://localhost:3000
```

---

## 📦 三端构建

### 🌐 Web 版
```bash
npm run build          # 生成静态文件到 out/
# 部署到 Vercel：vercel --prod
```

### 🖥️ Windows 桌面版（Tauri）
```bash
npm run tauri:dev      # 开发模式，热重载
npm run tauri:build    # 打包 → dist/windows/aa-calculator.exe
```
> 首次编译 Rust 依赖约需 5-10 分钟，后续增量编译秒级完成。

### 📱 Android 版（Capacitor）
```bash
# 前提：已安装 Android Studio + Android SDK
npm run android:sync   # 将 Web 代码同步到 Android 项目
npm run android:open   # 在 Android Studio 中打开

# 命令行构建 APK
cd android
.\gradlew assembleDebug
# APK 输出：android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📂 项目结构

```
001-aa-calculator/
├── src/app/
│   ├── page.tsx          ← 主界面（全部业务逻辑）
│   ├── layout.tsx        ← HTML 模板
│   └── globals.css       ← 设计系统（Design Tokens）
├── src-tauri/            ← Tauri Windows 后端（Rust）
│   ├── src/main.rs
│   ├── tauri.conf.json   ← 窗口配置（480×760）
│   └── capabilities/     ← 安全权限配置
├── android/              ← Capacitor Android 原生项目
│   └── app/src/main/assets/public/  ← Web 代码打包位置
├── dist/                 ← 发布产物收集目录
│   ├── windows/          ← .exe
│   ├── android/          ← .apk
│   └── web/
├── out/                  ← Next.js 静态导出
├── capacitor.config.ts   ← Android 应用 ID 配置
└── package.json
```

---

## 🛠️ 使用说明

1. **输入总金额** — 在顶部输入框填写账单总计（元）
2. **选择分摊方式**
   - `人均平摊`：所有人平等分摊
   - `自定义金额`：为特定人员指定金额，其余人均摊差额
3. **管理人员** — 点击「+ 添加」增加参与者，输入姓名
4. **查看结果** — 金额和人员填写后自动显示分账结果
5. **复制账单** — 点击「📋 复制账单」，格式如下：

```
【AA 账单】总计 ¥200.00
小明：¥66.67
小红：¥66.67
小李：¥66.66
```

---

## 📝 开发日志

| 日期 | 内容 |
|------|------|
| 2026-04-04 | 项目初始化，完成 Web / Windows / Android 三端配置 |

---

## 📄 许可证

MIT License
