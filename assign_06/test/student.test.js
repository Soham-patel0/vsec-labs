import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateStudent } from '../src/student.js';

test('valid student and boundary marks', () => {
    const d = {
        name: 'Soham', roll: '01', department: 'IT', marks: '0'
    };
    assert.equal(validateStudent(d), '');
    assert.equal(validateStudent({
        ...d, marks: '100'
    }), '');
    for (const marks of ['', '-1', '101', 'abc'])
        assert.ok(validateStudent({
            ...d, marks
        }));
    assert.ok(validateStudent({
        ...d, name: ' '
    }));
});
