import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(process.argv[2])
      .then((data) => {
        const fields = Object.keys(data).sort((a, b) => 
          a.toLowerCase().localeCompare(b.toLowerCase()));
        
        let responseText = 'This is the list of our students\n';
        
        for (const field of fields) {
          responseText += `Number of students in ${field}: ${data[field].length}. List: ${data[field].join(', ')}\n`;
        }
        
        response.status(200).send(responseText.trim());
      })
      .catch((error) => {
        response.status(500).send(error.message);
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    
    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    
    readDatabase(process.argv[2])
      .then((data) => {
        if (!data[major]) {
          response.status(500).send(`No students in ${major}`);
          return;
        }
        
        response.status(200).send(`List: ${data[major].join(', ')}`);
      })
      .catch((error) => {
        response.status(500).send(error.message);
      });
  }
}

export default StudentsController;