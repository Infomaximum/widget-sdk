import { clampRgb } from "./clampRgb";
import type { TRGBTuple } from "../types";

export const scaleRgb = (rgb: TRGBTuple, factor: number): TRGBTuple => [
  clampRgb(Math.round(rgb[0] * factor)),
  clampRgb(Math.round(rgb[1] * factor)),
  clampRgb(Math.round(rgb[2] * factor)),
];
