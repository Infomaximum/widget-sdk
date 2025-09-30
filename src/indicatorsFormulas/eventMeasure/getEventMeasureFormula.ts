import { EWidgetIndicatorValueModes, type IProcessIndicator } from "../../indicators";
import type { IWidgetProcess } from "../../metaDescription";
import { fillTemplateString } from "../shared";
import { EEventMeasureTemplateNames, eventMeasureTemplateFormulas } from "./templates";

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
      eventMeasureTemplateFormulas[value.templateName as EEventMeasureTemplateNames];

    return templateFormula && fillTemplateString(templateFormula, process);
  }

  return "";
}
