import type { IWidgetAction } from "../actions";
import type { TExtendedFormulaFilterValue } from "../filtration";
import type { EFontWeight, EWidgetFilterMode, TColor, TDisplayCondition } from "./values";
import type { IMarkdownMeasure, IWidgetSortingIndicator } from "../indicators";

export interface IBaseWidgetSettings {
  title?: string;
  titleSize?: number;
  titleColor?: TColor;
  titleWeight?: EFontWeight;
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
