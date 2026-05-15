import { VersionedEnum } from "../../versionedEnum";

export const EEventMeasureTemplateNames = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      eventsCount: "eventsCount",
      reworksCount: "reworksCount",
    } as const,
  },
});

export type TEventMeasureTemplateNames = Extract<
  (typeof EEventMeasureTemplateNames)[keyof typeof EEventMeasureTemplateNames],
  string
>;

export const eventMeasureTemplateFormulas = {
  [EEventMeasureTemplateNames.eventsCount]: `count()`,
  [EEventMeasureTemplateNames.reworksCount]: `count() - uniqExact({caseCaseIdFormula})`,
} as const;
