import type { IWidgetDimension, TWidgetVariable } from "../../indicators";
import { getDimensionFormula } from "../../indicatorsFormulas";
import { compactMap } from "../../utils/functions";
import type { ICalculatorDimensionInput } from "../calculator";
import {
  checkDisplayCondition,
  getDisplayConditionFormula,
} from "./displayCondition";

export function mapDimensionToInput<T extends IWidgetDimension>(
  dimension: T,
  variables: Map<string, TWidgetVariable>,
  addFormulas: (dimension: T) => Map<string, string> = () => new Map()
): ICalculatorDimensionInput | null {
  const formula = getDimensionFormula(dimension);

  if (!formula) {
    return null;
  }

  if (!checkDisplayCondition(dimension.displayCondition, variables)) {
    return null;
  }

  return {
    alias: String(dimension.id),
    formula,
    dataType: dimension.dataType,
    hideEmpty: dimension.hideEmptyValues,
    displayConditionFormula: getDisplayConditionFormula(
      dimension.displayCondition
    ),
    additionalFormulas: addFormulas(dimension),
  };
}

/** Конвертировать разрезы виджета во входы для вычислителя */
export function mapDimensionsToInputs<T extends IWidgetDimension>(
  dimensions: T[],
  variables: Map<string, TWidgetVariable>,
  addFormulas?: (dimension: T) => Map<string, string>
) {
  return compactMap(dimensions, (dimension) =>
    mapDimensionToInput(dimension, variables, addFormulas)
  );
}
