import { VersionedEnum } from "../../versionedEnum";

export const ETransitionMeasureTemplateNames = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      transitionsCount: "transitionsCount",
      medianTime: "medianTime",
    } as const,
  },
});

export type TTransitionMeasureTemplateNames = Extract<
  (typeof ETransitionMeasureTemplateNames)[keyof typeof ETransitionMeasureTemplateNames],
  string
>;

export const transitionMeasureTemplateFormulas = {
  [ETransitionMeasureTemplateNames.transitionsCount]: `count()`,
  [ETransitionMeasureTemplateNames.medianTime]: `medianExact(date_diff(second, begin({eventTimeFormula}), end({eventTimeFormula})))`,
} as const;
