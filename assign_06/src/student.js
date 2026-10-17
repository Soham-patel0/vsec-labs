export function validateStudent(student) {
    if (!student.name.trim() || !student.roll.trim() || !student.department.trim()) {
        return 'Complete all student details.';
    }

    const marks = Number(student.marks);
    if (student.marks === '' || !Number.isFinite(marks) || marks < 0 || marks > 100) {
        return 'Marks must be between 0 and 100.';
    }

    return '';
}
