import { RGB_MAX, HUE_ONE_THIRD, HUE_TWO_THIRDS } from "../consts";
import { rgbToHsl } from "./rgbToHsl";

describe("rgbToHsl", () => {
  it("конвертирует оттенки серого", () => {
    const [h, s, l] = rgbToHsl([128, 128, 128]);

    expect(h).toBe(0);
    expect(s).toBe(0);
    expect(l).toBeCloseTo(128 / RGB_MAX, 6);
  });

  it("конвертирует базовые цвета", () => {
    expect(rgbToHsl([255, 0, 0])).toEqual([0, 1, 0.5]);
    expect(rgbToHsl([0, 255, 0])[0]).toBeCloseTo(HUE_ONE_THIRD, 6);
    expect(rgbToHsl([0, 255, 0])[1]).toBeCloseTo(1, 6);
    expect(rgbToHsl([0, 255, 0])[2]).toBeCloseTo(0.5, 6);
    expect(rgbToHsl([0, 0, 255])[0]).toBeCloseTo(HUE_TWO_THIRDS, 6);
  });

  it("корректно обрабатывает черный и белый", () => {
    expect(rgbToHsl([0, 0, 0])).toEqual([0, 0, 0]);
    expect(rgbToHsl([255, 255, 255])).toEqual([0, 0, 1]);
  });
});
