import { hexToRgb } from "./hexToRgb";

describe("hexToRgb", () => {
  it("парсит полный hex", () => {
    expect(hexToRgb("#0A1B2C")).toEqual([10, 27, 44]);
  });

  it("парсит короткий hex", () => {
    expect(hexToRgb("#0f3")).toEqual([0, 255, 51]);
  });

  it("возвращает undefined для некорректной строки", () => {
    expect(hexToRgb("")).toBeUndefined();
  });
});
