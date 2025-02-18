import { clearMultiLineComments } from "./prepareFormulaForSql";

describe("Удаление многострочного комментария", () => {
  it("Case 1", () => {
    const innerFormula = `"event_log"."incident_id"`;
    const formula = `/* Первый */${innerFormula}/* Второй */`;

    expect(clearMultiLineComments(formula)).toBe(innerFormula);
  });

  it("Case 2", () => {
    const innerFormula = `"event_log"."incident_id"`;
    const formula = `/* Первый \n */\n${innerFormula}\n/* Второй */`;

    expect(clearMultiLineComments(formula)).toBe(`\n${innerFormula}\n`);
  });
});
