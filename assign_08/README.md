# Assignment 8: Student REST API

## Run

See the MongoDB and Postman setup below.

## Viva: explain the implementation

1. Express routes map HTTP methods and paths to operations. POST creates (201), GET reads (200), PATCH partially updates (200), and DELETE removes (204).

2. Mongoose describes the student schema and talks to MongoDB. A unique roll-number index prevents duplicates even when requests arrive together. Update validators remain enabled.

3. 400 means invalid input, 404 means missing resource, 409 means duplicate roll number, and 500 is an unexpected server failure. Input allowlisting rejects MongoDB operators supplied as fields.

4. The production server uses MongoDB. Route unit tests explicitly mock the model; the integration test checks actual database persistence. Postman exercises the HTTP API separately.

## Demonstration checklist

Start MongoDB and the API, run the Postman collection in order, inspect CRUD responses and capture your actual run. Run the separate database integration test.

## Windows setup

The prepared local Windows copy includes an ignored MongoDB binary and a launcher. From the repository root run `npm run demo:api` to start real MongoDB plus Express together. Stop with Ctrl+C. Database files remain in the ignored `.local/db` folder. This launcher was tested locally; the binary/database are not uploaded to GitHub. On a fresh clone, install MongoDB or set `MONGOD_BINARY` to an existing mongod executable. Do not run this launcher at the same time as another MongoDB service using port 27017. The standard service setup follows below.

1. Install MongoDB Community Server using the [official Windows guide](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/). Choose the Windows service option. Compass is optional. Ensure the MongoDB service is running in Windows Services.
2. Install the [Postman desktop app](https://www.postman.com/downloads/).
3. In the repository root run `npm install`. Then create your local configuration:

```powershell
Copy-Item assign_08/.env.example assign_08/.env
npm start -w assign_08
```

The sample URI uses local MongoDB without credentials. The API binds to loopback for this learning exercise; it has no authentication. Keep it local. If you later use Atlas, put the URI only in the ignored .env file. Do not commit it or include it in screenshots.

Open http://localhost:4000/health. If startup fails, check the MongoDB service, port 27017 and URI. The application starts accepting requests only after connection and index initialization.

## API contract

| Method | Path | Success | Purpose |
|---|---|---|---|
| POST | /api/students | 201 | Create student |
| GET | /api/students | 200 | List first 100, sorted by roll |
| GET | /api/students/:id | 200 | Read student |
| PATCH | /api/students/:id | 200 | Update supplied fields |
| DELETE | /api/students/:id | 204 | Delete student |

Create JSON: `{"name":"Soham Patel","rollNumber":"01","department":"IT","marks":85}`. Marks are a number in [0,100]. Roll numbers are trimmed and stored uppercase; names/departments allow up to 80 characters, roll numbers up to 30. Empty updates and unknown fields are rejected. There is no PUT endpoint.

## Postman

Import `postman/Student-API.postman_collection.json`. The collection variable baseUrl defaults to http://localhost:4000. Run all eight requests sequentially with Collection Runner. The create request saves studentId automatically; subsequent requests read, update, validate and delete that student. The final GET must return 404. Capture the actual Runner summary and responses yourself. Do not claim the collection was run until you run it.

## Tests

```powershell
npm test -w assign_08
npm run test:integration -w assign_08
```

The first command tests validation and HTTP routes using an explicitly mocked model. The second requires a real running MongoDB and creates a uniquely named test record, checks persistence and duplicate-roll handling, and cleans up its own record. It never clears the collection.
