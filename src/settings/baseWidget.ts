import type { IWidgetAction } from "../actions";
import type { IFormulaFilterValue } from "../filtration";
import type { IWidgetSortingIndicator } from "../indicators";
import type { EWidgetFilterMode, TDisplayCondition } from "./values";

export interface IBaseWidgetSettings {
  apiVersion: string;
  type: string;
  header?: string;
  headerSize?: number;
  stateGuid?: string | null;
  filters?: (IFormulaFilterValue | string)[];
  filterMode?: EWidgetFilterMode;
  ignoreFilters?: boolean;
  sorting?: IWidgetSortingIndicator[];
  actions?: IWidgetAction[];
  displayCondition?: TDisplayCondition;
  displayConditionComment?: string;
}
