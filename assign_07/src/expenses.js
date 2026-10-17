export const categories = ['Food', 'Travel', 'Study', 'Bills', 'Other'];

export function validExpense(expense) {
    if (typeof expense.title !== 'string') {
        return false;
    }

    const titleLength = expense.title.trim().length;
    if (titleLength === 0 || titleLength > 80) {
        return false;
    }

    if (!Number.isSafeInteger(expense.cents) || expense.cents <= 0 || expense.cents > 100000000) {
        return false;
    }

    if (!categories.includes(expense.category)) {
        return false;
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (typeof expense.date !== 'string' || !datePattern.test(expense.date)) {
        return false;
    }

    if (Number.isNaN(Date.parse(expense.date))) {
        return false;
    }

    // Reject dates that JavaScript rolls into another month, such as February 30.
    return new Date(expense.date).toISOString().slice(0, 10) === expense.date;
}

export function summarize(expenses) {
    let total = 0;
    const byCategory = {};

    for (const expense of expenses) {
        total += expense.cents;

        if (!byCategory[expense.category]) {
            byCategory[expense.category] = 0;
        }

        byCategory[expense.category] += expense.cents;
    }

    return { total, byCategory };
}

export function loadExpenses(savedText) {
    try {
        const savedExpenses = JSON.parse(savedText);

        if (!Array.isArray(savedExpenses)) {
            return [];
        }

        return savedExpenses.filter(expense =>
            expense && typeof expense.id === 'string' && validExpense(expense)
        );
    } catch {
        return [];
    }
}
