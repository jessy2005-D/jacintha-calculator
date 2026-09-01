// Math Formula Background Generator
const mathSymbols = [
  '∫ f(x)dx', '∑ n²', 'π ≈ 3.14159', 'e^(iπ) + 1 = 0', '√x²', 
  'lim x→∞', '∂y/∂x', 'E = mc²', 'sin²θ + cos²θ = 1', '∇ × B = μ₀J', 
  'f(x) = ax + b', 'λ = h/p', 'Δx · Δp ≥ ℏ/2', 'log₂(n)', 'x = (-b±√D)/2a'
];

function initMathBackground() {
  const canvas = document.getElementById('mathCanvas');
  if (!canvas) return;
  
  for (let i = 0; i < 28; i++) {
    const el = document.createElement('div');
    el.className = 'math-symbol';
    el.innerText = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
    el.style.left = `${Math.random() * 95}vw`;
    el.style.fontSize = `${Math.random() * 14 + 14}px`;
    el.style.animationDuration = `${Math.random() * 12 + 10}s`;
    el.style.animationDelay = `-${Math.random() * 15}s`;
    canvas.appendChild(el);
  }
}

document.addEventListener('DOMContentLoaded', initMathBackground);
