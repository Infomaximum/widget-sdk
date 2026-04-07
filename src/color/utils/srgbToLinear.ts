export const RGB_MAX = 255;

export const SRGB_GAMMA = 2.4;
export const SRGB_THRESHOLD = 0.03928;
export const SRGB_LINEAR_DIVISOR = 12.92;
export const SRGB_A = 0.055;

/**
 * Переводит канал sRGB в линейное пространство.
 * Используется для корректного вычисления luminance по WCAG.
 *
 * @param channel значение канала RGB
 */
export const srgbToLinear = (channel: number) => {
  const normalized = channel / RGB_MAX;

  if (normalized <= SRGB_THRESHOLD) {
    return normalized / SRGB_LINEAR_DIVISOR;
  }

  return Math.pow((normalized + SRGB_A) / (1 + SRGB_A), SRGB_GAMMA);
};
