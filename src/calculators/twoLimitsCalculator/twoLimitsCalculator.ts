import type { ISortOrder, TSortDirection } from "../../sorting";
import type { TNullable } from "../../utilityTypes";

import type {
  ICalculator,
  ICalculatorDimensionInput,
  ICalculatorDimensionOutput,
  ICalculatorFilter,
  ICalculatorMeasureInput,
  ICalculatorMeasureOutput,
} from "../calculator";
import type { ICalculatorVariablesValues } from "../variables";

export interface ITwoLimitsCalculatorInput {
  /** Разрезы первой группы*/
  dimensionsFirstGroup: ICalculatorDimensionInput[];
  /** Разрезы второй группы */
  dimensionsSecondGroup: ICalculatorDimensionInput[];
  /** Меры */
  measures: ICalculatorMeasureInput[];
  /** Значения переменных */
  variablesValues?: ICalculatorVariablesValues;
  /** Фильтры, использующие WHERE */
  filters: ICalculatorFilter[];
  /** Фильтры, использующие HAVING */
  postFilters?: ICalculatorFilter[];
  /** Лимит мер (будут вычислены первые measuresLimit мер, попавшие под условие отображения) */
  measuresLimit?: number;
  /** Удалять ли строки, в которых значения всех мер пустые */
  isHideEmptyMeasures?: boolean;
  /**
   * Направления сортировки (в качестве ключа - формула показателя)
   * todo: widgets - удалить вариант с Map, т.к. при сортировке важен порядок элементов,
   * правильнее будет указывать его явно через массив.
   */
  sortOrders?: ISortOrder[] | Map<string, TSortDirection>;
  /** Формула условия отображения */
  displayConditionFormula?: TNullable<string>;
  /** Лимит строк */
  limit?: number;
  /** Второй лимит */
  secondLimit?: number;
}

export interface ITwoLimitsCalculatorOutput {
  dimensions: Map<string, ICalculatorDimensionOutput>;
  measures: Map<string, ICalculatorMeasureOutput>;
  isDisplay: boolean;
  isValuesEmpty: boolean;
}

export interface ITwoLimitsCalculator
  extends ICalculator<ITwoLimitsCalculatorInput, ITwoLimitsCalculatorOutput> {}
