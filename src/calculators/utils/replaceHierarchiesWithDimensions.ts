import {
  isDimensionsHierarchy,
  type IWidgetDimension,
  type IWidgetDimensionHierarchy,
  type IWidgetDimensionInHierarchy,
} from "../../indicators";
import { compactMap } from "../../utils/functions";
import type { ICalculatorFilter } from "../calculator";
import { selectDimensionFromHierarchy } from "./selectDimensionFromHierarchy";

export const replaceHierarchiesWithDimensions = <
  H extends IWidgetDimensionHierarchy<I>,
  D extends IWidgetDimension = IWidgetDimension,
  I extends IWidgetDimensionInHierarchy = IWidgetDimensionInHierarchy,
>(
  dimensions: (D | H)[],
  filters: ICalculatorFilter[]
) =>
  compactMap(dimensions, (indicator) => {
    if (isDimensionsHierarchy(indicator)) {
      return selectDimensionFromHierarchy<H, D, I>(indicator, filters);
    }

    return indicator;
  });
