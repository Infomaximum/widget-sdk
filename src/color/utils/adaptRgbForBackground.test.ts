import { adaptRgbForBackground, contrast, luminance } from "../utils";
import type { TRGBTuple } from "../types";
import { MIN_CONTRAST } from "../consts";

describe("adaptRgbListForBackground", () => {
  const black: TRGBTuple = [0, 0, 0];
  const white: TRGBTuple = [255, 255, 255];

  test("осветляет цвет на тёмном фоне", () => {
    const result = adaptRgbForBackground([20, 20, 20], black);

    expect(luminance(black)).toBeLessThanOrEqual(0.5);

    expect(result[0]).toBeGreaterThan(20);
    expect(result[1]).toBeGreaterThan(20);
    expect(result[2]).toBeGreaterThan(20);
  });

  test("затемняет цвет на светлом фоне", () => {
    const color: TRGBTuple = [240, 240, 240];

    const result = adaptRgbForBackground(color, white);

    expect(luminance(white)).toBeGreaterThan(0.5);

    expect(result[0]).toBeLessThan(color[0]);
    expect(result[1]).toBeLessThan(color[1]);
    expect(result[2]).toBeLessThan(color[2]);
  });

  test("не изменяет цвет если контраст уже достаточный", () => {
    const color: TRGBTuple = [255, 0, 0];

    const result = adaptRgbForBackground(color, black);

    expect(result[0]).toEqual(color[0]);
  });

  test("увеличивает контраст до минимального порога", () => {
    const color: TRGBTuple = [30, 30, 30];

    const result = adaptRgbForBackground(color, black);

    const finalContrast = contrast(result, black);

    expect(finalContrast).toBeGreaterThanOrEqual(MIN_CONTRAST);
  });
});
