const fs = require('fs').promises;

async function totalcities(initials) {
  const pathFile = `src/json/estados/${initials}.json`;

  try {
    let data = await fs.readFile(pathFile);

    let key = Object.keys(JSON.parse(data));
    let cities = Array.from(JSON.parse(data)[key]);

    return cities.length;
  } catch (err) {
    return 'Estado não encontrado!';
  }
}

module.exports = totalcities;
