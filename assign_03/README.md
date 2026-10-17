# Assignment 3: Student Result Management System

## Run

From the repository root run `npm start`, then open `http://localhost:3000/assign_03/`. No dependencies are needed for these static pages. Keep this terminal running.

## Implementation

1. The submit event reads FormData, validates identity and marks, then adds a record to an array. Each subject is out of 100.

2. Total is the sum of three marks; percentage is total / 300 * 100. All students with the highest total share the topper position.

3. Rendering creates DOM nodes and writes textContent, so student names are treated as text. Duplicate roll numbers are rejected ignoring case. Records reset on refresh.
