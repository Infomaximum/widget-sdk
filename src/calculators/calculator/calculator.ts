import type { EFilteringMethodValues } from "@infomaximum/base-filter";
import type { ESimpleDataType } from "../../data";
import type { EDashboardFilteringMethodValues } from "../../filtration";
import type { TNullable } from "../../utilityTypes";

export interface ICalculator<Input, Output> {
  /** Запрос к вычислителю */
  calculate(input: Input): Promise<Output>;
  /** Актуализировать ключ кеша для ответа вычислителя */
  actualizeCacheKey(staleInput: Input, input: Input): void;
  isLoading: boolean;
}

export interface ICalculatorIndicatorInput<T> {
  /**
   * @deprecated Значение, которое будет связано с текущим входом для получения в соответствующем выходе
   * (для удобства разработки)
   */
  indicator: T;
  alias: string;
}

export interface ICalculatorIndicatorOutput<T> {
  /**
   * @deprecated Значение, которое было связано с соответствующим входом вычислителя
   * (для удобства разработки)
   */
  indicator: T;
  values: string[];
}

export interface ICalculatorDimensionInput<T = any>
  extends ICalculatorIndicatorInput<T> {
  formula: string;
  hideEmpty?: boolean;
}

export interface ICalculatorDimensionOutput<T = any>
  extends ICalculatorIndicatorOutput<T> {}

export interface ICalculatorMeasureInput<T = any>
  extends ICalculatorIndicatorInput<T> {
  mainFormula: string;
  additionalFormulas?: { alias: string; formula: string }[];
  displayConditionFormula?: TNullable<string>;
}

export interface ICalculatorMeasureOutput<T = any>
  extends ICalculatorIndicatorOutput<T> {
  /** Значения, вычисленные на основе дополнительных формул */
  additionalValues: Map<string, string[]>;
}

export interface ICalculatorFilter {
  /** Формула фильтра */
  formula: string;
  /** Тип данных для формулы фильтра */
  dataType: ESimpleDataType;
  /** Значения фильтра */
  values: string[];
  /** Метод фильтрации */
  filteringMethod: EFilteringMethodValues | EDashboardFilteringMethodValues;
}
