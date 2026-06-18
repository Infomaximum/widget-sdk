import type { IWidgetDimension, TWidgetVariable } from "../../indicators";
import { getDimensionFormula } from "../../indicatorsFormulas";
import { compactMap } from "../../utils/functions";
import type { ICalculatorDimensionInput } from "../calculator";
import { type TSlicedDimension, getSlicedDimensionFormula } from "../../arrayNesting";
import { checkDisplayCondition, getDisplayConditionFormula } from "./displayCondition";

export function mapDimensionToInput<T extends IWidgetDimension>(
  dimension: TSlicedDimension<T>,
  variables: Map<string, TWidgetVariable>
): ICalculatorDimensionInput | null {
  const formula =
    dimension.sliceIndex !== undefined
      ? getSlicedDimensionFormula(dimension).slicedDimensionFormula
      : getDimensionFormula(dimension);

  if (!formula) {
    return null;
  }

  if (!checkDisplayCondition(dimension.displayCondition, variables)) {
    return null;
  }

  return {
    alias: String(dimension.id),
    formula,
    dbDataType: dimension.dbDataType,
    hideEmpty: dimension.hideEmptyValues,
    displayConditionFormula: getDisplayConditionFormula(dimension.displayCondition),
  };
}

/** Конвертировать разрезы виджета во входы для вычислителя */
export function mapDimensionsToInputs<T extends IWidgetDimension>(
  dimensions: TSlicedDimension<T>[],
  variables: Map<string, TWidgetVariable>
) {
  return compactMap(dimensions, (dimension) => mapDimensionToInput(dimension, variables));
}
