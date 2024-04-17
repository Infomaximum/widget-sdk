import type {
  IBaseDimensionsAndMeasuresCalculator,
  IBaseDimensionsAndMeasuresCalculatorInput,
  IBaseDimensionsAndMeasuresCalculatorOutput,
} from "../baseDimensionsAndMeasuresCalculator/baseDimensionsAndMeasuresCalculator";
import type { IExportColumnOrder } from "../calculator/calculator";

export interface IGeneralCalculatorInput extends IBaseDimensionsAndMeasuresCalculatorInput {
  /** Лимит строк */
  limit?: number;
  /** Смещение при выборе строк */
  offset?: number;
  /** Вычислять ли итоговые значения */
  isCalculateTotals?: boolean;
}

export interface IGeneralCalculatorExportInput extends IGeneralCalculatorInput {
  fileName: string;
  columnsOrder: IExportColumnOrder[];
}

export interface IGeneralCalculatorOutput extends IBaseDimensionsAndMeasuresCalculatorOutput {
  // todo: widgets - подумать нужны ли итоги для дополнительных формул
  /** Итоги по мерам */
  totals: Map<string, string>;
}

export interface IGeneralCalculator
  extends IBaseDimensionsAndMeasuresCalculator<IGeneralCalculatorInput, IGeneralCalculatorOutput> {
  export(input: IGeneralCalculatorExportInput): Promise<void>;
}
