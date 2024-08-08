import type { IWidgetAction } from "../actions";
import type { TExtendedFormulaFilterValue } from "../filtration";
import type { EWidgetFilterMode, TDisplayCondition } from "./values";
import type { IMarkdownMeasure, IWidgetSortingIndicator } from "../indicators";

export interface IBaseWidgetSettings {
  title?: string;
  titleSize?: number;
  stateName?: string | null;
  showMarkdown?: boolean;
  markdownMeasures?: IMarkdownMeasure[];
  markdownText?: string;
  filters?: TExtendedFormulaFilterValue[];
  filterMode?: EWidgetFilterMode;
  ignoreFilters?: boolean;
  sorting?: IWidgetSortingIndicator[];
  actions?: IWidgetAction[];
  displayCondition?: TDisplayCondition;
  displayConditionComment?: string;
}
