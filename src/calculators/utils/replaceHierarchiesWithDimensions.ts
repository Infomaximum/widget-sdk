import {
  isDimensionsHierarchy,
  type IWidgetDimension,
  type IWidgetDimensionHierarchy,
  type IWidgetDimensionInHierarchy,
} from "../../indicators";
import { compactMap } from "../../utils/functions";
import type { ICalculatorFilter } from "../calculator";
import { replaceDisplayCondition } from "./displayCondition";
import { selectDimensionFromHierarchy } from "./selectDimensionFromHierarchy";

export const replaceHierarchiesWithDimensions = <
  D extends IWidgetDimension = IWidgetDimension,
  I extends IWidgetDimensionInHierarchy = IWidgetDimensionInHierarchy,
>(
  dimensions: (D | IWidgetDimensionHierarchy<I>)[],
  filters: ICalculatorFilter[]
) =>
  compactMap(dimensions, (indicator) => {
    if (isDimensionsHierarchy(indicator)) {
      const selectedDimension = selectDimensionFromHierarchy<IWidgetDimensionHierarchy<I>, D, I>(
        indicator,
        filters
      );

      return (
        selectedDimension && replaceDisplayCondition(selectedDimension, indicator.displayCondition)
      );
    }

    return indicator;
  });
