import type { TNullable } from "./utilityTypes";
import {
  isDimensionsHierarchy,
  inheritDisplayConditionFromHierarchy,
  type IWidgetColumnIndicator,
  type IWidgetDimension,
  type IWidgetDimensionHierarchy,
  type IWidgetDimensionInHierarchy,
  type TConditionalDimensionInHierarchy,
  type TWidgetDimensionUnion,
} from "./indicators";
import { getDimensionFormula } from "./indicatorsFormulas";
import { applyIndexToArrayFormula } from "./calculators/utils";
import { parseClickHouseType } from "./clickHouseTypes";
import { type TWidgetFilterValue, type IFormulaFilterValue } from "./filtration";
import { compactMap } from "./utils/functions";

export interface IDimensionNesting {
  dimensionNestingMap: Map<string, Map<string | null, string | null>>;
  dimensionMaxNestingMap: Map<string, string | null>;
}

// Используется для размерностей, обогащённых флагом arrayNesting в результате nesting-запроса.
export type TWidgetDimensionWithNesting<T extends TWidgetDimensionUnion = IWidgetDimension> = T & {
  arrayNesting?: boolean;
};

// Используется для размерностей с флагом arrayNesting из настроек виджета (dimension config).
export type TDimensionWithNesting<D extends TWidgetDimensionUnion = IWidgetDimension> = D & {
  arrayNesting?: boolean;
};

export type TSlicedDimension<D extends TWidgetDimensionUnion = IWidgetDimension> =
  TWidgetDimensionWithNesting<D> & {
    sliceIndex?: number;
  };

const isFormulaWithSliceGuard = (
  value: TWidgetFilterValue
): value is IFormulaFilterValue & { formula: string } =>
  "filteringMethod" in value && "formula" in value;

export function isNestingDimension<D extends TWidgetDimensionUnion = IWidgetDimension>(
  indicator: IWidgetColumnIndicator | IWidgetDimensionInHierarchy
): indicator is TDimensionWithNesting<D> {
  return (
    !isDimensionsHierarchy(indicator) &&
    parseClickHouseType(indicator.dbDataType).containers.includes("Array")
  );
}

export function findMatchedFilter(
  filterValues: TWidgetFilterValue[],
  dimension: TWidgetDimensionWithNesting
): TWidgetFilterValue | undefined {
  const dimensionFormula = getDimensionFormula(dimension);

  return filterValues.findLast((filterValue) => {
    if (!isFormulaWithSliceGuard(filterValue)) {
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
  dimension: TWidgetDimensionWithNesting,
  hierarchyDimensions: IWidgetDimensionInHierarchy[],
  index: number,
  dimensionMaxNestingMap: IDimensionNesting["dimensionMaxNestingMap"] | undefined,
  filterSliceIndex: number | undefined
): number {
  let correctIndex = index + 1;

  if (filterSliceIndex) {
    const maxNestingDepth = Number(dimensionMaxNestingMap?.get(String(dimension.id))) || 0;

    const isBelowMaxDepth = filterSliceIndex < maxNestingDepth;
    const isNestingPending = dimension.arrayNesting && !dimensionMaxNestingMap;

    correctIndex = isBelowMaxDepth || isNestingPending ? index : index + 1;
  }

  return Math.min(correctIndex, hierarchyDimensions.length - 1);
}

const minNestingIndex = 1;

export function getDimensionSliceIndex(
  dimensionMaxNestingMap: IDimensionNesting["dimensionMaxNestingMap"] | undefined,
  filterSliceIndex: number | undefined,
  checkedValuesLength: number,
  dimensionId: number | undefined
): number {
  if (!filterSliceIndex) {
    return minNestingIndex;
  }

  const maxNestingDepth =
    typeof dimensionId === "number" && Number(dimensionMaxNestingMap?.get(String(dimensionId)));
  const isFilterSliceIndexMaxNesting =
    filterSliceIndex && maxNestingDepth && filterSliceIndex >= maxNestingDepth;

  if (!dimensionMaxNestingMap || checkedValuesLength > 1 || isFilterSliceIndexMaxNesting) {
    return filterSliceIndex;
  }

  if (checkedValuesLength === 1) {
    return filterSliceIndex + 1;
  }

  return minNestingIndex;
}

export function getSlicedDimension<
  D extends TWidgetDimensionWithNesting<IWidgetDimension | TConditionalDimensionInHierarchy>,
>(dimension: D, sliceIndex: number | undefined): TSlicedDimension<D> {
  return { ...dimension, sliceIndex };
}

export function selectSlicedDimensionFromHierarchy<
  D extends TWidgetDimensionWithNesting = TWidgetDimensionWithNesting,
  I extends
    TWidgetDimensionWithNesting<IWidgetDimensionInHierarchy> = TWidgetDimensionWithNesting<IWidgetDimensionInHierarchy>,
  H extends IWidgetDimensionHierarchy<I> = IWidgetDimensionHierarchy<I>,
>(
  hierarchy: H,
  widgetFilterValues: TWidgetFilterValue[],
  dimensionMaxNestingMap?: IDimensionNesting["dimensionMaxNestingMap"]
): TNullable<TSlicedDimension<D | TConditionalDimensionInHierarchy<I>>> {
  const { hierarchyDimensions } = hierarchy;

  for (let i = hierarchyDimensions.length - 1; i >= 0; i--) {
    const dimension = hierarchyDimensions[i];

    if (!dimension) {
      continue;
    }

    const displayedDimension = inheritDisplayConditionFromHierarchy(dimension, hierarchy);

    const matchedFilter = findMatchedFilter(widgetFilterValues, displayedDimension);

    if (!matchedFilter || !isFormulaWithSliceGuard(matchedFilter)) {
      continue;
    }

    const checkedValuesLength = (matchedFilter as IFormulaFilterValue).checkedValues?.length;

    if (checkedValuesLength === undefined) {
      continue;
    }

    const filterSliceIndex = (matchedFilter as IFormulaFilterValue).sliceIndex;

    const selectionIndex =
      checkedValuesLength > 1
        ? i
        : calculateSelectionIndex(
            displayedDimension,
            hierarchyDimensions,
            i,
            dimensionMaxNestingMap,
            filterSliceIndex
          );
    const currentDimension = hierarchyDimensions[selectionIndex];

    if (!currentDimension) {
      continue;
    }

    const displayedCurrentDimension = inheritDisplayConditionFromHierarchy(
      currentDimension,
      hierarchy
    );

    const dimensionSliceIndex = displayedCurrentDimension?.arrayNesting
      ? getDimensionSliceIndex(
          dimensionMaxNestingMap,
          displayedDimension.id === displayedCurrentDimension?.id ? filterSliceIndex : undefined,
          checkedValuesLength,
          displayedCurrentDimension?.id
        )
      : undefined;

    return getSlicedDimension(displayedCurrentDimension, dimensionSliceIndex);
  }

  const activeDimension = hierarchyDimensions.at(0);

  if (!activeDimension) {
    return;
  }

  const displayedActiveDimension = inheritDisplayConditionFromHierarchy(activeDimension, hierarchy);

  const sliceIndex = displayedActiveDimension?.arrayNesting ? minNestingIndex : undefined;

  return getSlicedDimension(displayedActiveDimension, sliceIndex);
}

export function getSlicedDimensionByFilters<D extends TWidgetDimensionWithNesting>(
  dimension: D,
  widgetFilters: TWidgetFilterValue[],
  dimensionMaxNestingMap?: IDimensionNesting["dimensionMaxNestingMap"]
): TSlicedDimension<D> {
  if (!dimension.arrayNesting) {
    return dimension;
  }

  const matchedFilter = findMatchedFilter(widgetFilters, dimension);

  if (!matchedFilter || !isFormulaWithSliceGuard(matchedFilter)) {
    return getSlicedDimension(dimension, 1);
  }

  const dimensionSliceIndex = getDimensionSliceIndex(
    dimensionMaxNestingMap,
    (matchedFilter as IFormulaFilterValue).sliceIndex,
    (matchedFilter as IFormulaFilterValue).checkedValues?.length ?? 0,
    dimension.id
  );

  return getSlicedDimension(dimension, dimensionSliceIndex);
}

export const getSlicedDimensionFormula = (dimension: TSlicedDimension<TWidgetDimensionUnion>) => {
  const dimensionFormula = getDimensionFormula(dimension);
  const slicedDimensionFormula = dimension.sliceIndex
    ? applyIndexToArrayFormula(dimensionFormula, dimension.sliceIndex)
    : dimensionFormula;

  return { slicedDimensionFormula, dimensionFormula };
};

export const replaceHierarchiesWithSlicedDimension = <
  D extends IWidgetDimension = IWidgetDimension,
  I extends IWidgetDimensionInHierarchy = IWidgetDimensionInHierarchy,
>(
  dimension: D | IWidgetDimensionHierarchy<I>,
  widgetFilters: TWidgetFilterValue[],
  dimensionMaxNestingMap?: IDimensionNesting["dimensionMaxNestingMap"]
): TSlicedDimension<D | TConditionalDimensionInHierarchy<I>> | undefined => {
  if (isDimensionsHierarchy(dimension)) {
    const slicedDimension = selectSlicedDimensionFromHierarchy<D, I>(
      dimension,
      widgetFilters,
      dimensionMaxNestingMap
    );

    if (!slicedDimension) {
      return;
    }

    const displayedIndicator = {
      ...slicedDimension,
      displayCondition: dimension.displayCondition,
    };

    return getSlicedDimension(displayedIndicator, slicedDimension?.sliceIndex);
  }

  return getSlicedDimensionByFilters(dimension, widgetFilters, dimensionMaxNestingMap);
};

export const replaceHierarchiesWithSlicedDimensions = <
  D extends IWidgetDimension = IWidgetDimension,
  I extends IWidgetDimensionInHierarchy = IWidgetDimensionInHierarchy,
>(
  dimensions: (D | IWidgetDimensionHierarchy<I>)[],
  widgetFilters: TWidgetFilterValue[],
  dimensionMaxNestingMap?: IDimensionNesting["dimensionMaxNestingMap"]
): TSlicedDimension<D | TConditionalDimensionInHierarchy<I>>[] =>
  compactMap(dimensions, (dimension) =>
    replaceHierarchiesWithSlicedDimension(dimension, widgetFilters, dimensionMaxNestingMap)
  );

export const findDimensionsForNestingQuery = <
  D extends TWidgetDimensionWithNesting = TWidgetDimensionWithNesting,
  I extends
    TWidgetDimensionWithNesting<IWidgetDimensionInHierarchy> = TWidgetDimensionWithNesting<IWidgetDimensionInHierarchy>,
>(
  dimensions: (D | IWidgetDimensionHierarchy<I>)[],
  widgetFilters: TWidgetFilterValue[]
) => {
  const slicedDimensions = replaceHierarchiesWithSlicedDimensions(dimensions, widgetFilters);

  return slicedDimensions.filter((dimension) => {
    if (!dimension?.arrayNesting) {
      return false;
    }

    const dimensionFormula = getDimensionFormula(dimension);

    const lastFilterByDimension = widgetFilters.findLast((filterValue) => {
      if (!isFormulaWithSliceGuard(filterValue) || !filterValue.sliceIndex) {
        return false;
      }

      return (
        filterValue.formula === dimensionFormula && dimension.sliceIndex === filterValue.sliceIndex
      );
    });

    if (!lastFilterByDimension || !isFormulaWithSliceGuard(lastFilterByDimension)) {
      return false;
    }

    const filterSliceIndex = (lastFilterByDimension as IFormulaFilterValue).sliceIndex;

    const selectedFilterValues =
      (lastFilterByDimension as IFormulaFilterValue).checkedValues?.length ?? 0;

    if (!filterSliceIndex || selectedFilterValues !== 1) {
      return false;
    }

    return true;
  });
};
