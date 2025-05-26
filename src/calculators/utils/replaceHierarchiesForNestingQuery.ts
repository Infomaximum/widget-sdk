import { isValidFormulaFilterValue, type TWidgetFilterValue } from "../../filtration";
import type { IWidgetDimension, IWidgetDimensionHierarchy } from "../../indicators";
import { getDimensionFormula } from "../../indicatorsFormulas";
import { replaceHierarchiesWithSlicedDimensions } from "./replaceHierarchiesWithSlicedDimensions";

export const replaceHierarchiesForNestingQuery = <D extends IWidgetDimension = IWidgetDimension>(
  dimensions: (D | IWidgetDimensionHierarchy<D>)[],
  widgetFilters: TWidgetFilterValue[]
) => {
  const slicedDimensions = replaceHierarchiesWithSlicedDimensions(dimensions, widgetFilters);

  return slicedDimensions.filter(({ dimension, sliceIndex }) => {
    if (!dimension?.arrayNesting) {
      return false;
    }

    const dimensionFormula = getDimensionFormula(dimension);

    const lastFilterByDimension = widgetFilters.findLast((filterValue) => {
      if (!isValidFormulaFilterValue(filterValue) || !filterValue.sliceIndex) {
        return false;
      }

      return filterValue.formula === dimensionFormula && sliceIndex === filterValue.sliceIndex;
    });

    if (!isValidFormulaFilterValue(lastFilterByDimension)) {
      return false;
    }

    const filterSliceIndex = lastFilterByDimension.sliceIndex;

    // для проверки нужно, чтобы было выбрано только 1 значение, иначе проваливаться нет смысла
    const selectedFilterValues = lastFilterByDimension?.checkedValues?.length ?? 0;

    if (!lastFilterByDimension || !filterSliceIndex || selectedFilterValues !== 1) {
      return false;
    }

    return true;
  });
};
