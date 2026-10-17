# VSEC Practical Assignments 01–08

Student implementations based on the supplied one-page practical list. Node 24 LTS is recommended (the authoring environment has Node 24). Open this repository folder in VS Code and use Terminal > New Terminal.

| Folder | Practical |
|---|---|
| [assign_01](assign_01/README.md) | Responsive semantic webpage |
| [assign_02](assign_02/README.md) | Structured webpage: navigation, tables and forms |
| [assign_03](assign_03/README.md) | Student Result Management System |
| [assign_04](assign_04/README.md) | Employee Registration Form |
| [assign_05](assign_05/README.md) | Local Git and GitHub practical |
| [assign_06](assign_06/README.md) | React Student Information |
| [assign_07](assign_07/README.md) | React Personal Expenses |
| [assign_08](assign_08/README.md) | Student REST API |

## Start here

Static assignments 01–04 need no package installation:

```powershell
npm start
```

Open http://localhost:3000/assign_01/ and change the number through 04. Stop the server with Ctrl+C.

For React and the API, install dependencies once from this root:

```powershell
npm install
npm run dev -w assign_06
# In another terminal, or after stopping the first:
npm run dev -w assign_07
```

Use each printed Vite URL. Assignment 08 needs MongoDB setup and a local .env first; see its README. Each assignment contains viva explanations and a manual demonstration checklist.

## Verification

```powershell
npm test
npm run build
# Requires real MongoDB and assign_08/.env:
npm run test:integration -w assign_08
```

For dependency-free logic checks only:

```powershell
node --test tests/*.test.js assign_06/test/*.test.js assign_07/test/*.test.js assign_08/test/validation.test.js
```

See [verification status](VERIFICATION.md) for actual results and pending checks. No node_modules, database credentials, student passwords, or fabricated evidence belongs in this repository. npm install will generate package-lock.json; retain it after a successful install.

## Reading and oral preparation

Source files are formatted across multiple lines with descriptive names and short explanatory comments. Start with [the viva preparation guide](docs/VIVA-PREPARATION.md), then read each assignment's own README. It lists the files to study and small changes to practise.

## Submission boundaries

Assignment 05 still requires YOUR local Git commands and evidence. Assignment 08 still requires a real MongoDB integration run and YOUR Postman evidence. The mini-project (Assignment 09 in the PDF) and its report are deferred until the report format is supplied.
