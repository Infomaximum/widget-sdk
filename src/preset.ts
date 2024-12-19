import type { TColor } from "./color";
import type { EFontWeight, EWidgetFilterMode, TAppearanceSettings } from "./settings/values";

export interface IWidgetPresetSettings {
  appearance: TAppearanceSettings;
  filterMode: EWidgetFilterMode;
  ignoreFilters: boolean;
  stateName: string | null;
  titleColor: TColor;
  titleSize: number;
  titleWeight: EFontWeight;
  textSize: number;
}
