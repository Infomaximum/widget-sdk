import { clamp } from "../../utils/functions";
import type { TRGBTuple } from "../types";
import { hexToRgb } from "./hexToRgb";
import { rgbToHex } from "./rgbToHex";

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/**
 * Вычисляет промежуточный hex цвет между двумя цветами путем линейной интерполяции
 * в RGB пространстве
 *
 * @param startHex цвет начала
 * @param endHex цвет конца
 * @param position позиция на градиенте от 0 до 1
 */
export const interpolateHexColor = (startHex: string, endHex: string, position: number): string => {
  const clampedPosition = clamp(position, 0, 1);

  const startRgb = hexToRgb(startHex);
  const endRgb = hexToRgb(endHex);

  if (!startRgb || !endRgb) {
    throw new Error(`Некорректные цвета: start: ${startHex}, end: ${endHex}`);
  }

  const interpolated: TRGBTuple = [
    Math.round(lerp(startRgb[0], endRgb[0], clampedPosition)),
    Math.round(lerp(startRgb[1], endRgb[1], clampedPosition)),
    Math.round(lerp(startRgb[2], endRgb[2], clampedPosition)),
  ];

  return rgbToHex(interpolated);
};
