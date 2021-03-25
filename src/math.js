/**
 * @typedef {{ x: number, y: number }} Vector2
 */

/**
 * @param {Vector2} begin
 * @param {Vector2} end
 */
export const distance = (begin, end) => {
  const x = Math.pow(begin.x - end.x, 2);
  const y = Math.pow(begin.y - end.y, 2);
  return Math.sqrt(x + y);
};

export const clamp = (min, max, value) => Math.max(min, Math.min(max, value));
export const mapTo = (min, max, value, newMin = 0, newMax = 1) =>
  clamp(
    newMin,
    newMax,
    newMin + ((value - min) * (newMax - newMin)) / (max - min)
  );
