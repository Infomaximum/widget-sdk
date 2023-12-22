import {
  ESortingValueModes,
  type IWidgetDimension,
  type IWidgetMeasure,
  type IWidgetSortingIndicator,
} from "../../indicators";
import {
  getDimensionFormula,
  getMeasureFormula,
} from "../../indicatorsFormulas";
import type { ISortOrder } from "../../sorting";
import { compactMap } from "../../utils/functions";

/**
 * Преобразовать объекты сортировок из settings виджета в sortOrders вычислителя
 * @param sortingIndicators объекты сортировок из settings виджета
 * @param dimensionsInOriginalOrder разрезы виджета (конкретный разрез будет браться по индексу)
 * @param measuresInOriginalOrder меры виджета (конкретная мера будет браться по индексу)
 * @returns
 */
export function mapSortingToInputs(
  sortingIndicators: IWidgetSortingIndicator[] = [],
  dimensionsInOriginalOrder: IWidgetDimension[] = [],
  measuresInOriginalOrder: IWidgetMeasure[] = []
): ISortOrder[] {
  return compactMap(sortingIndicators, ({ value, direction }) => {
    if (
      value.mode === ESortingValueModes.FORMULA ||
      value.mode === ESortingValueModes.QUANTITY ||
      value.mode === ESortingValueModes.IN_DASHBOARD ||
      value.mode === ESortingValueModes.IN_WORKSPACE
    ) {
      return value.formula ? { formula: value.formula, direction } : undefined;
    }

    if (
      value.mode === ESortingValueModes.DIMENSION_IN_WIDGET ||
      value.mode === ESortingValueModes.HIERARCHY
    ) {
      const dimension = dimensionsInOriginalOrder[value.index];

      return (
        dimension && { formula: getDimensionFormula(dimension), direction }
      );
    }

    if (value.mode === ESortingValueModes.MEASURE_IN_WIDGET) {
      const measure = measuresInOriginalOrder[value.index];

      return measure && { formula: getMeasureFormula(measure), direction };
    }
  });
}
