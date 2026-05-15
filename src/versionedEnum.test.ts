import { z } from "zod";
import { VersionedEnum } from "./versionedEnum";

const historyTwoVersions = {
  "17": { DEFAULT: "DEFAULT", SINGLE: "SINGLE", MULTI: "MULTI", DISABLED: "DISABLED" } as const,
  "19": { DEFAULT: "DEFAULT", SINGLE: "SINGLE", DISABLED: "DISABLED" } as const,
};

const EFilterMode = VersionedEnum.build({
  latestVersion: "19",
  history: historyTwoVersions,
});

const historyOneVersion = {
  "17": { BOLD: "BOLD", NORMAL: "NORMAL" } as const,
};

const EFontWeight = VersionedEnum.build({
  latestVersion: "17",
  history: historyOneVersion,
});

// Enum с одной версией в history (граничный случай)
const EOnlyOne = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": { A: "A", B: "B" } as const,
  },
});

// Enum с семантическими мультисегментными версиями
const ESemver = VersionedEnum.build({
  latestVersion: "2.0",
  history: {
    "1.0": { X: "X" } as const,
    "1.1": { X: "X", Y: "Y" } as const,
    "2.0": { X: "X", Y: "Y", Z: "Z" } as const,
  },
});

describe("VersionedEnum.build", () => {
  describe("latest-срез как обычный объект", () => {
    it("возвращает значение latest-ключа через dot-notation", () => {
      expect(EFilterMode.DEFAULT).toBe("DEFAULT");
      expect(EFilterMode.SINGLE).toBe("SINGLE");
      expect(EFilterMode.DISABLED).toBe("DISABLED");
    });

    it("Object.keys возвращает только latest-ключи (без Symbol)", () => {
      const keys = Object.keys(EFilterMode);

      expect(keys).toEqual(expect.arrayContaining(["DEFAULT", "SINGLE", "DISABLED"]));
      expect(keys).not.toContain("MULTI");
      expect(keys.every((k) => typeof k === "string")).toBe(true);
    });

    it("Object.values возвращает только latest-значения", () => {
      const values = Object.values(EFilterMode);

      expect(values).toEqual(expect.arrayContaining(["DEFAULT", "SINGLE", "DISABLED"]));
      expect(values).not.toContain("MULTI");
    });

    it("JSON.stringify не содержит Symbol-ключа forVersion", () => {
      const json = JSON.stringify(EFilterMode);

      expect(json).not.toContain("forVersion");
      expect(json).not.toContain("VersionedEnum");
      expect(JSON.parse(json)).toEqual({
        DEFAULT: "DEFAULT",
        SINGLE: "SINGLE",
        DISABLED: "DISABLED",
      });
    });
  });

  describe("forVersion — получение среза по версии", () => {
    it("возвращает срез v17 с ожидаемыми ключами (включая MULTI)", () => {
      const v17 = EFilterMode[VersionedEnum.forVersion]("17");

      expect(v17.DEFAULT).toBe("DEFAULT");
      expect(v17.SINGLE).toBe("SINGLE");
      expect(v17.MULTI).toBe("MULTI");
      expect(v17.DISABLED).toBe("DISABLED");
    });

    it("возвращает latest-срез при вызове без аргументов", () => {
      const latest = EFilterMode[VersionedEnum.forVersion]();

      expect(Object.keys(latest)).toEqual(
        expect.arrayContaining(["DEFAULT", "SINGLE", "DISABLED"])
      );
      expect(Object.keys(latest)).not.toContain("MULTI");
    });

    it("возвращает latest-срез при передаче null", () => {
      const latest = EFilterMode[VersionedEnum.forVersion](null);

      expect(Object.keys(latest)).toEqual(
        expect.arrayContaining(["DEFAULT", "SINGLE", "DISABLED"])
      );
      expect(Object.keys(latest)).not.toContain("MULTI");
    });

    it("возвращает срез v19 при точном совпадении версии", () => {
      const v19 = EFilterMode[VersionedEnum.forVersion]("19");

      expect(Object.keys(v19)).toEqual(expect.arrayContaining(["DEFAULT", "SINGLE", "DISABLED"]));
      expect(Object.keys(v19)).not.toContain("MULTI");
    });

    it("fallback: forVersion('18') при history={17,19} возвращает срез v17", () => {
      // "18" не является ключом history, поэтому используем cast для проверки runtime-поведения
      const v18Fallback = EFilterMode[VersionedEnum.forVersion]("18" as "17");

      expect(v18Fallback.DEFAULT).toBe("DEFAULT");
      expect((v18Fallback as Record<string, string>)["MULTI"]).toBe("MULTI");
      expect(Object.keys(v18Fallback)).toContain("MULTI");
    });
  });

  describe("мемоизация", () => {
    it("повторный вызов forVersion('17') возвращает тот же объект (референциальное равенство)", () => {
      const slice1 = EFilterMode[VersionedEnum.forVersion]("17");
      const slice2 = EFilterMode[VersionedEnum.forVersion]("17");

      expect(slice1).toBe(slice2);
    });

    it("повторный вызов forVersion() возвращает тот же latest-объект", () => {
      const latest1 = EFilterMode[VersionedEnum.forVersion]();
      const latest2 = EFilterMode[VersionedEnum.forVersion]();

      expect(latest1).toBe(latest2);
    });
  });

  describe("ошибки", () => {
    it("forVersion с версией меньше минимальной бросает ошибку с описанием", () => {
      // "16" не является ключом history, cast нужен для проверки runtime-поведения
      expect(() => EFilterMode[VersionedEnum.forVersion]("16" as "17")).toThrow(
        /VersionedEnum: no slice for version=16/
      );
    });

    it("build с latestVersion не из history бросает ошибку", () => {
      expect(() =>
        VersionedEnum.build({
          latestVersion: "99" as "17",
          history: { "17": { A: "A" } as const },
        })
      ).toThrow(/VersionedEnum: latestVersion="99"/);
    });
  });

  describe("заморозка срезов", () => {
    it("срез forVersion('17') заморожен — Object.isFrozen === true", () => {
      const v17 = EFilterMode[VersionedEnum.forVersion]("17");

      expect(Object.isFrozen(v17)).toBe(true);
    });

    it("срез forVersion('17') не позволяет мутацию в strict mode", () => {
      const v17 = EFilterMode[VersionedEnum.forVersion]("17");

      expect(() => {
        "use strict";
        (v17 as Record<string, string>)["NEW_KEY"] = "NEW_VALUE";
      }).toThrow();
    });

    it("результат build заморожен — Object.isFrozen === true", () => {
      expect(Object.isFrozen(EFilterMode)).toBe(true);
    });
  });

  describe("интеграция с zod (smoke)", () => {
    it("z.enum(EXXX).parse('DEFAULT') успешен для latest", () => {
      expect(() => z.enum(EFilterMode).parse("DEFAULT")).not.toThrow();
      expect(z.enum(EFilterMode).parse("DEFAULT")).toBe("DEFAULT");
    });

    it("z.enum(EXXX[forVersion]('17')).parse('MULTI') успешен для v17-среза", () => {
      const v17 = EFilterMode[VersionedEnum.forVersion]("17");

      expect(() => z.enum(v17).parse("MULTI")).not.toThrow();
      expect(z.enum(v17).parse("MULTI")).toBe("MULTI");
    });

    it("z.enum(EXXX).parse('MULTI') не проходит на latest (MULTI удалён в v19)", () => {
      const result = z.enum(EFilterMode).safeParse("MULTI");

      expect(result.success).toBe(false);
    });
  });

  describe("Symbol-ключ forVersion", () => {
    it("Symbol зафиксирован как Symbol.for с правильным ключом", () => {
      expect(VersionedEnum.forVersion).toBe(
        Symbol.for("@infomaximum/widget-sdk:VersionedEnum.forVersion")
      );
    });

    it("Symbol-ключ не появляется в Object.keys и не сериализуется", () => {
      const keys = Object.keys(EFontWeight);

      expect(keys).not.toContain(VersionedEnum.forVersion.toString());
      expect(JSON.stringify(EFontWeight)).not.toContain("forVersion");
    });
  });

  describe("граничные случаи (edge-cases)", () => {
    describe("history с одной версией", () => {
      it("forVersion с точным совпадением единственной версии возвращает срез", () => {
        // Arrange — enum с одним ключом в history
        // Act
        const slice = EOnlyOne[VersionedEnum.forVersion]("17");

        // Assert
        expect(slice.A).toBe("A");
        expect(slice.B).toBe("B");
      });

      it("forVersion с версией раньше единственной в history бросает ошибку", () => {
        // Arrange — история содержит только "17", fallback на "16" невозможен
        // Act / Assert
        expect(() => EOnlyOne[VersionedEnum.forVersion]("16" as "17")).toThrow(
          /VersionedEnum: no slice for version=16/
        );
      });

      it("forVersion('0') при минимальной версии '17' бросает ошибку", () => {
        // Arrange — версия "0" меньше любой версии в history
        // Act / Assert
        expect(() => EOnlyOne[VersionedEnum.forVersion]("0" as "17")).toThrow(
          /VersionedEnum: no slice for version=0/
        );
      });
    });

    describe("мультисегментные (семантические) версии", () => {
      it("forVersion('1.5') при history={1.0, 1.1, 2.0} возвращает срез '1.1'", () => {
        // Arrange — target "1.5" попадает в диапазон между "1.1" и "2.0"
        // Act
        const v15 = ESemver[VersionedEnum.forVersion]("1.5" as "2.0");

        // Assert — должен вернуть срез "1.1" ({X, Y}), но не "2.0" ({X, Y, Z})
        expect((v15 as Record<string, string>)["Y"]).toBe("Y");
        expect(Object.keys(v15)).not.toContain("Z");
      });

      it("forVersion('17.5') при history={17, 19} возвращает срез '17'", () => {
        // Arrange — "17.5" не является ключом, ближайшая ≤ 17.5 — это "17"
        // Act
        const v175 = EFilterMode[VersionedEnum.forVersion]("17.5" as "17");

        // Assert — срез v17 содержит MULTI
        expect((v175 as Record<string, string>)["MULTI"]).toBe("MULTI");
        expect(Object.keys(v175)).toContain("MULTI");
      });
    });
  });
});
