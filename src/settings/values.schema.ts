import { EDisplayConditionMode, type TZod } from "..";
import { ESettingsSchemaMetaKey } from "./const";

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
 * Перечисление системных типов сущностей в схеме настроек виджетов.
 * @note при расширении лучше положить на более общий уровень.
 */
enum EEntity {
  formula = "formula",
}

const formulaMeta = Object.freeze({ [ESettingsSchemaMetaKey.entity]: EEntity.formula });

/** Схема формулы */
export const FormulaSchema = (z: TZod) => z.string().default("").meta(formulaMeta);

/**
 * Схема формулы, которая не может быть пустой строкой, но может быть в
 * неинициализированном состоянии null (вместо пустой строки)
 *
 * @note для обратной совместимости без необходимости писать миграции
 */
export const FormulaNullableSchema = (z: TZod) =>
  z.string().nullable().default(null).meta(formulaMeta);
