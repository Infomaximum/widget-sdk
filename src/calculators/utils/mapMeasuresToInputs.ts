import type { IWidgetMeasure, TWidgetVariable } from "../../indicators";
import { getMeasureFormula } from "../../indicatorsFormulas";
import { compactMap } from "../../utils/functions";
import type { ICalculatorMeasureInput } from "../calculator";
import {
  checkDisplayCondition,
  getDisplayConditionFormula,
} from "./displayCondition";

function mapMeasureToInput<T extends IWidgetMeasure>(
  measure: T,
  variables: Map<string, TWidgetVariable>,
  addFormulas: (measure: T) => Map<string, string> = () => new Map()
): ICalculatorMeasureInput | null {
  const mainFormula = getMeasureFormula(measure);

  if (!mainFormula) {
    return null;
  }

  if (!checkDisplayCondition(measure.displayCondition, variables)) {
    return null;
  }

  return {
    alias: String(measure.id),
    mainFormula,
    dataType: measure.dataType,
    displayConditionFormula: getDisplayConditionFormula(
      measure.displayCondition
    ),
    additionalFormulas: addFormulas(measure),
  };
}

/** Конвертировать меры виджета во входы для вычислителя */
export function mapMeasuresToInputs<T extends IWidgetMeasure>(
  measures: T[],
  variables: Map<string, TWidgetVariable>,
  addFormulas?: (measure: T) => Map<string, string>
) {
  return compactMap(measures, (measure) =>
    mapMeasureToInput(measure, variables, addFormulas)
  );
}
