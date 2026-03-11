import type { TRGBTuple } from "../types";
import { contrast } from "./contrast";

describe("contrast", () => {
  it("симметричен для пары цветов", () => {
    const a: TRGBTuple = [10, 20, 30];
    const b: TRGBTuple = [200, 210, 220];

    expect(contrast(a, b)).toBeCloseTo(contrast(b, a), 10);
  });

  it("возвращает 1 для одинаковых цветов", () => {
    const rgb: TRGBTuple = [12, 34, 56];

    expect(contrast(rgb, rgb)).toBe(1);
  });

  it("возвращает 21 для черного и белого", () => {
    expect(contrast([0, 0, 0], [255, 255, 255])).toBe(21);
  });

  it("больше 1 для разных цветов", () => {
    expect(contrast([10, 10, 10], [20, 20, 20])).toBeGreaterThan(1);
  });
});
