# Project Days Calendar - Testing Documentation

This document outlines the testing procedures performed to ensure the calendar application meets all rubric requirements.

## 1. Unit Testing (Shared Logic)

The core date calculation engine (`common.mjs`) is tested using the native Node.js test runner.

- **Tested Function:** `calculateCommemorativeDate`
- **Test Cases:** Verified that variable occurrences (like the "second Tuesday") map accurately to real dates across different years (e.g., Ada Lovelace Day hitting Oct 8 in 2024, and Oct 13 in 2020).
- **Execution:** Run via `npm test`. All tests pass successfully.

## 2. UI and Manual Layout Testing

The web interface (`web.mjs` & `index.html`) was manually tested against the rubric's required edge cases:

- **Grid Formatting:** Verified dynamic generation of 5-to-6 row grids. Confirmed specific boundary months (e.g., Feb 2026 having exactly 28 days with zero padding cells).
- **Date Accuracy:** Cross-referenced known commemorative days in the UI against the rubric (e.g., May 2030 correctly displays International Binturong Day on the 11th).
- **End-Point Navigation:** Tested the "Prev" and "Next" buttons pushing past the year dropdown limits (e.g., clicking "Next" from December of the final dropdown year). The `ensureYearOption` function safely adds the new year and prevents `NaN` or `null` errors.
- **Resilience:** The calendar generates dynamically from `days.json`, meaning arbitrary days can be added to the JSON without breaking the layout.

## 3. Accessibility Testing

- Ran Google Chrome Lighthouse Audit on the deployed HTML.
- Added semantic `<main>` landmarks, visually hidden `<label>` elements for inputs.
- **Result:** Achieved a 100% Accessibility score.

## 4. iCalendar Export (`days.ics`) Testing

- Executed `node generate-ical.mjs` to create the `.ics` file.
- Verified that the script successfully utilizes the shared logic from `common.mjs`.
- **External Validation:** Imported `days.ics` into a fresh Google Calendar. Verified that all generated events correctly span a full day (without specific start/end times) and land on the accurate dates between 2020 and 2030.
