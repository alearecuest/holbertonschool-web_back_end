process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('data', (data) => {
  const name = data.toString().trim();
  
  if (!process.stdin.isTTY) {
    process.stdout.write(`Your name is: ${name}\r`);
  } else {
    console.log(`Your name is: ${name}`);
    process.exit();
  }
});

process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
