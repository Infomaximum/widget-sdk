import { convertFiltersToFormula } from "../../calculators/utils/filters";
import type { EWidgetIndicatorValueModes, IWidgetMeasure } from "../../indicators";
import {
  countExecutionsTemplate,
  countReworksTemplate,
  firstValueTemplate,
  lastValueTemplate,
  topTemplate,
} from "../shared/aggregationTemplates";
import { generateColumnFormula } from "../shared";

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

/** Шаблоны процессных метрик меры с режимом AGGREGATION */
export const measureAggregationTemplates: Record<
  EMeasureAggregationTemplateName,
  string | ((isTop: boolean) => string)
> = {
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
  [EMeasureAggregationTemplateName.top]: createTopLikeTemplate(topTemplate),
  [EMeasureAggregationTemplateName.firstValue]: createTopLikeTemplate(firstValueTemplate),
  [EMeasureAggregationTemplateName.lastValue]: createTopLikeTemplate(lastValueTemplate),
  [EMeasureAggregationTemplateName.countExecutions]: `{outerAggregation}If(${countExecutionsTemplate},{objectFilters})`,
  [EMeasureAggregationTemplateName.countReworks]: `{outerAggregation}If(${countReworksTemplate},{objectFilters})`,
};

/** Вспомогательная функция для шаблонов top/firstValue/lastValue */
function createTopLikeTemplate(template: string): (isTop: boolean) => string {
  return (isTop: boolean) =>
    isTop
      ? `{outerAggregation}KIf(1)(${template}, {objectFilters})[1]`
      : `{outerAggregation}If(${template}, {objectFilters})`;
}

/** На основе значения режима AGGREGATION подготовить параметры для подстановки в шаблонную формулу */
export const prepareMeasureAggregationParams = (
  value: Extract<
    IWidgetMeasure["value"],
    {
      mode: EWidgetIndicatorValueModes.AGGREGATION;
    }
  >
) => {
  if (
    !value.eventName ||
    !value.caseCaseIdFormula ||
    !value.eventNameFormula ||
    !value.outerAggregation ||
    !value.processName ||
    !value.templateName
  ) {
    return null;
  }

  const commonParams = {
    outerAggregation: value.outerAggregation,
    eventNameFormula: value.eventNameFormula,
    caseCaseIdFormula: value.caseCaseIdFormula,
    eventName: value.eventName,
    objectFilters: "1",
    filters: convertFiltersToFormula(value.filters),
    eventTimeFormula: "",
    columnFormula: "",
  };

  if (value.templateName === "countReworks" || value.templateName === "countExecutions") {
    return commonParams;
  }

  if (!value.tableName || !value.columnName) {
    return null;
  }

  const columnParams = {
    ...commonParams,
    columnFormula: generateColumnFormula(value.tableName, value.columnName),
  };

  if (value.templateName === "lastValue" || value.templateName === "firstValue") {
    if (!value.eventTimeFormula) {
      return null;
    }

    return {
      ...columnParams,
      eventTimeFormula: value.eventTimeFormula,
    };
  }

  return columnParams;
};
