import mongoose from 'mongoose';
import { Student } from './student.js';
import { createApp } from './app.js';

const port = Number(process.env.PORT || 4000);
if (!process.env.MONGODB_URI)
    throw Error('Set MONGODB_URI in .env. See README.');
if (!Number.isInteger(port) || port < 1 || port > 65535)
    throw Error('PORT must be 1–65535.');
try {
    await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000
    });
    await Student.init();
    const server = createApp(Student).listen(port, '127.0.0.1', () => console.log('Student API: http://localhost:' + port));
    async function stop() {
        server.close(async () => {
            await mongoose.disconnect();
            process.exit(0);
        });
    }
    process.on('SIGINT', stop);
    process.on('SIGTERM', stop);
}
catch {
    console.error('Startup failed. Check MongoDB service, .env and database indexes.');
    process.exitCode = 1;
}
