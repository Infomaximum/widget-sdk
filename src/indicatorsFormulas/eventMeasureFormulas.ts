import {
  EWidgetIndicatorValueModes,
  type IProcessIndicator,
} from "../indicators";
import type { IWidgetProcess } from "../metaDescription";
import { fillTemplateString } from "./common";

export enum EEventMeasureTemplateNames {
  count = "count",
  reworksCount = "reworksCount",
}

export const eventMeasureTemplateFormulas = {
  [EEventMeasureTemplateNames.count]: `count()`,
  [EEventMeasureTemplateNames.reworksCount]: `count() - uniqExact({caseCaseIdFormula})`,
} as const;

export function getEventMeasureFormula(
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
      eventMeasureTemplateFormulas[
        value.templateName as EEventMeasureTemplateNames
      ];

    return templateFormula && fillTemplateString(templateFormula, process);
  }

  return "";
}
