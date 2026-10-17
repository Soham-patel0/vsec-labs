# Assignment 4: Employee Registration Form

## Run

From the repository root run `npm start`, then open `http://localhost:3000/assign_04/`. No dependencies are needed for these static pages. Keep this terminal running.

## Implementation

1. Validation separates business rules from DOM interaction. Errors are shown next to fields, linked by aria-describedby, and the first invalid input receives focus.

2. The password rule requires 8–128 characters with uppercase, lowercase and a digit. The phone rule accepts exactly ten digits; department must match the allowed list.

3. Client-side validation improves feedback but a real backend must repeat validation. This demonstration never stores or prints passwords and creates no real employee account.
