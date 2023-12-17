import Circle from "./Circle.js";
import { CIRCLE_RADIUS } from "../utils.js";
import { getRandomColor } from "../utils.js";
import { MAX_CIRCLES } from "../utils.js";
const canvas = document.getElementById("gravityCanvas");
const ctx = canvas.getContext("2d");
let circles = [];
let lastTime = 0;
const circleDiameter = 30;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function tick(currentTime) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  render();
  update(deltaTime, circles, canvas);

  requestAnimationFrame(tick);
}

function update(deltaTime, circles, canvas) {
  for (let i = 0; i < circles.length; i++) {
    circles[i].update(deltaTime, circles, canvas);

    if (
      circles[i].y + circles[i].radius + circles[i].velocityY >
      canvas.height
    ) {
      if (circles[i].velocityY > 0) {
        circles[i].velocityY = -circles[i].velocityY * circles[i].damping;
      } else {
        circles[i].velocityY = -circles[i].velocityY;
      }
    } else {
      circles[i].velocityY += circles[i].gravity;
    }

    circles[i].y += circles[i].velocityY;
  }
  handleCollisions();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circles.length; i++) {
    circles[i].draw(ctx);
  }
}

function spawnCircle(x, y) {
  if (circles.length < MAX_CIRCLES) {
    let circle = new Circle(x, y, CIRCLE_RADIUS);
    circles.push(circle);
    return circle;
  } else {
    alert("You can create a maximum of 15 balls.");
    location.reload();
  }
}
function handleCollisions() {
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      const circleA = circles[i];
      const circleB = circles[j];

      const dx = circleB.x - circleA.x;
      const dy = circleB.y - circleA.y;
      const distanceBetweenCenters = Math.hypot(dx, dy);
      const areOverlapping = distanceBetweenCenters < circleDiameter;

      if (areOverlapping) {
        const overlapDistance = circleDiameter - distanceBetweenCenters;
        const percentOverlap = overlapDistance / circleDiameter;

        const halfPercent = percentOverlap * 0.5;

        const adjustX = dx * halfPercent;
        const adjustY = dy * halfPercent;

        circleA.x -= adjustX;
        circleA.y -= adjustY;

        circleB.x += adjustX;
        circleB.y += adjustY;

        const canvasBottom = canvas.height - circleA.radius;
        if (circleA.y > canvasBottom) {
          circleA.y = canvasBottom;
        }

        const canvasBottomB = canvas.height - circleB.radius;
        if (circleB.y > canvasBottomB) {
          circleB.y = canvasBottomB;
        }
      }
    }
  }
}

canvas.addEventListener("click", (e) => {
  spawnCircle(e.x, e.y);
});

requestAnimationFrame(tick);
