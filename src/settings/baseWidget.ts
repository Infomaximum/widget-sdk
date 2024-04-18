import type { TActionsOnClick } from "../actions";
import type { IFormulaFilterValue } from "../filtration";
import type { EWidgetFilterMode, TDisplayCondition } from "./values";
import type { IMarkdownMeasure, IWidgetSortingIndicator } from "../indicators";

export interface IBaseWidgetSettings {
  apiVersion: string;
  type: string;
  header?: string;
  headerSize?: number;
  stateName?: string | null;
  showMarkdown?: boolean;
  markdownMeasures?: IMarkdownMeasure[];
  markdownText?: string;
  filters?: (IFormulaFilterValue | string)[];
  filterMode?: EWidgetFilterMode;
  ignoreFilters?: boolean;
  sorting?: IWidgetSortingIndicator[];
  actions?: TActionsOnClick[];
  displayCondition?: TDisplayCondition;
  displayConditionComment?: string;
}
