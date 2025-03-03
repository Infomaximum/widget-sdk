import { convertFiltersToFormula } from "../../calculators/utils/filters";
import type { EWidgetIndicatorValueModes, IWidgetDimension } from "../../indicators";
import {
  countExecutionsTemplate,
  countReworksTemplate,
  firstValueTemplate,
  lastValueTemplate,
  topTemplate,
} from "../shared/aggregationTemplates";
import { generateColumnFormula } from "../shared";

export enum EDimensionAggregationTemplateName {
  top = "top",
  firstValue = "firstValue",
  lastValue = "lastValue",
  countExecutions = "countExecutions",
  countReworks = "countReworks",
}

/** Шаблоны процессных метрик разреза с режимом AGGREGATION */
export const dimensionAggregationTemplates: Record<EDimensionAggregationTemplateName, string> = {
  [EDimensionAggregationTemplateName.top]: topTemplate,
  [EDimensionAggregationTemplateName.firstValue]: firstValueTemplate,
  [EDimensionAggregationTemplateName.lastValue]: lastValueTemplate,
  [EDimensionAggregationTemplateName.countExecutions]: countExecutionsTemplate,
  [EDimensionAggregationTemplateName.countReworks]: countReworksTemplate,
};

/** На основе значения режима AGGREGATION подготовить параметры для подстановки в шаблонную формулу */
export const prepareDimensionAggregationParams = (
  value: Extract<
    IWidgetDimension["value"],
    {
      mode: EWidgetIndicatorValueModes.AGGREGATION;
    }
  >
) => {
  if (
    !value.eventName ||
    !value.caseCaseIdFormula ||
    !value.eventNameFormula ||
    !value.processName ||
    !value.templateName
  ) {
    return null;
  }

  const commonParams = {
    eventNameFormula: value.eventNameFormula,
    caseCaseIdFormula: value.caseCaseIdFormula,
    eventName: value.eventName,
    objectFilters: "1",
    filters: convertFiltersToFormula(value.filters),
    eventTimeFormula: "",
    columnFormula: "",
  };

  if (
    value.templateName === EDimensionAggregationTemplateName.countReworks ||
    value.templateName === EDimensionAggregationTemplateName.countExecutions
  ) {
    return commonParams;
  }

  if (!value.tableName || !value.columnName) {
    return null;
  }

  const columnParams = {
    ...commonParams,
    ...(value.innerTemplateName && { innerTemplateName: value.innerTemplateName }),
    columnFormula: generateColumnFormula(value.tableName, value.columnName),
  };

  if (
    value.templateName === EDimensionAggregationTemplateName.firstValue ||
    value.templateName === EDimensionAggregationTemplateName.lastValue
  ) {
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
