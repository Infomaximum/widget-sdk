import {
  formulaFilterMethods,
  EFormulaFilterFieldKeys,
  type IFormulaFilterValue,
} from "../../filtration";
import type { ICalculatorFilter } from "../calculator/calculator";
import { compact, compactMap } from "../../utils/functions";
import type { TNullable, valueof } from "../../utilityTypes";
import { ESimpleDataType } from "../../data";
import { EFormatTypes } from "../../formatting";

export enum ETimeUnit {
  DAYS = "DAYS",
  MONTHS = "MONTHS",
  YEARS = "YEARS",
}

const isRangeFilteringMethod = (
  filteringMethod: valueof<typeof formulaFilterMethods>
) =>
  filteringMethod === formulaFilterMethods.IN_RANGE ||
  filteringMethod === formulaFilterMethods.NOT_IN_RANGE;

const convertDateToClickHouse = (date: Date, showTime: boolean) => {
  const twoDigitValue = (value: string | number) => ("0" + value).slice(-2);

  const year = date.getFullYear();
  const month = twoDigitValue(date.getMonth() + 1);
  const day = twoDigitValue(date.getDate());
  const hours = twoDigitValue(date.getHours());
  const minutes = twoDigitValue(date.getMinutes());
  const seconds = twoDigitValue(date.getSeconds());

  const timeString = `${hours}:${minutes}:${seconds}`;
  const dateString = `${year}-${month}-${day}`;

  return showTime ? `${dateString} ${timeString}` : `${dateString}`;
};

const subtractDurationFromDate = (
  date: Date,
  value: number,
  unitTime: ETimeUnit
) => {
  switch (unitTime) {
    case ETimeUnit.DAYS:
      date.setDate(date.getDate() - value);
      break;
    case ETimeUnit.MONTHS:
      date.setMonth(date.getMonth() - value);
      break;
    case ETimeUnit.YEARS:
      date.setFullYear(date.getFullYear() - value);
      break;
  }

  return date;
};

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
        [EFormulaFilterFieldKeys.lastTimeValue]: lastTimeValue,
        [EFormulaFilterFieldKeys.lastTimeUnit]: lastTimeUnit,
      } = formValues;

      if (isRangeFilteringMethod(filteringMethod)) {
        return compact(rangePickerValue);
      }

      if (filteringMethod === formulaFilterMethods.LAST_TIME) {
        const showTime = format === EFormatTypes.DATETIME;

        return compact([
          convertDateToClickHouse(
            subtractDurationFromDate(
              new Date(),
              lastTimeValue ?? 0,
              lastTimeUnit as ETimeUnit
            ),
            showTime
          ),
          convertDateToClickHouse(new Date(), showTime),
        ]);
      }

      return compact([datePickerValue]);

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
      filteringMethod: formulaFilterMethods.EQUAL_TO,
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
