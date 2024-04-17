import type { IWidgetDimension, IWidgetDimensionHierarchy } from "../../indicators";
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
  H extends IWidgetDimensionHierarchy<D>,
  D extends IWidgetDimension,
>({ dimensions }: H, filters: ICalculatorFilter[]): TNullable<D> {
  for (let i = dimensions.length - 1; i >= 0; i--) {
    const dimension = dimensions[i]!;

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
      matchedFilter.values.length > 1 ? i : Math.min(i + 1, dimensions.length - 1);

    return dimensions[selectionIndex];
  }

  return dimensions[0];
}
