import { escapeSingularQuotes } from "../../calculators/utils/escapeSingularQuotes";
import { convertFiltersToFormula } from "../../calculators/utils/filters";
import { EWidgetIndicatorValueModes, type IWidgetMeasure } from "../../indicators";
import { generateColumnFormula } from "../shared";
import { VersionedEnum } from "../../versionedEnum";

export const EMeasureAggregationTemplateName = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      agvIf: "agvIf",
      medianIf: "medianIf",
      countIf: "countIf",
      countIfDistinct: "countIfDistinct",
      minIf: "minIf",
      maxIf: "maxIf",
      sumIf: "sumIf",
      top: "top",
      firstValue: "firstValue",
      lastValue: "lastValue",
      countExecutions: "countExecutions",
      countReworks: "countReworks",
    } as const,
  },
});

export type TMeasureAggregationTemplateName = Extract<
  (typeof EMeasureAggregationTemplateName)[keyof typeof EMeasureAggregationTemplateName],
  string
>;

/** На основе значения режима AGGREGATION подготовить параметры для подстановки в шаблонную формулу */
export const prepareMeasureAggregationParams = (
  value: Extract<
    IWidgetMeasure["value"],
    {
      mode: typeof EWidgetIndicatorValueModes.AGGREGATION;
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
    eventName: value.eventName ? `'${escapeSingularQuotes(value.eventName)}'` : "",
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
