# Assignment 7: React Personal Expenses

## Run

From the repository root run `npm install`, then `npm run dev -w assign_07`. Open the URL printed by Vite. To build: `npm run build -w assign_07`.

## Implementation

1. React state stores expense records and filters. localStorage saves JSON between visits in the same browser. A storage failure is reported.

2. Money is stored as integer paise to avoid adding binary decimal currency values. The total, average and category shares use only records matching both filters.

3. Stable UUID keys identify records for rendering and deletion. Loaded storage is validated; damaged JSON produces an empty list. localStorage is browser-local, not a shared database.
