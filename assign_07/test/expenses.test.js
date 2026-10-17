import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validExpense, summarize, loadExpenses } from '../src/expenses.js';

const e = {
    id: 'one', title: 'Lunch', cents: 1050, category: 'Food', date: '2026-10-17'
};

test('expense validation, money aggregation and corrupt storage', () => {
    assert.ok(validExpense(e));
    for (const bad of [{
            cents: 0
        }, {
            cents: 1.5
        }, {
            date: '2026-02-30'
        }, {
            category: 'Unknown'
        }, {
            title: ' '
        }])
        assert.ok(!validExpense({
            ...e, ...bad
        }));
    assert.deepEqual(summarize([e, {
            ...e, cents: 25
        }]), {
        total: 1075, byCategory: {
            Food: 1075
        }
    });
    assert.deepEqual(loadExpenses('bad'), []);
    assert.deepEqual(loadExpenses('[null,{}]'), []);
    assert.deepEqual(loadExpenses(JSON.stringify([e])), [e]);
});
