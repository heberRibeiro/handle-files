const fs = require('fs').promises;

// Return a state bject
function states() {
  return fs.readFile('./src/json/Estados.json', 'utf-8').then((data) => {
    return Array.from(JSON.parse(data));
  });
}

// Return a cities object
function cities() {
  return fs.readFile('./src/json/Cidades.json', 'utf-8').then((data) => {
    return Array.from(JSON.parse(data));
  });
}

async function createStatesWithCities() {
  let statesArray = await states();

  let { ID: idState, Sigla: initialsState, Nome: stateName } = statesArray[0];

  let nameFile = `${initialsState}.json`;
  let pathWrite = `./src/json/${nameFile}`;

  let citiesArray = await cities();

  let data = { [`${stateName}`]: [] };

  citiesArray.forEach((city) => {
    let { ID: idCity, Nome: cityName, Estado: idCityState } = city;
    if (idCityState === idState) {
      data[`${stateName}`].push(cityName);
    }
  });
  console.log(data);
  fs.writeFile(pathWrite, JSON.stringify(data));
}

createStatesWithCities();
