
class Canvas {
  constructor() {
    this.canvas = this.createCanvas();
    this.cWidth = this.canvas.width;
    this.cHeight = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
  }

  createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.style.backgroundColor = '#33aaff';
    canvas.width = 800;
    canvas.height = 600;
    document.getElementById('canvas-container').appendChild(canvas);
    return canvas;
  }

  drawBall({ x, y, radius, color }) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  drawRect({ x, y, width, height, color }) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

}

class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.color = color;
  }
}

class Ball extends Shape {
  constructor(x, y, radius, color) {
    super(x, y, color);
    this.radius = radius;
  }
}

class Rect extends Shape {
  constructor(x, y, width, height, color) {
    super(x, y, color);
    this.width = width;
    this.height = height;
  }
}