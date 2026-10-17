import React from 'react';

export default function StudentDetails({ student }) {
    return (
        <section aria-live="polite">
            <h2>Student details</h2>

            {student ? (
                <dl>
                    <dt><strong>Name</strong></dt>
                    <dd>{student.name}</dd>

                    <dt><strong>Roll number</strong></dt>
                    <dd>{student.roll}</dd>

                    <dt><strong>Department</strong></dt>
                    <dd>{student.department}</dd>

                    <dt><strong>Marks</strong></dt>
                    <dd>{student.marks} / 100</dd>
                </dl>
            ) : (
                <p>Submit the form to display a student.</p>
            )}
        </section>
    );
}
