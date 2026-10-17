import React, { useState } from 'react';
import StudentForm from './StudentForm.jsx';
import StudentDetails from './StudentDetails.jsx';

export default function App() {
    // App shares this state with the form and the details component.
    const [student, setStudent] = useState(null);

    return (
        <>
            <header>
                <p>VSEC LAB / 06</p>
                <h1>Student Information</h1>
            </header>

            <main>
                <p>Enter a student's details. Information stays until the page is refreshed.</p>
                <div className="grid">
                    <StudentForm onSubmit={setStudent} />
                    <StudentDetails student={student} />
                </div>
            </main>
        </>
    );
}
