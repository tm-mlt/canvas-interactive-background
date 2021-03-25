export class Dot {
  /**
   * @param {import("./math").Vector2} position
   * @param {string} color
   */
  constructor(position, color, radius = 3) {
    const { x, y } = position;
    this.position = { x, y };
    this.color = color;
    this.radius = radius;
  }
}
