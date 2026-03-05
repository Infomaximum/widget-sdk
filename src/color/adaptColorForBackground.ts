import { clamp } from "../utils/functions";
import { contrast } from "./utils/contrast";
import { hexToRgb } from "./utils/hexToRgb";
import { hslToRgb } from "./utils/hslToRgb";
import { luminance } from "./utils/luminance";
import { rgbToHex } from "./utils/rgbToHex";
import { rgbToHsl } from "./utils/rgbToHsl";

const DEFAULT_MIN_CONTRAST = 4.5;
const DEFAULT_MAX_ITERATIONS = 20;
const LUMINANCE_THRESHOLD = 0.5;
// Границы поиска
const LIGHTNESS_MIN = 0;
const LIGHTNESS_MAX = 1;

export interface IAdaptColorForBackgroundOptions {
  /** Минимальный требуемый контраст (по WCAG). По умолчанию 4.5 */
  minContrast?: number;
  /** Максимальное количество итераций бинарного поиска */
  maxIterations?: number;
  /**
   * Ограничение диапазона lightness.
   * Позволяет избежать чисто черного (#000) и чисто белого (#FFF).
   */
  lightnessClamp?: number;
}

/**
 * Вычисляет цвет , который будет хорошо виден
 * на заданном цвете фона согласно требованиям WCAG.
 *
 * Алгоритм:
 * 1 Проверяет текущий контраст цвета относительно фона
 * 2 Если контраст достаточный, возвращает исходный цвет
 * 3 Иначе переводит текст в HSL
 * 4 Сохраняет hue и saturation
 * 5 Подбирает lightness бинарным поиском
 * 6 Возвращает цвет с нужным контрастом
 *
 * @param colorHex исходный цвет
 * @param backgroundHex цвет фона
 * @param options настройки алгоритма
 *
 * @returns HEX цвет с достаточным контрастом
 */
export const adaptColorForBackground = (colorHex: string, backgroundHex: string) => {
  if (!colorHex.length || !backgroundHex.length) {
    throw new Error(
      `Не передан цвет для вычисления: color: ${colorHex} или backgroundColor: ${backgroundHex}`
    );
  }

  const { lightnessClamp, maxIterations, minContrast }: IAdaptColorForBackgroundOptions = {
    minContrast: DEFAULT_MIN_CONTRAST,
    maxIterations: DEFAULT_MAX_ITERATIONS,
    lightnessClamp: 0,
  };

  const textRgb = hexToRgb(colorHex);
  const bgRgb = hexToRgb(backgroundHex);

  if (contrast(textRgb, bgRgb) >= minContrast) {
    return colorHex.toUpperCase();
  }

  const [hue, saturation, originalLightness] = rgbToHsl(textRgb);
  const backgroundLuminance = luminance(bgRgb);

  let lowerBound = LIGHTNESS_MIN;
  let upperBound = LIGHTNESS_MAX;
  let bestLightness = originalLightness;

  for (let i = 0; i < maxIterations; i++) {
    const middle = (lowerBound + upperBound) / 2;

    const candidateLightness =
      backgroundLuminance < LUMINANCE_THRESHOLD ? middle : LIGHTNESS_MAX - middle;

    const clampedLightness = clamp(
      candidateLightness,
      lightnessClamp,
      LIGHTNESS_MAX - lightnessClamp
    );

    const candidateRgb = hslToRgb([hue, saturation, clampedLightness]);

    if (contrast(candidateRgb, bgRgb) >= minContrast) {
      bestLightness = candidateLightness;
      upperBound = middle;
    } else {
      lowerBound = middle;
    }
  }

  const finalLightness = clamp(bestLightness, lightnessClamp, LIGHTNESS_MAX - lightnessClamp);

  return rgbToHex(hslToRgb([hue, saturation, finalLightness]));
};
