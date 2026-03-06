import type { TRGBTuple } from "../types";

export const rgbToHex = (rgb: TRGBTuple) =>
  `#${rgb.map((x) => x.toString(16).padStart(2, "0")).join("")}`;
