import type { TWidgetFilter } from "./calculators/utils/mapWidgetFiltersToInputs";

/** Контекст с данными образа (будет заполняться по мере необходимости) */
export interface IViewContext {
  filters: TWidgetFilter[];
}
