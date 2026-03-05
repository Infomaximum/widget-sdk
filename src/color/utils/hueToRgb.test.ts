import { HUE_HALF } from "../consts";
import { hueToRgb } from "./hueToRgb";

describe("hueToRgb", () => {
  const lower = 0.2;
  const upper = 0.8;

  it("оборачивает hue ниже 0", () => {
    expect(hueToRgb(lower, upper, -0.1)).toBeCloseTo(lower, 10);
  });

  it("оборачивает hue выше 1", () => {
    const expected = lower + (upper - lower) * 6 * 0.1;
    expect(hueToRgb(lower, upper, 1.1)).toBeCloseTo(expected, 10);
  });

  it("возвращает верхнюю границу для среднего сектора", () => {
    expect(hueToRgb(lower, upper, HUE_HALF)).toBeCloseTo(upper, 10);
  });

  it("возвращает нижнюю границу для верхнего сектора", () => {
    expect(hueToRgb(lower, upper, 0.9)).toBeCloseTo(lower, 10);
  });
});
