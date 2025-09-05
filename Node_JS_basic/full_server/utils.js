import fs from 'fs';

const readDatabase = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(Error('Cannot load the database'));
        return;
      }
      
      const lines = data.trim().split('\n');
      const headers = lines[0].split(',');
      const fieldIndex = headers.indexOf('field');
      const firstNameIndex = headers.indexOf('firstname');
      
      if (fieldIndex === -1 || firstNameIndex === -1) {
        reject(Error('Invalid CSV format'));
        return;
      }

      const studentsByField = {};
      
      for (let i = 1; i < lines.length; i += 1) {
        const values = lines[i].split(',');
        const field = values[fieldIndex];
        const firstName = values[firstNameIndex];
        
        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        
        studentsByField[field].push(firstName);
      }
      
      resolve(studentsByField);
    });
  });
};

export default readDatabase;