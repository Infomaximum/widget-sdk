import { isValidFormulaFilterValue, type TWidgetFilterValue } from "../../filtration";
import type { IWidgetDimension, IWidgetDimensionHierarchy } from "../../indicators";
import { getDimensionFormula } from "../../indicatorsFormulas";
import type { TNullable } from "../../utilityTypes";

export type TDimensionMaxNestingMap = Map<number, number>;

export interface ISlicedDimension<D = IWidgetDimension> {
  dimension: D;
  sliceIndex?: number;
}

function findMatchedFilter(filterValues: TWidgetFilterValue[], dimension: IWidgetDimension) {
  const dimensionFormula = getDimensionFormula(dimension);

  return filterValues.findLast((filterValue) => {
    if (!isValidFormulaFilterValue(filterValue)) {
      return false;
    }

    const isFormulaMatched = filterValue.formula === dimensionFormula;

    if (dimension.arrayNesting) {
      return isFormulaMatched && filterValue.sliceIndex;
    }

    return isFormulaMatched;
  });
}

function calculateSelectionIndex(
  dimension: IWidgetDimension,
  hierarchyDimensions: IWidgetDimension[],
  index: number,
  dimensionMaxNestingMap: TDimensionMaxNestingMap | undefined,
  filterSliceIndex: number | undefined
) {
  let correctIndex = index + 1;

  if (filterSliceIndex) {
    const maxNestingDepth = dimensionMaxNestingMap?.get(dimension.id) ?? 0;

    const isBelowMaxDepth = filterSliceIndex < maxNestingDepth;
    // если в метод попали перед расчетом вложенности
    const isNestingPending = dimension.arrayNesting && !dimensionMaxNestingMap;

    correctIndex = isBelowMaxDepth || isNestingPending ? index : index + 1;
  }

  return Math.min(correctIndex, hierarchyDimensions.length - 1);
}

function getDimensionSliceIndex(
  dimensionMaxNestingMap: TDimensionMaxNestingMap | undefined,
  filterSliceIndex: number | undefined,
  checkedValuesLength: number
) {
  if (!filterSliceIndex) {
    return undefined;
  }

  if (!dimensionMaxNestingMap || checkedValuesLength > 1) {
    return filterSliceIndex;
  }

  if (checkedValuesLength === 1) {
    return filterSliceIndex + 1;
  }

  return undefined;
}

function getSlicedDimension<D extends IWidgetDimension>(
  dimension: TNullable<D>,
  sliceIndex: number | undefined
) {
  if (!dimension) {
    return undefined;
  }

  return { dimension, sliceIndex };
}

/**
 * Выбрать активный разрез иерархии на основе активных фильтров.
 * Принцип:
 * Если к разрезу иерархии применяется INCLUDE-фильтр с одним значением - выбираем следующий за ним разрез
 * Если к разрезу иерархии применяется INCLUDE-фильтр с несколькими значениями - выбираем данный разрез
 *
 * Массивы в иерархии
 * Если выбрано одно значение в фильтре, то проверяется доступная глубина, при превышении глубины меняем разрез на следующий
 * Если выбрано одно значение в фильтре, но глубина не превышена, то увеличиваем sliceIndex фильтра на 1
 * Если выбрано два значения в фильтре, а глубина не превышена, то оставляем индекс, как в фильтре, то есть не переходим на след индекс
 * Если фильтра нет ни для одного разреза, то индекс для разреза берется "1" (это минимальный индекс)
 * Если нет dimensionsNesting (undefined), то рассчитываем разрез для запроса максимальной глубины, индекс возвращаем из фильтра, но это необязательно,
 * т.к. сама формула разреза нам не интересна, нужен лишь факт наличия
 */
export function selectSlicedDimensionFromHierarchy<
  H extends IWidgetDimensionHierarchy<D>,
  D extends IWidgetDimension,
>(
  { hierarchyDimensions }: H,
  widgetFilterValues: TWidgetFilterValue[],
  dimensionMaxNestingMap?: TDimensionMaxNestingMap
): TNullable<ISlicedDimension<D>> {
  for (let i = hierarchyDimensions.length - 1; i >= 0; i--) {
    const dimension = hierarchyDimensions[i]!;

    const matchedFilter = findMatchedFilter(widgetFilterValues, dimension);

    if (!isValidFormulaFilterValue(matchedFilter)) {
      continue;
    }

    const checkedValuesLength = matchedFilter.checkedValues?.length;

    if (checkedValuesLength === undefined) {
      continue;
    }

    const filterSliceIndex = matchedFilter.sliceIndex;

    const selectionIndex =
      checkedValuesLength > 1
        ? i
        : calculateSelectionIndex(
            dimension,
            hierarchyDimensions,
            i,
            dimensionMaxNestingMap,
            filterSliceIndex
          );
    const currentDimension = hierarchyDimensions[selectionIndex];

    const dimensionSliceIndex = getDimensionSliceIndex(
      dimensionMaxNestingMap,
      dimension.id === currentDimension?.id ? filterSliceIndex : undefined,
      checkedValuesLength
    );

    return getSlicedDimension(currentDimension, dimensionSliceIndex);
  }

  const activeDimension = hierarchyDimensions[0];
  const sliceIndex = activeDimension?.arrayNesting ? 1 : undefined;

  return getSlicedDimension(activeDimension, sliceIndex);
}
