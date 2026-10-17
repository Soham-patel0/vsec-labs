import express from 'express';
import { validateStudent } from './validation.js';

export function createApp(Student) {
    const app = express();
    app.disable('x-powered-by');

    // Read JSON request bodies before passing them to a route.
    app.use(express.json({ limit: '16kb' }));

    app.get('/health', (req, res) => {
        res.json({ status: 'ok' });
    });

    // MongoDB ObjectIds contain 24 hexadecimal characters.
    app.param('id', (req, res, next, id) => {
        if (!/^[a-f0-9]{24}$/i.test(id)) {
            return res.status(400).json({ error: 'Invalid student ID.' });
        }
        next();
    });

    function validateBody(partial = false) {
        return (req, res, next) => {
            const error = validateStudent(req.body, partial);
            if (error) {
                return res.status(400).json({ error });
            }
            next();
        };
    }

    // Create a new student.
    app.post('/api/students', validateBody(), async (req, res) => {
        const student = await Student.create(req.body);
        res.location('/api/students/' + student._id).status(201).json(student);
    });

    // Read the first 100 students, sorted by roll number.
    app.get('/api/students', async (req, res) => {
        const students = await Student.find().sort({ rollNumber: 1 }).limit(100);
        res.json(students);
    });

    // Read one student by ID.
    app.get('/api/students/:id', async (req, res) => {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        res.json(student);
    });

    // PATCH changes only the fields supplied in the request.
    app.patch('/api/students/:id', validateBody(true), async (req, res) => {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        res.json(student);
    });

    // Delete one student. A 204 response has no body.
    app.delete('/api/students/:id', async (req, res) => {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        res.status(204).end();
    });

    app.use((req, res) => {
        res.status(404).json({ error: 'Endpoint not found.' });
    });

    // Express recognizes an error handler by its four parameters.
    app.use((error, req, res, next) => {
        if (error.code === 11000) {
            return res.status(409).json({ error: 'Roll number already exists.' });
        }

        if (error.type === 'entity.too.large') {
            return res.status(413).json({ error: 'Request body too large.' });
        }

        if (error.type === 'entity.parse.failed' || error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid request data.' });
        }

        res.status(500).json({ error: 'Internal server error.' });
    });

    return app;
}
