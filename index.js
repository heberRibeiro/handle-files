const fs = require('fs').promises;

// Return a state bject
function states() {
  return fs.readFile('./src/json/Estados.json', 'utf-8').then((data) => {
    return Array.from(JSON.parse(data));
  });
}

// Return a cities object
function cities() {
  return fs.readFile('./src/json/Cidades.json', 'utf-8').then((data) => {
    return Array.from(JSON.parse(data));
  });
}

async function createStatesWithCities() {
  let statesArray = await states();
  let citiesArray = await cities();

  statesArray.forEach((state) => {
    let { ID: idState, Sigla: initialsState, Nome: stateName } = state;

    let nameFile = `${initialsState}.json`;
    let pathWrite = `./src/json/estados/${nameFile}`;

    let data = { [`${stateName}`]: [] };

    citiesArray.forEach((city) => {
      let { ID: idCity, Nome: cityName, Estado: idCityState } = city;
      if (idCityState === idState) {
        data[`${stateName}`].push(cityName);
      }
    });
    fs.writeFile(pathWrite, JSON.stringify(data));
  });
}

// createStatesWithCities();

async function totalcities(initials) {
  const pathFile = `src/json/estados/${initials}.json`;

  let data = await fs.readFile(pathFile);

  let key = Object.keys(JSON.parse(data));
  let cities = Array.from(JSON.parse(data)[key]);
  //console.log(`A quantidade de cidade do estado de ${key} é ${cities.length}`);

  return cities.length;
}

//totalcities('PE');

async function statesWithCities() {
  let dirContent = await fs.readdir('src/json/estados');
  let statesAndNumberOfCities = [];

  for (const nameFileWithExtension of dirContent) {
    let initials = nameFileWithExtension.substr(0, 2);

    let numberOfCities = await totalcities(initials);
    let data = `${initials} - ${numberOfCities}`;

    statesAndNumberOfCities = [...statesAndNumberOfCities, data];
  }
  return statesAndNumberOfCities;
}

async function statesWithMoreCities(numberStates = 5) {
  let statesCities = await statesWithCities();
  let statesMoreCities = [];
  statesCities.sort((a, b) => {
    return parseInt(b.substr(5)) - parseInt(a.substr(5));
  });
  statesMoreCities = statesCities.filter((value, ind, arr) => {
    return ind < numberStates;
  });

  console.log(statesMoreCities);
}

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

async function citiesSortedInAscendingOrderBySize(initials) {
  let cities = await readCities(initials); // {state: ['city(3)', 'city(1)', ...] }
  let state = Object.keys(cities)[0];
  cities = cities[state]; // ['city(3)', 'city(1)', ...]

  let citiesSorted = cities.sort((a, b) => {
    return a.length - b.length;
  });
  citiesSortedWithState = {};
  citiesSortedWithState[`${state}`] = citiesSorted;
  // console.log(citiesSortedWithState);
  return citiesSortedWithState; // { state: [ 'city(1)', 'city(2)', ... ] }
}

//citiesSortedInAscendingOrderBySize('AC');

async function smallestCityAndState() {
  let dirContent = await fs.readdir('src/json/estados');
  let smallestCityWithState = [];

  for (const nameFileWithExtension of dirContent) {
    let initials = nameFileWithExtension.substr(0, 2);
    let citiesSorted = await citiesSortedInAscendingOrderBySize(initials);
    let state = Object.keys(citiesSorted)[0]; // state
    let smallestCity = citiesSorted[`${state}`][0]; // city
    // prettier-ignore
    smallestCityWithState = [...smallestCityWithState, `${smallestCity}-${initials}`];
    console.log(smallestCityWithState);
  }
}

smallestCityAndState();
