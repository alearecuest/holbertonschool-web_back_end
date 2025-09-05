const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      
      const lines = data.trim().split('\n');
      const headers = lines[0].split(',');
      const studentRecords = lines.slice(1).filter(line => line.trim());
      
      const fields = {};
      let count = 0;
      
      studentRecords.forEach((record) => {
        const values = record.split(',');
        const student = {};
        
        headers.forEach((header, index) => {
          student[header] = values[index];
        });
        
        if (!fields[student.field]) {
          fields[student.field] = [];
        }
        
        fields[student.field].push(student.firstname);
        count++;
      });
      
      const result = [];
      result.push(`Number of students: ${count}`);
      
      for (const [field, students] of Object.entries(fields)) {
        result.push(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
      }
      
      resolve(result);
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const dbFile = process.argv[2] || '';
  
  countStudents(dbFile)
    .then((studentData) => {
      res.send(`This is the list of our students\n${studentData.join('\n')}`);
    })
    .catch((error) => {
      res.send(`This is the list of our students\n${error.message}`);
    });
});

app.listen(port);

module.exports = app;
