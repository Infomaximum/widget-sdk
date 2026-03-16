import { interpolateHexColor } from "./interpolateHexColor";

describe("interpolateHexColor", () => {
  test("возвращает начальный цвет при position = 0", () => {
    const result = interpolateHexColor("#000000", "#ffffff", 0);

    expect(result.toLowerCase()).toBe("#000000");
  });

  test("возвращает конечный цвет при position = 1", () => {
    const result = interpolateHexColor("#000000", "#ffffff", 1);

    expect(result.toLowerCase()).toBe("#ffffff");
  });

  test("корректно интерполирует цвет в середине градиента", () => {
    const result = interpolateHexColor("#000000", "#ffffff", 0.5);

    expect(result.toLowerCase()).toBe("#808080");
  });

  test("корректно интерполирует произвольные цвета", () => {
    const result = interpolateHexColor("#ff0000", "#00ff00", 0.5);

    expect(result.toLowerCase()).toBe("#808000");
  });

  test("ограничивает position меньше 0", () => {
    const result = interpolateHexColor("#000000", "#ffffff", -1);

    expect(result.toLowerCase()).toBe("#000000");
  });

  test("ограничивает position больше 1", () => {
    const result = interpolateHexColor("#000000", "#ffffff", 2);

    expect(result.toLowerCase()).toBe("#ffffff");
  });

  test("выбрасывает ошибку при некорректном startHex", () => {
    expect(() => interpolateHexColor("", "#ffffff", 0.5)).toThrow();
  });

  test("выбрасывает ошибку при некорректном endHex", () => {
    expect(() => interpolateHexColor("#000000", "", 0.5)).toThrow();
  });
});
