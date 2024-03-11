import type { IWidgetColumnIndicator, TWidgetVariable } from "../../indicators";
import {
  EDisplayConditionMode,
  type TDisplayCondition,
} from "../../settings/values";
import type { TNullable } from "../../utilityTypes";
import { isNil } from "../../utils/functions";

export function checkDisplayCondition(
  displayCondition: TNullable<TDisplayCondition>,
  variables: Map<string, TWidgetVariable>
) {
  if (displayCondition?.mode === EDisplayConditionMode.VARIABLE) {
    const { variableGuid, variableValue } = displayCondition;

    const currentVariableValue =
      variableGuid && variables.get(variableGuid)?.value;

    const isCurrentVariableMatch = Array.isArray(currentVariableValue)
      ? !!variableValue && currentVariableValue?.includes(variableValue)
      : currentVariableValue === variableValue;

    if (!isCurrentVariableMatch) {
      return false;
    }
  }

  return true;
}

export function getDisplayConditionFormula(
  displayCondition: TNullable<TDisplayCondition>
) {
  if (displayCondition?.mode === EDisplayConditionMode.FORMULA) {
    return displayCondition.formula;
  }
}

export const replaceDisplayCondition = <I extends IWidgetColumnIndicator>(
  dimension: I,
  displayCondition: TNullable<TDisplayCondition>
): TNullable<I> => {
  return isNil(displayCondition)
    ? dimension
    : { ...dimension, displayCondition };
};
