import { sanitizeSingleLineComment } from "./sanitizeSingleLineComment";

describe("sanitizeSingleLineComment", () => {
  describe("isTemplate = false", () => {
    it("добавляет перевод строки, если есть комментарий", () => {
      expect(sanitizeSingleLineComment("SELECT 1 -- comment", false)).toBe("SELECT 1 -- comment\n");
    });

    it("возвращает формулу без изменений, если комментария нет", () => {
      expect(sanitizeSingleLineComment("SELECT 1", false)).toBe("SELECT 1");
    });
  });

  describe("isTemplate = false", () => {
    it("оборачивает всю формулу, если однострочная и с комментарием", () => {
      expect(sanitizeSingleLineComment("SELECT 1 -- comment", true)).toBe(
        "(SELECT 1 -- comment\n)"
      );
    });

    it("оборачивает всю формулу, если последняя строка содержит комментарий", () => {
      const formula = "SELECT 1\n-- comment";
      expect(sanitizeSingleLineComment(formula, true)).toBe("(SELECT 1\n-- comment\n)");
    });

    it("не оборачивает формулу, если комментарий есть, но не в последней строке", () => {
      const formula = "SELECT 1\n-- comment\nSELECT 2";
      expect(sanitizeSingleLineComment(formula, true)).toBe("SELECT 1\n-- comment\nSELECT 2");
    });

    it("не изменяет формулу без комментариев", () => {
      expect(sanitizeSingleLineComment("SELECT 1\nSELECT 2", true)).toBe("SELECT 1\nSELECT 2");
    });

    it("не изменяет пустую строку", () => {
      expect(sanitizeSingleLineComment("", true)).toBe("");
    });
  });
});
