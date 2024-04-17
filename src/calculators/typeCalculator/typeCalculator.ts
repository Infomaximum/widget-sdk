import type { ESimpleDataType } from "../../data";
import type { ICalculator } from "../calculator";
import type { ICalculatorVariablesValues } from "../variables";

export interface ITypeCalculatorInput {
  formula: string;
  variablesValues: ICalculatorVariablesValues;
}

export interface ITypeCalculatorOutput {
  type: ESimpleDataType;
}

export interface ITypeCalculator extends ICalculator<ITypeCalculatorInput, ITypeCalculatorOutput> {}
