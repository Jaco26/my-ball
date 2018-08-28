const canvas = document.getElementById('game-canvas');

const ball = new models.Ball(80, 90, 20, 'blue')
const board = new models.Board(canvas, ball);

document.addEventListener('keydown', (e) => {
  board[e.code] = true;
});

document.addEventListener('keyup', (e) => {
  board[e.code] = false;
});




function activate() {
  board.updatePositions();
  requestAnimationFrame(activate);
}

activate();