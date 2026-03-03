#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

interface HardcodingIssue {
  file: string;
  line: number;
  type: string;
  content: string;
  suggestion?: string;
}

const issues: HardcodingIssue[] = [];

// 递归读取所有 .tsx 文件
function getAllTsxFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next')) {
        getAllTsxFiles(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// 检查文件内容
function checkFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    
    // 1. 检查 HEX 颜色
    const hexMatch = line.match(/#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/g);
    if (hexMatch) {
      issues.push({
        file: filePath,
        line: lineNum,
        type: 'HEX Color',
        content: line.trim(),
        suggestion: '使用 CSS 变量或 Tailwind 颜色类'
      });
    }
    
    // 2. 检查 RGB/RGBA 颜色
    if (line.match(/rgba?\(/)) {
      issues.push({
        file: filePath,
        line: lineNum,
        type: 'RGB/RGBA Color',
        content: line.trim(),
        suggestion: '使用 CSS 变量或 Tailwind 颜色类'
      });
    }
    
    // 3. 检查 text-white (特殊情况)
    if (line.includes('text-white')) {
      issues.push({
        file: filePath,
        line: lineNum,
        type: 'text-white',
        content: line.trim(),
        suggestion: '考虑使用 CSS 变量 var(--text-white) 或语义化类名'
      });
    }
    
    // 4. 检查内联样式
    if (line.includes('style={{')) {
      issues.push({
        file: filePath,
        line: lineNum,
        type: 'Inline Style',
        content: line.trim(),
        suggestion: '使用 Tailwind 类或 CSS 变量'
      });
    }
    
    // 5. 检查硬编码像素值 (10px 以上)
    const pxMatch = line.match(/\d{2,}px/g);
    if (pxMatch) {
      issues.push({
        file: filePath,
        line: lineNum,
        type: 'Hardcoded Pixels',
        content: line.trim(),
        suggestion: '使用 Tailwind spacing 或 CSS 变量'
      });
    }
    
    // 6. 检查 !important
    if (line.includes('className') && line.includes('!')) {
      issues.push({
        file: filePath,
        line: lineNum,
        type: '!important',
        content: line.trim(),
        suggestion: '修复 CSS 优先级，避免使用 !important'
      });
    }
    
    // 7. 检查 Tailwind 任意值
    const arbitraryMatch = line.match(/\b(w|h|p|m|gap|px|py|mx|my|mt|mb|ml|mr|pt|pb|pl|pr)-\[\d+/g);
    if (arbitraryMatch) {
      issues.push({
        file: filePath,
        line: lineNum,
        type: 'Tailwind Arbitrary Value',
        content: line.trim(),
        suggestion: '使用 Tailwind 标准 spacing scale'
      });
    }
    
    // 8. 检查硬编码 font-family
    if (line.includes('font-family:')) {
      issues.push({
        file: filePath,
        line: lineNum,
        type: 'Hardcoded Font',
        content: line.trim(),
        suggestion: '使用 CSS 变量 var(--font-display) 或 var(--font-body)'
      });
    }
  });
}

// 主函数
function main() {
  console.log('🔍 全面检查硬编码 - JUST PEAC HOMES\n');
  console.log('========================================\n');
  
  const frontendDir = path.join(process.cwd(), 'frontend');
  const appDir = path.join(frontendDir, 'app');
  const componentsDir = path.join(frontendDir, 'components');
  
  const files = [
    ...getAllTsxFiles(appDir),
    ...getAllTsxFiles(componentsDir)
  ];
  
  console.log(`📁 检查 ${files.length} 个文件...\n`);
  
  files.forEach(file => checkFile(file));
  
  // 按类型分组
  const byType: Record<string, HardcodingIssue[]> = {};
  issues.forEach(issue => {
    if (!byType[issue.type]) {
      byType[issue.type] = [];
    }
    byType[issue.type].push(issue);
  });
  
  // 输出结果
  Object.keys(byType).sort().forEach(type => {
    console.log(`\n📌 ${type} (${byType[type].length} 个)`);
    console.log('─'.repeat(60));
    byType[type].slice(0, 10).forEach(issue => {
      const relPath = issue.file.replace(process.cwd() + '/', '');
      console.log(`  ${relPath}:${issue.line}`);
      console.log(`    ${issue.content.substring(0, 80)}${issue.content.length > 80 ? '...' : ''}`);
      if (issue.suggestion) {
        console.log(`    💡 ${issue.suggestion}`);
      }
      console.log('');
    });
    if (byType[type].length > 10) {
      console.log(`  ... 还有 ${byType[type].length - 10} 个\n`);
    }
  });
  
  console.log('\n========================================');
  console.log(`✅ 检查完成！共发现 ${issues.length} 个硬编码问题`);
  console.log('========================================\n');
}

main();

