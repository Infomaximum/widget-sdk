import { ESortDirection, ESortingValueModes, type TZod } from ".";

export const SortDirectionSchema = (z: TZod) =>
  z.union([z.literal(ESortDirection.ascend), z.literal(ESortDirection.descend)]);

export const SortOrderSchema = (z: TZod) =>
  z.object({
    /** Формула сортировки */
    formula: z.string(),
    /** Тип данных формулы */
    dbDataType: z.string().nullish(),
    /** Направление сортировки */
    direction: SortDirectionSchema(z),
    /** Условие применения сортировки */
    displayCondition: z.string().nullish(),
  });

export const WidgetSortingValueSchema = (z: TZod) =>
  z.discriminatedUnion("mode", [
    z.object({
      mode: z.literal(ESortingValueModes.FORMULA),
      formula: z.string(),
      dbDataType: z.string(),
    }),
    z.object({
      mode: z.literal(ESortingValueModes.IN_WIDGET),
      group: z.string(),
      index: z.number(),
    }),
  ]);
