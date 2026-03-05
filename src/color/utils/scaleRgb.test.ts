import type { TRGBTuple } from "../types";
import { scaleRgb } from "./scaleRgb";

describe("scaleRgb", () => {
  test("масштабирует RGB каналы на заданный коэффициент", () => {
    const rgb: TRGBTuple = [100, 150, 200];
    const factor = 1.1;

    const result = scaleRgb(rgb, factor);

    expect(result).toEqual([
      Math.round(100 * factor),
      Math.round(150 * factor),
      Math.round(200 * factor),
    ]);
  });

  test("корректно округляет значения каналов", () => {
    const rgb: TRGBTuple = [10, 20, 30];
    const factor = 1.333;

    const result = scaleRgb(rgb, factor);

    expect(result).toEqual([
      Math.round(10 * factor),
      Math.round(20 * factor),
      Math.round(30 * factor),
    ]);
  });

  test("ограничивает значения сверху (не больше 255)", () => {
    const rgb: TRGBTuple = [250, 240, 230];
    const factor = 1.5;

    const result = scaleRgb(rgb, factor);

    result.forEach((channel) => {
      expect(channel).toBeLessThanOrEqual(255);
    });
  });

  test("ограничивает значения снизу (не меньше 0)", () => {
    const rgb: TRGBTuple = [1, 2, 3];
    const factor = -2;

    const result = scaleRgb(rgb, factor);

    result.forEach((channel) => {
      expect(channel).toBeGreaterThanOrEqual(0);
    });
  });

  test("не мутирует исходный RGB массив", () => {
    const rgb: TRGBTuple = [50, 60, 70];
    const factor = 1.2;

    const originalCopy = [...rgb];

    scaleRgb(rgb, factor);

    expect(rgb).toEqual(originalCopy);
  });
});
