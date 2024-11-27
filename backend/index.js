import express from 'express';
import multer from 'multer';
import cors from 'cors';
import XLSX from 'xlsx';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { SecretSantaAssigner } from './secretSanta.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));


app.post('/assign-secret-santa', 
  upload.fields([
    { name: 'currentYear', maxCount: 1 },
    { name: 'previousYear', maxCount: 1 }
  ]), 
  async (req, res) => {
    try {
      if (!req.files?.currentYear) {
        return res.status(400).json({ error: 'Current year file is required' });
      }

      // Read current year employees
      const currentWorkbook = XLSX.read(req.files.currentYear[0].buffer);
      const currentSheet = currentWorkbook.Sheets[currentWorkbook.SheetNames[0]];
      const currentEmployees = XLSX.utils.sheet_to_json(currentSheet);

      // Read previous year assignments if provided
      let previousAssignments = [];
      if (req.files?.previousYear) {
        const previousWorkbook = XLSX.read(req.files.previousYear[0].buffer);
        const previousSheet = previousWorkbook.Sheets[previousWorkbook.SheetNames[0]];
        previousAssignments = XLSX.utils.sheet_to_json(previousSheet);
      }

      // Create Secret Santa assignments
      const assigner = new SecretSantaAssigner(currentEmployees, previousAssignments);
      const assignments = assigner.assignSecretSanta();

      // Create new workbook with assignments
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(assignments);
      XLSX.utils.book_append_sheet(wb, ws, 'Assignments');

      // Generate Excel file
      const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=secret_santa_assignments.xlsx');
      res.send(Buffer.from(excelBuffer));

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to process Secret Santa assignments' });
    }
});



app.use(express.static(path.join(__dirname,"../frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});