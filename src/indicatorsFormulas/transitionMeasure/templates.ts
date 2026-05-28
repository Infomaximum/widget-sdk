import { VersionedEnum, type TVersionedEnumValues } from "../../versionedEnum";

export const ETransitionMeasureTemplateNames = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      transitionsCount: "transitionsCount",
      medianTime: "medianTime",
    } as const,
  },
});

export type TTransitionMeasureTemplateNames = TVersionedEnumValues<typeof ETransitionMeasureTemplateNames>;

export const transitionMeasureTemplateFormulas = {
  [ETransitionMeasureTemplateNames.transitionsCount]: `count()`,
  [ETransitionMeasureTemplateNames.medianTime]: `medianExact(date_diff(second, begin({eventTimeFormula}), end({eventTimeFormula})))`,
} as const;
