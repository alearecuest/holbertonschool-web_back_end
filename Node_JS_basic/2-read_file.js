const fs = require('fs');

function countStudents(path) {
  try {
    // Intenta leer el archivo de forma síncrona
    const data = fs.readFileSync(path, 'utf8');
    
    // Divide el contenido por líneas y filtra líneas vacías
    const lines = data.split('\n').filter(line => line.trim() !== '');
    
    // La primera línea contiene los encabezados
    const headers = lines[0].split(',');
    const fieldIndex = headers.length - 1; // Asumimos que el campo está en la última columna
    const firstNameIndex = 0; // Asumimos que el nombre está en la primera columna
    
    // Las demás líneas contienen los datos de los estudiantes
    const students = lines.slice(1);
    
    console.log(`Number of students: ${students.length}`);
    
    // Agrupar estudiantes por campo
    const fields = {};
    students.forEach(student => {
      const data = student.split(',');
      const field = data[fieldIndex].trim();
      const firstName = data[firstNameIndex].trim();
      
      if (!fields[field]) {
        fields[field] = [];
      }
      
      fields[field].push(firstName);
    });
    
    // Mostrar información de cada campo
    for (const field in fields) {
      const studentList = fields[field].join(', ');
      console.log(`Number of students in ${field}: ${fields[field].length}. List: ${studentList}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;