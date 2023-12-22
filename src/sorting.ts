import type { ESortingValueModes } from "./indicators";

export enum ESortDirection {
  descend = "DESC",
  ascend = "ASC",
  ASC = "ascend",
  DESC = "descend",
}

export type TSortDirection = ESortDirection.ascend | ESortDirection.descend;

export interface ISortOrder {
  formula: string;
  direction: TSortDirection;
}

export type TWidgetSortingValueRelatedWidgetMeasure = {
  mode: ESortingValueModes.MEASURE_IN_WIDGET;
  index: number;
};

export type TWidgetSortingValueRelatedWidgetDimension = {
  mode: ESortingValueModes.DIMENSION_IN_WIDGET | ESortingValueModes.HIERARCHY;
  index: number;
};

export type TWidgetSortingValueRelatedWidgetIndicator =
  | TWidgetSortingValueRelatedWidgetMeasure
  | TWidgetSortingValueRelatedWidgetDimension;

export type TWidgetSortingValue =
  | {
      mode: ESortingValueModes.FORMULA | ESortingValueModes.QUANTITY;
      formula: string;
    }
  | TWidgetSortingValueRelatedWidgetIndicator
  | {
      mode: ESortingValueModes.IN_DASHBOARD | ESortingValueModes.IN_WORKSPACE;
      guid: string;
      formula: string;
    };
