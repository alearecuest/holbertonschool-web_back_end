import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    const databasePath = process.argv[2] || 'database.csv';

    readDatabase(databasePath)
      .then((fields) => {
        let responseText = 'This is the list of our students\n';

        const sortedFields = Object.keys(fields).sort(
          (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()),
        );

        for (const field of sortedFields) {
          const students = fields[field];
          responseText += `Number of students in ${field}: ${
            students.length}. List: ${students.join(', ')}\n`;
        }

        response.status(200).send(responseText);
      })
      .catch((error) => {
        response.status(500).send(error.message);
      });
  }

  static getAllStudentsByMajor(request, response) {
    const databasePath = process.argv[2] || 'database.csv';
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(databasePath)
      .then((fields) => {
        if (!fields[major]) {
          response.status(500).send(`No students in ${major}`);
          return;
        }

        response.status(200).send(`List: ${fields[major].join(', ')}`);
      })
      .catch((error) => {
        response.status(500).send(error.message);
      });
  }
}

export default StudentsController;
