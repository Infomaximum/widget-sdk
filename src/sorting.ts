import type { EWidgetIndicatorValueModes } from "./indicators";

export enum ESortDirection {
  descend = "DESC",
  ascend = "ASC",
  ASC = "ascend",
  DESC = "descend",
}


export type TSortDirection = ESortDirection.ascend | ESortDirection.descend;


export type TWidgetSortingValueRelatedWidgetMeasure = {
  mode: EWidgetIndicatorValueModes.MEASURE_IN_WIDGET;
  index: number;
};

export type TWidgetSortingValueRelatedWidgetDimension = {
  mode: EWidgetIndicatorValueModes.DIMENSION_IN_WIDGET | EWidgetIndicatorValueModes.HIERARCHY;
  index: number;
};

export type TWidgetSortingValueRelatedWidgetIndicator =
  | TWidgetSortingValueRelatedWidgetMeasure
  | TWidgetSortingValueRelatedWidgetDimension;

export type TWidgetSortingValue =
  | {
      mode: EWidgetIndicatorValueModes.FORMULA | EWidgetIndicatorValueModes.QUANTITY;
      formula: string;
    }
  | TWidgetSortingValueRelatedWidgetIndicator
  | {
      mode: EWidgetIndicatorValueModes.IN_DASHBOARD | EWidgetIndicatorValueModes.IN_WORKSPACE;
      guid: string;
      formula: string;
    };

