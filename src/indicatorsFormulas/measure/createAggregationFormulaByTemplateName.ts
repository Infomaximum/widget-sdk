import { EOuterAggregation, type TWidgetIndicatorAggregationValue } from "../../indicators";
import {
  countExecutionsTemplate,
  countReworksTemplate,
  firstValueTemplate,
  lastValueTemplate,
  topTemplate,
} from "../shared/aggregationTemplates";
import { EMeasureAggregationTemplateName } from "./aggregationTemplates";

function createAnyEventFormula(aggregatePart: string) {
  return `{outerAggregation}If(process(${aggregatePart}, {caseCaseIdFormula}), {objectFilters})`;
}

function createSpecificEventFormula(fn: string, additionalFn?: string) {
  return `{outerAggregation}If(process(${fn}(${additionalFn ? `${additionalFn} ` : ""}{columnFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula}), {objectFilters})`;
}

function createTopLikeTemplate(template: string) {
  return (outerAggregation: EOuterAggregation) =>
    outerAggregation === EOuterAggregation.top
      ? `{outerAggregation}KIf(1)(${template}, {objectFilters})[1]`
      : `{outerAggregation}If(${template}, {objectFilters})`;
}

function createAggregationFormulaByTemplateName(
  templateName: EMeasureAggregationTemplateName,
  {
    outerAggregation,
    anyEvent,
  }: Pick<TWidgetIndicatorAggregationValue, "anyEvent"> & {
    outerAggregation: EOuterAggregation;
  }
) {
  switch (templateName) {
    case EMeasureAggregationTemplateName.agvIf:
      return anyEvent
        ? createAnyEventFormula("avg({columnFormula})")
        : createSpecificEventFormula("avgIf");
    case EMeasureAggregationTemplateName.medianIf:
      return anyEvent
        ? createAnyEventFormula("median({columnFormula})")
        : createSpecificEventFormula("medianIf");
    case EMeasureAggregationTemplateName.countIf:
      return anyEvent
        ? createAnyEventFormula("count({columnFormula})")
        : createSpecificEventFormula("countIf");
    case EMeasureAggregationTemplateName.countIfDistinct:
      return anyEvent
        ? createAnyEventFormula("count(distinct {columnFormula})")
        : createSpecificEventFormula("countIf", "distinct");
    case EMeasureAggregationTemplateName.minIf:
      return anyEvent
        ? createAnyEventFormula("min({columnFormula})")
        : createSpecificEventFormula("minIf");
    case EMeasureAggregationTemplateName.maxIf:
      return anyEvent
        ? createAnyEventFormula("max({columnFormula})")
        : createSpecificEventFormula("maxIf");
    case EMeasureAggregationTemplateName.sumIf:
      return anyEvent
        ? createAnyEventFormula("sum({columnFormula})")
        : createSpecificEventFormula("sumIf");
    case EMeasureAggregationTemplateName.top:
      return anyEvent
        ? createAnyEventFormula("topK(1)({columnFormula})[1]")
        : createTopLikeTemplate(topTemplate)(outerAggregation);
    case EMeasureAggregationTemplateName.firstValue:
      return anyEvent
        ? createAnyEventFormula("argMin({columnFormula}, {eventTimeFormula})")
        : createTopLikeTemplate(firstValueTemplate)(outerAggregation);
    case EMeasureAggregationTemplateName.lastValue:
      return anyEvent
        ? createAnyEventFormula("argMax({columnFormula}, {eventTimeFormula})")
        : createTopLikeTemplate(lastValueTemplate)(outerAggregation);
    case EMeasureAggregationTemplateName.countExecutions:
      return `{outerAggregation}If(${countExecutionsTemplate}, {objectFilters})`;
    case EMeasureAggregationTemplateName.countReworks:
      return `{outerAggregation}If(${countReworksTemplate}, {objectFilters})`;
  }
}

export { createAggregationFormulaByTemplateName };
