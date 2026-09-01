class Calculator {
  constructor(historyElem, currentElem, onCalculation) {
    this.historyElem = historyElem;
    this.currentElem = currentElem;
    this.onCalculation = onCalculation;
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    if (this.currentOperand === '0') return;
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === '' || this.currentOperand === '-') {
      this.currentOperand = '0';
    }
    this.updateDisplay();
  }

  toggleSign() {
    if (this.currentOperand === '0') return;
    this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '0';
    this.updateDisplay();
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+': computation = prev + current; break;
      case '-': computation = prev - current; break;
      case '*': computation = prev * current; break;
      case '/': computation = current === 0 ? 'Error' : prev / current; break;
      default: return;
    }

    const expressionStr = `${this.previousOperand} ${this.getSymbol(this.operation)} ${this.currentOperand}`;
    const resultStr = computation.toString();

    if (this.onCalculation) {
      this.onCalculation(expressionStr, resultStr);
    }

    this.currentOperand = resultStr;
    this.operation = undefined;
    this.previousOperand = '';
    this.updateDisplay();
  }

  getSymbol(op) {
    if (op === '*') return '×';
    if (op === '/') return '÷';
    if (op === '-') return '−';
    return op;
  }

  updateDisplay() {
    this.currentElem.innerText = this.currentOperand;
    if (this.operation != null) {
      this.historyElem.innerText = `${this.previousOperand} ${this.getSymbol(this.operation)}`;
    } else {
      this.historyElem.innerText = '';
    }
  }
}