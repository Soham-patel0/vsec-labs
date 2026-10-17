export const departments = ['Computer Engineering', 'IT', 'Mechanical', 'Civil'];

export function validateEmployee(employee) {
    const errors = {};
    const name = (employee.name || '').trim();

    if (name.length < 2 || name.length > 80) {
        errors.name = 'Name must contain 2–80 characters.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(employee.email || '')) {
        errors.email = 'Enter a valid email.';
    }

    // Each lookahead checks for one required character type.
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,128}$/;
    if (!passwordPattern.test(employee.password || '')) {
        errors.password = 'Use 8–128 characters including uppercase, lowercase and a digit.';
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(employee.phone || '')) {
        errors.phone = 'Use exactly 10 digits.';
    }

    if (!departments.includes(employee.department)) {
        errors.department = 'Select a department.';
    }

    return errors;
}
