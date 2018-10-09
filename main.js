const canvas = document.querySelector('#game-canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = 'aliceblue';

document.body.onresize = function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

