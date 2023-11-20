import type { TWidgetVariable } from "../../indicators";
import { compactMap } from "../../utils";
import { isNil } from "../../utils/functions";
import type { ICalculatorVariablesValues } from "../variables";

export function mapVariablesToInputs(
  variables: Map<string, TWidgetVariable>
): ICalculatorVariablesValues {
  return new Map(
    compactMap([...variables.values()], ({ name, dataType, value }) =>
      !isNil(value) ? [name, { dataType, value }] : null
    )
  );
}
