import { EWidgetIndicatorValueModes, type IProcessIndicator } from "../indicators";
import type { IWidgetProcess } from "../metaDescription";
import { fillTemplateString } from "./common";

export enum ETransitionMeasureTemplateNames {
  transitionsCount = "transitionsCount",
  medianTime = "medianTime",
}

export const transitionMeasureTemplateFormulas = {
  [ETransitionMeasureTemplateNames.transitionsCount]: `count()`,
  [ETransitionMeasureTemplateNames.medianTime]: `medianExact(date_diff(second, begin({eventTimeFormula}), end({eventTimeFormula})))`,
} as const;

export function getTransitionMeasureFormula(
  { value }: IProcessIndicator,
  process: IWidgetProcess
): string {
  if (!value) {
    return "";
  }

  if (value.mode === EWidgetIndicatorValueModes.FORMULA) {
    return value.formula;
  }

  if (value.mode === EWidgetIndicatorValueModes.TEMPLATE) {
    const templateFormula =
      transitionMeasureTemplateFormulas[value.templateName as ETransitionMeasureTemplateNames];

    return templateFormula && fillTemplateString(templateFormula, process);
  }

  return "";
}
