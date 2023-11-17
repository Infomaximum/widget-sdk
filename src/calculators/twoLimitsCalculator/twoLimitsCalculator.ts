import type {
  IBaseDimensionsAndMeasuresCalculator,
  IBaseDimensionsAndMeasuresCalculatorInput,
  IBaseDimensionsAndMeasuresCalculatorOutput,
} from "../baseDimensionsAndMeasuresCalculator/baseDimensionsAndMeasuresCalculator";

export interface ITwoLimitsCalculatorInput
  extends IBaseDimensionsAndMeasuresCalculatorInput {
  /** Лимит строк */
  limit?: number;
  /** Второй лимит */
  secondLimit?: number;
}

export interface ITwoLimitsCalculatorOutput<D = any, M = any>
  extends IBaseDimensionsAndMeasuresCalculatorOutput<D, M> {}

export interface ITwoLimitsCalculator
  extends IBaseDimensionsAndMeasuresCalculator<
    ITwoLimitsCalculatorInput,
    ITwoLimitsCalculatorOutput
  > {}
