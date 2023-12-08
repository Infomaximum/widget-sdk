import type { TNullable } from "../../utilityTypes";
import type {
  ICalculator,
  ICalculatorDimensionInput,
  ICalculatorFilter,
} from "../calculator/calculator";
import type { ICalculatorVariablesValues } from "../variables";

export interface IHistogramCalculatorInput {
  /** Разрез */
  dimensions: ICalculatorDimensionInput[];
  /** Лимит корзин */
  binsLimit: number;
  /** Значения переменных */
  variablesValues?: ICalculatorVariablesValues;
  /** Формула условия отображения */
  displayConditionFormula?: TNullable<string>;
  /** Фильтры, использующие WHERE */
  filters: ICalculatorFilter[];
  /** Имя таблицы */
  generalTable?: string;
}

export interface IHistogramBin {
  lowerBound: string;
  upperBound: string;
  height: string;
}

export interface IHistogramCalculatorOutput {
  bins: IHistogramBin[];
  isDisplay: boolean;
}

export interface IHistogramCalculator
  extends ICalculator<IHistogramCalculatorInput, IHistogramCalculatorOutput> {}
