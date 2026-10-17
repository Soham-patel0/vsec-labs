import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';

const root = resolve('.');

const types = {
    '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript'
};
http.createServer(async (req, res) => {
    try {
        let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        // Serve React production output under the same menu as the static labs.
        pathname = pathname.replace(/^\/(assign_0[67])(?=\/|$)/, '/$1/dist');
        if (pathname.split('/').some(part => part.startsWith('.'))) {
            res.writeHead(403).end();
            return;
        }
        const path = resolve(root, '.' + pathname);
        if (path !== root && !path.startsWith(root + sep)) {
            res.writeHead(403).end();
            return;
        }
        const file = extname(path) ? path : resolve(path, 'index.html');
        res.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
        res.end(await readFile(file));
    }
    catch {
        res.writeHead(404).end('Page not found');
    }
}).listen(3000, '127.0.0.1', () => console.log('Open http://localhost:3000/ for the assignment menu'));
