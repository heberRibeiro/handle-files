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

  console.log('==============================================================');
  console.log(
    '04 - Aarray com o UF dos cinco estados que menos \npossuem cidades, seguidos da quantidade, em ordem decrescente.'
  );
  console.log('==============================================================');

  console.log(statesLessCities);
  console.log('');
}

module.exports = statesWithLessCities;
