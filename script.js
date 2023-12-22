const board = ['', '', '', '', '', '', '', '', ''];
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = 'X';
let gameActive = true;

function checkWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function checkTie() {
  return !board.includes('');
}

function handleCellClick(clickedCell, clickedCellIndex) {
  if (!gameActive || board[clickedCellIndex] !== '' || (clickedCellIndex === 4 && board[4] !== '')) return;

  board[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.style.color = currentPlayer === 'X' ? 'red' : 'blue';

  const winner = checkWinner();
  if (winner) {
    endGame(winner);
  } else if (checkTie()) {
    endGame('tie');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.querySelector('.status').textContent = `Player ${currentPlayer}'s turn`;

    if (currentPlayer === 'O') {
      const centerCell = document.querySelector('.cell:nth-child(5)');
      centerCell.style.pointerEvents = 'none'; 
      setTimeout(computerMove, 1000);
    } else {
      const centerCell = document.querySelector('.cell:nth-child(5)');
      centerCell.style.pointerEvents = 'auto'; 
    }
  }
}

function endGame(result) {
  gameActive = false;
  let message = result === 'tie' ? "It's a Tie!" : `Player ${result} wins!`;

  document.querySelector('.status').textContent = message;
}

function resetGame() {
  board.fill('');
  currentPlayer = 'X';
  gameActive = true;
  document.querySelector('.status').textContent = `Player ${currentPlayer}'s Turn`;
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
    cell.style.color = 'black';
    cell.style.pointerEvents = 'auto'; 
  });
}

function createGameBoard() {
  const gameBoard = document.querySelector('.game-board');
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleCellClick(cell, i));
    gameBoard.appendChild(cell);
  }
}

function computerMove() {
  let emptyCells = board.reduce((acc, curr, index) => {
    if (curr === '') {
      acc.push(index);
    }
    return acc;
  }, []);

  let randomIndex = Math.floor(Math.random() * emptyCells.length);
  const centerCell = document.querySelector('.cell:nth-child(' + (emptyCells[randomIndex] + 1) + ')');
  centerCell.style.pointerEvents = 'auto'; 
  handleCellClick(centerCell, emptyCells[randomIndex]);
}

document.getElementById('reset').addEventListener('click', resetGame);
createGameBoard();
resetGame(); 
