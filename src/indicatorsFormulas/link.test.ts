import { escapeCurlyBracketLinkName, parseIndicatorLink } from "./link";

describe("parseIndicatorLink", () => {
  it("возвращает indicatorName без scope для dashboardLink", () => {
    const result = parseIndicatorLink("#{sales}");
    expect(result).toEqual({ scopeName: null, indicatorName: "sales" });
  });

  // BI-15428: dashboard-ссылка должна разэкранировать спец.символы в имени,
  // как это уже делает workspace-ветка. Раньше возвращалось имя с бэкслешем,
  // из-за чего правило окрашивания "не находилось".
  it.each([
    ["#{ДашбордБазовы\\.}", "ДашбордБазовы."],
    ["#{Дашборд\\.Настроить}", "Дашборд.Настроить"],
    ["#{Скоб\\[ки\\]}", "Скоб[ки]"],
    ["#{Фигур\\}ная}", "Фигур}ная"],
    ["#{Слеш\\\\x}", "Слеш\\x"],
  ])(
    "разэкранирует спец.символы в имени dashboardLink: %s (BI-15428)",
    (formula, indicatorName) => {
      expect(parseIndicatorLink(formula)).toEqual({ scopeName: null, indicatorName });
    }
  );

  it.each(["ДашбордБазовы.", ".Начало", "Две..точки", "Скоб[ки]", "Слеш\\x", "БезТочки"])(
    "туда-обратно escapeCurlyBracketLinkName → parseIndicatorLink: %s (BI-15428)",
    (name) => {
      const formula = `#{${escapeCurlyBracketLinkName(name)}}`;
      expect(parseIndicatorLink(formula)).toEqual({ scopeName: null, indicatorName: name });
    }
  );

  it("возвращает scopeName и indicatorName для workspaceLink", () => {
    const result = parseIndicatorLink("#{finance}.{profit}");
    expect(result).toEqual({ scopeName: "finance", indicatorName: "profit" });
  });

  it("возвращает null, если нет ссылки", () => {
    const result = parseIndicatorLink("no link here");
    expect(result).toBeNull();
  });

  it("корректно обрабатывает экранированные скобки", () => {
    const result = parseIndicatorLink("#{fin\\}ance}.{pro\\}fit}");
    expect(result).toEqual({ scopeName: "fin}ance", indicatorName: "pro}fit" });
  });

  it("корректно обрабатывает экранированные скобки в начале конце имени", () => {
    const result = parseIndicatorLink("#{\\}finance}.{pro\\}fit}");
    expect(result).toEqual({ scopeName: "}finance", indicatorName: "pro}fit" });
  });

  it("корректно обрабатывает экранированные слэши", () => {
    const result = parseIndicatorLink("#{dep\\\\artment}.{co\\\\st}");
    expect(result).toEqual({ scopeName: "dep\\artment", indicatorName: "co\\st" });
  });

  it("корректно обрабатывает экранированные слэши в начале и конце имени", () => {
    const result = parseIndicatorLink("#{\\\\department}.{cost\\\\}");
    expect(result).toEqual({ scopeName: "\\department", indicatorName: "cost\\" });
  });

  it("корректно обрабатывает различные символы, не требующие экранирования", () => {
    const result = parseIndicatorLink("#{?depa?rtment}.{co!s(t)}");
    expect(result).toEqual({ scopeName: "?depa?rtment", indicatorName: "co!s(t)" });
  });
});
