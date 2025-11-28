import {
  inheritDisplayConditionFromHierarchy,
  type IWidgetDimension,
  type IWidgetDimensionHierarchy,
  type IWidgetDimensionInHierarchy,
  type TConditionalDimensionInHierarchy,
} from "../../indicators";
import { getDimensionFormula } from "../../indicatorsFormulas";
import type { TNullable } from "../../utilityTypes";
import { ECalculatorFilterMethods, type ICalculatorFilter } from "../calculator";

/**
 * Выбрать активный разрез иерархии на основе активных фильтров.
 * Принцип:
 * Если к разрезу иерархии применяется INCLUDE-фильтр с одним значением - выбираем следующий за ним разрез
 * Если к разрезу иерархии применяется INCLUDE-фильтр с несколькими значениями - выбираем данный разрез
 */
export function selectDimensionFromHierarchy<
  H extends IWidgetDimensionHierarchy<I>,
  D extends IWidgetDimension,
  I extends IWidgetDimensionInHierarchy,
>(
  hierarchy: H,
  filters: ICalculatorFilter[]
): TNullable<D | TConditionalDimensionInHierarchy<IWidgetDimensionInHierarchy>> {
  const { hierarchyDimensions, displayCondition } = hierarchy;

  for (let i = hierarchyDimensions.length - 1; i >= 0; i--) {
    const dimension = hierarchyDimensions[i]!;

    // todo: widgets - возможно, стоит использовать Map фильтров для быстрого поиска
    const matchedFilter = filters.find(
      ({ formula, filteringMethod }) =>
        formula === getDimensionFormula(dimension) &&
        filteringMethod === ECalculatorFilterMethods.INCLUDE
    );

    if (!matchedFilter) {
      continue;
    }

    const selectionIndex =
      matchedFilter.values.length > 1 ? i : Math.min(i + 1, hierarchyDimensions.length - 1);

    const dimensionFromHierarchy = hierarchyDimensions[selectionIndex];

    return (
      dimensionFromHierarchy &&
      inheritDisplayConditionFromHierarchy(dimensionFromHierarchy, hierarchy)
    );
  }

  const dimensionFromHierarchy = hierarchyDimensions[0];

  return (
    dimensionFromHierarchy &&
    inheritDisplayConditionFromHierarchy(dimensionFromHierarchy, hierarchy)
  );
}
