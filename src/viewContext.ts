import type { TSettingsFilter } from "./filtration";
import type { TIgnoreFilterMode, TWidgetFilterMode } from "./settings/values";

/** Контекст с данными образа (будет заполняться по мере необходимости) */
export interface IViewContext {
  /** Фильтры уровня образа */
  filters: TSettingsFilter[];
  /** Режим фильтрации из образа */
  filterMode: TWidgetFilterMode;
  /** Режим игнорирования фильтрации из образа */
  ignoreFilters: TIgnoreFilterMode;
  /** Отключена ли фильтрация образа */
  disableFilter: boolean;
}
