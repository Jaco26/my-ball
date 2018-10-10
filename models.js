const MODELS = (function(keyBindings) {

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

    wallCheck(envWidth, envHeight) {
      if (this.x > envWidth - this.r || this.x < 0 + this.r) {        
        this.dx = -this.dx;
      } 
      if (this.y > envHeight - this.r || this.y < 0 + this.r) {
        this.dy = -this.dy;
      }
    }

    draw() {    
      // apparently floating point numbers as coordinates make the canvas to more complex rendering work with sub pixels
      // and stuff so Math.floor is where it's at
      this.x += Math.round(this.dx);
      this.y += Math.round(this.dy); 
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

    writeText() {
      this.ctx.font = '40px monospace';
      this.ctx.strokeStyle = 'orange';
      this.ctx.strokeText("My Ball", this.canvas.width / 15, 60)
    }
  
    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.checkMotionControls(this.ball, this.arrowDirections);
      this.checkMotionControls(this.kicker, this.letterDirections);
      this.ball.wallCheck(this.canvas.width, this.canvas.height);
      this.kicker.wallCheck(this.canvas.width, this.canvas.height);
      this.ball.draw();
      this.kicker.draw();
      this.writeText();
    }
  }

  return {
    Game,
  };

})(KEY_BINDINGS);
