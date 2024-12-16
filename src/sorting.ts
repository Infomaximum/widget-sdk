import type { ESimpleDataType } from "./data";
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
  formula: string;
  dataType?: ESimpleDataType;
  direction: TSortDirection;
  displayCondition?: TNullable<string>;
}

export type TWidgetSortingValue =
  | {
      mode: ESortingValueModes.FORMULA;
      formula: string;
      dataType?: ESimpleDataType;
    }
  | {
      mode: ESortingValueModes.IN_WIDGET;
      group: string;
      index: number;
    };
