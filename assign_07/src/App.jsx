import React, { useState } from 'react';
import { categories, validExpense, summarize, loadExpenses } from './expenses.js';

function formatMoney(paise) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(paise / 100);
}

function getSavedExpenses() {
    try {
        return loadExpenses(localStorage.getItem('vsec-expenses'));
    } catch {
        return [];
    }
}

export default function App() {
    const [expenses, setExpenses] = useState(getSavedExpenses);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [message, setMessage] = useState('');

    function saveExpenses(updatedExpenses) {
        setExpenses(updatedExpenses);

        try {
            // localStorage stores strings, so convert the array to JSON.
            localStorage.setItem('vsec-expenses', JSON.stringify(updatedExpenses));
            setMessage('Saved in this browser.');
        } catch {
            setMessage('Browser storage unavailable; changes last until refresh.');
        }
    }

    function addExpense(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = Object.fromEntries(new FormData(form));
        const amountPattern = /^\d+(\.\d{1,2})?$/;

        if (!amountPattern.test(formData.amount)) {
            setMessage('Use an amount with at most two decimal places.');
            return;
        }

        const newExpense = {
            id: crypto.randomUUID(),
            title: formData.title.trim(),
            category: formData.category,
            date: formData.date,
            // The stored cents field represents paise: INR 10.50 becomes 1050.
            cents: Math.round(Number(formData.amount) * 100)
        };

        if (!validExpense(newExpense)) {
            setMessage('Complete all fields; amount must be positive and at most 1,000,000.');
            return;
        }

        saveExpenses([...expenses, newExpense]);
        form.reset();
    }

    function deleteExpense(id) {
        const remainingExpenses = expenses.filter(expense => expense.id !== id);
        saveExpenses(remainingExpenses);
    }

    function clearFilters() {
        setSelectedMonth('');
        setSelectedCategory('');
    }

    const visibleExpenses = expenses.filter(expense => {
        const matchesMonth = !selectedMonth || expense.date.startsWith(selectedMonth);
        const matchesCategory = !selectedCategory || expense.category === selectedCategory;
        return matchesMonth && matchesCategory;
    });

    // ISO dates (YYYY-MM-DD) can be sorted as strings. Latest dates come first.
    visibleExpenses.sort((first, second) => second.date.localeCompare(first.date));

    const summary = summarize(visibleExpenses);
    const average = visibleExpenses.length > 0
        ? Math.round(summary.total / visibleExpenses.length)
        : 0;

    return (
        <>
            <header>
                <p>VSEC LAB / 07</p>
                <h1>Personal Expenses</h1>
            </header>

            <main>
                <p>Track spending in INR. Records are saved locally in this browser.</p>

                <form onSubmit={addExpense}>
                    <div className="grid">
                        <label>
                            Description
                            <input name="title" required maxLength="80" />
                        </label>

                        <label>
                            Amount (INR)
                            <input
                                name="amount"
                                type="number"
                                min="0.01"
                                max="1000000"
                                step="0.01"
                                required
                            />
                        </label>

                        <label>
                            Date
                            <input name="date" type="date" required />
                        </label>

                        <label>
                            Category
                            <select name="category">
                                {categories.map(category => (
                                    <option key={category}>{category}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <button>Add expense</button>
                </form>

                <p role="status">{message}</p>

                <section>
                    <h2>Analyze spending</h2>

                    <div className="grid">
                        <label>
                            Month
                            <input
                                type="month"
                                value={selectedMonth}
                                onChange={event => setSelectedMonth(event.target.value)}
                            />
                        </label>

                        <label>
                            Category
                            <select
                                value={selectedCategory}
                                onChange={event => setSelectedCategory(event.target.value)}
                            >
                                <option value="">All categories</option>
                                {categories.map(category => (
                                    <option key={category}>{category}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <button onClick={clearFilters}>Clear filters</button>
                    <h3>Filtered total: {formatMoney(summary.total)}</h3>
                    <p>{visibleExpenses.length} expenses • Average: {formatMoney(average)}</p>

                    <ul>
                        {Object.entries(summary.byCategory).map(([category, amount]) => (
                            <li key={category}>
                                {category}: {formatMoney(amount)}
                                {' '}({(100 * amount / summary.total).toFixed(1)}%)
                            </li>
                        ))}
                    </ul>
                </section>

                <div className="table-wrap">
                    <table>
                        <caption>Expenses matching filters</caption>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleExpenses.map(expense => (
                                <tr key={expense.id}>
                                    <td>{expense.date}</td>
                                    <td>{expense.title}</td>
                                    <td>{expense.category}</td>
                                    <td>{formatMoney(expense.cents)}</td>
                                    <td>
                                        <button
                                            aria-label={'Delete ' + expense.title}
                                            onClick={() => deleteExpense(expense.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {visibleExpenses.length === 0 && (
                        <p>No expenses match. Add an expense or clear the filters.</p>
                    )}
                </div>
            </main>
        </>
    );
}
