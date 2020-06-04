const fs = require('fs').promises;

// Return a array state of object
/**
 * [
 *  { ID: '1', Sigla: 'AC', Nome: 'Acre' },
 *  { ID: '2', Sigla: 'AL', Nome: 'Alagoas' },
 *  { ID: '3', Sigla: 'AM', Nome: 'Amazonas' },
 * ...]
 **/
async function states() {
  let state = await fs.readFile('src/json//Estados.json');
  return Array.from(JSON.parse(state));
}

// Return a array cities of object
/**
 * [
 *  { ID: '1', Nome: 'Afonso Cláudio', Estado: '8' },
 *  { ID: '2', Nome: 'Água Doce do Norte', Estado: '8' },
 *  { ID: '3', Nome: 'Águia Branca', Estado: '8' },
 *  { ID: '4', Nome: 'Alegre', Estado: '8' },
 * ...]
 */
async function cities() {
  let city = await fs.readFile('src/json/Cidades.json');
  return Array.from(JSON.parse(city));
}

async function createJsonStatesWithCities() {
  let statesArray = await states();
  let citiesArray = await cities();
  statesArray.forEach((state) => {
    // { ID: '1', Sigla: 'AC', Nome: 'Acre' },
    let { ID: idState, Sigla: initialsState, Nome: stateName } = state;
    let nameFile = `${initialsState}.json`;
    let pathWrite = `src/json/estados/${nameFile}`;
    let data = { [`${stateName}`]: [] };
    citiesArray.forEach((city) => {
      // { ID: '1', Nome: 'Afonso Cláudio', Estado: '8' },
      let { ID: idCity, Nome: cityName, Estado: idCityState } = city;
      if (idCityState === idState) {
        data[`${stateName}`].push(cityName);
      }
    });
    fs.writeFile(pathWrite, JSON.stringify(data));
  });
}

module.exports.createJsonStatesWithCities = createJsonStatesWithCities;
// module.exports.states = states;
// module.exports.cities = cities;
