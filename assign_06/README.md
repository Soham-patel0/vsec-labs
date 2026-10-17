# Assignment 6: React Student Information

## Run

From the repository root run `npm install`, then `npm run dev -w assign_06`. Open the URL printed by Vite. To build: `npm run build -w assign_06`.

## Implementation

1. StudentForm collects details; StudentDetails displays submitted data. App owns the student state shared by these components.

2. Props pass data down. The onSubmit callback passes the new student up to App, which updates state and triggers a render.

3. The form is uncontrolled: FormData reads its values on submit. The displayed record is controlled by React state and resets on reload.
