# 🎨 JUST PEAC HOMES - 统一设计系统

## 📋 概述

所有的颜色、字体、尺寸都通过 **Sanity CMS** 统一管理，无需修改代码即可更换整个网站的设计风格。

---

## 🎯 统一命名规范

### ✅ **正确的 className 使用**

所有组件都应该使用以下**统一的** Tailwind 类名：

#### 📝 **文本颜色**

| 用途 | className | CSS 变量 | Sanity 字段 |
|------|-----------|----------|-------------|
| 主要文本（深色） | `text-primary` | `--text-primary` | `colors.text.primary` |
| 次要文本（灰色） | `text-secondary` | `--text-secondary` | `colors.text.secondary` |
| 弱化文本（浅灰） | `text-muted` | `--text-muted` | `colors.text.muted` |
| 标题文本（橄榄绿） | `text-olive` | `--text-olive` | `colors.text.olive` |
| 白色文本（深色背景） | `text-white` | `--text-white` | `colors.text.white` |
| 强调色文本（Clay） | `text-accent-clay` | `--accent-clay` | `colors.accents.clay` |

#### 🎨 **背景颜色**

| 用途 | className | CSS 变量 | Sanity 字段 |
|------|-----------|----------|-------------|
| 主背景（暖白色） | `bg-background-warm` | `--background-warm` | `colors.backgrounds.warm` |
| 次背景（奶油色） | `bg-background-cream` | `--background-cream` | `colors.backgrounds.cream` |
| 纯白背景 | `bg-white` | `--background-white` | `colors.backgrounds.white` |
| 强调色背景（Clay） | `bg-accent-clay` | `--accent-clay` | `colors.accents.clay` |
| 强调色背景（Taupe） | `bg-accent-taupe` | `--accent-taupe` | `colors.accents.taupe` |

#### 🔲 **边框颜色**

| 用途 | className | CSS 变量 | Sanity 字段 |
|------|-----------|----------|-------------|
| 浅色边框 | `border-border-light` | `--border-light` | `colors.borders.light` |
| 中等边框 | `border-border-medium` | `--border-medium` | `colors.borders.medium` |
| 深色边框 | `border-border-dark` | `--border-dark` | `colors.borders.dark` |

---

## ❌ **废弃的命名（请勿使用）**

以下命名方式**不统一**，请替换为上面的标准命名：

| ❌ 废弃 | ✅ 替换为 |
|---------|----------|
| `text-text-primary` | `text-primary` |
| `text-text-secondary` | `text-secondary` |
| `text-text-olive` | `text-olive` |
| `text-color-clay` | `text-accent-clay` |
| `bg-color-clay` | `bg-accent-clay` |
| `bg-surface-stone` | `bg-background-cream` |

---

## 🔧 如何在 Sanity 中修改设计

### 1️⃣ **访问 Sanity Studio**
```
https://justpeachomes.sanity.studio
```

### 2️⃣ **找到 "🎨 Design System"**
在左侧菜单中找到 Design System 单例文档

### 3️⃣ **修改颜色/字体/尺寸**
- **颜色**：直接输入 HEX 颜色值（如 `#B8653E`）
- **字体**：从下拉菜单选择字体
- **尺寸**：输入 CSS 尺寸值（如 `3.5rem` 或 `56px`）

### 4️⃣ **发布更改**
点击 "Publish" 按钮

### 5️⃣ **等待生效**
- 缓存时间：1小时
- 或重启前端服务器立即生效

---

## 📦 组件开发规范

### ✅ **正确示例**

```tsx
// ✅ 使用统一的 className
<h1 className="text-olive">标题</h1>
<p className="text-secondary">段落</p>
<button className="bg-accent-clay text-white">按钮</button>
```

### ❌ **错误示例**

```tsx
// ❌ 不要使用硬编码颜色
<h1 style={{ color: '#2C3E2D' }}>标题</h1>

// ❌ 不要使用不统一的命名
<p className="text-text-secondary">段落</p>

// ❌ 不要使用废弃的命名
<button className="bg-color-clay">按钮</button>
```

---

## 🎯 设计系统架构

```
Sanity CMS (Design System Document)
  ↓
  ↓ getDesignSystem()
  ↓
DesignSystemProvider (Server Component)
  ↓
  ↓ Generates CSS Variables
  ↓
globals.css (:root)
  ↓
  ↓ @theme inline
  ↓
Tailwind CSS Classes
  ↓
  ↓ className="text-olive"
  ↓
React Components
```

---

## 📚 完整的可用类名列表

### 文本颜色
- `text-primary` - 主要文本
- `text-secondary` - 次要文本
- `text-muted` - 弱化文本
- `text-olive` - 标题文本
- `text-white` - 白色文本
- `text-accent-clay` - Clay 强调色
- `text-accent-taupe` - Taupe 强调色

### 背景颜色
- `bg-background-warm` - 暖白背景
- `bg-background-cream` - 奶油背景
- `bg-white` - 纯白背景
- `bg-accent-clay` - Clay 背景
- `bg-accent-clay-dark` - Clay 深色背景
- `bg-accent-taupe` - Taupe 背景

### 边框颜色
- `border-border-light` - 浅色边框
- `border-border-medium` - 中等边框
- `border-border-dark` - 深色边框

---

## 🚀 下一步

1. ✅ 在 Sanity 中创建 Design System 文档
2. ✅ 发布默认配置
3. ✅ 测试修改颜色是否生效
4. 🔄 逐步替换所有组件中的不统一命名

