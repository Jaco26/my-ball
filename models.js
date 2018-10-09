const newModels = (function(keyBindings) {

  class Ball {
    constructor(x, y, r, color, ctx) {
      this.dx = 0;
      this.dy = 0;
      this.decelY = 0.2;
      this.decelX = 0.2;
      this.accelY = 0.4;
      this.accelX = 0.4;
      this.speedLimit = 10;
      this.x = x;
      this.y = y;
      this.r = r;
      this.color = color;
      this.ctx = ctx;
    }

    wallCheck() {
      if (this.x > this.envWidth - this.radius || this.x < 0 + this.radius) {
        this.dx = -this.dx;
      } 
      if (this.y > this.envHeight - this.radius || this.y < 0 + this.radius) {
        this.dy = -this.dy;
      }
    }

    draw() {    
      this.x += this.dx;
      this.y += this.dy;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      this.ctx.fillStyle = this.color;
      this.ctx.strokeStyle = 'blue';
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx.closePath();
    }
  }


  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      this.ball = new Ball(200, 700, 40, '#aaaaffaa', this.ctx);
      this.kicker = new Ball(555, 444, 20, '#ff8811aa', this.ctx)
      this.speedLimit = 10;
      this.arrowDirections = {
        up: false,
        down: false,
        left: false,
        right: false,
      };
      this.letterDirections = {
        up: false,
        down: false,
        left: false,
        right: false,
      }
    }
  
    init() {
      keyBindings.arrowKeyControl.call(this);
    }
  
    checkMotionControls(object, controls) {
      if (controls.up) {
        object.dy < -object.speedLimit
          ? object.dy = -object.speedLimit
          : object.dy -= object.accelY;
      } else if (object.dy < 0 && !controls.down) {
        object.dy + object.decelY > 0
          ? object.dy = 0
          : object.dy += object.decelY;
      } 
  
      if (controls.down) {
        object.dy > object.speedLimit
          ? object.dy = object.speedLimit
          : object.dy += object.accelY;
      } else if (object.dy > 0 && !controls.up) {
        object.dy -= object.decelY;
      } 
  
      if (controls.left) {
        object.dx < -object.speedLimit
          ? object.dx = -object.speedLimit
          : object.dx -= object.accelX;
      } else if (object.dx < 0 && !controls.right) {
        object.dx + object.decelX > 0
          ? object.dx = 0
          : object.dx += object.decelX;
      }
  
      if (controls.right) {
        object.dx > object.speedLimit
          ? object.dx = object.speedLimit
          : object.dx += object.accelX;
      } else if (object.dx > 0 && !controls.left) {
        object.dx -= object.decelX;
      } 
    }
  
    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.checkMotionControls(this.ball, this.arrowDirections);
      this.checkMotionControls(this.kicker, this.letterDirections);
      this.ball.draw();
      this.kicker.draw();
    }
  }

  return {
    Game,
  };

})(KEY_BINDINGS);


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
      this.speedLimit = 6;
      this.velocity = 0.2;
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
      const ctx = this.ctx;
      ctx.font = '30px monospace';
      ctx.strokeStyle = 'orange';
      ctx.strokeText("My Ball", this.canvas.width / 10, 30)
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
      this.writeText();
    }

  }


  return {
    Ball,
    Board,
  }

})();

