const fs = require('fs');

fs.readFile('./src/json/Estados.json', (err, data) => {
  console.log(JSON.parse(data));
});

console.log('Funcionou!');
