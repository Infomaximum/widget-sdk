import { AutoIdentifiedArrayItemSchema } from "./settings/baseWidget.schema";
import { EFormattingPresets, EFormatTypes } from "./formatting";
import {
  EEventAppearances,
  EFormatOrFormattingMode,
  EOuterAggregation,
  EWidgetIndicatorValueModes,
} from "./indicators";
import { EDisplayConditionMode, EMarkdownDisplayMode } from "./settings/values";
import { EMeasureInnerTemplateNames, type TSchemaType, type TZod } from ".";
import { ActionsOnClickSchema } from "./actions.schema";
import { ExtendedFormulaFilterValueSchema } from "./filtration.schema";
import { SortDirectionSchema, WidgetSortingValueSchema } from "./sorting.schema";
import { DisplayConditionSchema } from "./settings/values.schema";
import type { ZodType } from "zod";

export const WidgetIndicatorSchema = (z: TZod) =>
  AutoIdentifiedArrayItemSchema(z).extend({
    name: z.string(),
  });

export const FormatSchema = (z: TZod) =>
  z.object({
    value: z.enum(EFormatTypes).optional(),
    mode: z.enum(EFormatOrFormattingMode).default(EFormatOrFormattingMode.BASE),
  });

export const FormattingSchema = (z: TZod) =>
  z.object({
    value: z.enum(EFormattingPresets).optional(),
    mode: z.enum(EFormatOrFormattingMode),
  });

export const WidgetColumnIndicatorSchema = (z: TZod) =>
  WidgetIndicatorSchema(z).extend({
    dbDataType: z.string().optional(),
    format: FormatSchema(z).optional(),
    formatting: FormattingSchema(z).optional(),
    displayCondition: DisplayConditionSchema(z).default({ mode: EDisplayConditionMode.DISABLED }),
    onClick: z.array(ActionsOnClickSchema(z)).optional(),
  });

export const WidgetIndicatorFormulaValueSchema = (z: TZod) =>
  z.object({
    mode: z.literal(EWidgetIndicatorValueModes.FORMULA),
    formula: z.string().optional(),
  });

export const WidgetIndicatorTemplateValueSchema = (z: TZod) =>
  z.object({
    mode: z.literal(EWidgetIndicatorValueModes.TEMPLATE),
    /** Имя шаблонной формулы, использующей колонку таблицы */
    templateName: z.string().optional(),
    /** Имя таблицы */
    tableName: z.string().optional(),
    /** Имя колонки */
    columnName: z.string().optional(),
  });

export const ColumnIndicatorValueSchema = (z: TZod) =>
  z.union([MeasureValueSchema(z), DimensionValueSchema(z)]);

export const MeasureValueSchema = (z: TZod) =>
  z.discriminatedUnion("mode", [
    WidgetIndicatorFormulaValueSchema(z),
    WidgetIndicatorTemplateValueSchema(z).extend({
      innerTemplateName: z.enum(EMeasureInnerTemplateNames).optional(),
    }),
  ]);

export const DimensionValueSchema = (z: TZod) =>
  z.discriminatedUnion("mode", [
    WidgetIndicatorFormulaValueSchema(z),
    WidgetIndicatorTemplateValueSchema(z).extend({
      innerTemplateName: z.never().optional(),
    }),
  ]);

export const WidgetIndicatorAggregationValueSchema = (z: TZod) =>
  z.object({
    mode: z.literal(EWidgetIndicatorValueModes.AGGREGATION),
    templateName: z.string(),
    processKey: z.string().nullable(),
    eventName: z.string().nullable(),
    eventNameFormula: z.string().nullable(),
    anyEvent: z.literal(true).optional(),
    caseCaseIdFormula: z.string().nullable(),
    filters: z.array(ExtendedFormulaFilterValueSchema(z)),
    tableName: z.string().optional(),
    columnName: z.string().optional(),
    eventTimeFormula: z.string().nullable().optional(),
  });

export const WidgetIndicatorTimeValueSchema = (z: TZod) =>
  z.object({
    templateName: z.string(),
    mode: z.union([
      z.literal(EWidgetIndicatorValueModes.START_TIME),
      z.literal(EWidgetIndicatorValueModes.END_TIME),
    ]),
    processKey: z.string().nullable(),
    eventName: z.string().nullable(),
    eventTimeFormula: z.string().nullable(),
    caseCaseIdFormula: z.string().nullable(),
    eventNameFormula: z.string().nullable(),
    filters: z.array(ExtendedFormulaFilterValueSchema(z)),
  });

export const WidgetDimensionSchema = (z: TZod) =>
  WidgetColumnIndicatorSchema(z).extend({
    value: z
      .discriminatedUnion("mode", [
        DimensionValueSchema(z),
        WidgetIndicatorAggregationValueSchema(z).extend({
          innerTemplateName: z.string().optional(),
        }),
        WidgetIndicatorTimeValueSchema(z),
      ])
      .optional(),
    hideEmptyValues: z.boolean().default(false),
  });

export const WidgetDimensionHierarchySchema = <D extends TSchemaType<typeof WidgetDimensionSchema>>(
  z: TZod,
  dimensionSchema: ZodType<D>
) =>
  AutoIdentifiedArrayItemSchema(z).extend({
    name: z.string(),
    hierarchyDimensions: z.array(dimensionSchema).default([]),
    displayCondition: DisplayConditionSchema(z).default({ mode: EDisplayConditionMode.DISABLED }),
  });

export const WidgetIndicatorConversionValue = (z: TZod) =>
  z.object({
    mode: z.literal(EWidgetIndicatorValueModes.CONVERSION),

    startEventNameFormula: z.string().nullable(),
    startEventProcessKey: z.string().nullable(),
    startEventName: z.string().nullable(),
    startEventFilters: z.array(ExtendedFormulaFilterValueSchema(z)),
    startEventTimeFormula: z.string().nullable(),

    endEventNameFormula: z.string().nullable(),
    endEventProcessKey: z.string().nullable(),
    endEventName: z.string().nullable(),
    endEventFilters: z.array(ExtendedFormulaFilterValueSchema(z)),
    endCaseCaseIdFormula: z.string().nullable(),
    endEventTimeFormula: z.string().nullable(),
  });

export const WidgetIndicatorDurationValue = (z: TZod) =>
  WidgetIndicatorConversionValue(z).extend({
    mode: z.literal(EWidgetIndicatorValueModes.DURATION),
    templateName: z.string(),
    startEventAppearances: z.enum(EEventAppearances),
    endEventAppearances: z.enum(EEventAppearances),
  });

export const WidgetMeasureSchema = (z: TZod) =>
  WidgetColumnIndicatorSchema(z).extend({
    value: z
      .discriminatedUnion("mode", [
        MeasureValueSchema(z),
        WidgetIndicatorAggregationValueSchema(z).extend({
          outerAggregation: z.enum(EOuterAggregation),
        }),
        WidgetIndicatorConversionValue(z),
        WidgetIndicatorDurationValue(z),
      ])
      .optional(),
  });

export const MarkdownMeasureSchema = (z: TZod) =>
  WidgetMeasureSchema(z).extend({
    displaySign: z.enum(EMarkdownDisplayMode).default(EMarkdownDisplayMode.NONE),
  });

export const WidgetSortingIndicatorSchema = (z: TZod) =>
  WidgetIndicatorSchema(z).extend({
    direction: SortDirectionSchema(z),
    value: WidgetSortingValueSchema(z),
  });

export const ProcessIndicatorValueSchema = (z: TZod) =>
  z.discriminatedUnion("mode", [
    z.object({
      mode: z.literal(EWidgetIndicatorValueModes.FORMULA),
      formula: z.string(),
    }),
    z.object({
      mode: z.literal(EWidgetIndicatorValueModes.TEMPLATE),
      /** Имя шаблонной формулы, использующей колонку таблицы */
      templateName: z.string(),
    }),
  ]);

export const ProcessIndicatorSchema = (z: TZod) =>
  WidgetIndicatorSchema(z).extend({
    value: ProcessIndicatorValueSchema(z).optional(),
    dbDataType: z.string().optional(),
    format: FormatSchema(z).optional(),
    formatting: FormattingSchema(z).optional(),
    displayCondition: DisplayConditionSchema(z).default({ mode: EDisplayConditionMode.DISABLED }),
  });
