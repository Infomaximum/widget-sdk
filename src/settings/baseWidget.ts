import type { TActionsOnClick } from "../actions";
import type { IFormulaFilterValue } from "../filtration";
import type { IWidgetSortingIndicator } from "../indicators";
import type { EWidgetFilterMode, TDisplayCondition } from "./values";

export interface IBaseWidgetSettings {
  apiVersion: string;
  type: string;
  header?: string;
  headerSize?: number;
  stateName?: string | null;
  filters?: (IFormulaFilterValue | string)[];
  filterMode?: EWidgetFilterMode;
  ignoreFilters?: boolean;
  sorting?: IWidgetSortingIndicator[];
  actions?: TActionsOnClick[];
  displayCondition?: TDisplayCondition;
  displayConditionComment?: string;
}
