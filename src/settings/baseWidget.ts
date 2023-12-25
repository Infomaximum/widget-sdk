import type { IWidgetAction } from "../actions";
import type { IFormulaFilterValue } from "../filtration";
import type { IWidgetSortingIndicator } from "../indicators";
import type { IPlacement, TDisplayCondition } from "./values";

export interface IBaseWidgetSettings {
  apiVersion: string;
  type: string;
  header?: string;
  headerSize?: number;
  stateGuid?: string | null;
  filters?: (IFormulaFilterValue | string)[];
  placement: IPlacement;
  sorting?: IWidgetSortingIndicator[];
  actions?: IWidgetAction[];
  displayCondition?: TDisplayCondition;
  displayConditionComment?: string;
}
