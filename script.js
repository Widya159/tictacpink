const board = document.getElementById('board');
const statusText = document.getElementById('status');
const modeSelect = document.getElementById('modeSelect');

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let currentPlayer = '😺';
let mode = 'ai';

const playerSymbol = '😺';
const aiSymbol = '🐰';

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function changeMode() {
  mode = modeSelect.value;
  restartGame();
}

function renderBoard() {
  board.innerHTML = '';
  gameBoard.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => makeMove(index));
    board.appendChild(cellElement);
  });
}

function makeMove(index) {
  if (gameBoard[index] !== '' || !isGameActive) return;

  gameBoard[index] = currentPlayer;
  renderBoard();

  if (checkWinner(currentPlayer)) {
    statusText.textContent = (currentPlayer === playerSymbol ? "Kamu" : "Komputer") + " menang! 🎉";
    isGameActive = false;
    return;
  }

  if (gameBoard.every(cell => cell !== '')) {
    statusText.textContent = 'Seri! 🤝';
    isGameActive = false;
    return;
  }

  if (mode === 'ai') {
    if (currentPlayer === playerSymbol) {
      statusText.textContent = 'Giliran komputer...';
      currentPlayer = aiSymbol;
      setTimeout(aiMove, 500);
    }
  } else {
    currentPlayer = currentPlayer === '😺' ? '🐰' : '😺';
    statusText.textContent = 'Giliran ' + (currentPlayer === '😺' ? 'Pemain 1 (😺)' : 'Pemain 2 (🐰)');
  }
}

function aiMove() {
  if (!isGameActive) return;
  let emptyIndices = gameBoard.map((val, idx) => val === '' ? idx : null).filter(v => v !== null);
  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  gameBoard[randomIndex] = aiSymbol;
  renderBoard();

  if (checkWinner(aiSymbol)) {
    statusText.textContent = 'Komputer menang! 😿';
    isGameActive = false;
  } else if (gameBoard.every(cell => cell !== '')) {
    statusText.textContent = 'Seri! 🤝';
    isGameActive = false;
  } else {
    currentPlayer = playerSymbol;
    statusText.textContent = 'Giliran kamu (😺)';
  }
}

function checkWinner(symbol) {
  return winConditions.some(condition => {
    return condition.every(index => gameBoard[index] === symbol);
  });
}

function restartGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = '😺';
  renderBoard();
  statusText.textContent = mode === 'ai' ? 'Giliran kamu (😺)' : 'Giliran Pemain 1 (😺)';
}

renderBoard();
