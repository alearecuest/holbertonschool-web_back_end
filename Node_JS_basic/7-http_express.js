const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 1245;

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8')
      .then((data) => {
        const lines = data.trim().split('\n');
        const studentGroups = {};
        const dbFieldNames = lines[0].split(',');
        const studentPropNames = dbFieldNames;
        const studentRecords = lines.slice(1).map((line) => line.split(','));

        studentRecords.forEach((studentRecord) => {
          const studentEntries = studentPropNames
            .map((propName, idx) => [propName, studentRecord[idx]]);
          const student = Object.fromEntries(studentEntries);

          if (!studentGroups[student.field]) {
            studentGroups[student.field] = [];
          }
          studentGroups[student.field].push(student.firstname);
        });

        const totalStudents = studentRecords.length;
        const output = [];

        output.push(`Number of students: ${totalStudents}`);
        for (const [field, group] of Object.entries(studentGroups)) {
          output.push(`Number of students in ${field}: ${group.length}. List: ${group.join(', ')}`);
        }

        resolve(output);
      })
      .catch(() => {
        reject(new Error('Cannot load the database'));
      });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const header = 'This is the list of our students';
  
  countStudents(process.argv[2] || 'database.csv')
    .then((studentInfo) => {
      res.send(`${header}\n${studentInfo.join('\n')}`);
    })
    .catch((error) => {
      res.send(`${header}\n${error.message}`);
    });
});

app.listen(port);

module.exports = app;
