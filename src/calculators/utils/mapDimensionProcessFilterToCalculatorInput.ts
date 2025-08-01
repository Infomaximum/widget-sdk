import { EClickHouseBaseTypes } from "../../clickHouseTypes";
import {
  EDimensionProcessFilterTimeUnit,
  formulaFilterMethods,
  type IDimensionProcessFilter,
} from "../../filtration";
import { EWidgetIndicatorValueModes } from "../../indicators";
import { getProcessDimensionValueFormula } from "../../indicatorsFormulas";
import type { ICalculatorFilter } from "../calculator";

const intervalByUnit: Record<EDimensionProcessFilterTimeUnit, string> = {
  [EDimensionProcessFilterTimeUnit.YEARS]: "year",
  [EDimensionProcessFilterTimeUnit.MONTHS]: "month",
  [EDimensionProcessFilterTimeUnit.DAYS]: "day",
  [EDimensionProcessFilterTimeUnit.HOURS]: "hour",
  [EDimensionProcessFilterTimeUnit.MINUTES]: "minute",
};

export function mapDimensionProcessFilterToCalculatorInput(
  filter: IDimensionProcessFilter
): ICalculatorFilter {
  const formula =
    filter.value.mode === EWidgetIndicatorValueModes.FORMULA
      ? filter.value.formula
      : getProcessDimensionValueFormula(filter.value);

  if (formula === undefined) {
    throw new Error("Formula generation error");
  }

  const { timeUnit, filteringMethod, values } = filter.condition;

  if (filteringMethod === "LAST_TIME") {
    if (!timeUnit) {
      throw new Error("Missing time unit");
    }

    return {
      dbDataType: EClickHouseBaseTypes.Bool,
      formula: `date_diff('${intervalByUnit[timeUnit]}', ${formula}, now())`,
      values,
      filteringMethod: formulaFilterMethods.LESS_THAN_OR_EQUAL_TO,
    };
  }

  return { formula, filteringMethod, values, dbDataType: filter.dbDataType };
}
