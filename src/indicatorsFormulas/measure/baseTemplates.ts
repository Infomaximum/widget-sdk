export enum EMeasureTemplateNames {
  avg = "avg",
  median = "median",
  count = "count",
  countDistinct = "countDistinct",
  min = "min",
  max = "max",
  sum = "sum",
}

export enum EMeasureInnerTemplateNames {
  begin = "begin",
  end = "end",
}

/** Стандартные шаблоны меры */
export const measureTemplateFormulas = {
  [EMeasureTemplateNames.avg]: `avg({columnFormula})`,
  [EMeasureTemplateNames.count]: `count({columnFormula})`,
  [EMeasureTemplateNames.countDistinct]: `count(distinct {columnFormula})`,
  [EMeasureTemplateNames.median]: `medianExact({columnFormula})`,
  [EMeasureTemplateNames.min]: `min({columnFormula})`,
  [EMeasureTemplateNames.max]: `max({columnFormula})`,
  [EMeasureTemplateNames.sum]: `sum({columnFormula})`,
} as const;

export const measureInnerTemplateFormulas = {
  [EMeasureInnerTemplateNames.begin]: `begin({columnFormula})`,
  [EMeasureInnerTemplateNames.end]: `end({columnFormula})`,
} as const;
