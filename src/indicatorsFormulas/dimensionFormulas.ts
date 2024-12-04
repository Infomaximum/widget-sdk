import { EWidgetIndicatorValueModes, type IWidgetDimension } from "../indicators";
import { fillTemplateString, generateColumnFormula } from "./common";

export enum EDimensionTemplateNames {
  dateTime = "dateTime",
  date = "date",
  year = "year",
  yearAndQuarter = "yearAndQuarter",
  quarter = "quarter",
  yearAndMonth = "yearAndMonth",
  dayOfMonth = "dayOfMonth",
  month = "month",
  week = "week",
  dayOfWeek = "dayOfWeek",
  hour = "hour",
}

export const dimensionTemplateFormulas = {
  [EDimensionTemplateNames.dateTime]: `toDateTime({columnFormula})`,
  [EDimensionTemplateNames.date]: `toDate({columnFormula})`,
  [EDimensionTemplateNames.year]: `if(defaultValueOfArgumentType({columnFormula}) = {columnFormula}, 0, toYear({columnFormula}))`,
  [EDimensionTemplateNames.yearAndQuarter]: `if(defaultValueOfArgumentType({columnFormula}) = {columnFormula}, 0, toYear({columnFormula}) * 10 + toQuarter({columnFormula}))`,
  [EDimensionTemplateNames.quarter]: `if(defaultValueOfArgumentType({columnFormula}) = {columnFormula}, 0, toQuarter({columnFormula}))`,
  [EDimensionTemplateNames.yearAndMonth]: `if(defaultValueOfArgumentType({columnFormula}) = {columnFormula}, 0, toYYYYMM({columnFormula}))`,
  [EDimensionTemplateNames.month]: `if(defaultValueOfArgumentType({columnFormula}) = {columnFormula}, 0, toMonth({columnFormula}))`,
  [EDimensionTemplateNames.dayOfMonth]: `if(defaultValueOfArgumentType({columnFormula}) = {columnFormula}, 0, toDayOfMonth({columnFormula}))`,
  [EDimensionTemplateNames.week]: `if(defaultValueOfArgumentType({columnFormula}) = {columnFormula}, 0, toWeek({columnFormula}))`,
  [EDimensionTemplateNames.dayOfWeek]: `if(defaultValueOfArgumentType({columnFormula}) = {columnFormula}, 0, toDayOfWeek({columnFormula}))`,
  [EDimensionTemplateNames.hour]: `if(defaultValueOfArgumentType({columnFormula}) = {columnFormula}, 0, toHour({columnFormula}))`,
} as const;

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

  return "";
}
