import type { TSettingsFilter } from "./filtration";
import type { EIgnoreFilterMode, EWidgetFilterMode } from "./settings/values";

/** Контекст с данными образа (будет заполняться по мере необходимости) */
export interface IViewContext {
  /** Фильтры уровня образа */
  filters: TSettingsFilter[];
  /** Режим фильтрации из образа */
  filterMode: EWidgetFilterMode;
  /** Режим игнорирования фильтрации из образа */
  ignoreFilters: EIgnoreFilterMode;
  /** Отключена ли фильтрация образа */
  disableFilter: boolean;
}
