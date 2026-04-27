import type { TSchemaType } from ".";
import type {
  SortDirectionSchema,
  SortingValueSchema,
  SortOrderSchema,
  WidgetSortingValueSchema,
} from "./sorting.schema";

export enum ESortDirection {
  descend = "DESC",
  ascend = "ASC",
  ASC = "ascend",
  DESC = "descend",
}

export enum ESortingMode {
  BY_VALUES = "BY_VALUES",
  FORMULA = "FORMULA",
}

export type TSortDirection = TSchemaType<typeof SortDirectionSchema>;
export type TWidgetSortingValue = TSchemaType<typeof WidgetSortingValueSchema>;
export interface ISortOrder extends TSchemaType<typeof SortOrderSchema> {}
export type TSortingValue = TSchemaType<typeof SortingValueSchema>;
