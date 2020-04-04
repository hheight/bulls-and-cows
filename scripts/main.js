'use strict';

const gameWindow = document.querySelector('.started');
const alertMsg = document.querySelector('.error-msg');
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
  startBtn.classList.add('hidden');

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
  switch (true) {
    case !enteredNumber:
      alertMsg.innerHTML = 'Enter the digits, please';
      break;
    case enteredNumber.length !== 4:
      alertMsg.innerHTML = 'Enter four digits, please';
      break;
    case /\D|(.).*\1/.test(enteredNumber):
      alertMsg.innerHTML = 'There must be only unique digits';
      break;
    default:
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
        alertMsg.innerHTML = 'You Won! Congratulations!';
      }

      const prevNum = document.createElement('p');

      prevNum.innerHTML = `
        ${enteredNumber}
        Bulls:${animals.bulls}
        Cows:${animals.cows}
      `;
      prevNumbers.prepend(prevNum);
      break;
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
  startBtn.classList.remove('hidden');
}

function textReset() {
  generatedNumber = '';
  prevNumbers.innerHTML = '';
  alertMsg.innerHTML = '';
}
