const net = require('net');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

/**
 * Checks if a port is available on localhost.
 */
function isPortAvailable(port) {
  const check = (host) => new Promise((resolve) => {
    const server = net.createServer();
    server.on('error', () => resolve(false));
    server.listen({ port, host, exclusive: true }, () => {
      server.close(() => resolve(true));
    });
  });
  
  // QUAD-CHECK: Windows can be picky about which interface is bound.
  // Checking all handles cross-stack conflicts reliably.
  return (async () => {
    const hosts = ['0.0.0.0', '::', '127.0.0.1', '::1'];
    for (const host of hosts) {
      if (!(await check(host))) return false;
    }
    return true;
  })();
}

/**
 * Finds the next available port starting from startPort.
 */
async function getAvailablePort(startPort, name) {
  let port = parseInt(startPort);
  while (!(await isPortAvailable(port))) {
    console.log(`[Port Conflict] ${name} port ${port} is in use. Trying ${port + 1}...`);
    port++;
  }
  return port;
}

/**
 * Manually parses .env.local to avoid dependency on dotenv for the launcher.
 */
function parseEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const env = {};
  content.split(/\r?\n/).forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) return;
    
    const [key, ...valueParts] = trimmedLine.split('=');
    if (key && valueParts.length > 0) {
      env[key.trim()] = valueParts.join('=').trim();
    }
  });
  return env;
}

async function main() {
  const envPath = path.join(process.cwd(), '.env.local');
  const env = parseEnv(envPath);

  const defaultBePort = env.PORT || '3000';
  const defaultFePort = env.FRONTEND_PORT || '4200';

  console.log('Initializing Smart Dev Launcher (Ephemeral Mode)...');

  const finalBePort = await getAvailablePort(defaultBePort, 'Backend');
  const finalFePort = await getAvailablePort(defaultFePort, 'Frontend');

  // Create a temporary proxy configuration for Angular.
  // This avoids permanent edits to .env.local while ensuring the frontend can find the backend.
  const proxyConfig = {
    "/api": {
      "target": `http://localhost:${finalBePort}`,
      "secure": false,
      "changeOrigin": true
    }
  };
  
  const proxyPath = path.join(process.cwd(), 'frontend', 'proxy.conf.json');
  fs.writeFileSync(proxyPath, JSON.stringify(proxyConfig, null, 2));
  console.log(`[Success] Generated temporary proxy: /api -> port ${finalBePort}`);

  // Determine the command based on OS
  const isWindows = process.platform === 'win32';
  const npmCmd = isWindows ? 'npm.cmd' : 'npm';

  const devArgs = [
    'concurrently',
    '--kill-others',
    '--prefix-colors', 'blue,magenta',
    '--names', 'backend,frontend',
    `"npx nodemon backend/bin/www"`,
    `"cd frontend && npx ng serve --port ${finalFePort} --proxy-config proxy.conf.json"`
  ];

  console.log(`Backend: http://localhost:${finalBePort}`);
  console.log(`Frontend: http://localhost:${finalFePort}`);
  console.log('---');

  const child = spawn('npx', devArgs, {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, PORT: finalBePort, FRONTEND_PORT: finalFePort }
  });

  child.on('exit', (code) => {
    // Cleanup proxy file on exit
    try { fs.unlinkSync(proxyPath); } catch (e) {}
    process.exit(code);
  });
}

main().catch(err => {
  console.error('[Error] Launcher Error:', err);
  process.exit(1);
});
