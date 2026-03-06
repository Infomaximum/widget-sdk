import { RGB_MAX, HUE_HALF, HUE_FULL_CIRCLE } from "../consts";
import type { TRGBTuple, THSLTuple } from "../types";

export const rgbToHsl = ([r, g, b]: TRGBTuple): THSLTuple => {
  const red = r / RGB_MAX;
  const green = g / RGB_MAX;
  const blue = b / RGB_MAX;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);

  const lightness = (max + min) / 2;

  if (max === min) {
    return [0, 0, lightness];
  }

  const delta = max - min;

  const saturation = lightness > HUE_HALF ? delta / (2 - max - min) : delta / (max + min);

  let hue: number;

  switch (max) {
    case red:
      hue = (green - blue) / delta + (green < blue ? HUE_FULL_CIRCLE : 0);
      break;

    case green:
      hue = (blue - red) / delta + 2;
      break;

    default:
      hue = (red - green) / delta + 4;
  }

  hue /= HUE_FULL_CIRCLE;

  return [hue, saturation, lightness];
};
