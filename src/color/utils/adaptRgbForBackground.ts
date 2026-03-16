import { LIGHTEN, DARKEN, MAX_ITER, MIN_CONTRAST } from "../consts";
import type { TRGBTuple } from "../types";
import { contrast } from "./contrast";
import { luminance } from "./luminance";
import { scaleRgb } from "./scaleRgb";

/**
 * универсальная функция адаптации цвета к фону
 * Принимает RGB цвет и возвращает адаптированный цвет
 */
export const adaptRgbForBackground = (color: TRGBTuple, bg: TRGBTuple): TRGBTuple => {
  let result: TRGBTuple = [...color];

  const shouldLighten = luminance(bg) <= 0.5;
  const factor = shouldLighten ? LIGHTEN : DARKEN;

  for (let i = 0; i < MAX_ITER; i++) {
    if (contrast(result, bg) >= MIN_CONTRAST) {
      break;
    }
    result = scaleRgb(result, factor);
  }

  return result;
};
