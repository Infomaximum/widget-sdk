import type { ESortingValueModes } from "./indicators";
import type { TNullable } from "./utilityTypes";

export enum ESortDirection {
  descend = "DESC",
  ascend = "ASC",
  ASC = "ascend",
  DESC = "descend",
}

export type TSortDirection = ESortDirection.ascend | ESortDirection.descend;

export interface ISortOrder {
  /** Формула сортировки */
  formula: string;
  /** Тип данных формулы */
  dbDataType: TNullable<string>;
  /** Направление сортировки */
  direction: TSortDirection;
  /** Условие применения сортировки */
  displayCondition?: TNullable<string>;
}

export type TWidgetSortingValue =
  | {
      mode: ESortingValueModes.FORMULA;
      formula: string;
      dbDataType: string;
    }
  | {
      mode: ESortingValueModes.IN_WIDGET;
      group: string;
      index: number;
    };
