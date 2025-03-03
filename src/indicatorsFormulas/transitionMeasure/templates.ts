export enum ETransitionMeasureTemplateNames {
  transitionsCount = "transitionsCount",
  medianTime = "medianTime",
}

export const transitionMeasureTemplateFormulas = {
  [ETransitionMeasureTemplateNames.transitionsCount]: `count()`,
  [ETransitionMeasureTemplateNames.medianTime]: `medianExact(date_diff(second, begin({eventTimeFormula}), end({eventTimeFormula})))`,
} as const;
