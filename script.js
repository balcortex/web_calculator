const DECIMAL_PLACES = 4;
const buttons = document.querySelectorAll("button");
const screen = document.querySelector('div#screen');
let numCur = '';
let numMem = '';
let operator = '';

buttons.forEach((button) =>
  button.addEventListener("click", handleButton)
);

function handleButton(e) {
  const [, type, value] = e.target.id.split('-');
  // the first part of the id is `button`, we do not need that
  // type -> `num`, `op`, 
  // value -> the actual value of the button (e.g., 7, 0, 8, etc.)

  switch (type) {
    case 'num':
      numCur += value; // append the pressed number to the right
      screen.innerText = toScreen(numCur);
      break;

    case 'dot':
      if (!numCur.includes('.')) { // if there isn't a decimal point
        numCur += '.';             // add one, else do nothing.
        screen.innerText = toScreen(numCur);
      }
      break;

    case 'del':
      numCur = numCur.slice(0, -1); // delete rightmost digit
      if (numCur == '') numCur = '0'; // if empty, set to 0
      screen.innerText = toScreen(numCur);
      break;

    case 'c': // clear the screen only
      numCur = '0';
      screen.innerText = toScreen(numCur);
      break;

    case 'ac': // clear memory and screen
      numCur = '';
      numMem = '';
      screen.innerText = toScreen(numCur);
      break;

    case 'op':
      numMem = fromScreen(screen.innerText); // save screen number to memory
      numCur = '';  // clear the current number
      operator = value;
      break;

    case 'eq':
      let result = performOperation(+numMem, +numCur, operator).toString();
      screen.innerText = toScreen(result);
      numMem = fromScreen(screen.innerText);
      numCur = ''; // clear the memory
      break;
  }
}

function toScreen(number) {
  // Input: a string that can be directly converted to a number
  // Output: a formatted string representing a number

  // The decimal point won't be shown unless there's a number right after
  // so we need to add it manually until the user inputs more numbers.
  let decimalFlag = false;

  if (number[0] === '.') {
    number = '0' + number; // add a zero to left of decimal point if needed
  }

  if (number.slice(-1) === '.') {
    decimalFlag = true; // if last character is a decimal point
  }

  number = +number // trim left zeros and cast to Number

  if (!Number.isInteger(number)) {
    number = +number.toFixed(DECIMAL_PLACES); // if float, round decimals
  }

  // Format with comma-separated thousands
  number = number.toLocaleString();

  if (decimalFlag) {
    number += '.'; // add manually the decimal point if needed
  }

  return number
}

function fromScreen(string) {
  // Input: a formatted string (comma-separated thousands)
  // Output: a number
  return +string.replaceAll(',', '');
}

function performOperation(num1, num2, operator) {
  switch (operator) {
    case 'div':
      return num1 / num2;
    case 'mul':
      return num1 * num2;
    case 'dif':
      return num1 - num2;
    default:
      return num1 + num2;
  }
}
