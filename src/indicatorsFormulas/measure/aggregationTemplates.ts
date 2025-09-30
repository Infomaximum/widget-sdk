import { convertFiltersToFormula } from "../../calculators/utils/filters";
import {
  EOuterAggregation,
  type EWidgetIndicatorValueModes,
  type IWidgetMeasure,
} from "../../indicators";
import {
  countExecutionsTemplate,
  countReworksTemplate,
  firstValueTemplate,
  lastValueTemplate,
  topTemplate,
} from "../shared/aggregationTemplates";
import { generateColumnFormula } from "../shared";
import { escapeSingularQuotes } from "../../calculators/utils/escapeSingularQuotes";

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

function createAggregationTemplate(fn: string, additionalFn?: string) {
  return `{outerAggregation}If(process(${fn}(${additionalFn ? additionalFn + " " : ""}{columnFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula}), {objectFilters})`;
}

/** Шаблоны процессных метрик меры с режимом AGGREGATION */
export const measureAggregationTemplates = {
  [EMeasureAggregationTemplateName.agvIf]: createAggregationTemplate("avgIf"),
  [EMeasureAggregationTemplateName.medianIf]: createAggregationTemplate("medianIf"),
  [EMeasureAggregationTemplateName.countIf]: createAggregationTemplate("countIf"),
  [EMeasureAggregationTemplateName.countIfDistinct]: createAggregationTemplate(
    "countIf",
    "distinct"
  ),
  [EMeasureAggregationTemplateName.minIf]: createAggregationTemplate("minIf"),
  [EMeasureAggregationTemplateName.maxIf]: createAggregationTemplate("maxIf"),
  [EMeasureAggregationTemplateName.sumIf]: createAggregationTemplate("sumIf"),
  [EMeasureAggregationTemplateName.top]: createTopLikeTemplate(topTemplate),
  [EMeasureAggregationTemplateName.firstValue]: createTopLikeTemplate(firstValueTemplate),
  [EMeasureAggregationTemplateName.lastValue]: createTopLikeTemplate(lastValueTemplate),
  [EMeasureAggregationTemplateName.countExecutions]: `{outerAggregation}If(${countExecutionsTemplate},{objectFilters})`,
  [EMeasureAggregationTemplateName.countReworks]: `{outerAggregation}If(${countReworksTemplate},{objectFilters})`,
} satisfies Record<
  EMeasureAggregationTemplateName,
  string | ((outerAggregation: EOuterAggregation) => string)
>;

/** Вспомогательная функция для шаблонов top/firstValue/lastValue */
function createTopLikeTemplate(template: string): (outerAggregation: EOuterAggregation) => string {
  return (outerAggregation: EOuterAggregation) =>
    outerAggregation === EOuterAggregation.top
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
    !value.processKey ||
    !value.templateName
  ) {
    return null;
  }

  const commonParams = {
    outerAggregation: value.outerAggregation,
    eventNameFormula: value.eventNameFormula,
    caseCaseIdFormula: value.caseCaseIdFormula,
    eventName: escapeSingularQuotes(value.eventName),
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
