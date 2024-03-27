import type { IWidgetDimension, TWidgetVariable } from "../../indicators";
import { getDimensionFormula } from "../../indicatorsFormulas";
import { compactMap } from "../../utils/functions";
import type { ICalculatorDimensionInput } from "../calculator";
import {
  checkDisplayCondition,
  getDisplayConditionFormula,
} from "./displayCondition";

export function mapDimensionToInput(
  dimension: IWidgetDimension,
  variables: Map<string, TWidgetVariable>
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
  };
}

/** Конвертировать разрезы виджета во входы для вычислителя */
export function mapDimensionsToInputs(
  dimensions: IWidgetDimension[],
  variables: Map<string, TWidgetVariable>
) {
  return compactMap(dimensions, (dimension) =>
    mapDimensionToInput(dimension, variables)
  );
}
