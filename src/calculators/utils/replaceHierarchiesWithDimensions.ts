import {
  isHierarchy,
  type IWidgetDimension,
  type IWidgetDimensionHierarchy,
} from "../../indicators";
import { compactMap } from "../../utils/functions";
import type { ICalculatorFilter } from "../calculator";
import { replaceDisplayCondition } from "./displayCondition";
import { selectDimensionFromHierarchy } from "./selectDimensionFromHierarchy";

export const replaceHierarchiesWithDimensions = <
  D extends IWidgetDimension = IWidgetDimension,
>(
  dimensions: (D | IWidgetDimensionHierarchy<D>)[],
  filters: ICalculatorFilter[]
) =>
  compactMap(dimensions, (indicator) => {
    if (isHierarchy(indicator)) {
      const selectedDimension = selectDimensionFromHierarchy<
        IWidgetDimensionHierarchy<D>,
        D
      >(indicator, filters);

      return (
        selectedDimension &&
        replaceDisplayCondition(selectedDimension, indicator.displayCondition)
      );
    }

    return indicator;
  });
