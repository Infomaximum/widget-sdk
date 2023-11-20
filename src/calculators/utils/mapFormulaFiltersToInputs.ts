import {
  EDashboardFilteringMethodValues,
  EFormulaFilterFieldKeys,
  type IFormulaFilterValue,
} from "../../filtration";
import type { ICalculatorFilter } from "../calculator/calculator";
import { compact, compactMap } from "../../utils/functions";
import type { TNullable } from "../../utilityTypes";
import { ESimpleDataType } from "../../data";
import { EFormatTypes } from "../../formatting";
import type { EFilteringMethodValues } from "@infomaximum/base-filter";

const isRangeFilteringMethod = (
  filteringMethod: EDashboardFilteringMethodValues | EFilteringMethodValues
) =>
  filteringMethod === EDashboardFilteringMethodValues.IN_RANGE ||
  filteringMethod === EDashboardFilteringMethodValues.NOT_IN_RANGE;

// todo: покрыть тестами
export const getFormulaFilterValues = (
  filterValue: IFormulaFilterValue
): string[] => {
  const { format, filteringMethod, formValues, checkedValues } = filterValue;

  if (checkedValues && checkedValues.length) {
    return checkedValues;
  }

  switch (format) {
    case EFormatTypes.DATE:
    case EFormatTypes.DATETIME:
      const {
        [EFormulaFilterFieldKeys.date]: datePickerValue,
        [EFormulaFilterFieldKeys.dateRange]: rangePickerValue,
      } = formValues;

      return compact(
        isRangeFilteringMethod(filteringMethod)
          ? rangePickerValue
          : [datePickerValue]
      );

    case EFormatTypes.STRING:
      return compact([formValues?.[EFormulaFilterFieldKeys.string] ?? null]);

    case EFormatTypes.NUMBER:
    case EFormatTypes.YEAR:
    case EFormatTypes.DAY_OF_MONTH:
    case EFormatTypes.WEEK:
    case EFormatTypes.HOUR:
      const {
        [EFormulaFilterFieldKeys.number]: number,
        [EFormulaFilterFieldKeys.numberRange]: numberRange,
      } = formValues;

      const range = isRangeFilteringMethod(filteringMethod)
        ? numberRange
        : [number];

      return range?.map((value) => String(value ?? 0)) || [];

    case EFormatTypes.DURATION:
      const {
        [EFormulaFilterFieldKeys.duration]: duration,
        [EFormulaFilterFieldKeys.numberRange]: durationRange,
      } = formValues;

      const _range = isRangeFilteringMethod(filteringMethod)
        ? durationRange
        : [duration];

      return _range?.map((value) => String(value ?? 0)) || [];
  }

  return [];
};

export const mapFormulaFilterToCalculatorInput = (
  filterValue: IFormulaFilterValue | string
): TNullable<ICalculatorFilter> => {
  if (!filterValue) {
    return null;
  }

  if (typeof filterValue === "string") {
    return {
      dataType: ESimpleDataType.OTHER,
      formula: filterValue,
      values: ["1"],
      filteringMethod: EDashboardFilteringMethodValues.EQUAL_TO,
    };
  }

  const { formula, filteringMethod, dataType } = filterValue;

  return {
    formula,
    filteringMethod,
    dataType,
    values: getFormulaFilterValues(filterValue),
  };
};

export const mapFormulaFiltersToInputs = (
  filters: (string | IFormulaFilterValue)[]
): ICalculatorFilter[] => {
  return compactMap(filters, mapFormulaFilterToCalculatorInput);
};
