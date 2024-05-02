import type { ESimpleDataType } from "../../data";
import type { ICalculator } from "../calculator";
import type { ICalculatorVariablesValues } from "../variables";

export interface ITypeCalculatorInput {
  dimensions: {alias: string, formula: string}[];
  measures: {alias: string, formula: string}[];
  variablesValues: ICalculatorVariablesValues;
}

export interface ITypeCalculatorOutput {
  types: Map<string, ESimpleDataType>
}

export interface ITypeCalculator extends ICalculator<ITypeCalculatorInput, ITypeCalculatorOutput> {}
