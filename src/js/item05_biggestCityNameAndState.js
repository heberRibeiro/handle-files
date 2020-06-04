const fs = require('fs').promises;

async function readCities(initials) {
  let path = `src/json/estados/${initials}.json`;
  let read = await fs.readFile(path);

  let cities = JSON.parse(read);

  //console.log(cities);
  return cities; // {state: ['city', 'city', ...] }
}

////readCities('AC');

async function citiesInDescendingOrderBySize(initials) {
  let cities = await readCities(initials); // {state: ['city', 'city', ...] }
  let state = Object.keys(cities)[0];
  cities = cities[state]; // ['city', 'city', ...]

  let citiesSorted = cities.sort((a, b) => {
    return b.length - a.length;
  });
  citiesSortedWithState = {};
  citiesSortedWithState[`${state}`] = citiesSorted;
  //console.log(citiesSortedWithState);
  return citiesSortedWithState; // { state: [ 'city', 'city', ... ] }
}

////citiesInDescendingOrderBySize('AC');

async function biggestCityNameAndState(printOut = 'yes') {
  let dirContent = await fs.readdir('src/json/estados');
  let biggestCityWithState = [];

  for (const nameFileWithExtension of dirContent) {
    let initials = nameFileWithExtension.substr(0, 2);
    let citiesSorted = await citiesInDescendingOrderBySize(initials);
    let state = Object.keys(citiesSorted)[0]; // state
    let biggestCity = citiesSorted[`${state}`][0]; // city
    // prettier-ignore
    biggestCityWithState = [...biggestCityWithState, `${biggestCity}-${initials}`];
  }
  biggestCityWithState.sort((a, b) => {
    return b.length - a.length;
  });
  if (printOut === 'no') {
    return biggestCityWithState;
  } else if (printOut === 'yes' || '') {
    console.log('================================================');
    console.log('05. Array com a cidade de maior nome de cada estado');
    console.log('================================================');
    console.log(biggestCityWithState);
    console.log('');

    return biggestCityWithState;
  }
}

module.exports.biggestCityNameAndState = biggestCityNameAndState;
module.exports.readCities = readCities;
