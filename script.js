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
      screen.innerText = +numCur; // cast to Number (trim left zeros)
      break;

    case 'dot':
      if (!numCur.includes('.')) { // if there isn't a decimal point
        numCur += '.';             // add one, else do nothing.
        screen.innerText = numCur;
      }
      break;

    case 'del':
      numCur = numCur.slice(0, -1); // delete rightmost digit
      if (numCur == '') numCur = '0'; // if empty, set to 0
      screen.innerText = numCur;
      break;

    case 'c': // clear the screen only
      numCur = '0';
      screen.innerText = numCur;
      break;

    case 'ac': // clear memory and screen
      numCur = '0';
      numMem = '0';
      screen.innerText = numCur;
      break;

    case 'op':
      numMem = screen.innerText; // save the current number on screen to memory
      numCur = '';  // clear the current number
      operator = value;
      break;

    case 'eq':
      let result = performOperation(+numMem, +numCur, operator);
      screen.innerText = parseNumberScreen(result);
      numMem = screen.innerText;
      numCur = ''; // clear the memory
      break;
  }
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

function parseNumberScreen(number) {
  if (Number.isInteger(number)) return number;
  else return +number.toFixed(DECIMAL_PLACES);
}