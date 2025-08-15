import { constructAggregationTemplate } from "./constructAggregationTemplate";

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

export const avgTemplate = constructAggregationTemplate("avgIf");

export const medianTemplate = constructAggregationTemplate("medianIf");

export const countTemplate = constructAggregationTemplate("countIf");

export const countDistinctTemplate = constructAggregationTemplate("countIf", { distinct: true });

export const minTemplate = constructAggregationTemplate("minIf");

export const maxTemplate = constructAggregationTemplate("maxIf");

export const sumTemplate = constructAggregationTemplate("sumIf");
