export enum EEventMeasureTemplateNames {
  eventsCount = "eventsCount",
  reworksCount = "reworksCount",
}

export const eventMeasureTemplateFormulas = {
  [EEventMeasureTemplateNames.eventsCount]: `count()`,
  [EEventMeasureTemplateNames.reworksCount]: `count() - uniqExact({caseCaseIdFormula})`,
} as const;
