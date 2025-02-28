import type { TExtendedFormulaFilterValue } from "./filtration";

/** Контекст с данными образа (будет заполняться по мере необходимости) */
export interface IViewContext {
  viewKey: string;
  filters: TExtendedFormulaFilterValue[];
}
