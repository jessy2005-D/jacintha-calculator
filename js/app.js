const historyElem = document.getElementById('historyDisplay');
const currentElem = document.getElementById('currentDisplay');
const calc = new Calculator(historyElem, currentElem);

// Event Listeners with Audio
document.querySelectorAll('[data-val]').forEach(btn => {
  btn.addEventListener('click', () => {
    playClickSound(320);
    calc.appendNumber(btn.dataset.val);
  });
});

document.querySelectorAll('[data-op]').forEach(btn => {
  btn.addEventListener('click', () => {
    playClickSound(480, 'triangle');
    calc.chooseOperation(btn.dataset.op);
  });
});

document.getElementById('equalsBtn').addEventListener('click', () => {
  playClickSound(640, 'triangle');
  calc.compute();
});

document.getElementById('clearBtn').addEventListener('click', () => {
  playClickSound(220, 'square');
  calc.clear();
});

document.getElementById('delBtn').addEventListener('click', () => {
  playClickSound(260, 'square');
  calc.delete();
});

document.getElementById('signBtn').addEventListener('click', () => {
  playClickSound(360);
  calc.toggleSign();
});

// Keyboard support
window.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
    playClickSound(320);
    calc.appendNumber(e.key);
  }
  if (['+', '-', '*', '/'].includes(e.key)) {
    playClickSound(480, 'triangle');
    calc.chooseOperation(e.key);
  }
  if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    playClickSound(640, 'triangle');
    calc.compute();
  }
  if (e.key === 'Backspace') {
    playClickSound(260, 'square');
    calc.delete();
  }
  if (e.key === 'Escape') {
    playClickSound(220, 'square');
    calc.clear();
  }
});