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
  bottomDisplay.textContent = 0;
  backspaceButton.disabled = false;
});

// Clear display.
function clearDisplay() {
  currentNumber = '';
  previousNumber = '';
  operator = '';
}

// Backspace element.
backspaceButton.addEventListener('click', () => {
  currentNumber = currentNumber.slice(0, -1);
  bottomDisplay.textContent = `${previousNumber} ${operator} ${currentNumber}`;
});

// Handle numbers that are selected.
numberButtons.forEach(numbers => numbers.addEventListener('click',(e) => {
  if (currentNumber === '0') currentNumber = '';
  if (bottomDisplay.textContent.includes('ERROR')) { // If there is an error message displayed, reset everything.
    bottomDisplay.textContent = '';
    clearDisplay()

    // Clear top display after some delay. (This will be later changed to fade out when I get around to CSS)
    setTimeout(() => {
      topDisplay.textContent = '';
    }, 1500);
  }
  const num = e.target.textContent;
  currentNumber += num;
  bottomDisplay.textContent = `${previousNumber} ${operator} ${currentNumber}`;
}));

// Handle operators that are selected.
operatorButtons.forEach(button => button.addEventListener('click', (e) => {
  if (previousNumber !== '' && operator && currentNumber) {
    operate();
  }
  operator = e.target.textContent;
  previousNumber = currentNumber || previousNumber;
  currentNumber = '';
  backspaceButton.disabled = false;
  bottomDisplay.textContent = `${previousNumber} ${operator} ${currentNumber}`;
}));

equalButton.addEventListener('click', () => {
  // Handle invalid input scenario.
  if (currentNumber === '' || operator === '') {
    bottomDisplay.textContent = 'ERROR: Invalid Input';
    
    // Reset the calculator state after displaying the error.
    clearDisplay()

    // Clear top display after some delay. (This will be later changed to fade out when I get around to CSS).
    setTimeout(() => {
      topDisplay.textContent = '';
    }, 1500);
  } else {
    // Proceed with normal calculation if all values are valid.
    if (previousNumber !== '' && operator !== '' && currentNumber !== '') {
      topDisplay.textContent = `${previousNumber} ${operator} ${currentNumber} =`;
      operate();
    }
  }
});

function operate() {
  let num1 = Number(previousNumber);
  let num2 = Number(currentNumber);
  sum = '';

  // Switch/Case style with if else statement.
  
  switch (operator) {
    case '+':
      sum = num1 + num2;
      break
    case '-':
      sum = num1 - num2;
      break
    case 'X':
      sum = num1 * num2;
      break
    case '÷':
      if (num1 === 0 && num2 === 0) {
        sum = bottomDisplay.textContent = 'ERROR: Indeterminate'

        clearDisplay()
    
        // Clear top display after some delay. (This will be later changed to fade out when I get around to CSS)
        setTimeout(() => {
          topDisplay.textContent = '';
        }, 1500);

      } else if (num2 === 0) {
        sum = bottomDisplay.textContent = 'ERROR: Division by Zero';

        clearDisplay()
    
      } else {
        sum = num1 / num2;
      }
      break
    default:
      sum = 'ERROR: Invalid Operator';
      bottomDisplay.textContent = sum;
  }

  backspaceButton.disabled = true;
  bottomDisplay.textContent = sum; // Show sum at bottom.
  previousNumber = sum; // Make the sum become the first number.
  currentNumber = ''; // Clear the second number so it is ready to be operated on with the first number.
  operator = ''; // Clear the operator so a new one can be used with the next sum.
};