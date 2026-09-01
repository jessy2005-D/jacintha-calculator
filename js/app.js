const historyElem = document.getElementById('historyDisplay');
const currentElem = document.getElementById('currentDisplay');
const historyList = document.getElementById('historyList');
const historyDrawer = document.getElementById('historyDrawer');
const historyToggleBtn = document.getElementById('historyToggleBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

const tape = [];

function handleNewCalculation(expression, result) {
  tape.unshift({ expression, result });
  renderHistory();
}

function renderHistory() {
  if (tape.length === 0) {
    historyList.innerHTML = '<div class="history-empty">No calculations yet</div>';
    return;
  }
  historyList.innerHTML = tape
    .map(item => `
      <div class="history-item">
        <div class="history-item-exp">${item.expression}</div>
        <div class="history-item-res">= ${item.result}</div>
      </div>
    `)
    .join('');
}

const calc = new Calculator(historyElem, currentElem, handleNewCalculation);

// Toggle History Drawer
historyToggleBtn.addEventListener('click', () => {
  historyDrawer.classList.toggle('hidden');
});

// Clear Tape
clearHistoryBtn.addEventListener('click', () => {
  tape.length = 0;
  renderHistory();
});

// Keypad Event Handlers
document.querySelectorAll('[data-val]').forEach(btn => {
  btn.addEventListener('click', () => calc.appendNumber(btn.dataset.val));
});

document.querySelectorAll('[data-op]').forEach(btn => {
  btn.addEventListener('click', () => calc.chooseOperation(btn.dataset.op));
});

document.getElementById('equalsBtn').addEventListener('click', () => calc.compute());
document.getElementById('clearBtn').addEventListener('click', () => calc.clear());
document.getElementById('delBtn').addEventListener('click', () => calc.delete());
document.getElementById('signBtn').addEventListener('click', () => calc.toggleSign());

// Keyboard Bindings
window.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') calc.appendNumber(e.key);
  if (['+', '-', '*', '/'].includes(e.key)) calc.chooseOperation(e.key);
  if (e.key === 'Enter' || e.key === '=') calc.compute();
  if (e.key === 'Backspace') calc.delete();
  if (e.key === 'Escape') calc.clear();
});