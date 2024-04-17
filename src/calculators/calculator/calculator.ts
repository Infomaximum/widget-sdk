import type { ESimpleDataType } from "../../data";
import type { TNullable, valueof } from "../../utilityTypes";
import type { formulaFilterMethods } from "../../filtration";

export interface ICalculator<Input, Output> {
  /** Запрос к вычислителю */
  calculate(input: Input): Promise<Output>;
  /** Актуализировать ключ кеша для ответа вычислителя */
  actualizeCacheKey(staleInput: Input, input: Input): void;
  isLoading: boolean;
}

export interface ICalculatorIndicatorInput {
  alias: string;
  /**
   * Информация о типе данных:
   * - Если тип не передан, не производится дополнительной обработки формулы.
   * - Если передан тип "OTHER", формула дополнительно будет обернута в toString().
   */
  dataType?: ESimpleDataType;
  displayConditionFormula?: TNullable<string>;
}

export interface ICalculatorIndicatorOutput {
  values: (string | null)[];
}

export interface ICalculatorDimensionInput extends ICalculatorIndicatorInput {
  formula: string;
  hideEmpty?: boolean;
}

export interface ICalculatorDimensionOutput extends ICalculatorIndicatorOutput {}

export interface ICalculatorMeasureInput extends ICalculatorIndicatorInput {
  mainFormula: string;
  /** Временно поддерживается обратная совместимость с форматом { alias: string; formula: string }[] */
  additionalFormulas?: Map<string, string>;
}

export interface ICalculatorMeasureOutput extends ICalculatorIndicatorOutput {
  /** Значения, вычисленные на основе дополнительных формул */
  additionalValues: Map<string, string[]>;
}

export enum ECalculatorFilterMethods {
  EQUAL_TO = "EQUAL_TO",
  NOT_EQUAL_TO = "NOT_EQUAL_TO",
  GREATER_THAN = "GREATER_THAN",
  LESS_THAN = "LESS_THAN",
  GREATER_THAN_OR_EQUAL_TO = "GREATER_THAN_OR_EQUAL_TO",
  LESS_THAN_OR_EQUAL_TO = "LESS_THAN_OR_EQUAL_TO",
  STARTS_WITH = "STARTS_WITH",
  ENDS_WITH = "ENDS_WITH",
  CONTAINS = "CONTAINS",
  NOT_CONTAINS = "NOT_CONTAINS",
  IN_RANGE = "IN_RANGE",
  NOT_IN_RANGE = "NOT_IN_RANGE",
  INCLUDE = "INCLUDE",
  EXCLUDE = "EXCLUDE",
  NONEMPTY = "NONEMPTY",
  EMPTY = "EMPTY",
}

export interface ICalculatorFilter {
  /** Формула фильтра */
  formula: string;
  /** Тип данных для формулы фильтра */
  dataType: ESimpleDataType;
  /** Значения фильтра */
  values: (null | string)[];
  /** Метод фильтрации */
  filteringMethod: valueof<typeof formulaFilterMethods>;
}

export interface IExportColumnOrder {
  alias: string;
  exportName: string;
}
