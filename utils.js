// Constants
export const GRAVITY = 0.5;
export const DAMPING = 0.8;
export const COLLISION_WINDOW_DURATION = 10;
export const CIRCLE_RADIUS = 15;
export const MAX_CIRCLES = 15;

// Utility function to get a random color
export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
