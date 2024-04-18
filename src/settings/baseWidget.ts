import type { IWidgetAction } from "../actions";
import type { IFormulaFilterValue } from "../filtration";
import type { EWidgetFilterMode, IPlacement, TDisplayCondition } from "./values";
import type { IMarkdownMeasure, IWidgetSortingIndicator } from "../indicators";

export interface IBaseWidgetSettings {
  apiVersion: string;
  type: string;
  header?: string;
  headerSize?: number;
  showMarkdown?: boolean;
  markdownMeasures?: IMarkdownMeasure[];
  markdownText?: string;
  stateGuid?: string | null;
  filters?: (IFormulaFilterValue | string)[];
  filterMode?: EWidgetFilterMode;
  ignoreFilters?: boolean;
  placement: IPlacement;
  sorting?: IWidgetSortingIndicator[];
  actions?: IWidgetAction[];
  displayCondition?: TDisplayCondition;
  displayConditionComment?: string;
}
