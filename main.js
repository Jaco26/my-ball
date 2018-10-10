const canvas = document.querySelector('#game-canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = 'aliceblue';

document.body.onresize = function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

const game = new MODELS.Game(canvas);

game.init()

function main() {
  game.animate();
  requestAnimationFrame(main);
}

main();