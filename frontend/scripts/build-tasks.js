const fs = require('fs');
const path = require('path');

function replaceEnv() {
  const file = path.join(__dirname, '..', 'src', 'app', 'services', 'api.service.ts');
  if (!fs.existsSync(file)) return;

  let content = fs.readFileSync(file, 'utf8');
  content = content
    .replace('__PRODUCTION__', process.env.PRODUCTION || 'false')
    .replace('__PROD_BACKEND_URL__', process.env.PROD_BACKEND_URL || '')
    .replace('__PROD_FRONTEND_URL__', process.env.PROD_FRONTEND_URL || '');

  fs.writeFileSync(file, content);
}

function normalizeOutput() {
  const src = path.join(__dirname, '..', 'dist', 'frontend', 'browser');
  const dest = path.join(__dirname, '..', 'dist', 'frontend');

  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
    fs.rmSync(src, { recursive: true });
  }
}

const task = process.argv[2];
if (task === 'prebuild') replaceEnv();
else if (task === 'postbuild') normalizeOutput();
