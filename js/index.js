const mainCalculator = document.querySelector('#js-calculator-container')
const mainDisplay = document.querySelector('#js-display-container');
const topDisplay = document.querySelector('#js-top-display');
const bottomDisplay = document.querySelector('#js-bottom-display');
const buttonsContainer = document.querySelector('#js-buttons-container');
const clearButton = document.querySelector('.clear');
const backspaceButton = document.querySelector('.backspace');
let numberButtons = document.querySelectorAll('.numbers');
let operatorButtons = document.querySelectorAll('.operators');
const equalButton = document.querySelector('.equal');
const backgroundAudio = document.querySelector('.backgroundAudio');
const muteButton = document.querySelector('.backgroundMute');
const backgroundVideo = document.querySelector('#backgroundVideo');
const backgroundVideoButton = document.querySelector('.backgroundVideoButton');

// Background video button toggle.
backgroundVideoButton.addEventListener('click', () => {
   if (backgroundVideo.style.display === 'none') {
    backgroundVideoButton.innerHTML = '<i class="fa-regular fa-image"</i>';
    backgroundVideo.style.display = 'block';
  } else {
    backgroundVideoButton.innerHTML = '<i class="fa-solid fa-image"></i>';
    backgroundVideo.style.display = 'none';
  };
});

// Background sound button toggle.
backgroundAudio.muted = true;
backgroundAudio.volume = 0.1;

// Add event listener to mute button to toggle mute/unmute.
muteButton.addEventListener('click', () => {
  backgroundAudio.muted = !backgroundAudio.muted;

  if (backgroundAudio.muted) {
    muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  } else {
    muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    // Play the audio when unmuted, if not already playing.
    if (backgroundAudio.paused) {
      backgroundAudio.play().catch(error => {
        console.log("Audio failed to play:", error);
      });
    }
  };
});

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
  bottomDisplay.classList.remove('moreSpace');
  bottomDisplay.classList.remove('evenMoreSpace');
});

// Clear display.
function clearDisplay() {
  currentNumber = '';
  previousNumber = '';
  operator = '';
};

// Backspace element.
backspaceButton.addEventListener('click', () => {
  currentNumber = currentNumber.slice(0, -1);
  bottomDisplay.textContent = `${previousNumber} ${operator} ${currentNumber}`;
});

// Handle numbers that are selected.
numberButtons.forEach(numbers => numbers.addEventListener('click',(e) => {
  const num = e.target.textContent;

  if (currentNumber === '0') currentNumber = '';

  // Append number if it's not a duplicate decimal.
  if (!(num === '.' && currentNumber.includes('.'))) currentNumber += num;

  // If there is an error message displayed, reset everything.
  if (bottomDisplay.textContent.includes('ERROR')) {
    bottomDisplay.textContent = '';
    bottomDisplay.classList.remove('evenMoreSpace');
    clearDisplay()

    setTimeout(() => {
      topDisplay.textContent = '';
    }, 1500);
  }
  bottomDisplay.textContent = `${previousNumber} ${operator} ${currentNumber}`;
}));

// Handle operators that are selected.
operatorButtons.forEach(button => button.addEventListener('click', (e) => {
  if (previousNumber !== '' && operator && currentNumber) {
    topDisplay.textContent = `${previousNumber} ${operator} ${currentNumber} =`;
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
  if (previousNumber === '' || currentNumber === '' || operator === '') {
    bottomDisplay.textContent = 'ERROR: Invalid Input';
    bottomDisplay.classList.add('evenMoreSpace');
    
    // Reset the calculator state after displaying the error.
    clearDisplay()

    setTimeout(() => {
      topDisplay.textContent = '';
    }, 1500);
  } else {
    // Proceed with normal calculation if all values are valid.
    if (previousNumber !== '' && operator !== '' && currentNumber !== '') {
      topDisplay.textContent = `${previousNumber} ${operator} ${currentNumber} =`;
      operate();
    }
  };
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
    case 'x':
      sum = num1 * num2;
      break
    case '÷':
      if (num1 === 0 && num2 === 0) {
        sum = bottomDisplay.textContent = 'ERROR: Indeterminate'
        bottomDisplay.classList.add('evenMoreSpace');

        clearDisplay()
    
        setTimeout(() => { topDisplay.textContent = ''; }, 1500);

      } else if (num2 === 0) {
        sum = bottomDisplay.textContent = 'ERROR: Division by Zero';
        bottomDisplay.classList.add('evenMoreSpace');

        clearDisplay()

        setTimeout(() => { topDisplay.textContent = ''; }, 1500);
    
      } else {
        sum = num1 / num2;
      };
      break
    default:
      sum = 'ERROR: Invalid Operator';
      bottomDisplay.textContent = sum;
      bottomDisplay.classList.add('evenMoreSpace');
  };

  backspaceButton.disabled = true;

    // Format the sum for display.
  const formattedSum = parseFloat(sum.toFixed(6)); // Removes unnecessary trailing zeros.
  const formattedSumWithCommas = formattedSum.toLocaleString(); // Adds commas for thousands.
  bottomDisplay.textContent = formattedSumWithCommas;

  // Calculate the length of the formatted sum.
  const sumLength = formattedSum.toString().length;

  // Add appropriate class based on length.
  if (sumLength >= 7 && sumLength < 10) {
    bottomDisplay.classList.add('moreSpace');
  } else if (sumLength >= 10) {
    bottomDisplay.classList.remove('moreSpace');
    bottomDisplay.classList.add('evenMoreSpace');
  } else {
    bottomDisplay.classList.remove('moreSpace', 'evenMoreSpace'); // Remove classes if not needed.
  };

  previousNumber = sum; // Make the sum become the first number.
  currentNumber = ''; // Clear the second number so it is ready to be operated on with the first number.
  operator = ''; // Clear the operator so a new one can be used with the next sum.
};

// Handle keyboard support.
window.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key) || key ==='.') {
    handleNumberInput(key);
  }

  if (['+', '-', '*', '/'].includes(key)) {
    handleOperatorInput(key);
  }

  if (key === 'Enter') {
    equalButton.click();
  }

  if (key === 'Backspace') {
    backspaceButton.click();
  }

  if (key === 'Escape') {
    clearButton.click();
  }
});

// Handle number input.
function handleNumberInput(num) {
  const button = [...numberButtons].find(btn => btn.textContent === num);
  if (button) button.click();
};

// Handle operator input.
function handleOperatorInput(op) {
  let operatorSymbol = op;
  if (op === '*') operatorSymbol = 'x';
  if (op === '/') operatorSymbol = '÷';

  const button = [...operatorButtons].find(btn => btn.textContent === operatorSymbol);
  if (button) button.click();
};