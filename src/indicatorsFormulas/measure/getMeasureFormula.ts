import { EWidgetIndicatorValueModes, type IWidgetMeasure } from "../../indicators";
import { fillTemplateString, generateColumnFormula } from "../shared";
import {
  EMeasureAggregationTemplateName,
  measureAggregationTemplates,
  prepareMeasureAggregationParams,
} from "./aggregationTemplates";
import { measureTemplateFormulas, type EMeasureTemplateNames } from "./baseTemplates";
import { conversionTemplate, prepareConversionParams } from "./conversionTemplates";
import { prepareDurationParams } from "./durationTemplates";

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
    const preparedParams = prepareMeasureAggregationParams(value);

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
