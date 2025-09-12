import { fillTemplateSql } from "./fillTemplateString";

describe("fillTemplateSql", () => {
  const lastValueTemplate =
    "process(argMaxIf({columnFormula}, {eventTimeFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula})";
  const countReworksTemplate =
    "process(if(countIf({eventNameFormula} = '{eventName}'{filters}) > 0, countIf({eventNameFormula}  = '{eventName}'{filters}) - 1, 0), {caseCaseIdFormula})";
  const reworkTemplate = "count() - uniqExact({caseCaseIdFormula})";
  const medianTimeTemplate =
    "medianExact(date_diff(second, begin({eventTimeFormula}), end({eventTimeFormula})))";

  const columnFormula = `"table_name"."Integer"`;
  const eventTimeFormula = `"table_name"."DateTime"`;
  const eventNameFormula = `"table_name"."String"`;
  const eventName = "Some Event";
  const filters = "[]";
  const caseCaseIdFormula = `"table_name"."Float"`;

  it("должен корректно подставить все значения в шаблон", () => {
    const params = {
      columnFormula,
      eventTimeFormula,
      eventNameFormula,
      eventName,
      filters,
      caseCaseIdFormula,
    };

    expect(fillTemplateSql(lastValueTemplate, params)).toEqual(
      `process(argMaxIf(${columnFormula}, ${eventTimeFormula}, ${eventNameFormula} = '${eventName}'${filters}), ${caseCaseIdFormula})`
    );
  });

  it("должен добавить перенос строки, если значение содержит SQL-комментарий '--'", () => {
    const params = {
      columnFormula,
      eventTimeFormula,
      eventNameFormula,
      eventName: "eventName -- комментарий",
      filters,
      caseCaseIdFormula,
    };

    expect(fillTemplateSql(lastValueTemplate, params)).toEqual(
      `process(argMaxIf(${columnFormula}, ${eventTimeFormula}, ${eventNameFormula} = '${params.eventName}\n'${filters}), ${caseCaseIdFormula})`
    );
  });

  it("должен заменить отсутствующие ключи на пустую строку", () => {
    const template = "SELECT {a}, {b}, {c}";
    const params = { a: "1" };

    expect(fillTemplateSql(template, params)).toEqual("SELECT 1, , ");
  });

  it("должен корректно подставлять одно и то же значение несколько раз", () => {
    const template = "SELECT {value}, {value}, {value}";
    const params = { value: "X" };

    expect(fillTemplateSql(template, params)).toEqual("SELECT X, X, X");
  });

  it("должен корректно подставить значения в шаблон countReworksTemplate с комментарием", () => {
    const params = {
      eventNameFormula,
      eventName,
      filters,
      caseCaseIdFormula: `${caseCaseIdFormula} ---- any comment`,
    };

    expect(fillTemplateSql(countReworksTemplate, params)).toEqual(
      `process(if(countIf(${eventNameFormula} = '${eventName}'${filters}) > 0, countIf(${eventNameFormula}  = '${eventName}'${filters}) - 1, 0), ${params.caseCaseIdFormula}\n)`
    );
  });

  it("должен корректно подставить значение в шаблон reworkTemplate", () => {
    const params = {
      caseCaseIdFormula,
    };

    expect(fillTemplateSql(reworkTemplate, params)).toEqual(
      `count() - uniqExact(${caseCaseIdFormula})`
    );
  });

  it("должен корректно подставить значение в шаблон medianTimeTemplate", () => {
    const params = {
      eventTimeFormula,
    };

    expect(fillTemplateSql(medianTimeTemplate, params)).toEqual(
      `medianExact(date_diff(second, begin(${eventTimeFormula}), end(${eventTimeFormula})))`
    );
  });
});
