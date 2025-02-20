import { EDurationTemplateName } from "../indicators";

export enum EMeasureAggregationTemplateName {
  agvIf = "agvIf",
  medianIf = "medianIf",
  countIf = "countIf",
  countIfDistinct = "countIfDistinct",
  minIf = "minIf",
  maxIf = "maxIf",
  sumIf = "sumIf",
  top = "top",
  firstValue = "firstValue",
  lastValue = "lastValue",
  countExecutions = "countExecutions",
  countReworks = "countReworks",
}

export const conversionTemplate = `countIf(
    process(
        minIf(
            {startEventTimeFormula}, 
            {startEventNameFormula} = '{startEventName}'{startEventFilters}
        ), 
        {endCaseCaseIdFormula}
    ) < 
    process(
        maxIf(
            {endEventTimeFormula}, 
            {endEventNameFormula} = '{endEventName}'{endEventFilters}
        ), 
        {endCaseCaseIdFormula}
    ) 
    and 
    process(
        countIf(
            {startEventNameFormula} = '{startEventName}'{startEventFilters}
        ) != 0, 
        {endCaseCaseIdFormula}
    ) != 0
) * 100 / countIf(
    process(
        countIf(
            {startEventNameFormula} = '{startEventName}'{startEventFilters}
        ) != 0, 
        {endCaseCaseIdFormula}
    ) != 0
)`;

const durationTemplate = `
    timeDiff(
        process(
            {startEventAggregationName}(
                {startEventTimeFormula}, 
                {startEventNameFormula} = '{startEventName}'{startEventFilters}
            ), 
            {endCaseCaseIdFormula}
        ), 
        process(
            {endEventAggregationName}(
                {endEventTimeFormula}, 
                {endEventNameFormula} = '{endEventName}'{endEventFilters}
            ), 
            {endCaseCaseIdFormula}
        )
    ), 
    process(
        {startEventAggregationName}(
            {startEventTimeFormula}, 
            {startEventNameFormula} = '{startEventName}'{startEventFilters}
        ), 
        {endCaseCaseIdFormula}
    ) < 
    process(
        {endEventAggregationName}(
            {endEventTimeFormula}, 
            {endEventNameFormula} = '{endEventName}'{endEventFilters}
        ), 
        {endCaseCaseIdFormula}
    ) 
    and 
    process(
        countIf(
            {startEventNameFormula} = '{startEventName}'{startEventFilters}
        ) != 0, 
        {endCaseCaseIdFormula}
    ) != 0
`;

export const durationTemplates: Record<EDurationTemplateName, string> = {
  [EDurationTemplateName.avg]: `avgIf(${durationTemplate})`,
  [EDurationTemplateName.median]: `medianIf(${durationTemplate})`,
};

export const countReworksTemplate =
  "{outerAggregation}If(process(if(countIf({eventNameFormula} = '{eventName}'{filters}) > 0, countIf({eventNameFormula}  = '{eventName}'{filters}) - 1, 0), {caseCaseIdFormula}),{objectFilters})";

export const countExecutionsTemplate =
  "process(countIf({eventNameFormula} in '{eventName}'{filters}), {caseCaseIdFormula})";

export const measureAggregationTemplates: Record<EMeasureAggregationTemplateName, string> = {
  [EMeasureAggregationTemplateName.agvIf]:
    "{outerAggregation}If(process(avgIf({columnFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula}), {objectFilters})",
  [EMeasureAggregationTemplateName.medianIf]:
    "{outerAggregation}If(process(medianIf({columnFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula}), {objectFilters})",
  [EMeasureAggregationTemplateName.countIf]:
    "{outerAggregation}If(process(countIf({columnFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula}), {objectFilters})",
  [EMeasureAggregationTemplateName.countIfDistinct]:
    "{outerAggregation}If(process(countIf(distinct {columnFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula}), {objectFilters})",
  [EMeasureAggregationTemplateName.minIf]:
    "{outerAggregation}If(process(minIf({columnFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula}), {objectFilters})",
  [EMeasureAggregationTemplateName.maxIf]:
    "{outerAggregation}If(process(maxIf({columnFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula}), {objectFilters})",
  [EMeasureAggregationTemplateName.sumIf]:
    "{outerAggregation}If(process(sumIf({columnFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula}), {objectFilters})",
  [EMeasureAggregationTemplateName.top]:
    "{outerAggregation}If(process(topKIf(1)({columnFormula}, {eventNameFormula} = '{eventName}'{filters})[1], {caseCaseIdFormula}), {objectFilters})",
  [EMeasureAggregationTemplateName.firstValue]:
    "{outerAggregation}If(process(argMinIf({columnFormula}, {eventTimeFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula}), {objectFilters})",
  [EMeasureAggregationTemplateName.lastValue]:
    "{outerAggregation}If(process(argMaxIf({columnFormula}, {eventTimeFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula}), {objectFilters})",
  [EMeasureAggregationTemplateName.countExecutions]: `{outerAggregation}If(${countExecutionsTemplate},{objectFilters})`,
  [EMeasureAggregationTemplateName.countReworks]: countReworksTemplate,
};
