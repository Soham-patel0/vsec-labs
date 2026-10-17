import { spawn } from 'node:child_process';
import { mkdir, access } from 'node:fs/promises';
import { resolve } from 'node:path';

// This helper starts a real local MongoDB process, not an in-memory API mock.
// The prepared Windows copy includes an ignored binary; fresh clones can use
// an installed mongod or set MONGOD_BINARY to its absolute path.
const root = resolve('.');
const dataPath = resolve(root, '.local/db');
await mkdir(dataPath, { recursive: true });
let binary = process.env.MONGOD_BINARY;
if (!binary) {
    const prepared = resolve(root, '.local/mongod.exe');
    try { await access(prepared); binary = prepared; }
    catch { binary = 'mongod'; }
}

let api;
let stopping = false;
const database = spawn(binary, [
    '--dbpath', dataPath, '--bind_ip', '127.0.0.1', '--port', '27017'
], { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });

function stop() {
    if (stopping) return;
    stopping = true;
    api?.kill();
    database.kill();
}

database.on('error', error => {
    console.error('Cannot start MongoDB:', error.message);
    console.error('Install MongoDB or set MONGOD_BINARY; see assign_08/README.md.');
    process.exitCode = 1;
});

let started = false;
database.stdout.on('data', chunk => {
    if (!started && chunk.toString().includes('Waiting for connections')) {
        started = true;
        console.log('Real MongoDB ready; data stays in the ignored .local/db folder.');
        api = spawn(process.execPath, ['src/server.js'], {
            cwd: resolve(root, 'assign_08'), windowsHide: true, stdio: 'inherit',
            env: { ...process.env, MONGODB_URI: 'mongodb://127.0.0.1:27017/vsec_students', PORT: '4000' }
        });
        api.on('exit', code => { if (!stopping) { process.exitCode = code || 0; stop(); } });
    }
});
database.stderr.on('data', chunk => process.stderr.write(chunk));
database.on('exit', code => {
    if (!stopping) {
        console.error('MongoDB stopped with code', code, '. Check that port 27017 is free.');
        process.exitCode = code || 1;
        stop();
    }
});
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
