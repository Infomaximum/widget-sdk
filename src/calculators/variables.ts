import type { ESimpleDataType } from "../data";

/** Вид переменной для калькулятора */
export interface ICalculatorVariable {
  dataType: ESimpleDataType;
  value: string | string[];
}

/** Коллекция значений переменных по их имени */
export interface ICalculatorVariablesValues extends Map<string, ICalculatorVariable> {}
