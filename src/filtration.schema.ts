import {
  EDimensionProcessFilterTimeUnit,
  EDurationUnit,
  EFormatTypes,
  EFormulaFilterFieldKeys,
  ELastTimeUnit,
  EOuterAggregation,
  EWidgetIndicatorValueModes,
  formulaFilterMethods,
  type TZod,
} from ".";
import {
  WidgetIndicatorAggregationValueSchema,
  WidgetIndicatorTimeValueSchema,
} from "./indicators.schema";
import { SchemaRegistry } from "./schemaRegistry";

export const FormulaFilterValueSchema = SchemaRegistry.define({
  key: "FormulaFilterValue",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        name: z.string().nullish(),
        formula: z.string(),
        sliceIndex: z.number().optional(),
        dbDataType: z.string(),
        format: z.union([z.enum(EFormatTypes), z.string()]).optional(),
        filteringMethod: z.enum(Object.values(formulaFilterMethods)),
        checkedValues: z.array(z.string().nullable()).optional(),
        formValues: z
          .object({
            [EFormulaFilterFieldKeys.date]: z.string().nullable(),
            [EFormulaFilterFieldKeys.dateRange]: z.tuple([z.string(), z.string()]),
            [EFormulaFilterFieldKeys.numberRange]: z.tuple([
              z.number().nullable(),
              z.number().nullable(),
            ]),
            [EFormulaFilterFieldKeys.string]: z.string(),
            // todo: отказаться от использования z.string(), оставить только z.number() [BI-15912]
            [EFormulaFilterFieldKeys.lastTimeValue]: z.number().or(z.string()),
            [EFormulaFilterFieldKeys.lastTimeUnit]: z.enum(ELastTimeUnit),
            [EFormulaFilterFieldKeys.durationUnit]: z.enum(EDurationUnit),
          })
          .partial()
          .optional(),
      }),
  },
});

export const ExtendedFormulaFilterValueSchema = SchemaRegistry.define({
  key: "ExtendedFormulaFilterValue",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.union([FormulaFilterValueSchema.forVersion("17")(z), z.object({ formula: z.string() })]),
  },
});

export const DimensionProcessFilterSchema = SchemaRegistry.define({
  key: "DimensionProcessFilter",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        value: z.union([
          WidgetIndicatorAggregationValueSchema.forVersion("17")(z).extend({
            outerAggregation: z.enum(EOuterAggregation),
          }),
          WidgetIndicatorAggregationValueSchema.forVersion("17")(z).extend({
            innerTemplateName: z.string().optional(),
          }),
          WidgetIndicatorTimeValueSchema.forVersion("17")(z),
          z.object({
            mode: z.literal(EWidgetIndicatorValueModes.FORMULA),
            formula: z.string().optional(),
          }),
        ]),
        dbDataType: z.string(),
        condition: z.object({
          filteringMethod: z.enum(Object.values(formulaFilterMethods)),
          timeUnit: z.enum(EDimensionProcessFilterTimeUnit).optional(),
          values: z.array(z.string().nullable()),
        }),
      }),
  },
});

export const SettingsFilterSchema = SchemaRegistry.define({
  key: "SettingsFilter",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.union([
        ExtendedFormulaFilterValueSchema.forVersion("17")(z),
        DimensionProcessFilterSchema.forVersion("17")(z),
      ]),
  },
});
