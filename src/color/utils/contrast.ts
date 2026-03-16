import type { TRGBTuple } from "../types";
import { luminance } from "./luminance";

const WCAG_OFFSET = 0.05;

/**
 * Вычисляет коэффициент контраста между двумя цветами.
 * Возможный диапазон:
 * 1 - минимальный контраст
 * 21 - максимальный контраст
 */
export const contrast = (firstRgb: TRGBTuple, secondRgb: TRGBTuple) => {
  const lum1 = luminance(firstRgb);
  const lum2 = luminance(secondRgb);

  if (lum1 > lum2) {
    return (lum1 + WCAG_OFFSET) / (lum2 + WCAG_OFFSET);
  }

  return (lum2 + WCAG_OFFSET) / (lum1 + WCAG_OFFSET);
};
