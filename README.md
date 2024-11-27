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

## Frontend Deployment

The frontend of this application is hosted on Render. You can access the web application at:

[Secret Santa Assigner - Frontend](https://secret-santa-assigner.onrender.com/)

## Backend Deployment

The backend API is also hosted on Render. The backend is responsible for processing the uploaded employee list and generating Secret Santa assignments. It is accessible via the following URL:

[Secret Santa Assigner - Backend](https://secret-santa-assigner.onrender.com/)

## API Endpoint

### **Endpoint**: `/assign-secret-santa`

### **Method**: `POST`

### **Request Body**:
- **Type**: `Form-data`
- **Fields**:
  1. **`currentYear`** (Required):  
     - An Excel file containing the list of employees for the current year.
  2. **`previousYear`** (Optional):  
     - An Excel file containing last year's Secret Santa assignments.

### Example Request (Using Postman):
1. Set the method to **POST**.
2. Use the endpoint: `http://localhost:3000/assign-secret-santa`.
3. In the **Body** tab, choose **form-data** and add the following files:
   - `currentYear`: Upload the current year Excel file.
   - `previousYear`: (Optional) Upload the previous year's Excel file.

### Expected Response:
- **Success** (200): An Excel file containing the Secret Santa assignments is downloaded.
- **Error** (400/500): JSON object with an error message.




