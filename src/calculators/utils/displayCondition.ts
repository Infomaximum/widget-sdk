import type { IWidgetColumnIndicator, TWidgetVariable } from "../../indicators";
import { EDisplayConditionMode, type TDisplayCondition } from "../../settings/values";
import type { TNullable } from "../../utilityTypes";
import { isNil } from "../../utils/functions";

export function checkDisplayCondition(
  displayCondition: TNullable<TDisplayCondition>,
  variables: Map<string, TWidgetVariable>
) {
  if (displayCondition?.mode === EDisplayConditionMode.VARIABLE) {
    const { variableName, variableValue } = displayCondition;

    const currentVariableValue = variableName && variables.get(variableName)?.value;

    const isCurrentVariableMatch = Array.isArray(currentVariableValue)
      ? !!variableValue && currentVariableValue?.includes(variableValue)
      : currentVariableValue === variableValue;

    if (!isCurrentVariableMatch) {
      return false;
    }
  }

  return true;
}

export function getDisplayConditionFormula(displayCondition: TNullable<TDisplayCondition>) {
  if (displayCondition?.mode === EDisplayConditionMode.FORMULA) {
    return displayCondition.formula;
  }
}

export const replaceDisplayCondition = <I extends IWidgetColumnIndicator>(
  dimension: I,
  displayCondition: TNullable<TDisplayCondition>
): TNullable<I> => {
  return isNil(displayCondition) ? dimension : { ...dimension, displayCondition };
};

/**
 * Шаблон формулы для проверки условия отображения.
 *
 * - 0 -> false
 * - 1 -> true
 * - 15 -> true
 * - '0' ->	false
 * - '1' -> true
 * - '15' ->	true (значение по умолчанию, т.к. не преобразуется к Boolean)
 * - 'false' -> false
 * - 'true' -> true
 * - 'abc' -> true (значение по умолчанию, т.к. не преобразуется к Boolean)
 * - null -> true (значение по умолчанию, т.к. не преобразуется к Boolean)
 */
export const displayConditionTemplate = `accurateCastOrDefault({formula}, 'Boolean', true)`;
