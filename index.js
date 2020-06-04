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

states().then((states) => {
  let { ID: idState, Sigla: initialsState, Nome: stateName } = states[0];

  let nameFile = `${initialsState}.json`;
  let pathWrite = `./src/json/${nameFile}`;

  cities().then((cities) => {
    let data = { [`${stateName}`]: [] };

    cities.forEach((city) => {
      let { ID: idCity, Nome: cityName, Estado: idCityState } = city;
      if (idCityState === idState) {
        data[`${stateName}`].push(cityName);
      }
    });
    fs.writeFile(pathWrite, JSON.stringify(data));
    //console.log(cities);
  });
});
