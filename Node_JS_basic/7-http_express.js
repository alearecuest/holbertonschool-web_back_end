const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 1245;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',');
    const studentRecords = lines.slice(1).filter(line => line.trim());
    
    if (studentRecords.length === 0) {
      throw new Error('Cannot load the database');
    }

    const students = {};
    let count = 0;

    studentRecords.forEach((record) => {
      const fields = record.split(',');
      const student = {};
      
      headers.forEach((header, index) => {
        student[header] = fields[index];
      });

      if (!students[student.field]) {
        students[student.field] = [];
      }

      students[student.field].push(student.firstname);
      count += 1;
    });

    const result = [`Number of students: ${count}`];

    for (const [field, names] of Object.entries(students)) {
      result.push(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }

    return result;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const header = 'This is the list of our students';

  try {
    const studentData = await countStudents(process.argv[2] || 'database.csv');
    res.send(`${header}\n${studentData.join('\n')}`);
  } catch (error) {
    res.send(`${header}\n${error.message}`);
  }
});

app.listen(port);

module.exports = app;
