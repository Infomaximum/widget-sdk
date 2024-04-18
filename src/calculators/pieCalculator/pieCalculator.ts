import type {
  IBaseDimensionsAndMeasuresCalculator,
  IBaseDimensionsAndMeasuresCalculatorInput,
  IBaseDimensionsAndMeasuresCalculatorOutput,
} from "../baseDimensionsAndMeasuresCalculator/baseDimensionsAndMeasuresCalculator";

export interface IPieCalculatorInput extends IBaseDimensionsAndMeasuresCalculatorInput {
  /** Лимит строк */
  limit?: number;
}

export interface IPieCalculatorOutput extends IBaseDimensionsAndMeasuresCalculatorOutput {
  totals: string;
}

export interface IPieCalculator
  extends IBaseDimensionsAndMeasuresCalculator<IPieCalculatorInput, IPieCalculatorOutput> {}
