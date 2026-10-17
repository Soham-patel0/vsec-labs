# Reading the code and preparing for the oral

Start with one assignment at a time. Run it, read the main file, and explain what happens when you click a button or submit a form. Use your own words rather than memorizing a script.

## Which files should I open?

| Assignment | Read these files first | Be able to demonstrate |
|---|---|---|
| 01 | `index.html`, `style.css` | Explain header, nav, main and footer; resize the page. |
| 02 | `index.html`, then `app.js` | Explain a table, labels and the form submit event. |
| 03 | `results.js`, then `app.js` | Calculate a result by hand, add a student, show a tie, delete a record. |
| 04 | `validation.js`, then `app.js` | Explain each field rule and show invalid/valid input. |
| 05 | `README.md` | Run and explain your own Git commands. |
| 06 | `src/App.jsx`, `StudentForm.jsx`, `StudentDetails.jsx` | Show how a submitted student moves from form to parent state to display. |
| 07 | `src/expenses.js`, then `src/App.jsx` | Add an expense, filter it, calculate its category total and refresh. |
| 08 | `src/student.js`, `validation.js`, `app.js`, `server.js` | Trace one POST request from JSON input to MongoDB and response. |

Read the source files listed above. A generated `dist` folder may contain compressed one-line code after a production build; those files are optimized for browsers. The source is the version to study and review.

## JavaScript ideas used here

- `const`: a variable binding that is not reassigned. Objects and arrays held by it can still change.
- `let`: a variable binding that may be reassigned, such as the student array after deletion.
- `event.preventDefault()`: prevents a form submission from reloading/navigating the page.
- `FormData`: reads named form fields. Numeric input values arrive as strings, so the code uses `Number`.
- `trim()`: removes spaces from the start and end of text.
- `map()`: produces a new array by converting each item, such as students to their names.
- `filter()`: produces a new array containing only matching items, such as all records except the deleted one.
- `some()`: answers whether at least one item matches, used to detect duplicate rolls.
- `...`: spreads values. `[...expenses, newExpense]` creates a new array with the new expense added.
- `textContent`: places input on the page as text rather than interpreting it as HTML.
- Regular expression: a pattern for checking a string. In the phone rule, `^` starts the match, `\d` means a digit, `{10}` means exactly ten, and `$` ends the match.
- Password lookaheads such as `(?=.*[A-Z])` require a matching character somewhere in the password.
- `try/catch`: handles an operation that may fail, such as reading invalid saved JSON.
- `async/await`: waits for database operations without blocking the whole server.

## React ideas used here

- A component is a function that returns JSX describing part of the screen.
- Props are values passed from a parent to a child.
- State is a value React tracks. Calling its setter requests a new render.
- Assignment 06 keeps the student in `App` because both the form and display need it.
- The callback `onSubmit` lets the form send a student to its parent.
- Assignment 07 creates new arrays when adding or deleting rather than changing the state array directly.
- `localStorage` holds strings in this browser. `JSON.stringify` saves an array as text; `JSON.parse` reads it back.

## Small changes to practise yourself

1. Change Assignment 01's title and explain the difference between the browser title and page heading.
2. Add a workshop row to Assignment 02 without breaking the table headings.
3. Explain why marks 90, 80 and 70 give a total of 240 and percentage of 80 in Assignment 03.
4. Explain why changing Assignment 03 to four subjects also requires changing the validation and percentage calculation.
5. Add a department to both the displayed options and allowed values in Assignment 04.
6. Change a label in Assignment 06 and trace where its value is displayed.
7. Add expenses of INR 10.50 and INR 20.25. Explain the stored values 1050 and 2025 and total INR 30.75.
8. In Postman, send marks of 101 to Assignment 08 and explain why the response is 400.

## Before submission

- Complete the pending checks listed in `VERIFICATION.md`.
- Record your own Git and Postman evidence.
- Be able to explain one full input-to-output example for every assignment.
- Follow your course's rules for acknowledging assistance. Use these files as material to learn and adapt, and describe your contribution accurately.
