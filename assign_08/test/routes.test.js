import { test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';

const id = '0123456789abcdef01234567', data = {
    name: 'Soham', rollNumber: '01', department: 'IT', marks: 80
};

test('HTTP CRUD contract using an explicitly mocked model', async () => {
    let record = null;
    const model = {
        create: async (d) => {
            if (record)
                throw {
                    code: 11000
                };
            return record = {
                ...d, _id: id
            };
        }, find: () => ({
            sort: () => ({
                limit: async () => record ? [record] : []
            })
        }), findById: async () => record, findByIdAndUpdate: async (i, update) => record ? record = {
            ...record, ...update.$set
        } : null, findByIdAndDelete: async () => {
            const old = record;
            record = null;
            return old;
        }
    };
    const app = createApp(model);
    await request(app).post('/api/students').send({}).expect(400);
    await request(app).get('/api/students/nope').expect(400);
    await request(app).get('/api/students/' + id).expect(404);
    const created = await request(app).post('/api/students').send(data).expect(201);
    assert.equal(created.body._id, id);
    await request(app).post('/api/students').send(data).expect(409);
    assert.equal((await request(app).get('/api/students').expect(200)).body.length, 1);
    await request(app).get('/api/students/' + id).expect(200);
    assert.equal((await request(app).patch('/api/students/' + id).send({
        marks: 90
    }).expect(200)).body.marks, 90);
    await request(app).patch('/api/students/' + id).send({
        marks: -1
    }).expect(400);
    await request(app).delete('/api/students/' + id).expect(204);
    await request(app).get('/api/students/' + id).expect(404);
    await request(app).delete('/api/students/' + id).expect(404);
    await request(app).get('/missing').expect(404);
    await request(app).post('/api/students').set('Content-Type', 'application/json').send('{broken').expect(400);
});
