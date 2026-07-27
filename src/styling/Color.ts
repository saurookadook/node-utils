const INIT_DEFAULTS = {
  r: 0,
  g: 0,
  b: 0,
};

/** Class for managing different representations of a given color. */
export class Color {
  r: number;
  g: number;
  b: number;

  /**
   * @description Create a `Color` instance.
   * @param opts.r The red component of the color (0-255).
   * @param opts.g The green component of the color (0-255).
   * @param opts.b The blue component of the color (0-255).
   */
  constructor(opts: { r?: number; g?: number; b?: number } = INIT_DEFAULTS) {
    this.r = opts.r ?? INIT_DEFAULTS.r;
    this.g = opts.g ?? INIT_DEFAULTS.g;
    this.b = opts.b ?? INIT_DEFAULTS.b;
  }

  /**
   * @description Get an object containing the RGB values of the color.
   */
  getRGB(): { r: number; g: number; b: number } {
    return { r: this.r, g: this.g, b: this.b };
  }

  /**
   * @description Get a CSS `rgb()` string representation of the color.
   */
  getRGBString(): string {
    return `rgb(${this.r} ${this.g} ${this.b})`;
  }
}
