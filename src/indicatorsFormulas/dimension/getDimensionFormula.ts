import { EWidgetIndicatorValueModes, type IWidgetDimension } from "../../indicators";
import { fillTemplateString, generateColumnFormula } from "../shared";
import {
  dimensionAggregationTemplates,
  EDimensionAggregationTemplateName,
  prepareDimensionAggregationParams,
} from "./aggregationTemplates";
import { dimensionTemplateFormulas, type EDimensionTemplateNames } from "./baseTemplates";
import { prepareTimeParams, timeTemplates } from "./timeTemplates";

export function getDimensionFormula({ value }: IWidgetDimension): string {
  if (!value) {
    return "";
  }

  if (value.mode === EWidgetIndicatorValueModes.FORMULA) {
    return value.formula ?? "";
  }

  if (value.mode === EWidgetIndicatorValueModes.TEMPLATE) {
    const { templateName, tableName, columnName } = value;

    const templateFormula = dimensionTemplateFormulas[templateName as EDimensionTemplateNames];

    if (!templateFormula || !tableName || !columnName) {
      return "";
    }

    return fillTemplateString(templateFormula, {
      columnFormula: generateColumnFormula(tableName, columnName),
    });
  }

  if (value.mode === EWidgetIndicatorValueModes.AGGREGATION) {
    const preparedParams = prepareDimensionAggregationParams(value);

    if (!preparedParams) {
      return "";
    }

    const innerTemplate = value.innerTemplateName
      ? dimensionTemplateFormulas[value.innerTemplateName as EDimensionTemplateNames]
      : null;

    const columnFormula = innerTemplate
      ? fillTemplateString(innerTemplate, { columnFormula: preparedParams.columnFormula })
      : preparedParams.columnFormula;

    const dimensionAggregationTemplate =
      dimensionAggregationTemplates[value.templateName as EDimensionAggregationTemplateName];

    return fillTemplateString(dimensionAggregationTemplate, {
      ...preparedParams,
      columnFormula,
    });
  }

  if (
    value.mode === EWidgetIndicatorValueModes.START_TIME ||
    value.mode === EWidgetIndicatorValueModes.END_TIME
  ) {
    const preparedParams = prepareTimeParams(value);

    if (!preparedParams) {
      return "";
    }

    const templateFormula =
      timeTemplates[value.mode][value.templateName as EDimensionTemplateNames];

    return fillTemplateString(templateFormula, preparedParams);
  }

  return "";
}
