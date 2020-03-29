'use strict';

const rulesWindow = document.querySelector('.rules');
const gameWindow = document.querySelector('.game');
const alertMsg = document.querySelector('.message');
const userInput = document.querySelector('.input');
const startBtn = document.querySelector('.start');
const checkBtn = document.querySelector('.check');
const endBtn = document.querySelector('.end');
const prevNumbers = document.querySelector('.prev');

let generatedNumber = '';
let enteredNumber;

startBtn.addEventListener('click', gameStart);
checkBtn.addEventListener('click', checkNumber);
endBtn.addEventListener('click', endGame);

function gameStart() {
  textReset();
  gameWindow.classList.remove('hidden');
  rulesWindow.classList.add('hidden');

  const generateDigit = () => Math.floor(Math.random() * 10);

  for (let i = 0; i < 4; i++) {
    let randomDigit = generateDigit();

    while (generatedNumber.includes(randomDigit)) {
      randomDigit = generateDigit();
    }

    generatedNumber += randomDigit;
  }
}

function bullsAndCows() {
  if (!enteredNumber) {
    alertMsg.innerHTML = 'Enter the number, please';
  } else if (enteredNumber.length !== 4) {
    alertMsg.innerHTML = 'The number must contain 4 digits';
  } else if (/\D|(.).*\1/.test(enteredNumber)) {
    alertMsg.innerHTML = 'The number can\'t contain letter or repeated digit';
  } else {
    alertMsg.innerHTML = '';

    const animals = {
      bulls: 0,
      cows: 0,
    };

    for (const num of enteredNumber) {
      if (generatedNumber.indexOf(num) === enteredNumber.indexOf(num)) {
        animals.bulls++;
      } else if (generatedNumber.includes(num)) {
        animals.cows++;
      }
    }

    if (animals.bulls === 4) {
      alertMsg.innerHTML = 'You Won!';
    }

    const prevNum = document.createElement('div');

    prevNum.innerHTML = `
      ${enteredNumber}
      Bulls:${animals.bulls}
      Cows: ${animals.cows}
    `;
    prevNumbers.prepend(prevNum);
  }
}

function checkNumber(e) {
  enteredNumber = userInput.value;
  bullsAndCows();
  userInput.value = '';
  e.preventDefault();
}

function endGame() {
  gameWindow.classList.add('hidden');
  rulesWindow.classList.remove('hidden');
}

function textReset() {
  generatedNumber = '';
  prevNumbers.innerHTML = '';
  alertMsg.innerHTML = '';
}
