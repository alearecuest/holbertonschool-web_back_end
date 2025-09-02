process.stdout.write('Welcome to Holberton School, what is your name?\n');

let inputData = '';

process.stdin.on('data', (data) => {
  inputData += data.toString();
  
  if (process.stdin.isTTY) {
    const name = inputData.trim();
    process.stdout.write(`Your name is: ${name}\n`);
    process.exit();
  }
});

process.stdin.on('end', () => {
  if (inputData) {
    const name = inputData.trim();
    process.stdout.write(`Your name is: ${name}\n`);
  }
  process.stdout.write('This important software is now closing\n');
});