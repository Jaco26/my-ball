const models = (function() {

  class Ball {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = 0;
      this.dy = 0;
      this.radius = radius;
      this.color = color;
    }

    changePosition(directions, speed) {
      if (directions.includes('up')) {
        Math.abs(this.dy) > 4
          ? this.dy = -4 
          : this.dy -= speed;
      } 
      if (directions.includes('right')) {
        this.dx > 4
          ? this.dx = 4
          : this.dx += speed;
      }
      if (directions.includes('down')) {
        this.dy > 4
          ? this.dy = 4
          : this.dy += speed;
      }
      if (directions.includes('left')) {
        Math.abs(this.dx) > 4
          ? this.dx = -4
          : this.dx -= speed;
      }
      this.y += this.dy;
      this.x += this.dx;
    }
  }


  class Board {
    constructor(canvas, ball) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      this.ball = ball;
      this.ArrowUp = false;
      this.ArrowRight = false;
      this.ArrowDown = false;
      this.ArrowLeft = false;
    }

    drawBall() {
      const ctx = this.ctx;
      const ball = this.ball;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.endPath;
    }

    getDirections() {
      const result = [];
      if (this.ArrowUp) result.push('up');
      if (this.ArrowDown) result.push('down');
      if (this.ArrowLeft) result.push('left');
      if (this.ArrowRight) result.push('right');
      return result;
    }

    updatePositions() {      
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const directions = this.getDirections();
      const speed = 0.1;      
      this.ball.changePosition(directions, speed);
      this.drawBall();
    }

  }


  return {
    Ball,
    Board,
  }

})();

