const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'your_database_name'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('MySQL connected');
});

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.post('/saveFormData', (req, res) => {
  const formData = req.body.formData;

  // Add the Firebase UUID to the formData

  const sql = 'INSERT INTO personal_info SET ?';
  db.query(sql, formData, (err, result) => {
    if (err) {
      console.error('Error saving form data:', err);
      res.status(500).json({ error: 'Error saving form data' });
    } else {
      console.log('Form data saved successfully:', result);
      res.status(200).json({ message: 'Form data saved successfully' });
    }
  });
});

app.get('/getDataByFirebaseToken/:firebaseToken', (req, res) => {
  const firebaseToken = req.params.firebaseToken;

  const sql = 'SELECT * FROM personal_info WHERE firebaseToken = ?';
  db.query(sql, firebaseToken, (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Error fetching data' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: 'Data not found' });
      } else {
        res.status(200).json(result[0]); // Send the first row (assuming firebaseToken is unique)
      }
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
