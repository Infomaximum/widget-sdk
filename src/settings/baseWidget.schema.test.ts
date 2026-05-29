import { z } from "zod";
import { BaseWidgetSettingsSchema } from "./baseWidget.schema";

/**
 * Минимальный набор полей для парсинга — все поля имеют default'ы,
 * поэтому пустой объект проходит валидацию в обеих версиях.
 */
const minimalObject = {};

describe("BaseWidgetSettingsSchema — парсинг настроек виджета", () => {
  describe("v17-фабрика (forVersion('17'))", () => {
    // ГЛАВНЫЙ ACCEPTANCE: v17-конфиг с filterMode: "MULTI" должен парситься успешно
    it("ГЛАВНЫЙ ACCEPTANCE: filterMode MULTI принимается в v17-схеме", () => {
      // Arrange
      const schemaV17 = BaseWidgetSettingsSchema.forVersion("17")(z);

      // Act
      const result = schemaV17.safeParse({ ...minimalObject, filterMode: "MULTI" });

      // Assert
      expect(result.success).toBe(true);
    });

    it("filterMode DEFAULT принимается в v17-схеме", () => {
      // Arrange
      const schemaV17 = BaseWidgetSettingsSchema.forVersion("17")(z);

      // Act
      const result = schemaV17.safeParse({ ...minimalObject, filterMode: "DEFAULT" });

      // Assert
      expect(result.success).toBe(true);
    });

    it("неизвестное значение filterMode NEW_FUTURE отклоняется в v17-схеме", () => {
      // Arrange
      const schemaV17 = BaseWidgetSettingsSchema.forVersion("17")(z);

      // Act
      const result = schemaV17.safeParse({ ...minimalObject, filterMode: "NEW_FUTURE" });

      // Assert
      expect(result.success).toBe(false);
    });

    it("пропущенный filterMode приводит к DEFAULT по умолчанию", () => {
      // Arrange
      const schemaV17 = BaseWidgetSettingsSchema.forVersion("17")(z);

      // Act
      const result = schemaV17.safeParse({ ...minimalObject });

      // Assert
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.filterMode).toBe("DEFAULT");
      }
    });
  });

  describe("latest-фабрика (v19)", () => {
    it("filterMode DEFAULT принимается в latest-схеме", () => {
      // Arrange
      const schemaLatest = BaseWidgetSettingsSchema(z);

      // Act
      const result = schemaLatest.safeParse({ ...minimalObject, filterMode: "DEFAULT" });

      // Assert
      expect(result.success).toBe(true);
    });

    it("filterMode MULTI отклоняется в latest-схеме (MULTI удалён в v19)", () => {
      // Arrange
      const schemaLatest = BaseWidgetSettingsSchema(z);

      // Act
      const result = schemaLatest.safeParse({ ...minimalObject, filterMode: "MULTI" });

      // Assert
      expect(result.success).toBe(false);

      if (!result.success) {
        const paths = result.error.issues.map((issue) => issue.path[0]);

        expect(paths).toContain("filterMode");
      }
    });
  });

  describe("fallback forVersion — промежуточная версия", () => {
    it("forVersion('18') при history={17,19} использует v17-схему: filterMode MULTI проходит", () => {
      // Arrange
      // "18" не является ключом history, ожидаем fallback на ближайшую ≤ 18, то есть v17
      const schemaV18Fallback = BaseWidgetSettingsSchema.forVersion("18" as "17")(z);

      // Act
      const result = schemaV18Fallback.safeParse({ ...minimalObject, filterMode: "MULTI" });

      // Assert
      expect(result.success).toBe(true);
    });
  });
});
