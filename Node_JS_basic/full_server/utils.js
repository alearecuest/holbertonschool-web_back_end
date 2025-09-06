import fs from 'fs';

const readDatabase = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      reject(Error('Cannot load the database'));
      return;
    }

    const lines = data.split('\n').filter((line) => line.trim() !== '');

    const students = lines.slice(1).filter((line) => line);

    const fields = {};

    for (const student of students) {
      const studentData = student.split(',');
      const firstName = studentData[0];
      const field = studentData[3];

      if (!fields[field]) {
        fields[field] = [];
      }

      fields[field].push(firstName);
    }

    resolve(fields);
  });
});

export default readDatabase;
