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
  dimensionAlias: string;
}

export interface IHistogramCalculator
  extends ICalculator<IHistogramCalculatorInput, IHistogramCalculatorOutput> {}
