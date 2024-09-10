import type { ISortOrder } from "../../sorting";
import type { TNullable } from "../../utilityTypes";
import type {
  ICalculator,
  ICalculatorDimensionInput,
  ICalculatorDimensionOutput,
  ICalculatorFilter,
  ICalculatorMeasureInput,
  ICalculatorMeasureOutput,
} from "../calculator/calculator";

/** Формат входного параметра GeneralCalculator */
export interface IBaseDimensionsAndMeasuresCalculatorInput {
  /** Разрезы */
  dimensions: ICalculatorDimensionInput[];
  /** Меры */
  measures: ICalculatorMeasureInput[];
  /** Фильтры, использующие WHERE */
  filters: ICalculatorFilter[];
  /** Фильтры, использующие HAVING */
  postFilters?: ICalculatorFilter[];
  /** Лимит мер (будут вычислены первые measuresLimit мер, попавшие под условие отображения) */
  measuresLimit?: number;
  /** Лимит разрезов (будут вычислены первые dimensionsLimit разрезов, попавшие под условие отображения) */
  dimensionsLimit?: number;
  /** Удалять ли строки, в которых значения всех мер пустые */
  isHideEmptyMeasures?: boolean;
  /** Сортировка */
  sortOrders?: ISortOrder[];
  /** Формула условия отображения */
  displayConditionFormula?: TNullable<string>;
}

export interface IBaseDimensionsAndMeasuresCalculatorOutput {
  dimensions: Map<string, ICalculatorDimensionOutput>;
  measures: Map<string, ICalculatorMeasureOutput>;
  isDisplay: boolean;
  isValuesEmpty: boolean;
}

export interface IBaseDimensionsAndMeasuresCalculator<
  Input extends IBaseDimensionsAndMeasuresCalculatorInput,
  Output extends IBaseDimensionsAndMeasuresCalculatorOutput,
> extends ICalculator<Input, Output> {}
