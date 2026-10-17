# Fast practical and oral guide

## Start the demo

Open the repository folder in VS Code. Dependencies and React builds are already present in this prepared local copy. Run `npm start` and open http://localhost:3000/. Use the menu for 01–04, 06 and 07. The server must be running. Live Server alone does not compile React or run Express.

On a fresh clone: `npm ci`, `npm run build`, then `npm start`.

Assignment 08 in this prepared local copy: in another terminal run `npm run demo:api`. It starts a real MongoDB and the API at http://localhost:4000/health. The local MongoDB binary and data are ignored by Git; a fresh clone needs MongoDB installed. Both demo servers are running at handoff. After restarting the laptop, start them again with `npm start` and `npm run demo:api` in separate terminals.

## Eight practical demonstrations

| Lab | Do this | Explain this aloud |
|---|---|---|
| 01 | Resize the browser; show header, navigation, content and footer. | HTML defines structure. CSS controls presentation. Semantic elements identify the purpose of content. Grid and media queries adapt layout. |
| 02 | Use the Schedule/Register links; complete and submit the form. | Anchor links target element IDs. A table uses rows and heading/data cells. Labels identify inputs. The submit handler prevents reload. This demo does not save to a server. |
| 03 | Add marks 90, 80, 70: total 240, percentage 80%. Add another roll with the same marks; show the tie, then delete. | Form values are strings, converted with Number. Total sums three marks; percentage is total/300*100. The topper filter includes all tied students. Refresh clears these in-memory records. |
| 04 | Submit empty fields, then valid name/email, a sample password like DemoPass9, ten-digit phone and department. | Validation returns field errors; regex checks format. Uppercase, lowercase and a digit are required in an 8–128 character password. Client validation improves feedback; a real backend must validate again. No registration data or password is saved here. |
| 05 | In this repository run `git status`, `git remote -v`, `git log -1 --oneline`. Show the GitHub files once upload succeeds. | Git is local version control; GitHub hosts a remote. Add stages, commit records history, push uploads commits. origin is a remote nickname; main is a branch. The preparation commit is authored by Codex. Demonstrate your own edit/add/commit/push if your instructor requires student-performed evidence. |
| 06 | Submit a student and show the displayed name/roll/department/marks. | App owns student state. StudentForm sends data through an onSubmit callback. StudentDetails receives it as props. Updating state re-renders the display. Refresh clears it. |
| 07 | Add INR 10.50 and 20.25. Show total 30.75, filter, refresh and delete. | State holds expenses. filter selects matching rows; aggregation sums them. Money is stored as integer paise: 1050+2025=3075. JSON converts the array to/from localStorage strings. |
| 08 | Start a real MongoDB, copy assign_08/.env.example to assign_08/.env, run `npm start -w assign_08`; import the supplied Postman collection and run requests in order. | Express handles HTTP routes. Middleware parses JSON and validates fields. Mongoose applies a schema and sends operations to MongoDB. POST creates, GET reads, PATCH updates, DELETE removes. 201 created; 200 success; 204 deleted; 400 invalid; 404 missing; 409 duplicate. |

## One full API answer

“A POST request sends student JSON to /api/students. Express parses it, validation checks allowed fields and marks between 0 and 100, Mongoose saves the document in MongoDB, and the response returns the student with an ID and HTTP 201. The unique roll index prevents duplicates. Postman sends requests to check the API.”

## Fifteen-minute revision order

1. Five minutes: perform the result, employee, React student and expense demos.
2. Five minutes: explain state vs props, DOM events, validation, localStorage, and Git add/commit/push.
3. Five minutes: trace POST through validation to MongoDB; memorize the HTTP status codes above and check the current VERIFICATION.md limitations.

Read docs/VIVA-PREPARATION.md for source-file guidance. The mini-project report remains deferred until its required format is supplied.
