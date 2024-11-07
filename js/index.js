const mainCalculator = document.querySelector('#js-calculator-container')
const mainDisplay = document.querySelector('#js-display-container');
const topDisplay = document.querySelector('#js-top-display');
const bottomDisplay = document.querySelector('#js-bottom-display');
const buttonsContainer = document.querySelector('#js-buttons-container');
const clearButton = document.querySelector('.clear');
const backspaceButton = document.querySelector('.backspace');
let numberButtons = document.querySelectorAll('.numbers');
let operatorButtons = document.querySelectorAll('.operators');
const decimalButton = document.querySelector('.decimal');
const equalButton = document.querySelector('.equal');

let previousNumber = '';
let currentNumber = '';
let operator = '';

// Clear all elements.
clearButton.addEventListener('click', () => {
  previousNumber = '';
  currentNumber = '';
  operator = '';
  topDisplay.textContent = '';
  bottomDisplay.textContent = '';
});

// Handle numbers that are selected.
numberButtons.forEach(numbers => numbers.addEventListener('click',(e) => {
  handleNumberButtons(e.target.textContent);
  bottomDisplay.textContent = `${previousNumber} ${operator} ${currentNumber}`;
}));

function handleNumberButtons(num) {
  currentNumber += num;
};

// Handle operators that are selected.
operatorButtons.forEach(op => op.addEventListener('click',(e) => {
  if (previousNumber !== '' && operator !== '' && currentNumber !== '') {
    operate();
  }
  handleOperatorButtons(e.target.textContent);
  bottomDisplay.textContent = `${previousNumber} ${operator} ${currentNumber}`;
}));

function handleOperatorButtons(op) {
  if (currentNumber === '' && previousNumber !== '') {
    // Update operator if no new number was entered.
    operator = op;
    bottomDisplay.textContent = `${previousNumber} ${operator} ${currentNumber}`;
    return;
  }
  operator = op;
  previousNumber = currentNumber;
  currentNumber = '';
};


// Calculate.
equalButton.addEventListener('click', () => {
  // Check if the first number is empty, or the first number exists but the operator is empty.
  if (currentNumber === '' || currentNumber !== '' && operator === '') return bottomDisplay.textContent = 'ERROR: Invalid Input';
  if (previousNumber !== '' && operator !== '' && currentNumber !== '') {
    const originalPrevious = previousNumber; // Store for display.
    const originalOperator = operator; // Store for display.
    const originalCurrent = currentNumber;   // Store for display.

    topDisplay.textContent = `${originalPrevious} ${originalOperator} ${originalCurrent} =`;

    operate();
  }
});

function operate() {
  let num1 = Number(previousNumber);
  let num2 = Number(currentNumber);

  // Ternary style if else type statement.
  sum = operator === '+' ? num1 + num2 
      : operator === '-' ? num1 - num2 
      : operator === 'X' ? num1 * num2 
      : num2 !== 0 ? num1 / num2
      : num1 === 0 && num2 === 0 ? 'ERROR: Indeterminate'
      : 'ERROR: Division by Zero';

  bottomDisplay.textContent = sum; // Show sum at bottom.
  previousNumber = sum; // Make the sum become the first number.
  currentNumber = ''; // Clear the second number so it is ready to be operated on with the first number.
  operator = ''; // Clear the operator so a new one can be used with the next sum.
};