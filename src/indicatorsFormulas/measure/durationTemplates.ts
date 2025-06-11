import { convertFiltersToFormula } from "../../calculators/utils/filters";
import {
  EDurationTemplateName,
  EEventAppearances,
  type TWidgetIndicatorDurationValue,
} from "../../indicators";

/** Шаблоны процессных метрик меры с режимом DURATION */
export const durationTemplates: Record<EDurationTemplateName, string> = (() => {
  const innerTemplate = `
    timeDiff(
        process(
            {startEventAggregationName}(
                {startEventTimeFormula}, 
                {startEventNameFormula} = '{startEventName}'{startEventFilters}
            ), 
            {endCaseCaseIdFormula}
        ), 
        process(
            {endEventAggregationName}(
                {endEventTimeFormula}, 
                {endEventNameFormula} = '{endEventName}'{endEventFilters}
            ), 
            {endCaseCaseIdFormula}
        )
    ), 
    process(
        {startEventAggregationName}(
            {startEventTimeFormula}, 
            {startEventNameFormula} = '{startEventName}'{startEventFilters}
        ), 
        {endCaseCaseIdFormula}
    ) < 
    process(
        {endEventAggregationName}(
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
  `;

  return {
    [EDurationTemplateName.avg]: `avgIf(${innerTemplate})`,
    [EDurationTemplateName.median]: `medianIf(${innerTemplate})`,
  };
})();

/** На основе значения режима DURATION подготовить параметры для подстановки в шаблонную формулу */
export const prepareDurationParams = (value: TWidgetIndicatorDurationValue) => {
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

  const getAggregationNameByAppearances = (appearance: EEventAppearances) =>
    appearance === EEventAppearances.FIRST ? "minIf" : "maxIf";

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
