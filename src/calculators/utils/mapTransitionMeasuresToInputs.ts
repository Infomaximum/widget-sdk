import type { IProcessIndicator, TWidgetVariable } from "../../indicators";
import { getTransitionMeasureFormula } from "../../indicatorsFormulas";
import type { IWidgetProcess } from "../../metaDescription";
import { compactMap } from "../../utils/functions";
import type { ICalculatorMeasureInput } from "../calculator";
import {
  checkDisplayCondition,
  getDisplayConditionFormula,
} from "./displayCondition";

function mapTransitionMeasureToInput<T extends IProcessIndicator>(
  indicator: T,
  process: IWidgetProcess,
  variables: Map<string, TWidgetVariable>,
  addFormulas: (indicator: T) => Map<string, string> = () => new Map()
): ICalculatorMeasureInput | null {
  const mainFormula = getTransitionMeasureFormula(indicator, process);

  if (!mainFormula) {
    return null;
  }

  if (!checkDisplayCondition(indicator.displayCondition, variables)) {
    return null;
  }

  return {
    alias: String(indicator.id),
    mainFormula,
    dataType: indicator.dataType,
    displayConditionFormula: getDisplayConditionFormula(
      indicator.displayCondition
    ),
    additionalFormulas: addFormulas(indicator),
  };
}

/** Конвертировать процессные показатели виджета во входы для вычислителя */
export function mapTransitionMeasuresToInputs<T extends IProcessIndicator>(
  indicators: T[],
  process: IWidgetProcess,
  variables: Map<string, TWidgetVariable>,
  addFormulas?: (indicator: T) => Map<string, string>
) {
  return compactMap(indicators, (indicator) =>
    mapTransitionMeasureToInput(indicator, process, variables, addFormulas)
  );
}
