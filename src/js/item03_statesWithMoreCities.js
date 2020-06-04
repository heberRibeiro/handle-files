const fs = require('fs').promises;
const totalcities = require('./item02_totalCitiesByAcronym');

async function statesWithCities() {
  let dirContent = await fs.readdir('src/json/estados');
  let statesAndNumberOfCities = [];

  for (const nameFileWithExtension of dirContent) {
    let initials = nameFileWithExtension.substr(0, 2);

    let numberOfCities = await totalcities(initials);
    let data = `${initials} - ${numberOfCities}`;

    statesAndNumberOfCities = [...statesAndNumberOfCities, data];
  }
  return statesAndNumberOfCities;
}

async function statesWithMoreCities(numberStates = 5) {
  let statesCities = await statesWithCities();
  let statesMoreCities = [];
  statesCities.sort((a, b) => {
    return parseInt(b.substr(5)) - parseInt(a.substr(5));
  });
  statesMoreCities = statesCities.filter((value, ind, arr) => {
    return ind < numberStates;
  });

  console.log(statesMoreCities);
}

module.exports = statesWithMoreCities;
