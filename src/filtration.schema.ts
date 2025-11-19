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

export const FormulaFilterValueSchema = (z: TZod) =>
  z.object({
    name: z.string().nullish(),
    formula: z.string(),
    sliceIndex: z.number().optional(),
    dbDataType: z.string(),
    format: z.enum(EFormatTypes),
    filteringMethod: z.enum(Object.values(formulaFilterMethods)),
    checkedValues: z.array(z.string().nullable()).optional(),
    formValues: z
      .object({
        [EFormulaFilterFieldKeys.date]: z.string().nullable(),
        [EFormulaFilterFieldKeys.dateRange]: z.tuple([z.string(), z.string()]),
        [EFormulaFilterFieldKeys.numberRange]: z.tuple([
          z.number().optional(),
          z.number().optional(),
        ]),
        [EFormulaFilterFieldKeys.string]: z.string(),
        [EFormulaFilterFieldKeys.lastTimeValue]: z.number(),
        [EFormulaFilterFieldKeys.lastTimeUnit]: z.enum(ELastTimeUnit),
        [EFormulaFilterFieldKeys.durationUnit]: z.enum(EDurationUnit),
      })
      .partial()
      .optional(),
  });

export const ExtendedFormulaFilterValueSchema = (z: TZod) =>
  z.union([z.object({ formula: z.string() }).strict(), FormulaFilterValueSchema(z).strict()]);

export const DimensionProcessFilterSchema = (z: TZod) =>
  z.object({
    value: z.union([
      WidgetIndicatorAggregationValueSchema(z)
        .extend({
          outerAggregation: z.enum(EOuterAggregation),
        })
        .strict(),
      WidgetIndicatorAggregationValueSchema(z)
        .extend({
          innerTemplateName: z.string().optional(),
        })
        .strict(),
      WidgetIndicatorTimeValueSchema(z).strict(),
      z
        .object({
          mode: z.literal(EWidgetIndicatorValueModes.FORMULA),
          formula: z.string().optional(),
        })
        .strict(),
    ]),
    dbDataType: z.string(),
    condition: z.object({
      filteringMethod: z.enum(Object.values(formulaFilterMethods)),
      timeUnit: z.enum(EDimensionProcessFilterTimeUnit).optional(),
      values: z.array(z.string().nullable()),
    }),
  });

export const SettingsFilterSchema = (z: TZod) =>
  z.union([ExtendedFormulaFilterValueSchema(z), DimensionProcessFilterSchema(z)]);
