import { adaptRgbForBackground } from "./utils/adaptRgbForBackground";
import { hexToRgb } from "./utils/hexToRgb";
import { rgbToHex } from "./utils/rgbToHex";

/**
 * @deprecated ожидается решение со стороны проектирования
 *
 * Адаптирует цвет для обеспечения минимального контраста с фоном
 * Итеративно осветляет или затемняет цвет до тех пор, пока не достигнет требуемого контраста
 *
 * Использует тот же подход что и adaptGradientEdges для унификации
 *
 * @param colorHex исходный цвет
 * @param backgroundHex цвет фона
 *
 * @returns HEX цвет с достаточным контрастом
 */
const adaptColorForBackground = (colorHex: string, backgroundHex: string): string => {
  const color = hexToRgb(colorHex);
  const bg = hexToRgb(backgroundHex);

  if (!color || !bg) {
    throw new Error(
      `Передан не валидный цвет: color: ${colorHex} или backgroundColor: ${backgroundHex}`
    );
  }

  const adapted = adaptRgbForBackground(color, bg);

  return rgbToHex(adapted);
};
