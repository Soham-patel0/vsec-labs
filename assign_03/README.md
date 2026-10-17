# Assignment 3: Student Result Management System

## Run

From the repository root run `npm start`, then open `http://localhost:3000/assign_03/`. No dependencies are needed for these static pages. Keep this terminal running.

## Viva: explain the implementation

1. The submit event reads FormData, validates identity and marks, then adds a record to an array. Each subject is out of 100.

2. Total is the sum of three marks; percentage is total / 300 * 100. All students with the highest total share the topper position.

3. Rendering creates DOM nodes and writes textContent, so student names are treated as text. Duplicate roll numbers are rejected ignoring case. Records reset on refresh.

## Demonstration checklist

Add two students, test a duplicate roll, try marks below 0 and above 100, add a tied topper, delete a topper and verify the summary updates. Refresh to demonstrate the in-memory limitation.
