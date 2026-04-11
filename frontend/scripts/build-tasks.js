const fs = require('fs');
const path = require('path');

function parseEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const env = {};
  content.split(/\r?\n/).forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) return;
    const [key, ...parts] = trimmedLine.split('=');
    if (key && parts.length > 0) env[key.trim()] = parts.join('=').trim().replace(/^"(.*)"$/, '$1');
  });
  return env;
}

function replaceEnv() {
  const file = path.join(__dirname, '..', 'src', 'app', 'services', 'api.service.ts');
  const rootEnvPath = path.join(__dirname, '..', '..', '.env.local');
  if (!fs.existsSync(file)) return;

  const env = { ...process.env, ...parseEnv(rootEnvPath) };

  let content = fs.readFileSync(file, 'utf8');
  content = content
    .replace('__PRODUCTION__', env.PRODUCTION || 'false')
    .replace('__PROD_BACKEND_URL__', env.PROD_BACKEND_URL || '')
    .replace('__PROD_FRONTEND_URL__', env.PROD_FRONTEND_URL || '');

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
