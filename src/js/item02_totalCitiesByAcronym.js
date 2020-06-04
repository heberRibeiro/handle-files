const fs = require('fs').promises;

async function totalcities(initials) {
  const pathFile = `src/json/estados/${initials}.json`;

  try {
    let data = await fs.readFile(pathFile);

    let key = Object.keys(JSON.parse(data));
    let cities = Array.from(JSON.parse(data)[key]);
    console.log(
      `A quantidade de cidade do estado de ${key} é ${cities.length}`
    );

    return cities.length;
  } catch (err) {
    console.error('Estado não encontrado!');
  }
}

module.exports = totalcities;
