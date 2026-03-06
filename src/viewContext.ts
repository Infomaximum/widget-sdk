import type { TSettingsFilter } from "./filtration";
import type { EWidgetFilterMode } from "./settings/values";

/** Контекст с данными образа (будет заполняться по мере необходимости) */
export interface IViewContext {
  filters: TSettingsFilter[];
  filterMode: EWidgetFilterMode;
}
