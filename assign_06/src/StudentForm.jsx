import React, { useState } from 'react';
import { validateStudent } from './student.js';

export default function StudentForm({ onSubmit }) {
    const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const student = Object.fromEntries(new FormData(form));
        const validationMessage = validateStudent(student);
        setError(validationMessage);

        if (validationMessage) {
            return;
        }

        // Send the valid student to the parent component.
        onSubmit({
            name: student.name.trim(),
            roll: student.roll.trim(),
            department: student.department.trim(),
            marks: Number(student.marks)
        });

        form.reset();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Enter student details</h2>

            <label>
                Name
                <input name="name" required maxLength="80" />
            </label>

            <label>
                Roll number
                <input name="roll" required maxLength="30" />
            </label>

            <label>
                Department
                <input name="department" required maxLength="80" />
            </label>

            <label>
                Marks (out of 100)
                <input name="marks" type="number" min="0" max="100" step="0.01" required />
            </label>

            <button>Show student</button>
            <p role="status">{error}</p>
        </form>
    );
}
