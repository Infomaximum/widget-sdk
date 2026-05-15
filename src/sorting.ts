import type { TSchemaType } from ".";
import type {
  SortDirectionSchema,
  SortingValueSchema,
  SortOrderSchema,
  WidgetSortingValueSchema,
} from "./sorting.schema";
import { VersionedEnum } from "./versionedEnum";

export const ESortDirection = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      descend: "DESC",
      ascend: "ASC",
      ASC: "ascend",
      DESC: "descend",
    } as const,
  },
});

export type TSortDirectionEnum = Extract<
  (typeof ESortDirection)[keyof typeof ESortDirection],
  string
>;

export const ESortingMode = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      BY_VALUES: "BY_VALUES",
      FORMULA: "FORMULA",
    } as const,
  },
});

export type TSortingMode = Extract<(typeof ESortingMode)[keyof typeof ESortingMode], string>;

export type TSortDirection = TSchemaType<typeof SortDirectionSchema>;
export type TWidgetSortingValue = TSchemaType<typeof WidgetSortingValueSchema>;
export interface ISortOrder extends TSchemaType<typeof SortOrderSchema> {}
export type TSortingValue = TSchemaType<typeof SortingValueSchema>;
