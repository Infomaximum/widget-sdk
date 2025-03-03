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

/** Стандартные шаблоны разреза */
export const dimensionTemplateFormulas: Record<EDimensionTemplateNames, string> = {
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
