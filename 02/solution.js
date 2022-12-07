const { readFileSync } = require('fs');

const winnerRules = {
  'X': 'Z',
  'Y': 'X',
  'Z': 'Y',
};

const shapeScores = {
  'X': 1,
  'Y': 2,
  'Z': 3,
};

const opponentShapes = {
  'A': 'X',
  'B': 'Y',
  'C': 'Z',
};

const decryptedRoundScore = {
  'X': 0,
  'Y': 3,
  'Z': 6,
};

const getRoundOutcomeScore = (opponent, me) => {
  if (opponent === me) {
    return 3;
  }
  if (winnerRules[me] === opponent) {
    return 6;
  }
  return 0;
};

const getTotalScore = () =>
  contentRows.reduce((previous, [opponent, _, me]) =>
    previous + shapeScores[me] + getRoundOutcomeScore(opponentShapes[opponent], me)
  , 0);

const getShapeToPlay = (opponent, me) => {
  if (me === 'X') {
    return winnerRules[opponent];
  }
  if (me === 'Y') {
    return opponent;
  }
  return Object.entries(winnerRules).find(([,value]) => value === opponent)[0];
};

const getCorrectlyDecryptedTotalScore = () =>
  contentRows.reduce((previous, [opponent, _, me]) =>
    previous + shapeScores[getShapeToPlay(opponentShapes[opponent], me)] + decryptedRoundScore[me]
  , 0);

const contentRows = readFileSync('./input', 'utf-8').split(/\r?\n/);
console.log('Part One: ', getTotalScore());
console.log('Part Two: ', getCorrectlyDecryptedTotalScore());
