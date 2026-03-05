import { DARKEN, LIGHTEN, MAX_ITER, MIN_CONTRAST } from "./consts";
import { adaptRgbForBackground, hexToRgb, rgbToHex } from "./utils";

/**
 * Адаптирует цвета начала и конца градиента для обеспечения минимального контраста с фоном
 * Итеративно осветляет или затемняет градиент до тех пор, пока оба конца не достигнут требуемого контраста
 *
 * @param startHex цвет начала градиента
 * @param endHex цвет конца градиента
 * @param bgHex цвет фона
 */
export const adaptGradientEdges = (
  startHex: string,
  endHex: string,
  bgHex: string
): { start: string; end: string } => {
  const start = hexToRgb(startHex);
  const end = hexToRgb(endHex);
  const bg = hexToRgb(bgHex);

  if (!start || !end || !bg) {
    throw new Error(`Некорректные цвета: start: ${startHex}, end: ${endHex}, bg: ${bgHex}`);
  }

  const adaptedStart = adaptRgbForBackground(start, bg);
  const adaptedEnd = adaptRgbForBackground(end, bg);

  return { start: rgbToHex(adaptedStart), end: rgbToHex(adaptedEnd) };
};
