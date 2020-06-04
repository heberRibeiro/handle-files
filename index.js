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
  let citiesArray = await cities();

  statesArray.forEach((state) => {
    let { ID: idState, Sigla: initialsState, Nome: stateName } = state;

    let nameFile = `${initialsState}.json`;
    let pathWrite = `./src/json/estados/${nameFile}`;

    let data = { [`${stateName}`]: [] };

    citiesArray.forEach((city) => {
      let { ID: idCity, Nome: cityName, Estado: idCityState } = city;
      if (idCityState === idState) {
        data[`${stateName}`].push(cityName);
      }
    });
    fs.writeFile(pathWrite, JSON.stringify(data));
  });
}

// createStatesWithCities();

async function totalcities(initials) {
  const pathFile = `src/json/estados/${initials}.json`;

  let data = await fs.readFile(pathFile);

  let key = Object.keys(JSON.parse(data));
  let cities = Array.from(JSON.parse(data)[key]);
  console.log(`A quantidade de cidade do estado de ${key} é ${cities.length}`);

  return cities.length;
}

//totalcities('PE');
