const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 1245;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.trim().split('\n');
    const studentGroups = {};
    const dbFieldNames = lines[0].split(',');
    const studentPropNames = dbFieldNames;
    const studentRecords = lines.slice(1).filter((line) => line).map((line) => line.split(','));

    let totalStudents = 0;
    const output = [];

    studentRecords.forEach((studentRecord) => {
      totalStudents += 1;
      const studentEntries = studentPropNames
        .map((propName, idx) => [propName, studentRecord[idx]]);
      const student = Object.fromEntries(studentEntries);

      if (!studentGroups[student.field]) {
        studentGroups[student.field] = [];
      }
      studentGroups[student.field].push(student.firstname);
    });

    output.push(`Number of students: ${totalStudents}`);
    for (const [field, group] of Object.entries(studentGroups)) {
      output.push(`Number of students in ${field}: ${group.length}. List: ${group.join(', ')}`);
    }

    return output;
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
    const studentInfo = await countStudents(process.argv[2] || 'database.csv');
    res.send(`${header}\n${studentInfo.join('\n')}`);
  } catch (error) {
    res.send(`${header}\n${error.message}`);
  }
});

app.listen(port);

module.exports = app;
