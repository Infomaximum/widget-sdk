import type {
  IBaseDimensionsAndMeasuresCalculator,
  IBaseDimensionsAndMeasuresCalculatorInput,
  IBaseDimensionsAndMeasuresCalculatorOutput,
} from "../baseDimensionsAndMeasuresCalculator/baseDimensionsAndMeasuresCalculator";

export interface IGeneralCalculatorInput
  extends IBaseDimensionsAndMeasuresCalculatorInput {
  /** Лимит строк */
  limit?: number;
  /** Смещение при выборе строк */
  offset?: number;
  /** Вычислять ли итоговые значения */
  isCalculateTotals?: boolean;
}

export interface IGeneralCalculatorOutput<D = any, M = any>
  extends IBaseDimensionsAndMeasuresCalculatorOutput<D, M> {
  // todo: widgets - подумать нужны ли итоги для дополнительных формул
  /** Итоги по мерам */
  totals: Map<string, string>;
}

export interface IGeneralCalculator
  extends IBaseDimensionsAndMeasuresCalculator<
    IGeneralCalculatorInput,
    IGeneralCalculatorOutput
  > {}
