/**
 * @description Clamp a number into the inclusive range `[min, max]`.
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new TypeError(
      `[clamp] : Invalid range: 'min' (${min}) cannot be greater than 'max' (${max}).`,
    );
  }

  return Math.min(Math.max(value, min), max);
}
