import { EOuterAggregation, type TWidgetIndicatorAggregationValue } from "../../indicators";
import {
  countExecutionsTemplate,
  countReworksTemplate,
  firstValueTemplate,
  lastValueTemplate,
  topTemplate,
} from "../shared/aggregationTemplates";
import { EMeasureAggregationTemplateName } from "./aggregationTemplates";

function createAggregationTemplate(fn: string, additionalFn?: string) {
  return `{outerAggregation}If(process(${fn}(${additionalFn ? additionalFn + " " : ""}{columnFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula}), {objectFilters})`;
}

/** Вспомогательная функция для шаблонов top/firstValue/lastValue */
function createTopLikeTemplate(template: string): (outerAggregation: EOuterAggregation) => string {
  return (outerAggregation: EOuterAggregation) =>
    outerAggregation === EOuterAggregation.top
      ? `{outerAggregation}KIf(1)(${template}, {objectFilters})[1]`
      : `{outerAggregation}If(${template}, {objectFilters})`;
}

export const createAggregationFormulaByTemplateName = (
  templateName: EMeasureAggregationTemplateName,
  {
    outerAggregation,
    anyEvent,
  }: Pick<TWidgetIndicatorAggregationValue, "anyEvent"> & {
    outerAggregation: EOuterAggregation;
  }
) => {
  switch (templateName) {
    case EMeasureAggregationTemplateName.agvIf:
      return anyEvent
        ? "{outerAggregation}If(process(avg({columnFormula}), {caseCaseIdFormula}), {objectFilters})"
        : createAggregationTemplate("avgIf");
    case EMeasureAggregationTemplateName.medianIf:
      return anyEvent
        ? "{outerAggregation}If(process(median({columnFormula}), {caseCaseIdFormula}), {objectFilters})"
        : createAggregationTemplate("medianIf");
    case EMeasureAggregationTemplateName.countIf:
      return anyEvent
        ? "{outerAggregation}If(process(count({columnFormula}), {caseCaseIdFormula}), {objectFilters})"
        : createAggregationTemplate("countIf");
    case EMeasureAggregationTemplateName.countIfDistinct:
      return anyEvent
        ? "{outerAggregation}If(process(count(distinct {columnFormula}), {caseCaseIdFormula}), {objectFilters})"
        : createAggregationTemplate("countIf", "distinct");
    case EMeasureAggregationTemplateName.minIf:
      return anyEvent
        ? "{outerAggregation}If(process(min({columnFormula}), {caseCaseIdFormula}), {objectFilters})"
        : createAggregationTemplate("minIf");
    case EMeasureAggregationTemplateName.maxIf:
      return anyEvent
        ? "{outerAggregation}If(process(max({columnFormula}), {caseCaseIdFormula}), {objectFilters})"
        : createAggregationTemplate("maxIf");
    case EMeasureAggregationTemplateName.sumIf:
      return anyEvent
        ? "{outerAggregation}If(process(sum({columnFormula}), {caseCaseIdFormula}), {objectFilters})"
        : createAggregationTemplate("sumIf");
    case EMeasureAggregationTemplateName.top:
      return anyEvent
        ? "{outerAggregation}If(process(topK(1)({columnFormula})[1], {caseCaseIdFormula}), {objectFilters})"
        : createTopLikeTemplate(topTemplate)(outerAggregation);
    case EMeasureAggregationTemplateName.firstValue:
      return anyEvent
        ? "{outerAggregation}If(process(argMin({columnFormula}, {eventTimeFormula}), {caseCaseIdFormula}), {objectFilters})"
        : createTopLikeTemplate(firstValueTemplate)(outerAggregation);
    case EMeasureAggregationTemplateName.lastValue:
      return anyEvent
        ? "{outerAggregation}If(process(argMax({columnFormula}, {eventTimeFormula}), {caseCaseIdFormula}), {objectFilters})"
        : createTopLikeTemplate(lastValueTemplate)(outerAggregation);
    case EMeasureAggregationTemplateName.countExecutions:
      return `{outerAggregation}If(${countExecutionsTemplate},{objectFilters})`;
    case EMeasureAggregationTemplateName.countReworks:
      return `{outerAggregation}If(${countReworksTemplate},{objectFilters})`;
  }
};
