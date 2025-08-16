import { EClickHouseBaseTypes } from "../../clickHouseTypes";
import {
  formulaFilterMethods,
  isDimensionProcessFilter,
  type TSettingsFilter,
} from "../../filtration";
import type { TNullable } from "../../utilityTypes";
import { compactMap } from "../../utils/functions";
import type { ICalculatorFilter } from "../calculator";
import { mapFormulaFilterToCalculatorInput } from "./mapFormulaFiltersToInputs";

const mapSettingsFilterToCalculatorInput = (
  filter: TSettingsFilter
): TNullable<ICalculatorFilter> => {
  if (isDimensionProcessFilter(filter)) {
    // TODO: заменить заглушку на генерацию формулы в BI-15286 (и склеить коммиты)
    return {
      dbDataType: EClickHouseBaseTypes.UInt8,
      formula: "1",
      values: ["1"],
      filteringMethod: formulaFilterMethods.EQUAL_TO,
    };
  }

  return mapFormulaFilterToCalculatorInput(filter);
};

export const mapSettingsFiltersToInputs = (filters: TSettingsFilter[]): ICalculatorFilter[] => {
  return compactMap(filters, mapSettingsFilterToCalculatorInput);
};
