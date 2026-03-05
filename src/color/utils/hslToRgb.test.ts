import { HUE_ONE_THIRD, HUE_TWO_THIRDS } from "../consts";
import { hslToRgb } from "./hslToRgb";

describe("hslToRgb", () => {
  it("конвертирует оттенки серого", () => {
    expect(hslToRgb([0, 0, 0])).toEqual([0, 0, 0]);
    expect(hslToRgb([0.5, 0, 0.5])).toEqual([128, 128, 128]);
  });

  it("конвертирует базовые цвета", () => {
    expect(hslToRgb([0, 1, 0.5])).toEqual([255, 0, 0]);
    expect(hslToRgb([HUE_ONE_THIRD, 1, 0.5])).toEqual([0, 255, 0]);
    expect(hslToRgb([HUE_TWO_THIRDS, 1, 0.5])).toEqual([0, 0, 255]);
  });

  it("корректно возвращает белый при L=1 и S=0", () => {
    expect(hslToRgb([0.1, 0, 1])).toEqual([255, 255, 255]);
  });
});
