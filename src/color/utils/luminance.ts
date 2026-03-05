import type { TRGBTuple } from "../types";
import { srgbToLinear } from "./srgbToLinear";

/**
 * Вычисляет относительную яркость (luminance) цвета.
 * Диапазон результата: 0 - 1
 *
 * Формула WCAG:
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export const luminance = ([r, g, b]: TRGBTuple) => {
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
};
