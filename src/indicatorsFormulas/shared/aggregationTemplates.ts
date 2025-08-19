import { createAggregationTemplate } from "./createAggregationTemplate";

export const countReworksTemplate =
  "process(if(countIf({eventNameFormula} = '{eventName}'{filters}) > 0, countIf({eventNameFormula}  = '{eventName}'{filters}) - 1, 0), {caseCaseIdFormula})";

export const countExecutionsTemplate =
  "process(countIf({eventNameFormula} in '{eventName}'{filters}), {caseCaseIdFormula})";

export const lastValueTemplate =
  "process(argMaxIf({columnFormula}, {eventTimeFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula})";

export const firstValueTemplate =
  "process(argMinIf({columnFormula}, {eventTimeFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula})";

export const topTemplate =
  "process(topKIf(1)({columnFormula}, {eventNameFormula} = '{eventName}'{filters})[1], {caseCaseIdFormula})";

export const avgTemplate = createAggregationTemplate("avgIf");

export const medianTemplate = createAggregationTemplate("medianIf");

export const countTemplate = createAggregationTemplate("countIf");

export const countDistinctTemplate = createAggregationTemplate("countIf", { distinct: true });

export const minTemplate = createAggregationTemplate("minIf");

export const maxTemplate = createAggregationTemplate("maxIf");

export const sumTemplate = createAggregationTemplate("sumIf");
