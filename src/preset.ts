import type { TColor } from "./color";
import type { EFontWeight, EWidgetFilterMode } from "./settings/values";

export interface IWidgetPresetSettings {
  filterMode: EWidgetFilterMode;
  ignoreFilters: boolean;
  stateName: string | null;
  titleColor: TColor;
  titleSize: number;
  titleWeight: EFontWeight;
  textSize: number;
  paddings: number | string;
}
