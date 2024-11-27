# Secret Santa Assignment

This project automates the process of assigning Secret Santa participants. It takes in employee data for the current year and, optionally, the previous year's Secret Santa assignments, and ensures no one is assigned to the same person as last year. The result is an Excel file with assignments that can be shared with all participants.

## Features

- Upload employee data for the current year and, optionally, previous year assignments.
- Automatically assigns Secret Santa participants, ensuring no one gets the same person as last year.
- Generates an Excel file with the assignments.
- Backend built with **Express.js** and **Multer** for file handling.
- Excel files are processed using **XLSX** for creating and reading Excel sheets.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** installed on your machine.
- **npm** or **yarn** for installing dependencies.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/keerthivasan-15/secret_santa_assigner.git
   cd secret_santa_assigner

2. Install dependencies:

   ```bash
    npm install
    # or
    yarn install

3. Starting the Server
Run the following command to start the server:

   ```bash
   npm start

The server will run on http://localhost:3000.


API Endpoint: /assign-secret-santa
Method: POST
Body: Form-data with the following files:
currentYear: Excel file containing the list of employees for the current year.
previousYear: (Optional) Excel file containing last year's Secret Santa assignments.



