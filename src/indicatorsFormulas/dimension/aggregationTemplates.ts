import { convertFiltersToFormula } from "../../calculators/utils/filters";
import type { EWidgetIndicatorValueModes, IWidgetDimension } from "../../indicators";
import {
  avgTemplate,
  medianTemplate,
  countTemplate,
  countDistinctTemplate,
  minTemplate,
  maxTemplate,
  sumTemplate,
  topTemplate,
  firstValueTemplate,
  lastValueTemplate,
  countExecutionsTemplate,
  countReworksTemplate,
} from "../shared/aggregationTemplates";
import { generateColumnFormula } from "../shared";
import { escapeSingularQuotes } from "../../calculators/utils/escapeSingularQuotes";

export enum EDimensionAggregationTemplateName {
  avg = "avg",
  median = "median",
  count = "count",
  countDistinct = "countDistinct",
  min = "min",
  max = "max",
  sum = "sum",
  top = "top",
  firstValue = "firstValue",
  lastValue = "lastValue",
  countExecutions = "countExecutions",
  countReworks = "countReworks",
}

/** Шаблоны процессных метрик разреза с режимом AGGREGATION */
export const dimensionAggregationTemplates: Record<EDimensionAggregationTemplateName, string> = {
  [EDimensionAggregationTemplateName.avg]: avgTemplate,
  [EDimensionAggregationTemplateName.median]: medianTemplate,
  [EDimensionAggregationTemplateName.count]: countTemplate,
  [EDimensionAggregationTemplateName.countDistinct]: countDistinctTemplate,
  [EDimensionAggregationTemplateName.min]: minTemplate,
  [EDimensionAggregationTemplateName.max]: maxTemplate,
  [EDimensionAggregationTemplateName.sum]: sumTemplate,
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
    !value.processKey ||
    !value.templateName
  ) {
    return null;
  }

  const commonParams = {
    eventNameFormula: value.eventNameFormula,
    caseCaseIdFormula: value.caseCaseIdFormula,
    eventName: escapeSingularQuotes(value.eventName),
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
