// VARIABLES - calculator ki memory
let currentNumber  = "0";   // screen pe dikhne wala number
let previousNumber = "";    // pehla number (operator se pehle)
let operator       = null;  // kon sa operator press hua
let shouldReset    = false; // true ho to next digit se fresh start

// Screen update karo
function updateDisplay() {
  document.getElementById("result").textContent = currentNumber;
}

// Number button press
function pressDigit(digit) {
  if (shouldReset) {
    currentNumber = digit;
    shouldReset = false;
  } else {
    if (currentNumber.length >= 10) return; // zyada lamba nahi
    currentNumber = currentNumber === "0" ? digit : currentNumber + digit;
  }
  updateDisplay();
}

// Dot (.) button press
function pressDot() {
  if (shouldReset) { currentNumber = "0."; shouldReset = false; updateDisplay(); return; }
  if (!currentNumber.includes(".")) { currentNumber += "."; updateDisplay(); }
}

// Operator button press (+, -, *, /)
function setOperator(op) {
  if (operator && !shouldReset) calculate(false);
  previousNumber = currentNumber;
  operator = op;
  shouldReset = true;
  let sym = { "/": "÷", "*": "×", "-": "−", "+": "+" }[op];
  document.getElementById("expression").textContent = previousNumber + " " + sym;
}

// Equals - calculate karo
function calculate(showEquals = true) {
  if (!operator || !previousNumber) return;
  let a = parseFloat(previousNumber);
  let b = parseFloat(currentNumber);
  let answer;

  if (operator === "+") answer = a + b;
  if (operator === "-") answer = a - b;
  if (operator === "*") answer = a * b;
  if (operator === "/") {
    if (b === 0) { currentNumber = "Error"; updateDisplay(); operator = null; return; }
    answer = a / b;
  }

  answer = parseFloat(answer.toPrecision(10));

  if (showEquals) {
    let sym = { "/": "÷", "*": "×", "-": "−", "+": "+" }[operator];
    document.getElementById("expression").textContent = previousNumber + " " + sym + " " + currentNumber + " =";
    operator = null;
    previousNumber = "";
  }

  currentNumber = String(answer);
  shouldReset = true;
  updateDisplay();
}

// AC - sab clear karo
function clearAll() {
  currentNumber = "0"; previousNumber = ""; operator = null; shouldReset = false;
  document.getElementById("expression").textContent = "";
  updateDisplay();
}

// +/- sign toggle
function toggleSign() {
  currentNumber = String(parseFloat(currentNumber) * -1);
  updateDisplay();
}

// % - percentage
function percent() {
  currentNumber = String(parseFloat(currentNumber) / 100);
  updateDisplay();
}
