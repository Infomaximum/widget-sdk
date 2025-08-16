import { EClickHouseBaseTypes } from "../../clickHouseTypes";
import {
  formulaFilterMethods,
  isDimensionProcessFilter,
  type IDimensionProcessFilter,
  type TExtendedFormulaFilterValue,
} from "../../filtration";
import type { TNullable } from "../../utilityTypes";
import { compactMap } from "../../utils/functions";
import type { ICalculatorFilter } from "../calculator";
import { mapFormulaFilterToCalculatorInput } from "./mapFormulaFiltersToInputs";

export type TWidgetFilter = TExtendedFormulaFilterValue | IDimensionProcessFilter;

export const mapWidgetFiltersToInputs = (filters: TWidgetFilter[]): ICalculatorFilter[] => {
  return compactMap(filters, mapWidgetFilterToCalculatorInput);
};

export const mapWidgetFilterToCalculatorInput = (
  filter: TWidgetFilter
): TNullable<ICalculatorFilter> => {
  if (isDimensionProcessFilter(filter)) {
    // TODO: заменить заглушку на реальные данные в BI-15286
    return {
      dbDataType: EClickHouseBaseTypes.UInt8,
      formula: "1",
      values: ["1"],
      filteringMethod: formulaFilterMethods.EQUAL_TO,
    };
  }

  return mapFormulaFilterToCalculatorInput(filter);
};
