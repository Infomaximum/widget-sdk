import { RGB_MAX, HUE_HALF, HUE_ONE_THIRD } from "../consts";
import type { THSLTuple, TRGBTuple } from "../types";
import { hueToRgb } from "./hueToRgb";

export const hslToRgb = ([hue, saturation, lightness]: THSLTuple): TRGBTuple => {
  if (saturation === 0) {
    const gray = Math.round(lightness * RGB_MAX);

    return [gray, gray, gray];
  }

  const upperBound =
    lightness < HUE_HALF
      ? lightness * (1 + saturation)
      : lightness + saturation - lightness * saturation;
  const lowerBound = 2 * lightness - upperBound;

  const red = hueToRgb(lowerBound, upperBound, hue + HUE_ONE_THIRD);
  const green = hueToRgb(lowerBound, upperBound, hue);
  const blue = hueToRgb(lowerBound, upperBound, hue - HUE_ONE_THIRD);

  return [Math.round(red * RGB_MAX), Math.round(green * RGB_MAX), Math.round(blue * RGB_MAX)];
};
