import {
  EDurationTemplateName,
  EWidgetIndicatorValueModes,
  type IWidgetMeasure,
} from "../../indicators";
import { fillTemplateSql, generateColumnFormula } from "../shared";
import {
  EMeasureAggregationTemplateName,
  prepareMeasureAggregationParams,
} from "./aggregationTemplates";
import { measureTemplateFormulas, type EMeasureTemplateNames } from "./baseTemplates";
import { conversionTemplate, prepareConversionParams } from "./conversionTemplates";
import { durationTemplates, prepareDurationParams } from "./durationTemplates";
import { createAggregationTemplate } from "./createAggregationTemplate";

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

    return fillTemplateSql(templateFormula, {
      columnFormula: generateColumnFormula(tableName, columnName),
    });
  }

  if (value.mode === EWidgetIndicatorValueModes.AGGREGATION) {
    const preparedParams = prepareMeasureAggregationParams(value);

    return preparedParams
      ? fillTemplateSql(
          createAggregationTemplate(value.templateName as EMeasureAggregationTemplateName, {
            outerAggregation: preparedParams.outerAggregation,
            anyEvent: value.anyEvent,
          }),
          preparedParams
        )
      : "";
  }

  if (value.mode === EWidgetIndicatorValueModes.CONVERSION) {
    const preparedParams = prepareConversionParams(value);

    if (!preparedParams) {
      return "";
    }

    return fillTemplateSql(conversionTemplate, preparedParams);
  }

  if (value.mode === EWidgetIndicatorValueModes.DURATION) {
    const preparedParams = prepareDurationParams(value);

    if (!preparedParams) {
      return "";
    }

    return fillTemplateSql(
      durationTemplates[value.templateName as EDurationTemplateName],
      preparedParams
    );
  }

  return "";
}
