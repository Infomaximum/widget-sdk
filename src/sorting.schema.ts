import { ESortDirection, ESortingValueModes, FormulaSchema, type TZod } from ".";

export const SortDirectionSchema = (z: TZod) =>
  z.union([z.literal(ESortDirection.ascend), z.literal(ESortDirection.descend)]);

export const SortOrderSchema = (z: TZod) =>
  z.object({
    /** Формула сортировки */
    formula: FormulaSchema(z),
    /** Тип данных формулы */
    dbDataType: z.string().optional(),
    /** Направление сортировки */
    direction: SortDirectionSchema(z),
    /** Условие применения сортировки */
    displayCondition: FormulaSchema(z).optional(),
  });

export const WidgetSortingValueSchema = (z: TZod) =>
  z.discriminatedUnion("mode", [
    z.object({
      mode: z.literal(ESortingValueModes.FORMULA),
      formula: FormulaSchema(z),
      dbDataType: z.string().optional(),
    }),
    z.object({
      mode: z.literal(ESortingValueModes.IN_WIDGET),
      group: z.string(),
      index: z.number(),
    }),
  ]);
