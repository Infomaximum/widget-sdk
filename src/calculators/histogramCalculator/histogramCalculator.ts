import type { TNullable } from "../../utilityTypes";
import type {
  ICalculator,
  ICalculatorDimensionInput,
  ICalculatorFilter,
} from "../calculator/calculator";

export interface IHistogramCalculatorInput {
  /** Разрез */
  dimensions: ICalculatorDimensionInput[];
  /** Лимит корзин */
  binsLimit: number;
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
  dimensionAlias: string;
}

export interface IHistogramCalculator
  extends ICalculator<IHistogramCalculatorInput, IHistogramCalculatorOutput> {}
