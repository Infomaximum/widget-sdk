import {
  EOuterAggregation,
  type TOuterAggregation,
  type TWidgetIndicatorAggregationValue,
} from "../../indicators";
import {
  countExecutionsTemplate,
  countReworksTemplate,
  firstValueTemplate,
  lastValueTemplate,
  topTemplate,
} from "../shared/aggregationTemplates";
import {
  EMeasureAggregationTemplateName,
  type TMeasureAggregationTemplateName,
} from "./aggregationTemplates";

function createAnyEventTemplate(aggregatePart: string) {
  return `{outerAggregation}(process(${aggregatePart}, {caseCaseIdFormula}))`;
}

function createSpecificEventTemplate(fn: string, additionalFn?: string) {
  return `{outerAggregation}(process(${fn}(${additionalFn ? `${additionalFn} ` : ""}{columnFormula}, {eventNameFormula} = {eventName}{filters}), {caseCaseIdFormula}))`;
}

function createTopLikeTemplate(template: string) {
  return (outerAggregation: TOuterAggregation) =>
    outerAggregation === EOuterAggregation.top
      ? `{outerAggregation}K(1)(${template})[1]`
      : `{outerAggregation}(${template})`;
}

function createAggregationTemplate(
  templateName: TMeasureAggregationTemplateName,
  {
    outerAggregation,
    anyEvent,
  }: Pick<TWidgetIndicatorAggregationValue, "anyEvent"> & {
    outerAggregation: TOuterAggregation;
  }
) {
  switch (templateName) {
    case EMeasureAggregationTemplateName.agvIf:
      return anyEvent
        ? createAnyEventTemplate("avg({columnFormula})")
        : createSpecificEventTemplate("avgIf");
    case EMeasureAggregationTemplateName.medianIf:
      return anyEvent
        ? createAnyEventTemplate("median({columnFormula})")
        : createSpecificEventTemplate("medianIf");
    case EMeasureAggregationTemplateName.countIf:
      return anyEvent
        ? createAnyEventTemplate("count({columnFormula})")
        : createSpecificEventTemplate("countIf");
    case EMeasureAggregationTemplateName.countIfDistinct:
      return anyEvent
        ? createAnyEventTemplate("count(distinct {columnFormula})")
        : createSpecificEventTemplate("countIf", "distinct");
    case EMeasureAggregationTemplateName.minIf:
      return anyEvent
        ? createAnyEventTemplate("min({columnFormula})")
        : createSpecificEventTemplate("minIf");
    case EMeasureAggregationTemplateName.maxIf:
      return anyEvent
        ? createAnyEventTemplate("max({columnFormula})")
        : createSpecificEventTemplate("maxIf");
    case EMeasureAggregationTemplateName.sumIf:
      return anyEvent
        ? createAnyEventTemplate("sum({columnFormula})")
        : createSpecificEventTemplate("sumIf");
    case EMeasureAggregationTemplateName.anyIf:
      return anyEvent
        ? createAnyEventTemplate("any({columnFormula})")
        : createSpecificEventTemplate("anyIf");
    case EMeasureAggregationTemplateName.top:
      return anyEvent
        ? createAnyEventTemplate("topK(1)({columnFormula})[1]")
        : createTopLikeTemplate(topTemplate)(outerAggregation);
    case EMeasureAggregationTemplateName.firstValue:
      return anyEvent
        ? createAnyEventTemplate("argMin({columnFormula}, {eventTimeFormula})")
        : createTopLikeTemplate(firstValueTemplate)(outerAggregation);
    case EMeasureAggregationTemplateName.lastValue:
      return anyEvent
        ? createAnyEventTemplate("argMax({columnFormula}, {eventTimeFormula})")
        : createTopLikeTemplate(lastValueTemplate)(outerAggregation);
    case EMeasureAggregationTemplateName.countExecutions:
      return `{outerAggregation}(${countExecutionsTemplate})`;
    case EMeasureAggregationTemplateName.countReworks:
      return `{outerAggregation}(${countReworksTemplate})`;
  }
}

export { createAggregationTemplate };
