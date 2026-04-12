const fs = require('fs');
const path = require('path');

/**
 * Deep Researcher Build-Time Sync
 * Copies Angular templates into the backend folder so the researchers
 * can be self-contained on Vercel without bundling the whole repo.
 */

const srcDir = path.join(__dirname, '..', '..', 'frontend', 'src', 'app');
const destDir = path.join(__dirname, '..', 'context_data');

function copyTemplates(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`WARN: Source not found for sync: ${src}`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);
  items.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.statSync(srcPath).isDirectory()) {
      if (!['shared', 'chatbot'].includes(item)) {
        copyTemplates(srcPath, destPath);
      }
    } else if (item.endsWith('.html') || item.endsWith('.ts')) {
      // Small check to avoid copying too much
      const size = fs.statSync(srcPath).size;
      if (size < 50000) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Synced: ${item}`);
      }
    }
  });
}

console.log('--- Initiating Context Sync ---');
copyTemplates(srcDir, destDir);
console.log('--- Context Sync Complete ---');
