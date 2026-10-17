import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateStudent } from '../src/validation.js';

test('reject missing, mistyped and operator fields', () => {
    const s = {
        name: 'Soham', rollNumber: '01', department: 'IT', marks: 80
    };
    assert.equal(validateStudent(s), '');
    assert.equal(validateStudent({
        marks: 0
    }, true), '');
    for (const value of [null, [], {}, {
            ...s, marks: '80'
        }, {
            ...s, marks: 101
        }, {
            ...s, name: ' '
        }, {
            ...s, $set: {
                marks: 2
            }
        }])
        assert.ok(validateStudent(value));
    assert.ok(validateStudent({}, true));
});
