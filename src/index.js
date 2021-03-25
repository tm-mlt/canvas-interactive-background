import "./main.scss";
import { DotLattice } from "./DotLattice";

document.addEventListener("DOMContentLoaded", () => {
  /**
   * @type {import("../math").Vector2} canvas
   */
  const cursor = { x: -1, y: -1 };
  /**
   * @type {HTMLCanvasElement} canvas
   */
  const canvas = document.getElementById("canvas");
  const dotLattice = new DotLattice(canvas);

  function animationStep() {
    dotLattice.calculateDotRadiuses(cursor);
    dotLattice.drawDots();
    window.requestAnimationFrame(animationStep);
  }

  window.requestAnimationFrame(animationStep);

  canvas.addEventListener("pointermove", (event) => {
    const { offsetX, offsetY } = event;
    cursor.x = offsetX;
    cursor.y = offsetY;
  });

  canvas.addEventListener("pointerleave", () => {
    cursor.x = -1;
    cursor.y = -1;
  });

  window.addEventListener("resize", () => {
    dotLattice.resizeCanvas(window.innerWidth, window.innerHeight / 2);
  });
});
