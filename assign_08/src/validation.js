export function validateStudent(body, partial = false) {
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return 'Send a JSON object.';
    }

    const allowedFields = ['name', 'rollNumber', 'department', 'marks'];
    const submittedFields = Object.keys(body);
    const hasUnknownField = submittedFields.some(field => !allowedFields.includes(field));

    if (submittedFields.length === 0 || hasUnknownField) {
        return 'Use only name, rollNumber, department and marks.';
    }

    for (const field of allowedFields) {
        // A partial update may omit fields that should stay unchanged.
        if (partial && !(field in body)) {
            continue;
        }

        const value = body[field];

        if (field === 'marks') {
            if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 100) {
                return 'marks must be a number between 0 and 100.';
            }
        } else {
            const maxLength = field === 'rollNumber' ? 30 : 80;
            if (typeof value !== 'string' || !value.trim() || value.trim().length > maxLength) {
                return field + ' is required and must be a short nonblank string.';
            }
        }
    }

    return '';
}
