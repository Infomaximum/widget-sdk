import { VersionedEnum, type TVersionedEnumValues } from "../../versionedEnum";

export const EEventMeasureTemplateNames = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      eventsCount: "eventsCount",
      reworksCount: "reworksCount",
    } as const,
  },
});

export type TEventMeasureTemplateNames = TVersionedEnumValues<typeof EEventMeasureTemplateNames>;

export const eventMeasureTemplateFormulas = {
  [EEventMeasureTemplateNames.eventsCount]: `count()`,
  [EEventMeasureTemplateNames.reworksCount]: `count() - uniqExact({caseCaseIdFormula})`,
} as const;
