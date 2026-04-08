import { EColorMode, FormulaSchema, type TZod } from "..";
import { SchemaRegistry } from "../schemaRegistry";

export const ColorBaseSchema = SchemaRegistry.define({
  key: "ColorBase",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        mode: z.literal(EColorMode.BASE),
        value: z.string(),
      }),
  },
});

export const ColorRuleSchema = SchemaRegistry.define({
  key: "ColorRule",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        mode: z.literal(EColorMode.RULE),
        formula: FormulaSchema.forVersion("17")(z),
      }),
  },
});

export const ColorAutoSchema = SchemaRegistry.define({
  key: "ColorAuto",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        mode: z.literal(EColorMode.AUTO),
      }),
  },
});

export const ColorDisabledSchema = SchemaRegistry.define({
  key: "ColorDisabled",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        mode: z.literal(EColorMode.DISABLED),
      }),
  },
});

export const ColorGradientSchema = SchemaRegistry.define({
  key: "ColorGradient",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        mode: z.literal(EColorMode.GRADIENT),
        startValue: z.string(),
        endValue: z.string(),
        classCount: z.number().min(3).max(10).nullish(),
      }),
  },
});

export const ColorFormulaSchema = SchemaRegistry.define({
  key: "ColorFormula",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        mode: z.literal(EColorMode.FORMULA),
        formula: FormulaSchema.forVersion("17")(z),
      }),
  },
});

export const ColorValuesSchema = SchemaRegistry.define({
  key: "ColorValues",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        mode: z.literal(EColorMode.VALUES),
        items: z
          .array(
            z.object({
              value: z.string(),
              color: z.union([
                ColorBaseSchema.forVersion("17")(z),
                ColorRuleSchema.forVersion("17")(z),
              ]),
            })
          )
          .default([]),
      }),
  },
});

export const ColorByDimensionSchema = SchemaRegistry.define({
  key: "ColorByDimension",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        mode: z.literal(EColorMode.BY_DIMENSION),
        /** Имя разреза из области видимости правила отображения */
        dimensionName: z.string(),
        items: z
          .array(
            z.object({
              value: z.string(),
              color: z.union([
                ColorBaseSchema.forVersion("17")(z),
                ColorRuleSchema.forVersion("17")(z),
              ]),
            })
          )
          .default([]),
      }),
  },
});

export const ColoredValueSchema = SchemaRegistry.define({
  key: "ColoredValue",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        value: z.string(),
        color: z.union([ColorBaseSchema.forVersion("17")(z), ColorRuleSchema.forVersion("17")(z)]),
      }),
  },
});

export const ColorSchema = SchemaRegistry.define({
  key: "Color",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z
        .discriminatedUnion("mode", [
          ColorAutoSchema.forVersion("17")(z),
          ColorDisabledSchema.forVersion("17")(z),
          ColorBaseSchema.forVersion("17")(z),
          ColorRuleSchema.forVersion("17")(z),
          ColorGradientSchema.forVersion("17")(z),
          ColorFormulaSchema.forVersion("17")(z),
          ColorValuesSchema.forVersion("17")(z),
          ColorByDimensionSchema.forVersion("17")(z),
        ])
        .default({ mode: EColorMode.AUTO }),
  },
});
