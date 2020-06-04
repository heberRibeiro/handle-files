const fs = require('fs').promises;

const { biggestCityNameAndState } = require('./item05_biggestCityNameAndState');

async function biggestCityNameOfAll() {
  let biggestCities = await biggestCityNameAndState();
  let citiesAndStates = biggestCities;

  citiesAndStates.sort((a, b) => {
    return b.length - a.length;
  });

  let cityWithBiggestNameOfAll = citiesAndStates[0];
  console.log(cityWithBiggestNameOfAll);
}

module.exports.biggestCityNameOfAll = biggestCityNameOfAll;
