import { isValidFormulaFilterValue, type TWidgetFilterValue } from "../../filtration";
import {
  EWidgetIndicatorValueModes,
  type IWidgetDimension,
  type IWidgetDimensionHierarchy,
} from "../../indicators";
import { getDimensionFormula } from "../../indicatorsFormulas";
import type { TNullable } from "../../utilityTypes";

export type TDimensionsNesting = Map<number, number>;

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
  dimensionsNesting: TDimensionsNesting | undefined,
  sliceIndex: number | undefined
) {
  let correctIndex = index + 1;

  if (sliceIndex) {
    const maxNestingDepth = dimensionsNesting?.get(dimension.id) ?? 0;

    const isBelowMaxDepth = sliceIndex < maxNestingDepth;
    // если в метод попали перед расчетом вложенности
    const isNestingPending = dimension.arrayNesting && !dimensionsNesting;

    correctIndex = isBelowMaxDepth || isNestingPending ? index : index + 1;
  }

  return Math.min(correctIndex, hierarchyDimensions.length - 1);
}

function getNestedIndex(
  dimensionsNesting: TDimensionsNesting | undefined,
  sliceIndex: number | undefined,
  checkedValuesLength: number
) {
  if (!sliceIndex) {
    return undefined;
  }

  if (!dimensionsNesting || checkedValuesLength > 1) {
    return sliceIndex;
  }

  if (checkedValuesLength === 1) {
    return sliceIndex + 1;
  }

  return undefined;
}

function getDimensionByNestedIndex<D extends IWidgetDimension>(
  dimension: TNullable<D>,
  nestedIndex: number | undefined
) {
  if (dimension?.value?.mode !== EWidgetIndicatorValueModes.FORMULA || !dimension.arrayNesting) {
    return dimension;
  }

  return {
    ...dimension,
    value: {
      ...dimension?.value,
      formula: `${dimension.value?.formula}[${nestedIndex}]`,
    },
  };
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
export function selectDimensionFromHierarchy<
  H extends IWidgetDimensionHierarchy<D>,
  D extends IWidgetDimension,
>(
  { hierarchyDimensions }: H,
  widgetFilterValues: TWidgetFilterValue[],
  dimensionsNesting?: TDimensionsNesting
): TNullable<D> {
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

    const sliceIndex = matchedFilter.sliceIndex;

    const selectionIndex =
      checkedValuesLength > 1
        ? i
        : calculateSelectionIndex(dimension, hierarchyDimensions, i, dimensionsNesting, sliceIndex);
    const nestedIndex = getNestedIndex(dimensionsNesting, sliceIndex, checkedValuesLength);

    return getDimensionByNestedIndex(hierarchyDimensions[selectionIndex], nestedIndex);
  }

  const activeDimension = hierarchyDimensions[0];
  const nestedIndex = activeDimension?.arrayNesting ? 1 : undefined;

  return getDimensionByNestedIndex(activeDimension, nestedIndex);
}
