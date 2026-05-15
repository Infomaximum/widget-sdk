import { VersionedEnum } from "../../versionedEnum";

export const EMeasureTemplateNames = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      avg: "avg",
      median: "median",
      count: "count",
      countDistinct: "countDistinct",
      min: "min",
      max: "max",
      sum: "sum",
    } as const,
  },
});

export type TMeasureTemplateNames = Extract<
  (typeof EMeasureTemplateNames)[keyof typeof EMeasureTemplateNames],
  string
>;

export const EMeasureInnerTemplateNames = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      begin: "begin",
      end: "end",
    } as const,
  },
});

export type TMeasureInnerTemplateNames = Extract<
  (typeof EMeasureInnerTemplateNames)[keyof typeof EMeasureInnerTemplateNames],
  string
>;

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
