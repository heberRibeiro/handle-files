const fs = require('fs').promises;

// prettier-ignore
const {smallestCityNameAndState} = require('./item06_smallestCityNameAndState');

async function smallestCityNameOfAll() {
  let smallestCities = await smallestCityNameAndState('no');
  let citiesAndStates = smallestCities;

  citiesAndStates.sort().sort((a, b) => {
    return a.length - b.length;
  });

  let cityWithSmallestNameOfAll = citiesAndStates[0];
  console.log(cityWithSmallestNameOfAll);
}

module.exports.smallestCityNameOfAll = smallestCityNameOfAll;
