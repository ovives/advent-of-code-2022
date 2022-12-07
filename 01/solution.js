const { readFileSync } = require('fs');

const getElvesCaloriesList = () => {
  const contentList = readFileSync('./input', 'utf-8').split(/\r?\n/);
  return contentList.reduce((previous, current) => {
    const { index, calories } = previous;
    if (!current) {
      return {
        ...previous,
        index: index + 1
      };
    }
    if (calories.length === (index + 1)) {
      calories[index] += parseInt(current);
    } else {
      calories.push(parseInt(current));
    }
    return {
      ...previous,
      calories,
    }
  }, {
    index: 0,
    calories: [],
  });
};

const { calories } = getElvesCaloriesList();
const sortedCalories = calories.sort((a, b) => b - a);
const topCalories = sortedCalories[0];
const top3TotalCalories = sortedCalories.slice(0, 3).reduce((previous, current) => previous + current, 0);
console.log(topCalories);
console.log(top3TotalCalories);
