import { luminance } from "./luminance";

describe("luminance", () => {
  it("возвращает 0 для черного и 1 для белого", () => {
    expect(luminance([0, 0, 0])).toBe(0);
    expect(luminance([255, 255, 255])).toBe(1);
  });

  it("использует WCAG веса каналов для базовых цветов", () => {
    expect(luminance([255, 0, 0])).toBeCloseTo(0.2126, 4);
    expect(luminance([0, 255, 0])).toBeCloseTo(0.7152, 4);
    expect(luminance([0, 0, 255])).toBeCloseTo(0.0722, 4);
  });

  it("монотонна для оттенков серого", () => {
    expect(luminance([10, 10, 10])).toBeGreaterThan(luminance([0, 0, 0]));
    expect(luminance([200, 200, 200])).toBeGreaterThan(luminance([10, 10, 10]));
  });
});
