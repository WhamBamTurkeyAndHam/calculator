const mainDisplay = document.querySelector('.displayContainer');
const topDisplay = document.querySelector('.topDisplay');
const bottomDisplay = document.querySelector('.bottomDisplay');
const buttonsContainer = document.querySelector('.buttonsContainer');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');
let numbers = document.querySelectorAll('.numbers');
let operators = document.querySelectorAll('.operators');
const decimal = document.querySelector('.decimal');
const equal = document.querySelector('.equal');

let firstNumber = '';
let secondNumber = '';

//Calculate
equal.addEventListener('click', () => {
  operate();
})

function operate() {
  return  operators === '+' ? firstNumber += secondNumber 
        : operators === '-' ? firstNumber -= secondNumber 
        : operators === 'X' ? firstNumber *= secondNumber 
        : firstNumber /= secondNumber;
};