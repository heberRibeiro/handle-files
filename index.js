const ITEM01_PATH = './src/js/item01_createJsonForEachState';
const ITEM02_PATH = './src/js/item02_totalCitiesByAcronym';
const ITEM03_PATH = './src/js/item03_statesWithMoreCities';
const ITEM04_PATH = './src/js/item04_statesWithLessCities';
const ITEM05_PATH = './src/js/item05_biggestCityNameAndState.js';
const ITEM06_PATH = './src/js/item06_smallestCityNameAndState.js';
const ITEM07_PATH = './src/js/item07_biggestCityNameOfAll.js';

const fs = require('fs').promises;

const { createJsonStatesWithCities } = require(ITEM01_PATH);
const totalcities = require(ITEM02_PATH);
const { statesWithMoreCities, statesWithCities } = require(ITEM03_PATH);
const statesWithLessCities = require(ITEM04_PATH);
const { biggestCityNameAndState } = require(ITEM05_PATH);
const { smallestCityNameAndState } = require(ITEM06_PATH);
const { biggestCityNameOfAll } = require(ITEM07_PATH);

//createJsonStatesWithCities();
//totalcities('PE').then((data) => console.log(data));
//statesWithMoreCities(5);
//statesWithLessCities(6);
//biggestCityNameAndState().then((data) => console.log(data));
//smallestCityNameAndState();
//biggestCityNameOfAll();

async function smallestCityNameOfAll() {
  let smallestCities = await smallestCityNameAndState('no');
  let citiesAndStates = smallestCities;

  citiesAndStates.sort().sort((a, b) => {
    return a.length - b.length;
  });

  let cityWithSmallestNameOfAll = citiesAndStates[0];
  console.log(cityWithSmallestNameOfAll);
}

// smallestCityNameOfAll();
