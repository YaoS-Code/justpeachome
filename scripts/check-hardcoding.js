const fs = require('fs');
const path = require('path');

function getAllFiles(dir, files = []) {
  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          if (!item.includes('node_modules') && !item.includes('.next')) {
            getAllFiles(fullPath, files);
          }
        } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
          files.push(fullPath);
        }
      } catch (e) {
        // Skip files we can't read
      }
    }
  } catch (e) {
    // Skip directories we can't read
  }
  return files;
}

const issues = {
  textWhite: [],
  inlineStyle: [],
  hexColor: [],
  rgbColor: [],
  hardcodedPx: [],
  important: [],
  arbitraryValue: []
};

const frontendDir = path.join(process.cwd(), 'frontend');
const files = [
  ...getAllFiles(path.join(frontendDir, 'app')),
  ...getAllFiles(path.join(frontendDir, 'components'))
];

console.log(`\n🔍 全面检查硬编码 - JUST PEAC HOMES`);
console.log(`========================================\n`);
console.log(`📁 检查 ${files.length} 个文件...\n`);

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  const relPath = file.replace(process.cwd() + '/', '');
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    
    // 1. text-white
    if (line.includes('text-white')) {
      issues.textWhite.push({ file: relPath, line: lineNum, content: line.trim().substring(0, 100) });
    }
    
    // 2. inline style
    if (line.includes('style={{')) {
      issues.inlineStyle.push({ file: relPath, line: lineNum, content: line.trim().substring(0, 100) });
    }
    
    // 3. HEX color
    if (line.match(/#[0-9A-Fa-f]{3,6}/)) {
      issues.hexColor.push({ file: relPath, line: lineNum, content: line.trim().substring(0, 100) });
    }
    
    // 4. RGB/RGBA
    if (line.match(/rgba?\(/)) {
      issues.rgbColor.push({ file: relPath, line: lineNum, content: line.trim().substring(0, 100) });
    }
    
    // 5. Hardcoded px (10px or more)
    if (line.match(/\d{2,}px/)) {
      issues.hardcodedPx.push({ file: relPath, line: lineNum, content: line.trim().substring(0, 100) });
    }
    
    // 6. !important
    if (line.includes('className') && line.includes('!')) {
      issues.important.push({ file: relPath, line: lineNum, content: line.trim().substring(0, 100) });
    }
    
    // 7. Tailwind arbitrary values
    if (line.match(/\b(w|h|p|m|gap|px|py|mx|my)-\[\d+/)) {
      issues.arbitraryValue.push({ file: relPath, line: lineNum, content: line.trim().substring(0, 100) });
    }
  });
});

// Print results
console.log(`📊 检查结果:\n`);
console.log(`========================================\n`);

const categories = [
  { name: 'text-white 使用', key: 'textWhite', icon: '🎨' },
  { name: '内联样式 style={{}}', key: 'inlineStyle', icon: '📝' },
  { name: 'HEX 颜色硬编码', key: 'hexColor', icon: '🌈' },
  { name: 'RGB/RGBA 颜色', key: 'rgbColor', icon: '🎨' },
  { name: '硬编码像素值', key: 'hardcodedPx', icon: '📏' },
  { name: '!important 使用', key: 'important', icon: '⚠️' },
  { name: 'Tailwind 任意值', key: 'arbitraryValue', icon: '📐' }
];

categories.forEach(cat => {
  const items = issues[cat.key];
  console.log(`${cat.icon} ${cat.name}: ${items.length} 个`);
  if (items.length > 0) {
    console.log(`─`.repeat(60));
    items.slice(0, 5).forEach(item => {
      console.log(`  ${item.file}:${item.line}`);
      console.log(`    ${item.content}`);
    });
    if (items.length > 5) {
      console.log(`  ... 还有 ${items.length - 5} 个`);
    }
    console.log('');
  }
});

console.log(`========================================`);
const total = Object.values(issues).reduce((sum, arr) => sum + arr.length, 0);
console.log(`✅ 检查完成！共发现 ${total} 个硬编码问题\n`);

