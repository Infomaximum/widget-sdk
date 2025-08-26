import { convertFiltersToFormula } from "../../calculators/utils/filters";
import type { TWidgetIndicatorConversionValue } from "../../indicators";

/** Шаблон процессной метрики меры с режимом CONVERSION */
export const conversionTemplate = `countIf(
    process(
        minIf(
            {startEventTimeFormula}, 
            {startEventNameFormula} = '{startEventName}'{startEventFilters}
        ), 
        {endCaseCaseIdFormula}
    ) < 
    process(
        maxIf(
            {endEventTimeFormula}, 
            {endEventNameFormula} = '{endEventName}'{endEventFilters}
        ), 
        {endCaseCaseIdFormula}
    ) 
    and 
    process(
        countIf(
            {startEventNameFormula} = '{startEventName}'{startEventFilters}
        ) != 0, 
        {endCaseCaseIdFormula}
    ) != 0
) / countIf(
    process(
        countIf(
            {startEventNameFormula} = '{startEventName}'{startEventFilters}
        ) != 0, 
        {endCaseCaseIdFormula}
    ) != 0
)`;

/** На основе значения режима CONVERSION подготовить параметры для подстановки в шаблонную формулу */
export const prepareConversionParams = (value: TWidgetIndicatorConversionValue) => {
  if (
    !value.startEventName ||
    !value.endEventName ||
    !value.endCaseCaseIdFormula ||
    !value.endEventNameFormula ||
    !value.endEventProcessKey ||
    !value.endEventTimeFormula ||
    !value.startEventNameFormula ||
    !value.startEventProcessKey ||
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
