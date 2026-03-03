#!/bin/bash

# 🎨 JUST PEAC HOMES - Design System Audit Script
# 检查所有不统一的 className 使用

echo "========================================="
echo "🎨 Design System Audit"
echo "========================================="
echo ""

echo "📊 统计所有颜色类名使用情况..."
echo ""

# 统计所有文本颜色类名
echo "📝 文本颜色类名："
grep -roh "text-[a-z-]*" app components --include="*.tsx" | sort | uniq -c | sort -rn | grep -E "text-(primary|secondary|muted|olive|white|accent|color|text-)" | head -20

echo ""
echo "🎨 背景颜色类名："
grep -roh "bg-[a-z-]*" app components --include="*.tsx" | sort | uniq -c | sort -rn | grep -E "bg-(background|accent|color|surface|bg-)" | head -20

echo ""
echo "🔲 边框颜色类名："
grep -roh "border-[a-z-]*" app components --include="*.tsx" | sort | uniq -c | sort -rn | grep -E "border-(border|color|accent)" | head -20

echo ""
echo "========================================="
echo "❌ 需要替换的不统一命名："
echo "========================================="
echo ""

echo "🔍 查找 'text-text-*' (应该改为 'text-*'):"
grep -rn "text-text-" app components --include="*.tsx" | wc -l | xargs echo "  找到"
echo "  文件数量"

echo ""
echo "🔍 查找 'text-color-*' (应该改为 'text-accent-*'):"
grep -rn "text-color-" app components --include="*.tsx" | wc -l | xargs echo "  找到"
echo "  文件数量"

echo ""
echo "🔍 查找 'bg-color-*' (应该改为 'bg-accent-*'):"
grep -rn "bg-color-" app components --include="*.tsx" | wc -l | xargs echo "  找到"
echo "  文件数量"

echo ""
echo "🔍 查找 'bg-surface-*' (应该改为 'bg-background-*'):"
grep -rn "bg-surface-" app components --include="*.tsx" | wc -l | xargs echo "  找到"
echo "  文件数量"

echo ""
echo "========================================="
echo "📋 详细列表："
echo "========================================="
echo ""

echo "❌ text-text-* 使用位置："
grep -rn "text-text-" app components --include="*.tsx" | head -10

echo ""
echo "❌ text-color-* 使用位置："
grep -rn "text-color-" app components --include="*.tsx" | head -10

echo ""
echo "❌ bg-color-* 使用位置："
grep -rn "bg-color-" app components --include="*.tsx" | head -10

echo ""
echo "========================================="
echo "✅ 审计完成！"
echo "========================================="

