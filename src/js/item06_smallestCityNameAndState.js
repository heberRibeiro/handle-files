const fs = require('fs').promises;

const { readCities } = require('./item05_biggestCityNameAndState');

async function citiesInAscendingOrderBySize(initials) {
  let cities = await readCities(initials); // {state: ['city', 'city', ...] }
  let state = Object.keys(cities)[0];
  cities = cities[state]; // ['city', 'city', ...]

  let citiesSorted = cities.sort((a, b) => {
    return a.length - b.length;
  });
  citiesSortedWithState = {};
  citiesSortedWithState[`${state}`] = citiesSorted;
  //console.log(citiesSortedWithState);
  return citiesSortedWithState; // { state: [ 'city', 'city', ... ] }
}

////citiesInAscendingOrderBySize('AC');

async function smallestCityNameAndState(printOut = 'yes') {
  let dirContent = await fs.readdir('src/json/estados');
  let smallestCityWithState = [];

  for (const nameFileWithExtension of dirContent) {
    let initials = nameFileWithExtension.substr(0, 2);
    let citiesSorted = await citiesInAscendingOrderBySize(initials);
    let state = Object.keys(citiesSorted)[0]; // state
    let smallestCity = citiesSorted[`${state}`][0]; // city
    // prettier-ignore
    smallestCityWithState = [...smallestCityWithState, `${smallestCity}-${initials}`];
  }

  smallestCityWithState.sort((a, b) => {
    return b.length - a.length;
  });

  if (printOut === 'no') {
    return smallestCityWithState;
  } else if (printOut === 'yes' || '') {
    console.log('================================================');
    console.log('06. Array com a cidade de menor nome de cada estado');
    console.log('================================================');
    console.log(smallestCityWithState);
    console.log('');

    return smallestCityWithState;
  }
}

module.exports.smallestCityNameAndState = smallestCityNameAndState;
