export function result(marks) {
    if (!Array.isArray(marks) || marks.length !== 3) {
        throw new Error('Enter three marks between 0 and 100.');
    }

    let total = 0;

    for (const mark of marks) {
        if (typeof mark !== 'number' || !Number.isFinite(mark) || mark < 0 || mark > 100) {
            throw new Error('Enter three marks between 0 and 100.');
        }
        total += mark;
    }

    // Three subjects, each out of 100, give a maximum total of 300.
    const percentage = total / 3;
    return { total, percentage };
}

export function toppers(students) {
    if (students.length === 0) {
        return [];
    }

    let highestTotal = students[0].total;

    for (const student of students) {
        if (student.total > highestTotal) {
            highestTotal = student.total;
        }
    }

    // Keep every student who shares the highest total.
    return students.filter(student => student.total === highestTotal);
}
