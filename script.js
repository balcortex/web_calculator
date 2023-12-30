const buttons = document.querySelectorAll("button");
const screen = document.querySelector('div#screen');
let numCur = '0';
let numMem = '0';

buttons.forEach((button) =>
  button.addEventListener("click", handleButton)
);

function handleButton(e) {
  const [, type, value] = e.target.id.split('-');
  // the first part of the id is `button`, we do not need that
  // type -> `num`, `op`, 
  // value -> the actual value of the button (e.g., 7, 0, 8, etc.)'

  switch (type) {
    case 'num':
      numCur += value; // append the pressed number to the right
      screen.innerText = +numCur; // cast to Number (trim left zeros)
      break;

    case 'op':
      numMem = screen.innerText; // save the current number on screen to memory
      numCur = '0';  // clear the current number
      break;

    case 'eq':
      screen.innerText = +numCur + +numMem;
      numMem = screen.innerText;
      numCur = '0'; // clear the memory
      break;
  }
}