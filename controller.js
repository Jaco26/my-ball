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


// class Piece1 extends Ball {
//   constructor(x, y, radius, color) {
//     super(x, y, radius, color);
//     this.rules = [
//       this.wallDetect,
//     ];
//   }
// }

// const canvas = new Board(Piece1, );


// const ball = new Ball(200, 500, 50, 'orange');
// const rect = new Rect(400, 300, 60, 80, 'green');

// canvas.drawBall(ball);
// canvas.drawRect(rect)
