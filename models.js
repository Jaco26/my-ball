const models = (function() {

  class Ball {
    constructor(x, y, radius, color, envWidth, envHeight) {
      this.x = x;
      this.y = y;
      this.dx = 0;
      this.dy = 0;
      this.radius = radius;
      this.color = color;
      this.envWidth = envWidth;
      this.envHeight = envHeight;
      this.speedLimit = 8;
      this.velocity = 0.4;
    }

    wallCheck() {
      if (this.x > this.envWidth - this.radius || this.x < 0 + this.radius) {
        this.dx = -this.dx;
      } 
      if (this.y > this.envHeight - this.radius || this.y < 0 + this.radius) {
        this.dy = -this.dy;
      }
    }

    changePosition(directions) {
      const speedLimit = this.speedLimit;
      const velocity = this.velocity;
      if (directions.includes('up')) {
        this.dy < -speedLimit
          ? this.dy = -speedLimit
          : this.dy -= velocity;
      } 
      if (directions.includes('right')) {
        this.dx > speedLimit
          ? this.dx = speedLimit
          : this.dx += velocity;
      }
      if (directions.includes('down')) {
        this.dy > speedLimit
          ? this.dy = speedLimit
          : this.dy += velocity;
      }
      if (directions.includes('left')) {
        this.dx < -speedLimit
          ? this.dx = -speedLimit
          : this.dx -= velocity;
      }
      this.wallCheck();
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

    writeText() {
      const ctx = this.ctx
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
      this.ball.changePosition(directions);
      this.drawBall();
    }

  }


  return {
    Ball,
    Board,
  }

})();

