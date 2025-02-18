import {
  EWidgetIndicatorValueModes,
  type IWidgetMeasure,
  type TWidgetIndicatorConversionValue,
  type TWidgetIndicatorDurationValue,
} from "../indicators";
import { fillTemplateString, generateColumnFormula } from "./common";
import {
  conversionTemplate,
  EMeasureAggregationTemplateName,
  measureAggregationTemplates,
} from "./measureProcessMetricsTemplates";
import { convertFiltersToFormula } from "../calculators/utils/filters";

export enum EMeasureTemplateNames {
  avg = "avg",
  median = "median",
  count = "count",
  countDistinct = "countDistinct",
  min = "min",
  max = "max",
  sum = "sum",
}

export const measureTemplateFormulas = {
  [EMeasureTemplateNames.avg]: `avg({columnFormula})`,
  [EMeasureTemplateNames.count]: `count({columnFormula})`,
  [EMeasureTemplateNames.countDistinct]: `count(distinct {columnFormula})`,
  [EMeasureTemplateNames.median]: `medianExact({columnFormula})`,
  [EMeasureTemplateNames.min]: `min({columnFormula})`,
  [EMeasureTemplateNames.max]: `max({columnFormula})`,
  [EMeasureTemplateNames.sum]: `sum({columnFormula})`,
} as const;

export const prepareAggregationParams = (
  value: Extract<
    IWidgetMeasure["value"],
    {
      mode: EWidgetIndicatorValueModes.AGGREGATION;
    }
  >
) => {
  if (
    !value.eventName ||
    !value.caseIdFormula ||
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
    caseIdFormula: value.caseIdFormula,
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

export const prepareConversionParams = (value: TWidgetIndicatorConversionValue) => {
  if (
    !value.startEventName ||
    !value.endEventName ||
    !value.endCaseCaseIdFormula ||
    !value.endEventNameFormula ||
    !value.endEventProcessName ||
    !value.endEventTimeFormula ||
    !value.startEventNameFormula ||
    !value.startEventProcessName ||
    !value.startEventTimeFormula
  ) {
    return null;
  }

  return {
    objectFilters: "1",

    startEventTimeFormula: value.startEventTimeFormula,
    startEventNameFormula: value.startEventNameFormula,
    startEventFilters: convertFiltersToFormula(value.startEventFilters),
    startEventName: value.startEventName,

    endEventTimeFormula: value.endEventTimeFormula,
    endCaseCaseIdFormula: value.endCaseCaseIdFormula,
    endEventNameFormula: value.endEventNameFormula,
    endEventName: value.endEventName,
    endEventFilters: convertFiltersToFormula(value.endEventFilters),
  };
};

export const prepareDurationParams = (value: TWidgetIndicatorDurationValue) => {
  if (
    !value.startEventName ||
    !value.endEventName ||
    !value.endCaseCaseIdFormula ||
    !value.endEventNameFormula ||
    !value.endEventProcessName ||
    !value.endEventTimeFormula ||
    !value.startEventNameFormula ||
    !value.startEventProcessName ||
    !value.startEventTimeFormula
  ) {
    return null;
  }

  const getAggregationNameByAppearances = (appearance: "FIRST" | "LAST") => {
    return appearance === "FIRST" ? "minIf" : "maxIf";
  };

  return {
    objectFilters: "1",

    startEventTimeFormula: value.startEventTimeFormula,
    startEventNameFormula: value.startEventNameFormula,
    startEventFilters: convertFiltersToFormula(value.startEventFilters),
    startEventName: value.startEventName,
    startEventAggregationName: getAggregationNameByAppearances(value.startEventAppearances),

    endEventTimeFormula: value.endEventTimeFormula,
    endCaseCaseIdFormula: value.endCaseCaseIdFormula,
    endEventNameFormula: value.endEventNameFormula,
    endEventName: value.endEventName,
    endEventFilters: convertFiltersToFormula(value.endEventFilters),
    endEventAggregationName: getAggregationNameByAppearances(value.endEventAppearances),
  };
};

export function getMeasureFormula({ value }: IWidgetMeasure): string {
  if (!value) {
    return "";
  }

  if (value.mode === EWidgetIndicatorValueModes.FORMULA) {
    return value.formula ?? "";
  }

  if (value.mode === EWidgetIndicatorValueModes.TEMPLATE) {
    const { templateName, tableName, columnName } = value;

    const templateFormula = measureTemplateFormulas[templateName as EMeasureTemplateNames];

    if (!templateFormula || !tableName || !columnName) {
      return "";
    }

    return fillTemplateString(templateFormula, {
      columnFormula: generateColumnFormula(tableName, columnName),
    });
  }

  if (value.mode === EWidgetIndicatorValueModes.AGGREGATION) {
    const preparedParams = prepareAggregationParams(value);

    if (!preparedParams) {
      return "";
    }

    const templateFormula =
      measureAggregationTemplates[value.templateName as EMeasureAggregationTemplateName];

    return fillTemplateString(templateFormula, preparedParams);
  }

  if (value.mode === EWidgetIndicatorValueModes.CONVERSION) {
    const preparedParams = prepareConversionParams(value);

    if (!preparedParams) {
      return "";
    }

    return fillTemplateString(conversionTemplate, preparedParams);
  }

  if (value.mode === EWidgetIndicatorValueModes.DURATION) {
    const preparedParams = prepareDurationParams(value);

    if (!preparedParams) {
      return "";
    }

    return fillTemplateString(conversionTemplate, preparedParams);
  }

  return "";
}
