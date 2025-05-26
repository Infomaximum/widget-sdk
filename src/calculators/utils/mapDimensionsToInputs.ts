import { applyIndexToArrayFormula } from ".";
import type { IWidgetDimension, TWidgetVariable } from "../../indicators";
import { getDimensionFormula } from "../../indicatorsFormulas";
import { compactMap } from "../../utils/functions";
import type { ICalculatorDimensionInput } from "../calculator";
import { checkDisplayCondition, getDisplayConditionFormula } from "./displayCondition";
import type { ISlicedDimension } from "./selectSlicedDimensionFromHierarchy";

function parseDimensionData<T extends IWidgetDimension>(dimensionData: T | ISlicedDimension<T>) {
  const isSlicedDimension = (data: ISlicedDimension | any): data is ISlicedDimension =>
    "sliceIndex" in data && "dimension" in data;

  if (isSlicedDimension(dimensionData)) {
    return dimensionData;
  }

  return {
    dimension: dimensionData,
    sliceIndex: undefined,
  };
}

export function mapDimensionToInput<T extends IWidgetDimension>(
  dimensionData: T | ISlicedDimension<T>,
  variables: Map<string, TWidgetVariable>
): ICalculatorDimensionInput | null {
  const { dimension, sliceIndex } = parseDimensionData(dimensionData);

  const formula = getDimensionFormula(dimension);

  if (!formula) {
    return null;
  }

  if (!checkDisplayCondition(dimension.displayCondition, variables)) {
    return null;
  }

  return {
    alias: String(dimension.id),
    formula: sliceIndex ? applyIndexToArrayFormula(formula, sliceIndex) : formula,
    dbDataType: dimension.dbDataType,
    hideEmpty: dimension.hideEmptyValues,
    displayConditionFormula: getDisplayConditionFormula(dimension.displayCondition),
  };
}

/** Конвертировать разрезы виджета во входы для вычислителя */
export function mapDimensionsToInputs<T extends IWidgetDimension>(
  dimensions: T[] | ISlicedDimension<T>[],
  variables: Map<string, TWidgetVariable>
) {
  return compactMap<T | ISlicedDimension<T>, ICalculatorDimensionInput>(dimensions, (dimension) =>
    mapDimensionToInput(dimension, variables)
  );
}
