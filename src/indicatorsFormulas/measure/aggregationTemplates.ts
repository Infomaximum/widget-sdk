import { convertFiltersToFormula } from "../../calculators/utils/filters";
import { type EWidgetIndicatorValueModes, type IWidgetMeasure } from "../../indicators";
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
    (!value.anyEvent && !value.eventName) ||
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
    eventName: value.eventName ?? "",
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
