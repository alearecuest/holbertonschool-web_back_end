const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;
const dbFilename = process.argv.length > 2 ? process.argv[2] : '';

function countStudents(path) {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject(new Error('Cannot load the database'));
      return;
    }

    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.toString().split('\n');
      let students = lines.filter((line) => line);
      const header = students.shift();
      const headerFields = header.split(',');
      const fieldIndex = headerFields.findIndex((field) => field === 'field');
      const firstnameIndex = headerFields.findIndex((field) => field === 'firstname');

      if (fieldIndex === -1) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const fields = {};
      students.forEach((student) => {
        const studentData = student.split(',');
        const studentField = studentData[fieldIndex];
        const studentFirstname = studentData[firstnameIndex];

        if (!fields[studentField]) {
          fields[studentField] = [];
        }

        fields[studentField].push(studentFirstname);
      });

      const response = [];
      response.push(`Number of students: ${students.length}`);
      
      for (const [field, names] of Object.entries(fields)) {
        response.push(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
      }

      resolve(response);
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const output = ['This is the list of our students'];

  countStudents(dbFilename)
    .then((result) => {
      output.push(...result);
      res.send(output.join('\n'));
    })
    .catch((error) => {
      output.push(error.message);
      res.send(output.join('\n'));
    });
});

app.listen(port);

module.exports = app;