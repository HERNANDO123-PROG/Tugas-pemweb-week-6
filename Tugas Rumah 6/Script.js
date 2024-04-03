const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
const resultDisplay = document.querySelector("#display");

let currentValue = '0';
let prevValue = '';
let operator = '';
let result = '';

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent.trim();

    if (!isNaN(value)) {
      if (currentValue === '0') {
        currentValue = value;
      } else {
        currentValue += value;
      }
    } else if (value === '.' && !currentValue.includes('.')) {
      currentValue += value;
    } else if (value === 'C') {
      currentValue = '0';
    } else if (value === '←') {
      currentValue = currentValue.slice(0, -1);
      if (currentValue === '') {
        currentValue = '0';
      }
    } else if (value === '=') {
      if (prevValue === '') {
        prevValue = currentValue;
      }
      if (prevValue !== '' && operator !== '') {
        calculate();
      }
    } else if (value === '%') {
      if (prevValue !== '' && operator !== '') {
        const current = parseFloat(currentValue.replace(',', '.'));
        const prev = parseFloat(prevValue.replace(',', '.'));
        switch (operator) {
          case '+':
            currentValue = ((prev + (prev * current / 100)) || 0).toString();
            break;
          case '-':
            currentValue = ((prev - (prev * current / 100)) || 0).toString();
            break;
          case '*':
            currentValue = ((prev * current / 100) || 0).toString();
            break;
          case '/':
            if (current !== 0) {
              currentValue = (prev / (current / 100) || 0).toString();
            } else {
              currentValue = 'Infinity';
            }
            break;
          default:
            break;
        }
        prevValue = '';
        operator = '';
        updateResult();
      }
    } else {
      if (prevValue !== '') {
        calculate();
      }

      prevValue = currentValue;
      operator = value;
      currentValue = '0';
    }
    updateResult();
  });
});

function calculate() {
  const current = parseFloat(currentValue.replace(',', '.'));
  const prev = parseFloat(prevValue.replace(',', '.'));

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '÷':
      if (current !== 0) {
        result = prev / current;
      } else {
        result = 'Infinity';
      }
      break;
    default:
      break;
  }

  currentValue = result.toString().replace('.', ',');
  prevValue = '';
  result = '';
}

function updateResult() {
  resultDisplay.textContent = currentValue;
}

const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
const toggleIcon = document.querySelector(".toggler-icon");
let isDark = true;

themeToggleBtn.onclick = () => {
  calculator.classList.toggle("dark");
  calculator.classList.toggle("light");
  themeToggleBtn.classList.toggle("active");
  isDark = !isDark;
};
