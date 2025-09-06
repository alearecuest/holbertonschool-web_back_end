const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;
const databaseFile = process.argv[2] || 'database.csv';

const countStudents = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data.split('\n').filter((line) => line.trim() !== '');

    const students = lines.slice(1);

    const totalStudents = students.length;

    const fields = {};
    for (const student of students) {
      const studentData = student.split(',');
      const field = studentData[3];
      
      if (!fields[field]) {
        fields[field] = {
          count: 0,
          list: [],
        };
      }

      fields[field].count += 1;
      fields[field].list.push(studentData[0]);
    }

    resolve({ totalStudents, fields });
  });
});

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.write('This is the list of our students\n');
  
  countStudents(databaseFile)
    .then(({ totalStudents, fields }) => {
      res.write(`Number of students: ${totalStudents}\n`);

      for (const [field, data] of Object.entries(fields)) {
        const list = data.list.join(', ');
        res.write(`Number of students in ${field}: ${data.count}. List: ${list}\n`);
      }

      res.end();
    })
    .catch((error) => {
      res.write(error.message);
      res.end();
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;
