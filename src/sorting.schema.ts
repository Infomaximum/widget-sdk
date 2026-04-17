import { ESortDirection, ESortingMode, ESortingValueModes, FormulaSchema, type TZod } from ".";
import { SchemaRegistry } from "./schemaRegistry";

export const SortDirectionSchema = SchemaRegistry.define({
  key: "SortDirection",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.union([z.literal(ESortDirection.ascend), z.literal(ESortDirection.descend)]),
  },
});

export const SortOrderSchema = SchemaRegistry.define({
  key: "SortOrder",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        /** Формула сортировки */
        formula: FormulaSchema.forVersion("17")(z),
        /** Тип данных формулы */
        dbDataType: z.string().optional(),
        /** Направление сортировки */
        direction: SortDirectionSchema.forVersion("17")(z),
        /** Условие применения сортировки */
        displayCondition: FormulaSchema.forVersion("17")(z).optional(),
      }),
  },
});

export const WidgetSortingValueSchema = SchemaRegistry.define({
  key: "WidgetSortingValue",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.discriminatedUnion("mode", [
        z.object({
          mode: z.literal(ESortingValueModes.FORMULA),
          formula: FormulaSchema.forVersion("17")(z),
          dbDataType: z.string().optional(),
        }),
        z.object({
          mode: z.literal(ESortingValueModes.IN_WIDGET),
          group: z.string(),
          index: z.number(),
        }),
      ]),
  },
});

export const SortingValueSchema = SchemaRegistry.define({
  key: "SortingValueSchema",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.discriminatedUnion("mode", [
        z.object({
          mode: z.literal(ESortingMode.BY_VALUES),
          direction: SortDirectionSchema(z).default(ESortDirection.ascend),
        }),
        z.object({
          mode: z.literal(ESortingMode.FORMULA),
          direction: SortDirectionSchema(z).default(ESortDirection.ascend),
          formula: FormulaSchema.forVersion("17")(z),
          dbDataType: z.string().optional(),
        }),
      ]),
  },
});
