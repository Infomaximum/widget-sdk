// Типы, используемые в значениях элементов управления.

import type { TSchemaType } from "..";
import type { DisplayConditionSchema, RangeSchema } from "./values.schema";

export enum EWidgetFilterMode {
  DEFAULT = "DEFAULT",
  SINGLE = "SINGLE",
  DISABLED = "DISABLED",
}

export type TWidgetFiltering =
  | {
      ignore: true;
      mode: EWidgetFilterMode.SINGLE;
    }
  | { ignore: false; mode: EWidgetFilterMode };

export enum EMarkdownDisplayMode {
  NONE = "NONE",
  INDICATOR = "INDICATOR",
}

export enum EDisplayConditionMode {
  DISABLED = "DISABLED",
  FORMULA = "FORMULA",
  VARIABLE = "VARIABLE",
}

/** Условие отображения для компонента и меры */
export type TDisplayCondition = TSchemaType<typeof DisplayConditionSchema>;

export interface IRange extends TSchemaType<typeof RangeSchema> {}

export enum EFontWeight {
  NORMAL = "NORMAL",
  BOLD = "BOLD",
}

export interface IGradient {
  startColor: string;
  endColor: string;
}

export type TTabsHorizontalAlignment = "left" | "center" | "right";

export enum EHeightMode {
  FIXED = "FIXED",
  PERCENT = "PERCENT",
}
