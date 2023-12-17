import {
  GRAVITY,
  DAMPING,
  COLLISION_WINDOW_DURATION,
  CIRCLE_RADIUS,
  getRandomColor,
} from "../utils.js";

export default class Circle {
  constructor(x, y, radius = CIRCLE_RADIUS, color = getRandomColor()) {
    console.log("Circle created with x:", x, "y:", y);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocityY = 0;
    this.gravity = GRAVITY;
    this.damping = DAMPING;
    this.collisionWindow = COLLISION_WINDOW_DURATION;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(deltaTime, circles, canvas) {
    if (this.collisionWindow > 0) {
      this.collisionWindow--;
      return;
    }

    this.velocityY += this.gravity * deltaTime;
    this.y += this.velocityY * deltaTime;
  }
}
