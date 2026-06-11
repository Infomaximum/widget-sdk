import { z } from "zod";
import { ColorRangesSchema, ColorSchema } from "./color.schema";

describe("ColorRangesSchema — схема диапазонов окрашивания", () => {
  describe("валидный ввод", () => {
    it("принимает корректный набор: 3 цвета и 2 предела (инвариант соблюдён)", () => {
      // Arrange
      const schema = ColorRangesSchema.forVersion("17")(z);
      const input = {
        mode: "RANGES",
        colors: ["#E51320", "#FECA57", "#078936"],
        limits: [10, 50],
      };

      // Act
      const result = schema.safeParse(input);

      // Assert
      expect(result.success).toBe(true);
    });

    it("принимает минимально валидный набор: 1 цвет, 0 пределов", () => {
      // Arrange
      const schema = ColorRangesSchema.forVersion("17")(z);
      const input = {
        mode: "RANGES",
        colors: ["#E51320"],
        limits: [],
      };

      // Act
      const result = schema.safeParse(input);

      // Assert
      expect(result.success).toBe(true);
    });
  });

  describe("нарушение инварианта limits.length === colors.length - 1", () => {
    it("отклоняет набор где limits.length !== colors.length - 1; ошибка указывает на поле 'limits'", () => {
      // Arrange
      const schema = ColorRangesSchema.forVersion("17")(z);
      const input = {
        mode: "RANGES",
        colors: ["#E51320"],
        limits: [10],
      };

      // Act
      const result = schema.safeParse(input);

      // Assert
      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues[0]?.path[0]).toBe("limits");
      }
    });
  });
});

describe("ColorSchema — discriminatedUnion с поддержкой RANGES", () => {
  describe("регресс существующих режимов", () => {
    it("принимает { mode: 'AUTO' } без дополнительных полей (дефолт-union не сломан)", () => {
      // Arrange
      const schema = ColorSchema.forVersion("17")(z);

      // Act
      const result = schema.safeParse({ mode: "AUTO" });

      // Assert
      expect(result.success).toBe(true);
    });
  });

  describe("дискриминация по mode: 'RANGES'", () => {
    it("распознаёт член RANGES в discriminatedUnion и успешно парсит его", () => {
      // Arrange
      const schema = ColorSchema.forVersion("17")(z);
      const input = {
        mode: "RANGES",
        colors: ["#E51320", "#FECA57", "#078936"],
        limits: [10, 50],
      };

      // Act
      const result = schema.safeParse(input);

      // Assert
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.mode).toBe("RANGES");
      }
    });

    it("отклоняет RANGES-объект с нарушением инварианта через ColorSchema", () => {
      // Arrange
      const schema = ColorSchema.forVersion("17")(z);
      const input = {
        mode: "RANGES",
        colors: ["#E51320"],
        limits: [10],
      };

      // Act
      const result = schema.safeParse(input);

      // Assert
      expect(result.success).toBe(false);
    });
  });
});
