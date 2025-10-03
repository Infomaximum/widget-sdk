import { escapeSingularQuotes } from "../../calculators/utils/escapeSingularQuotes";
import { convertFiltersToFormula } from "../../calculators/utils/filters";
import { EWidgetIndicatorValueModes, type TWidgetIndicatorTimeValue } from "../../indicators";
import { fillTemplateSql } from "../shared";
import { dimensionTemplateFormulas, type EDimensionTemplateNames } from "./baseTemplates";

/** Шаблоны процессных метрик разреза с режимами START_TIME/END_TIME */
export const timeTemplates = (() => {
  const generateTemplates = (innerTemplate: string) => {
    const templates = {} as Record<EDimensionTemplateNames, string>;

    for (const key in dimensionTemplateFormulas) {
      templates[key as EDimensionTemplateNames] = fillTemplateSql(
        dimensionTemplateFormulas[key as EDimensionTemplateNames],
        { columnFormula: innerTemplate }
      );
    }

    return templates;
  };

  return {
    [EWidgetIndicatorValueModes.START_TIME]: generateTemplates(
      "process(minIf({eventTimeFormula}, {eventNameFormula} = {eventName}{filters}), {caseCaseIdFormula})"
    ),
    [EWidgetIndicatorValueModes.END_TIME]: generateTemplates(
      "process(maxIf({eventTimeFormula}, {eventNameFormula} = {eventName}{filters}), {caseCaseIdFormula})"
    ),
  };
})();

/** На основе значения режимов START_TIME/END_TIME подготовить параметры для подстановки в шаблонную формулу */
export const prepareTimeParams = (value: TWidgetIndicatorTimeValue) => {
  if (
    !value.eventName ||
    !value.caseCaseIdFormula ||
    !value.eventNameFormula ||
    !value.processKey ||
    !value.templateName ||
    !value.eventTimeFormula
  ) {
    return;
  }

  return {
    eventTimeFormula: value.eventTimeFormula,
    eventNameFormula: value.eventNameFormula,
    caseCaseIdFormula: value.caseCaseIdFormula,
    filters: convertFiltersToFormula(value.filters),
    eventName: `'${escapeSingularQuotes(value.eventName)}'`,
  };
};
