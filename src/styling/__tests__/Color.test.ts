import { describe, expect, it } from 'vitest';

import { Color } from '@/styling';

describe('`Color`', () => {
  const purple = {
    r: 128,
    g: 90,
    b: 213,
  };

  it('should create a color instance from RGB values', () => {
    const color = new Color(purple);
    expect(color.r).toBe(purple.r);
    expect(color.g).toBe(purple.g);
    expect(color.b).toBe(purple.b);
  });

  describe('`Color.getRGB`', () => {
    it('should return a object with RGB values', () => {
      const color = new Color(purple);
      const rgbObj = color.getRGB();
      expect(rgbObj).toEqual(purple);
    });
  });

  describe('`Color.getRGBString`', () => {
    it('should return an RGB string', () => {
      const color = new Color(purple);
      const rgbCSSString = color.getRGBString();
      expect(rgbCSSString).toEqual(`rgb(${purple.r} ${purple.g} ${purple.b})`);
    });
  });

  describe('`Color.fromHex`', () => {
    it.todo('should create a `Color` instance from a hex string', () => {
      // const hexString = '#805ad5';
      // const color = Color.fromHex(hexString);
      // expect(color.r).toBe(purple.r);
      // expect(color.g).toBe(purple.g);
      // expect(color.b).toBe(purple.b);
    });
  });

  describe('`Color.toHex`', () => {
    it.todo('should return a hex string', () => {
      // const color = Color.fromHex(hexString);
      // const hexString = color.toHex();
      // expect(hexString).toBe('#805ad5');
    });
  });
});
