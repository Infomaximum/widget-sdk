import type { TWidgetVariable } from "../../indicators";
import {
  EDisplayConditionMode,
  type TDisplayCondition,
} from "../../settings/values";
import type { TNullable } from "../../utilityTypes";

export function checkDisplayCondition(
  displayCondition: TNullable<TDisplayCondition>,
  variables: Map<string, TWidgetVariable>
) {
  if (displayCondition?.mode === EDisplayConditionMode.VARIABLE) {
    const { variableGuid, variableValue } = displayCondition;

    if (
      variableGuid &&
      variableValue &&
      variables.get(variableGuid)?.value !== variableValue
    ) {
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
