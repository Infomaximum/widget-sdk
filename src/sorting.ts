import type { TSchemaType } from ".";
import type {
  SortDirectionSchema,
  SortOrderSchema,
  WidgetSortingValueSchema,
} from "./sorting.schema";

export enum ESortDirection {
  descend = "DESC",
  ascend = "ASC",
  ASC = "ascend",
  DESC = "descend",
}

export type TSortDirection = TSchemaType<typeof SortDirectionSchema>;
export type TWidgetSortingValue = TSchemaType<typeof WidgetSortingValueSchema>;
export interface ISortOrder extends TSchemaType<typeof SortOrderSchema> {}
