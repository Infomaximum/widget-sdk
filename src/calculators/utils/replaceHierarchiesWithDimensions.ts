import type { TWidgetFilterValue } from "../../filtration";
import {
  isDimensionsHierarchy,
  type IWidgetDimension,
  type IWidgetDimensionHierarchy,
} from "../../indicators";
import { compactMap } from "../../utils/functions";
import { replaceDisplayCondition } from "./displayCondition";
import {
  selectDimensionFromHierarchy,
  type TDimensionsNesting,
} from "./selectDimensionFromHierarchy";

export const replaceHierarchiesWithDimensions = <D extends IWidgetDimension = IWidgetDimension>(
  dimensions: (D | IWidgetDimensionHierarchy<D>)[],
  widgetFilters: TWidgetFilterValue[],
  dimensionsNesting?: TDimensionsNesting
) =>
  compactMap(dimensions, (indicator) => {
    if (isDimensionsHierarchy(indicator)) {
      const selectedDimension = selectDimensionFromHierarchy<IWidgetDimensionHierarchy<D>, D>(
        indicator,
        widgetFilters,
        dimensionsNesting
      );

      return (
        selectedDimension && replaceDisplayCondition(selectedDimension, indicator.displayCondition)
      );
    }

    return indicator;
  });
