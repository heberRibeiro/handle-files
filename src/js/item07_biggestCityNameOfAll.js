const fs = require('fs').promises;

const { biggestCityNameAndState } = require('./item05_biggestCityNameAndState');

async function biggestCityNameOfAll() {
  let biggestCities = await biggestCityNameAndState('no');
  let citiesAndStates = biggestCities;

  citiesAndStates.sort((a, b) => {
    return b.length - a.length;
  });

  let cityWithBiggestNameOfAll = citiesAndStates[0];

  console.log('================================================');
  console.log('07. Cidade de maior nome entre todos os estados');
  console.log('================================================');

  console.log(cityWithBiggestNameOfAll + '\n');
}

module.exports.biggestCityNameOfAll = biggestCityNameOfAll;
