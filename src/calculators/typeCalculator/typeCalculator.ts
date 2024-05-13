import type { ESimpleDataType } from "../../data";
import type { ICalculator } from "../calculator";

export interface ITypeCalculatorInput {
  dimensions: {alias: string, formula: string}[];
  measures: {alias: string, formula: string}[];
}

export interface ITypeCalculatorOutput {
  types: Map<string, ESimpleDataType>
}

export interface ITypeCalculator extends ICalculator<ITypeCalculatorInput, ITypeCalculatorOutput> {}
