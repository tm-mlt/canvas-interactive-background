import { Dot } from "./Dot";
import { clamp, distance, mapTo } from "./math";

/**
 * @typedef {import("./math").Vector2} Vector2
 */

const defaultOptions = {
  spacing: 40,
  offset: 20,
  radius: {
    min: 3,
    max: 20,
  },
  cursorPower: {
    min: 10,
    max: 100,
  },
  changeFactor: 0.1,
  colors: ["#fece4a", "#43a4ff", "#6ec2b5", "#ff4949"],
};

export class DotLattice {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas, options = defaultOptions) {
    this._canvas = canvas;
    this._context = canvas.getContext("2d");
    this._options = { ...options };

    /**
     * @type {[Dot]}
     */
    this._dots = [];
    this.resizeCanvas(window.innerWidth, window.innerHeight / 2);
  }

  get canvas() {
    return this._canvas;
  }

  get context() {
    return this._context;
  }

  get options() {
    return this._options;
  }

  resizeCanvas(width, height) {
    const { colors, spacing } = this.options;

    this.canvas.width = width;
    this.canvas.height = height;
    this._columns = Math.floor(this.canvas.width / spacing);
    this._rows = Math.ceil(this.canvas.height / spacing);
    this._sameColorWidth = Math.floor(this._columns / colors.length);

    this.updateDots();
  }

  getDotColor(x) {
    return this.options.colors[Math.floor(x / this._sameColorWidth)];
  }

  getDotRadius(radius, targetRadius) {
    const { min, max } = this.options.radius;
    const { changeFactor } = this.options;
    return clamp(min, max, radius + changeFactor * (targetRadius - radius));
  }

  /**
   * @param {Vector2} param0
   * @returns {Vector2}
   */
  transformPosition({ x, y }) {
    const { spacing, offset } = this.options;
    return {
      x: x * spacing + offset,
      y: y * spacing + offset,
    };
  }

  getCursorAffectedRadius(distance) {
    const { radius, cursorPower } = this.options;
    return Math.max(
      radius.min,
      radius.max -
        mapTo(
          cursorPower.min,
          cursorPower.max,
          distance,
          radius.min,
          radius.max
        )
    );
  }

  updateDots() {
    const { _columns, _rows } = this;
    const dots = [];
    for (let x = 0; x < _columns; x++) {
      for (let y = 0; y < _rows; y++) {
        dots.push(
          new Dot(this.transformPosition({ x, y }), this.getDotColor(x))
        );
      }
    }
    this._dots = dots;
  }

  clear() {
    const { width, height } = this.canvas;
    this.context.clearRect(0, 0, width, height);
  }

  /**
   * @param {Vector2} cursor
   */
  calculateDotRadiuses(cursor) {
    const { cursorPower, radius } = this.options;
    const isCursorOut =
      cursor.x < 0 ||
      cursor.y < 0 ||
      cursor.x > this.canvas.width ||
      cursor.y > this.canvas.height;

    for (const dot of this._dots) {
      const distanceToCursor = distance(cursor, dot.position);
      const isAffectedByCursor = distanceToCursor <= cursorPower.max;

      if (!isAffectedByCursor || isCursorOut) {
        if (dot.radius > radius.min) {
          dot.radius = this.getDotRadius(dot.radius, radius.min);
        }
        continue;
      }

      const targetRadius = this.getCursorAffectedRadius(distanceToCursor);
      dot.radius = this.getDotRadius(dot.radius, targetRadius);
    }
  }

  /**
   * @param {Dot} dot
   */
  drawDot(dot) {
    this.context.beginPath();
    this.context.arc(
      dot.position.x,
      dot.position.y,
      dot.radius,
      0,
      2 * Math.PI
    );
    this.context.fillStyle = dot.color;
    this.context.fill();
  }

  drawDots() {
    this.clear();
    for (const dot of this._dots) {
      this.drawDot(dot);
    }
  }
}
