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
  const file = path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts');
  const rootEnvPath = path.join(__dirname, '..', '..', '.env.local');
  if (!fs.existsSync(file)) return;

  const env = { ...process.env, ...parseEnv(rootEnvPath) };

  const content = `export const environment = {
  production: true,
  apiUrl: '${env.NG_APP_API_URL || env.API_URL || "/api"}',
  stripePublishableKey: '${env.NG_APP_STRIPE_PUBLISHABLE_KEY || env.STRIPE_PUBLISHABLE_KEY || ""}'
};`;

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
