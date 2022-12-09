const { readFileSync } = require('fs');

const isLowerCase = (str) => str === str.toLowerCase();

const getCharValue = (str) => isLowerCase(str)
  ? (str.charCodeAt() % 97) + 1
  : ((str.charCodeAt() % 65) + 1) + 26;

const findItemValue = (firstCompartment, secondCompartment) => {
  for (let i = 0; i < firstCompartment.length; i++) {
    if (secondCompartment.includes(firstCompartment[i])) {
      return getCharValue(firstCompartment[i]);
    }
  }
  return 0;
};

const getPriorities = (rucksacksList) =>
  rucksacksList.reduce((previous, current) => {
    const middle = Math.floor(current.length / 2);
    const firstCompartment = current.slice(0, middle);
    const secondCompartment = current.slice(middle);
    return previous + findItemValue(firstCompartment, secondCompartment);
  }, 0);

const findThreeElvesItemValue = (first, second, third) => {
  for (let i = 0; i < first.length; i++) {
    if (second.includes(first[i]) && third.includes(first[i])) {
      return getCharValue(first[i]);
    }
  }
  return 0;
}

const getThreeElvesItems = (rucksacksList) => {
  const threeElvesRucksacks = [];
  for (let i = 0; i < rucksacksList.length; i+=3) {
    threeElvesRucksacks.push([
      rucksacksList[i],
      rucksacksList[i+1],
      rucksacksList[i+2],
    ]);
  }
  return threeElvesRucksacks.reduce((previous, [first, second, third]) => 
    previous + findThreeElvesItemValue(first, second, third)
  , 0);
}

const contentRows = readFileSync('./input', 'utf-8').split(/\r?\n/);
console.log('Part One: ', getPriorities(contentRows));
console.log('Part Two: ', getThreeElvesItems(contentRows));
