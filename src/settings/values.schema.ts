import { EDisplayConditionMode, type TZod } from "..";

export const RangeSchema = (z: TZod) =>
  z.object({
    unit: z.string().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
  });

export const DisplayConditionSchema = (z: TZod) =>
  z
    .discriminatedUnion("mode", [
      z.object({
        mode: z.literal(EDisplayConditionMode.DISABLED),
      }),
      z.object({
        mode: z.literal(EDisplayConditionMode.FORMULA),
        formula: FormulaSchema(z),
      }),
      z.object({
        mode: z.literal(EDisplayConditionMode.VARIABLE),
        variableName: NameNullableSchema(z),
        variableValue: z.string().nullable().default(null),
      }),
    ])
    .default({ mode: EDisplayConditionMode.DISABLED });

/** Схема ключа сущности (с возможностью находиться в неинициализированном состоянии) */
export const KeyNullableSchema = (z: TZod) => z.string().nullable().default(null);

/** Схема имени сущности (с возможностью находиться в неинициализированном состоянии) */
export const NameNullableSchema = (z: TZod) => z.string().nullable().default(null);

/**
 * Схема формулы
 *
 * @note в будущем к схеме будет привязана мета-информация для того,
 * чтобы система видела расположение формул в настройках
 */
export const FormulaSchema = (z: TZod) => z.string().default("");

/**
 * Схема формулы, которая не может быть пустой строкой, но может быть в
 * неинициализированном состоянии null (вместо пустой строки)
 *
 * @note для обратной совместимости без необходимости писать миграции
 */
export const FormulaNullableSchema = (z: TZod) => z.string().nullable().default(null);
