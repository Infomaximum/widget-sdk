import { EWidgetIndicatorValueModes, type IWidgetMeasure } from "../indicators";
import { fillTemplateString, generateColumnFormula } from "./common";

export enum EMeasureTemplateNames {
  avg = "avg",
  median = "median",
  count = "count",
  countDistinct = "countDistinct",
  min = "min",
  max = "max",
  sum = "sum",
}

export const measureTemplateFormulas = {
  [EMeasureTemplateNames.avg]: `avg({columnFormula})`,
  [EMeasureTemplateNames.count]: `count({columnFormula})`,
  [EMeasureTemplateNames.countDistinct]: `count(distinct {columnFormula})`,
  [EMeasureTemplateNames.median]: `medianExact({columnFormula})`,
  [EMeasureTemplateNames.min]: `min({columnFormula})`,
  [EMeasureTemplateNames.max]: `max({columnFormula})`,
  [EMeasureTemplateNames.sum]: `sum({columnFormula})`,
} as const;

export function getMeasureFormula({ value }: IWidgetMeasure): string {
  if (!value) {
    return "";
  }

  if (value.mode === EWidgetIndicatorValueModes.FORMULA) {
    return value.formula;
  }

  if (value.mode === EWidgetIndicatorValueModes.TEMPLATE) {
    const { templateName, tableName, columnName } = value;

    const templateFormula = measureTemplateFormulas[templateName as EMeasureTemplateNames];

    if (!templateFormula) {
      return "";
    }

    return fillTemplateString(templateFormula, {
      columnFormula: generateColumnFormula(tableName, columnName),
    });
  }

  return "";
}
