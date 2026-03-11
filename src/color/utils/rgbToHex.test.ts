import { rgbToHex } from "./rgbToHex";

describe("rgbToHex", () => {
  it("корректно конвертирует чёрный цвет", () => {
    expect(rgbToHex([0, 0, 0])).toBe("#000000");
  });

  it("корректно конвертирует белый цвет", () => {
    expect(rgbToHex([255, 255, 255])).toBe("#ffffff");
  });

  it("корректно конвертирует базовые RGB цвета", () => {
    expect(rgbToHex([255, 0, 0])).toBe("#ff0000");
    expect(rgbToHex([0, 255, 0])).toBe("#00ff00");
    expect(rgbToHex([0, 0, 255])).toBe("#0000ff");
  });

  it("добавляет ведущий ноль для значений меньше 16", () => {
    expect(rgbToHex([15, 15, 15])).toBe("#0f0f0f");
    expect(rgbToHex([1, 2, 3])).toBe("#010203");
  });

  it("корректно конвертирует произвольные значения RGB", () => {
    expect(rgbToHex([12, 34, 56])).toBe("#0c2238");
    expect(rgbToHex([16, 128, 255])).toBe("#1080ff");
  });

  it("возвращает строку в формате #RRGGBB", () => {
    const result = rgbToHex([123, 45, 67]);
    expect(result).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("возвращает hex в нижнем регистре", () => {
    const result = rgbToHex([171, 205, 239]);
    expect(result).toBe("#abcdef");
  });
});
