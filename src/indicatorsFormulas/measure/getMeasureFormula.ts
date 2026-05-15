import {
  EDurationTemplateName,
  EWidgetIndicatorValueModes,
  type TDurationTemplateName,
  type IWidgetMeasure,
} from "../../indicators";
import { fillTemplateSql, generateColumnFormula } from "../shared";
import {
  type TMeasureAggregationTemplateName,
  prepareMeasureAggregationParams,
} from "./aggregationTemplates";
import {
  measureInnerTemplateFormulas,
  measureTemplateFormulas,
  type TMeasureTemplateNames,
  type TMeasureInnerTemplateNames,
} from "./baseTemplates";
import { conversionTemplate, prepareConversionParams } from "./conversionTemplates";
import { durationTemplates, prepareDurationParams } from "./durationTemplates";
import { createAggregationTemplate } from "./createAggregationTemplate";

export function getMeasureFormula({ value }: Pick<IWidgetMeasure, "value">): string {
  if (!value) {
    return "";
  }

  if (value.mode === EWidgetIndicatorValueModes.FORMULA) {
    return value.formula ?? "";
  }

  if (value.mode === EWidgetIndicatorValueModes.TEMPLATE) {
    const { templateName, tableName, columnName, innerTemplateName } = value;

    const templateFormula = measureTemplateFormulas[templateName as TMeasureTemplateNames];

    if (!templateFormula || !tableName || !columnName) {
      return "";
    }

    const columnFormula = innerTemplateName
      ? fillTemplateSql(
          measureInnerTemplateFormulas[innerTemplateName as TMeasureInnerTemplateNames],
          {
            columnFormula: generateColumnFormula(tableName, columnName),
          }
        )
      : generateColumnFormula(tableName, columnName);

    return fillTemplateSql(templateFormula, {
      columnFormula,
    });
  }

  if (value.mode === EWidgetIndicatorValueModes.AGGREGATION) {
    const preparedParams = prepareMeasureAggregationParams(value);

    return preparedParams
      ? fillTemplateSql(
          createAggregationTemplate(value.templateName as TMeasureAggregationTemplateName, {
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
      durationTemplates[value.templateName as TDurationTemplateName],
      preparedParams
    );
  }

  return "";
}
