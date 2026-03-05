import { clamp } from "../../utils/functions";

export const clampRgb = (value: number) => clamp(value, 0, 255);
