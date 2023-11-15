import type { ESimpleDataType } from "../data";

/** Вид переменной для калькулятора */
export interface ICalculatorVariable {
    dataType: ESimpleDataType;
    value: string | string[];
  }