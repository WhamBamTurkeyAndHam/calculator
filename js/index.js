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

let previousNumber = '';
let currentNumber = '';
let operator = '';

//Handle numbers that are selected.
numbers.forEach(numbers => numbers.addEventListener('click',(e) => {
  handleNumbers(e.target.textContent);
  bottomDisplay.textContent = currentNumber;
}));

function handleNumbers(num) {
  currentNumber += num;
};

//Handle operators that are selected.
operators.forEach(op => op.addEventListener('click',(e) => {
  handleOperators(e.target.textContent);
  topDisplay.textContent = `${previousNumber} ${operator}`;
  bottomDisplay.textContent = '';
}));

function handleOperators(op) {
  operator = op
  previousNumber = currentNumber;
  currentNumber = '';
};

//Calculate.
equal.addEventListener('click', () => {
  operate();
});

function operate() {
  previousNumber = Number(previousNumber);
  currentNumber = Number(currentNumber);

  //Ternary style if else type statement.
  previousNumber = operator === '+' ? previousNumber + currentNumber 
                  : operator === '-' ? previousNumber - currentNumber 
                  : operator === 'X' ? previousNumber * currentNumber 
                  : currentNumber !== 0 ? previousNumber / currentNumber
                  : 'ERROR: Division by Zero'

  bottomDisplay.textContent = previousNumber;
  currentNumber = previousNumber;
  operator = '';
  return previousNumber;
};