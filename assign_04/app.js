import { validateEmployee } from './validation.js';

const employeeForm = document.querySelector('form');
const message = document.querySelector('#message');

// Add a place below each field to display its validation error.
for (const input of employeeForm.elements) {
    if (!input.name) {
        continue;
    }

    const errorText = document.createElement('small');
    errorText.className = 'error';
    errorText.id = input.name + '-error';
    input.setAttribute('aria-describedby', errorText.id);
    input.after(errorText);
}

employeeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const employee = Object.fromEntries(new FormData(employeeForm));
    const errors = validateEmployee(employee);

    for (const input of employeeForm.elements) {
        if (!input.name) {
            continue;
        }

        const errorText = document.getElementById(input.name + '-error');
        errorText.textContent = errors[input.name] || '';
        input.setAttribute('aria-invalid', String(Boolean(errors[input.name])));
    }

    const firstInvalidField = Object.keys(errors)[0];

    if (firstInvalidField) {
        message.textContent = 'Please correct the highlighted fields.';
        employeeForm.elements[firstInvalidField].focus();
    } else {
        message.textContent = 'Validation successful. No employee or password was saved.';
        employeeForm.elements.password.value = '';
    }
});
