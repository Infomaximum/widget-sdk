import { FormulaSchema, type TZod } from ".";
import { EColorMode } from "./color";

export const ColorBaseSchema = (z: TZod) =>
  z.object({
    mode: z.literal(EColorMode.BASE),
    value: z.string(),
  });

export const ColorRuleSchema = (z: TZod) =>
  z.object({
    mode: z.literal(EColorMode.RULE),
    formula: FormulaSchema(z),
  });

export const ColorAutoSchema = (z: TZod) =>
  z.object({
    mode: z.literal(EColorMode.AUTO),
  });

export const ColorDisabledSchema = (z: TZod) =>
  z.object({
    mode: z.literal(EColorMode.DISABLED),
  });

export const ColorGradientSchema = (z: TZod) =>
  z.object({
    mode: z.literal(EColorMode.GRADIENT),
    startValue: z.string(),
    endValue: z.string(),
    classCount: z.number().min(3).max(10).nullish(),
  });

export const ColorFormulaSchema = (z: TZod) =>
  z.object({
    mode: z.literal(EColorMode.FORMULA),
    formula: FormulaSchema(z),
  });

export const ColorValuesSchema = (z: TZod) =>
  z.object({
    mode: z.literal(EColorMode.VALUES),
    items: z
      .array(
        z.object({ value: z.string(), color: z.union([ColorBaseSchema(z), ColorRuleSchema(z)]) })
      )
      .default([]),
  });

export const ColorByDimensionSchema = (z: TZod) =>
  z.object({
    mode: z.literal(EColorMode.BY_DIMENSION),
    /** Имя разреза из области видимости правила отображения */
    dimensionName: z.string(),
    items: z
      .array(
        z.object({ value: z.string(), color: z.union([ColorBaseSchema(z), ColorRuleSchema(z)]) })
      )
      .default([]),
  });

export const ColoredValueSchema = (z: TZod) =>
  z.object({
    value: z.string(),
    color: z.union([ColorBaseSchema(z), ColorRuleSchema(z)]),
  });

export const ColorSchema = (z: TZod) =>
  z
    .discriminatedUnion("mode", [
      ColorAutoSchema(z),
      ColorDisabledSchema(z),
      ColorBaseSchema(z),
      ColorRuleSchema(z),
      ColorGradientSchema(z),
      ColorFormulaSchema(z),
      ColorValuesSchema(z),
      ColorByDimensionSchema(z),
    ])
    .default({ mode: EColorMode.AUTO });
