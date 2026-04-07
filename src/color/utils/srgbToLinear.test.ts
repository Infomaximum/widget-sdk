import {
  RGB_MAX,
  SRGB_GAMMA,
  srgbToLinear,
  SRGB_THRESHOLD,
  SRGB_A,
  SRGB_LINEAR_DIVISOR,
} from "./srgbToLinear";

describe("srgbToLinear", () => {
  it("возвращает 0 для 0 и 1 для 255", () => {
    expect(srgbToLinear(0)).toBe(0);
    expect(srgbToLinear(255)).toBe(1);
  });

  it("использует линейный участок ниже порога", () => {
    const channel = 10;
    const normalized = channel / RGB_MAX;

    expect(normalized).toBeLessThanOrEqual(SRGB_THRESHOLD);
    expect(srgbToLinear(channel)).toBeCloseTo(normalized / SRGB_LINEAR_DIVISOR, 10);
  });

  it("использует гамма-участок выше порога", () => {
    const channel = 11;
    const normalized = channel / RGB_MAX;
    const expected = Math.pow((normalized + SRGB_A) / (1 + SRGB_A), SRGB_GAMMA);

    expect(normalized).toBeGreaterThan(SRGB_THRESHOLD);
    expect(srgbToLinear(channel)).toBeCloseTo(expected, 10);
  });

  it("на пороге использует линейную формулу", () => {
    const channel = SRGB_THRESHOLD * RGB_MAX;
    const normalized = channel / RGB_MAX;

    expect(srgbToLinear(channel)).toBeCloseTo(normalized / SRGB_LINEAR_DIVISOR, 10);
  });
});
