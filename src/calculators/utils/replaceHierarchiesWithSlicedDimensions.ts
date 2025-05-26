import type { TWidgetFilterValue } from "../../filtration";
import {
  isDimensionsHierarchy,
  type IWidgetDimension,
  type IWidgetDimensionHierarchy,
} from "../../indicators";
import { compactMap } from "../../utils/functions";
import { replaceDisplayCondition } from "./displayCondition";
import {
  selectSlicedDimensionFromHierarchy,
  type ISlicedDimension,
  type TDimensionMaxNestingMap,
} from "./selectSlicedDimensionFromHierarchy";

export const replaceHierarchiesWithSlicedDimensions = <
  D extends IWidgetDimension = IWidgetDimension,
>(
  dimensions: (D | IWidgetDimensionHierarchy<D>)[],
  widgetFilters: TWidgetFilterValue[],
  dimensionMaxNestingMap?: TDimensionMaxNestingMap
): ISlicedDimension[] =>
  compactMap(dimensions, (indicator) => {
    if (isDimensionsHierarchy(indicator)) {
      const slicedDimension = selectSlicedDimensionFromHierarchy<IWidgetDimensionHierarchy<D>, D>(
        indicator,
        widgetFilters,
        dimensionMaxNestingMap
      );

      const { dimension, sliceIndex } = slicedDimension ?? {};

      const configuredDimension =
        dimension && replaceDisplayCondition(dimension, indicator.displayCondition);

      return (
        configuredDimension && {
          dimension: configuredDimension,
          sliceIndex,
        }
      );
    }

    return { dimension: indicator };
  });
