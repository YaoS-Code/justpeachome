#!/bin/bash

# 🎨 JUST PEAC HOMES - Design System Fix Script
# 自动替换所有不统一的 className

echo "========================================="
echo "🔧 Design System Auto-Fix"
echo "========================================="
echo ""

# 备份提示
echo "⚠️  建议先提交当前代码到 Git，以便回滚"
echo ""
read -p "是否继续？(y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ 已取消"
    exit 1
fi

echo ""
echo "🔄 开始替换..."
echo ""

# 1. 替换 text-text-* → text-*
echo "📝 修复 text-text-primary → text-primary"
find app components -name "*.tsx" -type f -exec sed -i '' 's/text-text-primary/text-primary/g' {} +

echo "📝 修复 text-text-secondary → text-secondary"
find app components -name "*.tsx" -type f -exec sed -i '' 's/text-text-secondary/text-secondary/g' {} +

echo "📝 修复 text-text-muted → text-muted"
find app components -name "*.tsx" -type f -exec sed -i '' 's/text-text-muted/text-muted/g' {} +

echo "📝 修复 text-text-olive → text-olive"
find app components -name "*.tsx" -type f -exec sed -i '' 's/text-text-olive/text-olive/g' {} +

echo "📝 修复 text-text-white → text-white"
find app components -name "*.tsx" -type f -exec sed -i '' 's/text-text-white/text-white/g' {} +

echo "📝 修复 text-text-tertiary → text-muted"
find app components -name "*.tsx" -type f -exec sed -i '' 's/text-text-tertiary/text-muted/g' {} +

echo "📝 修复 text-text-accent → text-accent-clay"
find app components -name "*.tsx" -type f -exec sed -i '' 's/text-text-accent/text-accent-clay/g' {} +

# 2. 替换 text-color-* → text-accent-*
echo "📝 修复 text-color-clay → text-accent-clay"
find app components -name "*.tsx" -type f -exec sed -i '' 's/text-color-clay/text-accent-clay/g' {} +

echo "📝 修复 text-color-taupe → text-accent-taupe"
find app components -name "*.tsx" -type f -exec sed -i '' 's/text-color-taupe/text-accent-taupe/g' {} +

# 3. 替换 bg-color-* → bg-accent-*
echo "🎨 修复 bg-color-clay → bg-accent-clay"
find app components -name "*.tsx" -type f -exec sed -i '' 's/bg-color-clay/bg-accent-clay/g' {} +

echo "🎨 修复 bg-color-taupe → bg-accent-taupe"
find app components -name "*.tsx" -type f -exec sed -i '' 's/bg-color-taupe/bg-accent-taupe/g' {} +

echo "🎨 修复 bg-color-divider → bg-border-light"
find app components -name "*.tsx" -type f -exec sed -i '' 's/bg-color-divider/bg-border-light/g' {} +

# 4. 替换 bg-surface-* → bg-background-*
echo "🎨 修复 bg-surface-stone → bg-background-cream"
find app components -name "*.tsx" -type f -exec sed -i '' 's/bg-surface-stone/bg-background-cream/g' {} +

echo "🎨 修复 bg-surface-warm → bg-background-warm"
find app components -name "*.tsx" -type f -exec sed -i '' 's/bg-surface-warm/bg-background-warm/g' {} +

echo "🎨 修复 bg-surface-white → bg-white"
find app components -name "*.tsx" -type f -exec sed -i '' 's/bg-surface-white/bg-white/g' {} +

# 5. 替换其他不统一的命名
echo "🔲 修复 border-color-border → border-border-light"
find app components -name "*.tsx" -type f -exec sed -i '' 's/border-color-border/border-border-light/g' {} +

echo "🎨 修复 bg-bg-* → bg-background-*"
find app components -name "*.tsx" -type f -exec sed -i '' 's/bg-bg-tertiary/bg-background-cream/g' {} +
find app components -name "*.tsx" -type f -exec sed -i '' 's/bg-bg-secondary/bg-background-cream/g' {} +
find app components -name "*.tsx" -type f -exec sed -i '' 's/bg-bg-warm/bg-background-warm/g' {} +
find app components -name "*.tsx" -type f -exec sed -i '' 's/bg-bg-primary/bg-white/g' {} +

echo ""
echo "========================================="
echo "✅ 替换完成！"
echo "========================================="
echo ""

# 统计结果
echo "📊 替换后的统计："
echo ""
echo "text-text-* 剩余："
grep -r "text-text-" app components --include="*.tsx" 2>/dev/null | wc -l | xargs echo "  "

echo "text-color-* 剩余："
grep -r "text-color-" app components --include="*.tsx" 2>/dev/null | wc -l | xargs echo "  "

echo "bg-color-* 剩余："
grep -r "bg-color-" app components --include="*.tsx" 2>/dev/null | wc -l | xargs echo "  "

echo "bg-surface-* 剩余："
grep -r "bg-surface-" app components --include="*.tsx" 2>/dev/null | wc -l | xargs echo "  "

echo ""
echo "🎉 完成！请检查代码并测试网站"

