// Типы, используемые в значениях элементов управления.

import type { TSchemaType } from "..";
import type { DisplayConditionSchema, RangeSchema } from "./values.schema";
import { VersionedEnum, type TVersionedEnumValues } from "../versionedEnum";

export const EWidgetFilterMode = VersionedEnum.build({
  latestVersion: "19",
  get history() {
    const v17 = {
      DEFAULT: "DEFAULT",
      SINGLE: "SINGLE",
      MULTI: "MULTI",
      DISABLED: "DISABLED",
    } as const;

    return {
      "17": v17,
      "19": {
        DEFAULT: "DEFAULT",
        SINGLE: "SINGLE",
        DISABLED: "DISABLED",
      } as const,
    };
  },
});

export type TWidgetFilterMode = TVersionedEnumValues<typeof EWidgetFilterMode>;

export type TWidgetFiltering =
  | {
      ignore: true;
      mode: typeof EWidgetFilterMode.SINGLE;
    }
  | { ignore: false; mode: TWidgetFilterMode };

export const EMarkdownDisplayMode = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      NONE: "NONE",
      INDICATOR: "INDICATOR",
    } as const,
  },
});

export type TMarkdownDisplayMode = TVersionedEnumValues<typeof EMarkdownDisplayMode>;

export const EDisplayConditionMode = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      DISABLED: "DISABLED",
      FORMULA: "FORMULA",
      VARIABLE: "VARIABLE",
    } as const,
  },
});

export type TDisplayConditionMode = TVersionedEnumValues<typeof EDisplayConditionMode>;

/** Условие отображения для компонента и меры */
export type TDisplayCondition = TSchemaType<typeof DisplayConditionSchema>;

export interface IRange extends TSchemaType<typeof RangeSchema> {}

export const EFontWeight = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      NORMAL: "NORMAL",
      BOLD: "BOLD",
    } as const,
  },
});

export type TFontWeight = TVersionedEnumValues<typeof EFontWeight>;

export interface IGradient {
  startColor: string;
  endColor: string;
}

export type TTabsHorizontalAlignment = "left" | "center" | "right";

export const EHeightMode = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      FIXED: "FIXED",
      PERCENT: "PERCENT",
    } as const,
  },
});

export type THeightMode = TVersionedEnumValues<typeof EHeightMode>;
