import { parseIndicatorLink } from "./link";

describe("parseIndicatorLink", () => {
  it("возвращает indicatorName без scope для dashboardLink", () => {
    const result = parseIndicatorLink("#{sales}");
    expect(result).toEqual({ scopeName: null, indicatorName: "sales" });
  });

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
