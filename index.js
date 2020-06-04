const fs = require('fs').promises;

// prettier-ignore
const { createJsonStatesWithCities } = require('./src/js/item01_createJsonForEachState');
const totalcities = require('./src/js/item02_totalCitiesByAcronym');
const statesWithMoreCities = require('./src/js/item03_statesWithMoreCities');

//createJsonStatesWithCities();
//totalcities('PE').then((data) => console.log(data));
//statesWithMoreCities();

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

//statesWithLessCities(6);

async function readCities(initials) {
  let path = `src/json/estados/${initials}.json`;
  let read = await fs.readFile(path);

  let cities = JSON.parse(read);

  //console.log(cities);
  return cities; // {state: ['city', 'city', ...] }
}

//readCities('AC');

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

//citiesInAscendingOrderBySize('AC');

async function smallestCityAndState(printOut = 'yes') {
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
  if (printOut === 'no') {
    return smallestCityWithState;
  } else if (printOut === 'yes' || '') {
    console.log(smallestCityWithState);
    return smallestCityWithState;
  }
}

//smallestCityAndState();

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

//citiesInDescendingOrderBySize('AC');

async function biggestCityAndState() {
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
  console.log(biggestCityWithState);
}

//biggestCityAndState();

async function smallestCityOfAll() {
  let smallestCities = await smallestCityAndState('no');
  let citiesAndStates = smallestCities;

  citiesAndStates.sort().sort((a, b) => {
    return a.length - b.length;
  });

  let cityWithSmallestNameOfAll = citiesAndStates[0];
  console.log(cityWithSmallestNameOfAll);
}

// smallestCityOfAll();
