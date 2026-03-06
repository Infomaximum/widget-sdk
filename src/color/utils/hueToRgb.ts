import { HUE_FULL_CIRCLE, HUE_HALF, HUE_TWO_THIRDS } from "../consts";

const HUE_SECTOR_SIZE = 1 / 6;

export const hueToRgb = (lowerBound: number, upperBound: number, huePosition: number) => {
  if (huePosition < 0) {
    huePosition += 1;
  }

  if (huePosition > 1) {
    huePosition -= 1;
  }

  if (huePosition < HUE_SECTOR_SIZE) {
    return lowerBound + (upperBound - lowerBound) * HUE_FULL_CIRCLE * huePosition;
  }

  if (huePosition < HUE_HALF) {
    return upperBound;
  }

  if (huePosition < HUE_TWO_THIRDS) {
    return (
      lowerBound + (upperBound - lowerBound) * (HUE_TWO_THIRDS - huePosition) * HUE_FULL_CIRCLE
    );
  }

  return lowerBound;
};
