import { test } from 'node:test';
import assert from 'node:assert/strict';
import { result, toppers } from '../assign_03/results.js';
import { validateEmployee } from '../assign_04/validation.js';
import { readFileSync } from 'node:fs';

test('marks total, decimal percentage, bounds and ties', () => {
    assert.deepEqual(result([90, 80, 70]), {
        total: 240, percentage: 80
    });
    assert.equal(result([0, 0, 0]).total, 0);
    for (const x of [[101, 0, 0], [-1, 0, 0], [NaN, 1, 2], []])
        assert.throws(() => result(x));
    assert.equal(toppers([{
            total: 20
        }, {
            total: 20
        }, {
            total: 1
        }]).length, 2);
    assert.deepEqual(toppers([]), []);
});

test('employee field validation', () => {
    const d = {
        name: 'Soham Patel', email: 'student@example.com', password: 'Learning123', phone: '9876543210', department: 'IT'
    };
    assert.deepEqual(validateEmployee(d), {});
    for (const [key, value] of Object.entries({
        name: ' ', email: 'bad', password: 'weak', phone: '123', department: 'Other'
    }))
        assert.ok(validateEmployee({
            ...d, [key]: value
        })[key]);
});

test('static pages have semantic structure, responsive viewport and required content', () => {
    for (const n of [1, 2, 3, 4]) {
        const html = readFileSync('assign_0' + n + '/index.html', 'utf8');
        for (const token of ['<header', '<main', '<footer', 'name="viewport"', '<label']) {
            if (token === '<label' && n === 1)
                continue;
            assert.ok(html.includes(token), n + ': ' + token);
        }
    }
    const html = readFileSync('assign_02/index.html', 'utf8');
    for (const tag of ['<nav', '<table', '<caption', '<form'])
        assert.ok(html.includes(tag));
});
