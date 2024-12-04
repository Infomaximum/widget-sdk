import {
  formulaFilterMethods,
  EFormulaFilterFieldKeys,
  type IFormulaFilterValue,
  type TExtendedFormulaFilterValue,
  isFormulaFilterValue,
} from "../../filtration";
import { type ICalculatorFilter } from "../calculator/calculator";
import { compact, compactMap, isNil } from "../../utils/functions";
import type { TNullable, valueof } from "../../utilityTypes";
import { ESimpleDataType } from "../../data";
import { EFormatTypes } from "../../formatting";

export enum ELastTimeUnit {
  DAYS = "DAYS",
  MONTHS = "MONTHS",
  YEARS = "YEARS",
}
export enum EDurationUnit {
  DAYS = "DAYS",
  HOURS = "HOURS",
  MINUTES = "MINUTES",
  SECONDS = "SECONDS",
}

const isRangeFilteringMethod = (filteringMethod: valueof<typeof formulaFilterMethods>) =>
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

const subtractDurationFromDate = (date: Date, value: number, unitTime: ELastTimeUnit) => {
  switch (unitTime) {
    case ELastTimeUnit.DAYS:
      date.setDate(date.getDate() - value);
      break;
    case ELastTimeUnit.MONTHS:
      date.setMonth(date.getMonth() - value);
      break;
    case ELastTimeUnit.YEARS:
      date.setFullYear(date.getFullYear() - value);
      break;
  }

  return date;
};

const convertToSeconds = (value: number, rangeUnit?: EDurationUnit) => {
  if (rangeUnit === undefined) {
    return value;
  }

  switch (rangeUnit) {
    case EDurationUnit.DAYS:
      return value * 86400;
    case EDurationUnit.HOURS:
      return value * 3600;
    case EDurationUnit.MINUTES:
      return value * 60;
  }

  return value;
};

// todo: покрыть тестами
const getFormulaFilterValues = (filterValue: IFormulaFilterValue): (string | null)[] => {
  const { format, filteringMethod, formValues, checkedValues } = filterValue;

  if (checkedValues && checkedValues.length) {
    return checkedValues;
  }

  if (!formValues) {
    return [];
  }

  function stringifyNumbersRange<T>(
    range: Partial<[T, T]> = [undefined, undefined]
  ): [string, string] {
    return range.map((value, index) => {
      if (isNil(value)) {
        return String(index === 0 ? -Infinity : Infinity);
      }

      return String(value);
    }) as [string, string];
  }

  function convertDurationRangeToSecond(
    range: [number?, number?] = [undefined, undefined],
    rangeUnit?: EDurationUnit
  ): [string, string] {
    return range.map((value, index) => {
      if (isNil(value)) {
        return String(index === 0 ? -Infinity : Infinity);
      }

      return String(convertToSeconds(value, rangeUnit));
    }) as [string, string];
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
            subtractDurationFromDate(new Date(), lastTimeValue ?? 0, lastTimeUnit as ELastTimeUnit),
            showTime
          ),
          convertDateToClickHouse(new Date(), showTime),
        ]);
      }

      return compact([datePickerValue]);

    case EFormatTypes.STRING:
      return compact([formValues[EFormulaFilterFieldKeys.string] ?? null]);

    case EFormatTypes.NUMBER:
    case EFormatTypes.YEAR:
    case EFormatTypes.DAY_OF_MONTH:
    case EFormatTypes.WEEK:
    case EFormatTypes.HOUR:
      const {
        [EFormulaFilterFieldKeys.number]: number,
        [EFormulaFilterFieldKeys.numberRange]: numberRange,
      } = formValues;

      return isRangeFilteringMethod(filteringMethod)
        ? stringifyNumbersRange(numberRange)
        : [String(number ?? 0)];

    case EFormatTypes.DURATION:
      const {
        [EFormulaFilterFieldKeys.duration]: duration,
        [EFormulaFilterFieldKeys.numberRange]: durationRange,
        [EFormulaFilterFieldKeys.durationUnit]: durationUnit,
      } = formValues;

      return isRangeFilteringMethod(filteringMethod)
        ? convertDurationRangeToSecond(durationRange, durationUnit)
        : [String(duration ?? 0)];
  }

  return [];
};

export const mapFormulaFilterToCalculatorInput = (
  filterValue: TExtendedFormulaFilterValue
): TNullable<ICalculatorFilter> => {
  if (!filterValue) {
    return null;
  }

  if (!isFormulaFilterValue(filterValue)) {
    return {
      dataType: ESimpleDataType.OTHER,
      formula: filterValue.formula,
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
  filters: TExtendedFormulaFilterValue[]
): ICalculatorFilter[] => {
  return compactMap(filters, mapFormulaFilterToCalculatorInput);
};
