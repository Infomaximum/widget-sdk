import { EDisplayConditionMode, type TZod } from "..";
import { SchemaRegistry } from "../schemaRegistry";
import { ESettingsSchemaMetaKey } from "./const";

export const RangeSchema = SchemaRegistry.define({
  key: "Range",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        unit: z.string().optional(),
        min: z.number().optional(),
        max: z.number().optional(),
      }),
  },
});

export const DisplayConditionSchema = SchemaRegistry.define({
  key: "DisplayCondition",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z
        .discriminatedUnion("mode", [
          z.object({
            mode: z.literal(EDisplayConditionMode.DISABLED),
          }),
          z.object({
            mode: z.literal(EDisplayConditionMode.FORMULA),
            formula: FormulaSchema.forVersion("17")(z),
          }),
          z.object({
            mode: z.literal(EDisplayConditionMode.VARIABLE),
            variableName: NameNullableSchema.forVersion("17")(z),
            variableValue: z.string().nullable().default(null),
          }),
        ])
        .default({ mode: EDisplayConditionMode.DISABLED }),
  },
});

/** Схема ключа сущности (с возможностью находиться в неинициализированном состоянии) */
export const KeyNullableSchema = SchemaRegistry.define({
  key: "KeyNullable",
  latestVersion: "17",
  history: {
    "17": (z: TZod) => z.string().nullable().default(null),
  },
});

/** Схема имени сущности (с возможностью находиться в неинициализированном состоянии) */
export const NameNullableSchema = SchemaRegistry.define({
  key: "NameNullable",
  latestVersion: "17",
  history: {
    "17": (z: TZod) => z.string().nullable().default(null),
  },
});

/** Схема формулы */
export const FormulaSchema = SchemaRegistry.define({
  key: "Formula",
  latestVersion: "17",
  history: {
    "17": (z: TZod) => z.string().default(""),
  },
});

/**
 * Схема формулы, которая не может быть пустой строкой, но может быть в
 * неинициализированном состоянии null (вместо пустой строки)
 *
 * @note для обратной совместимости без необходимости писать миграции
 */
export const FormulaNullableSchema = SchemaRegistry.define({
  key: "FormulaNullable",
  latestVersion: "17",
  history: {
    "17": (z: TZod) => FormulaSchema.forVersion("17")(z).nullable().default(null),
  },
});
