import type {
  IBaseDimensionsAndMeasuresCalculator,
  IBaseDimensionsAndMeasuresCalculatorInput,
  IBaseDimensionsAndMeasuresCalculatorOutput,
} from "../baseDimensionsAndMeasuresCalculator/baseDimensionsAndMeasuresCalculator";

export interface IPieCalculatorInput
  extends IBaseDimensionsAndMeasuresCalculatorInput {
  /** Лимит строк */
  limit?: number;
}

export interface IPieCalculatorOutput<D = any, M = any>
  extends IBaseDimensionsAndMeasuresCalculatorOutput<D, M> {
  totals: string;
}

export interface IPieCalculator
  extends IBaseDimensionsAndMeasuresCalculator<
    IPieCalculatorInput,
    IPieCalculatorOutput
  > {}
