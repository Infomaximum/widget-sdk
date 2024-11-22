import type { ICalculator } from "../calculator";

export interface ITypeCalculatorInput {
  dimensions: { alias: string; formula: string }[];
  measures: { alias: string; formula: string }[];
}

export interface ITypeCalculatorOutputItem {
  dbDataType: string;
}

export interface ITypeCalculatorOutput {
  types: Map<string, ITypeCalculatorOutputItem>;
}

export interface ITypeCalculator extends ICalculator<ITypeCalculatorInput, ITypeCalculatorOutput> {}
