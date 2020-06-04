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

  console.log('================================================');
  console.log('08. Cidade de menor nome entre todos os estados');
  console.log('================================================');

  console.log(cityWithSmallestNameOfAll + '\n');
}

module.exports.smallestCityNameOfAll = smallestCityNameOfAll;
