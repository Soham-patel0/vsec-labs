import { result, toppers } from './results.js';

// Records are kept in memory, so refreshing the page clears them.
let students = [];

const studentForm = document.querySelector('#form');
const message = document.querySelector('#message');
const tableBody = document.querySelector('#records');
const topperOutput = document.querySelector('#topper');

function displayStudents() {
    tableBody.replaceChildren();

    for (const student of students) {
        const row = document.createElement('tr');
        const values = [
            student.name,
            student.roll,
            student.total.toFixed(2),
            student.percentage.toFixed(2) + '%'
        ];

        for (const value of values) {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.append(cell);
        }

        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('aria-label', 'Delete result for ' + student.name);

        deleteButton.addEventListener('click', function () {
            students = students.filter(item => item !== student);
            displayStudents();
        });

        actionCell.append(deleteButton);
        row.append(actionCell);
        tableBody.append(row);
    }

    displayToppers();
}

function displayToppers() {
    const highestScorers = toppers(students);

    if (highestScorers.length === 0) {
        topperOutput.textContent = 'No results yet.';
        return;
    }

    const names = highestScorers.map(student => student.name).join(', ');
    const percentage = highestScorers[0].percentage.toFixed(2);
    const heading = highestScorers.length > 1 ? 'Toppers (tie): ' : 'Topper: ';

    topperOutput.textContent = heading + names + ' — ' + percentage + '%';
}

studentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(studentForm);
    const name = formData.get('name').trim();
    const roll = formData.get('roll').trim();
    const marks = [
        Number(formData.get('mark0')),
        Number(formData.get('mark1')),
        Number(formData.get('mark2'))
    ];

    try {
        if (!name || !roll) {
            throw new Error('Name and roll number cannot be blank.');
        }

        const duplicateRoll = students.some(student =>
            student.roll.toLowerCase() === roll.toLowerCase()
        );

        if (duplicateRoll) {
            throw new Error('Roll number already exists.');
        }

        const calculatedResult = result(marks);
        students.push({ name, roll, ...calculatedResult });

        message.textContent = 'Result added.';
        studentForm.reset();
        displayStudents();
    } catch (error) {
        message.textContent = error.message;
    }
});
