const canvas = document.getElementById('game-canvas');
const envWidth = canvas.clientWidth;
const envHeight = canvas.clientHeight;



const ball = new models.Ball(80, 90, 20, 'blue', envWidth, envHeight)
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