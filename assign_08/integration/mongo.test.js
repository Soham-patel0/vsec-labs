import { test } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import request from 'supertest';
import { Student } from '../src/student.js';
import { createApp } from '../src/app.js';

test('real MongoDB persistence, duplicate index and CRUD', async () => {
    assert.ok(process.env.MONGODB_URI, 'Set MONGODB_URI before integration test');
    await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000
    });
    const roll = 'TEST-' + Date.now();
    try {
        await Student.init();
        const app = createApp(Student), data = {
            name: 'Integration Test', rollNumber: roll, department: 'IT', marks: 80
        };
        const created = await request(app).post('/api/students').send(data).expect(201);
        const id = created.body._id;
        assert.ok(await Student.findById(id));
        await request(app).post('/api/students').send(data).expect(409);
        await request(app).get('/api/students/' + id).expect(200);
        await request(app).patch('/api/students/' + id).send({
            marks: 90
        }).expect(200);
        assert.equal((await Student.findById(id)).marks, 90);
        await request(app).delete('/api/students/' + id).expect(204);
        await request(app).get('/api/students/' + id).expect(404);
    }
    finally {
        await Student.deleteMany({
            rollNumber: roll
        });
        await mongoose.disconnect();
    }
});
