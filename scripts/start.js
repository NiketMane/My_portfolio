import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Ensure Windows System32 and PowerShell paths are in PATH
if (process.platform === 'win32') {
  const sys32 = 'C:\\Windows\\System32';
  const winDir = 'C:\\Windows';
  const sysPaths = [
    sys32,
    winDir,
    `${sys32}\\Wbem`,
    `${sys32}\\WindowsPowerShell\\v1.0`,
    `${sys32}\\OpenSSH`,
  ];
  const envPath = process.env.PATH || '';
  const missing = sysPaths.filter(p => !envPath.toLowerCase().includes(p.toLowerCase()));
  if (missing.length > 0) {
    process.env.PATH = `${missing.join(';')};${envPath}`;
  }
  if (!process.env.ComSpec) {
    process.env.ComSpec = `${sys32}\\cmd.exe`;
  }
}

const vitePath = path.join(rootDir, 'node_modules', 'vite', 'bin', 'vite.js');
const serverPath = path.join(rootDir, 'server', 'server.js');

console.log('🚀 Starting Portfolio Development Environment...');
console.log('📦 Frontend: Vite (React + TypeScript)');
console.log('⚙️  Backend:  Express API (Nodemailer)');
console.log('--------------------------------------------------\n');

const viteProcess = spawn(process.execPath, [vitePath], {
  cwd: rootDir,
  stdio: 'inherit',
  env: process.env,
});

const serverProcess = spawn(process.execPath, [serverPath], {
  cwd: rootDir,
  stdio: 'inherit',
  env: process.env,
});

const handleExit = (code) => {
  try { viteProcess.kill(); } catch (_) {}
  try { serverProcess.kill(); } catch (_) {}
  process.exit(code || 0);
};

process.on('SIGINT', () => handleExit(0));
process.on('SIGTERM', () => handleExit(0));
process.on('exit', () => handleExit(0));

viteProcess.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`Vite exited with code ${code}`);
  }
});

serverProcess.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`Backend server exited with code ${code}`);
  }
});
