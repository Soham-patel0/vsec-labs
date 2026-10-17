# VSEC Web Development Assignments

Eight practical assignments covering HTML, CSS, JavaScript, Git, React, Express and MongoDB.

| Folder | Assignment |
|---|---|
| [assign_01](assign_01) | Responsive webpage |
| [assign_02](assign_02) | Navigation, tables and forms |
| [assign_03](assign_03) | Student result management |
| [assign_04](assign_04) | Employee form validation |
| [assign_05](assign_05) | Git and GitHub |
| [assign_06](assign_06) | React student information |
| [assign_07](assign_07) | React expense tracker |
| [assign_08](assign_08) | Express and MongoDB student API |

## Setup

Requires Node.js 22.12 or later.

```powershell
npm ci
npm run build
npm start
```

Open http://localhost:3000/ for assignments 01–04 and 06–07. Static assignments 01–04 can run with npm start without installing dependencies.

For React development, run npm run dev -w assign_06 or npm run dev -w assign_07.

## Student API

See [Assignment 08](assign_08/README.md) for MongoDB configuration, endpoints and the Postman collection. The API listens on http://localhost:4000. The local launcher npm run demo:api starts MongoDB and Express when a MongoDB binary is available.

## Checks

```powershell
npm test
npm run build
npm run test:integration -w assign_08
```

The integration test requires MongoDB and assign_08/.env. GitHub Actions runs the tests and builds on each push. The recorded Postman collection run is available in [docs/verification](docs/verification).
