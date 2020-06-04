const ITEM01_PATH = './src/js/item01_createJsonForEachState';
const ITEM02_PATH = './src/js/item02_totalCitiesByAcronym';
const ITEM03_PATH = './src/js/item03_statesWithMoreCities';
const ITEM04_PATH = './src/js/item04_statesWithLessCities';
const ITEM05_PATH = './src/js/item05_biggestCityNameAndState.js';

const fs = require('fs').promises;

const { createJsonStatesWithCities } = require(ITEM01_PATH);
const totalcities = require(ITEM02_PATH);
const { statesWithMoreCities, statesWithCities } = require(ITEM03_PATH);
const statesWithLessCities = require(ITEM04_PATH);
const { biggestCityNameAndState } = require(ITEM05_PATH);

//createJsonStatesWithCities();
//totalcities('PE').then((data) => console.log(data));
//statesWithMoreCities(5);
//statesWithLessCities(6);
//biggestCityNameAndState();

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
