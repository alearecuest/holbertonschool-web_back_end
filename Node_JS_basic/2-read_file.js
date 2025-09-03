const fs = require('fs');

/**
 * Counts students from a CSV database file
 * @param {string} path - Path to the CSV file
 */

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    
    const lines = data
			.trim()
			.split('\n')
			.filter((line) => line.trim() !== '');
		
		if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    const header = lines[0].split(',');
    const fieldIndex = header.length - 1;

    const students = lines.slice(1);

    console.log(`Number of students: ${students.length}`);

    const fields = {};
    for (const line of students) {
      const parts = line.split(',');
      const firstName = parts[0];
      const field = parts[fieldIndex];

      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstName);
    }

    for (const [field, names] of Object.entries(fields)) {
      console.log(
        `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`
      );
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;