const fa = require('fs').promises;
const { statesWithCities } = require('./item03_statesWithMoreCities');

async function statesWithLessCities(numberStates = 5) {
  let statesCities = await statesWithCities();
  let statesLessCities = [];
  statesCities.sort((a, b) => {
    return parseInt(a.substr(5)) - parseInt(b.substr(5));
  });
  statesLessCities = statesCities.filter((value, ind, arr) => {
    return ind < numberStates;
  });

  console.log(statesLessCities);
}

module.exports = statesWithLessCities;
