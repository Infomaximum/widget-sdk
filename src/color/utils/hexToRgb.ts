import type { TRGBTuple } from "../types";

export const hexToRgb = (hex: string): TRGBTuple => {
  const rgbTuple: TRGBTuple = [0, 0, 0];
  const matchArray = hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
    .substring(1)
    .match(/.{2}/g);

  matchArray?.forEach((value, index) => {
    if (index > 2) {
      return undefined;
    }

    rgbTuple[index] = parseInt(value, 16);
  });

  return rgbTuple;
};
