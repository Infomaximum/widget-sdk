import { isDimensionProcessFilter, type TSettingsFilter } from "../../filtration";
import type { TNullable } from "../../utilityTypes";
import { compactMap } from "../../utils/functions";
import { type ICalculatorFilter } from "../calculator";
import { mapDimensionProcessFilterToCalculatorInput } from "./mapDimensionProcessFilterToCalculatorInput";
import { mapFormulaFilterToCalculatorInput } from "./mapFormulaFiltersToInputs";

const mapSettingsFilterToCalculatorInput = (
  filter: TSettingsFilter
): TNullable<ICalculatorFilter> => {
  if (isDimensionProcessFilter(filter)) {
    return mapDimensionProcessFilterToCalculatorInput(filter);
  }

  return mapFormulaFilterToCalculatorInput(filter);
};

export const mapSettingsFiltersToInputs = (filters: TSettingsFilter[]): ICalculatorFilter[] => {
  return compactMap(filters, mapSettingsFilterToCalculatorInput);
};
