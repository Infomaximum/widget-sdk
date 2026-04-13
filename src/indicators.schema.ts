import {
  AutoIdentifiedArrayItemSchema,
  WidgetFilterModeSchema,
} from "./settings/baseWidget.schema";
import {
  EEventAppearances,
  EFormatOrFormattingMode,
  EOuterAggregation,
  EWidgetIndicatorValueModes,
} from "./indicators";
import { EMarkdownDisplayMode, EWidgetFilterMode } from "./settings/values";
import {
  EFormattingPresets,
  EFormatTypes,
  EMeasureInnerTemplateNames,
  type TSchemaTypeForVersion,
  type TZod,
} from ".";
import { ActionsOnClickSchema } from "./actions.schema";
import { ExtendedFormulaFilterValueSchema } from "./filtration.schema";
import { SortDirectionSchema, WidgetSortingValueSchema } from "./sorting.schema";
import {
  DisplayConditionSchema,
  FormulaNullableSchema,
  FormulaSchema,
  KeyNullableSchema,
  NameNullableSchema,
} from "./settings/values.schema";
import type { ZodType } from "zod";
import { SchemaRegistry } from "./schemaRegistry";

export const WidgetIndicatorSchema = SchemaRegistry.define({
  key: "WidgetIndicator",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      AutoIdentifiedArrayItemSchema.forVersion("17")(z).extend({
        name: z.string(),
      }),
  },
});

export const FormatSchema = SchemaRegistry.define({
  key: "Format",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z
        .discriminatedUnion("mode", [
          z.object({
            mode: z.literal(EFormatOrFormattingMode.BASE),
            value: z.enum(EFormatTypes).default(EFormatTypes.STRING).optional(),
          }),
          z.object({
            mode: z.literal(EFormatOrFormattingMode.TEMPLATE),
            value: z.string().default("").optional(),
          }),
        ])
        .default({ mode: EFormatOrFormattingMode.BASE, value: EFormatTypes.STRING }),
  },
});

export const FormattingSchema = SchemaRegistry.define({
  key: "Formatting",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z
        .discriminatedUnion("mode", [
          z.object({
            mode: z.literal(EFormatOrFormattingMode.BASE),
            value: z.enum(EFormattingPresets).default(EFormattingPresets.AUTO),
          }),
          z.object({
            mode: z.literal(EFormatOrFormattingMode.TEMPLATE),
            value: z.string().default(""),
          }),
        ])
        .default({ mode: EFormatOrFormattingMode.BASE, value: EFormattingPresets.AUTO }),
  },
});

export const WidgetColumnIndicatorSchema = SchemaRegistry.define({
  key: "WidgetColumnIndicator",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      WidgetIndicatorSchema.forVersion("17")(z).extend({
        dbDataType: z.string().optional(),
        format: FormatSchema.forVersion("17")(z).optional(),
        formatting: FormattingSchema.forVersion("17")(z).optional(),
        displayCondition: DisplayConditionSchema.forVersion("17")(z),
        onClick: z.array(ActionsOnClickSchema.forVersion("17")(z)).default([]).optional(),
      }),
  },
});

export const WidgetIndicatorFormulaValueSchema = SchemaRegistry.define({
  key: "WidgetIndicatorFormulaValue",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        mode: z.literal(EWidgetIndicatorValueModes.FORMULA),
        formula: FormulaSchema.forVersion("17")(z).optional(),
      }),
  },
});

export const WidgetIndicatorTemplateValueSchema = SchemaRegistry.define({
  key: "WidgetIndicatorTemplateValue",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        mode: z.literal(EWidgetIndicatorValueModes.TEMPLATE),
        /** Имя шаблонной формулы, использующей колонку таблицы */
        templateName: z.string().optional(),
        /** Имя таблицы */
        tableName: z.string().optional(),
        /** Имя колонки */
        columnName: z.string().optional(),
      }),
  },
});

export const ColumnIndicatorValueSchema = SchemaRegistry.define({
  key: "ColumnIndicatorValue",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.union([MeasureValueSchema.forVersion("17")(z), DimensionValueSchema.forVersion("17")(z)]),
  },
});

export const MeasureValueSchema = SchemaRegistry.define({
  key: "MeasureValue",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.discriminatedUnion("mode", [
        WidgetIndicatorFormulaValueSchema.forVersion("17")(z),
        WidgetIndicatorTemplateValueSchema.forVersion("17")(z).extend({
          innerTemplateName: z.enum(EMeasureInnerTemplateNames).optional(),
        }),
      ]),
  },
});

export const DimensionValueSchema = SchemaRegistry.define({
  key: "DimensionValue",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.discriminatedUnion("mode", [
        WidgetIndicatorFormulaValueSchema.forVersion("17")(z),
        WidgetIndicatorTemplateValueSchema.forVersion("17")(z).extend({
          innerTemplateName: z.never().optional(),
        }),
      ]),
  },
});

export const WidgetIndicatorAggregationValueSchema = SchemaRegistry.define({
  key: "WidgetIndicatorAggregationValue",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        mode: z.literal(EWidgetIndicatorValueModes.AGGREGATION),
        templateName: z.string(),
        processKey: KeyNullableSchema.forVersion("17")(z),
        eventName: NameNullableSchema.forVersion("17")(z),
        eventNameFormula: FormulaNullableSchema.forVersion("17")(z),
        anyEvent: z.literal(true).optional(),
        caseCaseIdFormula: FormulaNullableSchema.forVersion("17")(z),
        filters: z.array(ExtendedFormulaFilterValueSchema.forVersion("17")(z)).default([]),
        tableName: z.string().optional(),
        columnName: z.string().optional(),
        eventTimeFormula: FormulaNullableSchema.forVersion("17")(z).optional(),
        innerTemplateName: z.string().optional(),
      }),
  },
});

export const WidgetMeasureAggregationValueSchema = SchemaRegistry.define({
  key: "WidgetMeasureAggregationValue",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      WidgetIndicatorAggregationValueSchema.forVersion("17")(z).extend({
        outerAggregation: z.enum(EOuterAggregation),
      }),
  },
});

export const WidgetIndicatorTimeValueSchema = SchemaRegistry.define({
  key: "WidgetIndicatorTimeValue",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        templateName: z.string(),
        mode: z.union([
          z.literal(EWidgetIndicatorValueModes.START_TIME),
          z.literal(EWidgetIndicatorValueModes.END_TIME),
        ]),
        processKey: KeyNullableSchema.forVersion("17")(z),
        eventName: NameNullableSchema.forVersion("17")(z),
        eventTimeFormula: FormulaNullableSchema.forVersion("17")(z),
        caseCaseIdFormula: FormulaNullableSchema.forVersion("17")(z),
        eventNameFormula: FormulaNullableSchema.forVersion("17")(z),
        filters: z.array(ExtendedFormulaFilterValueSchema.forVersion("17")(z)).default([]),
      }),
  },
});

export const WidgetDimensionSchema = SchemaRegistry.define({
  key: "WidgetDimension",
  latestVersion: "19",
  get history() {
    const v17 = (z: TZod) =>
      WidgetColumnIndicatorSchema.forVersion("17")(z).extend({
        value: z
          .discriminatedUnion("mode", [
            DimensionValueSchema.forVersion("17")(z),
            WidgetIndicatorAggregationValueSchema.forVersion("17")(z).extend({
              innerTemplateName: z.string().optional(),
            }),
            WidgetIndicatorTimeValueSchema.forVersion("17")(z),
          ])
          .optional(),
        hideEmptyValues: z.boolean().default(false),
      });

    return {
      "17": v17,
      "19": (z: TZod) =>
        v17(z).extend({
          filterMode: WidgetFilterModeSchema.forVersion("19")(z).default(
            EWidgetFilterMode.INHERITED
          ),
        }),
    };
  },
});

export const WidgetDimensionInHierarchySchema = SchemaRegistry.define({
  key: "WidgetDimensionInHierarchy",
  latestVersion: "19",
  history: {
    "17": (z: TZod) => WidgetDimensionSchema.forVersion("17")(z).omit({ displayCondition: true }),
    "19": (z: TZod) => WidgetDimensionSchema.forVersion("19")(z).omit({ displayCondition: true }),
  },
});

export const WidgetDimensionHierarchySchema = SchemaRegistry.define({
  key: "WidgetDimensionHierarchy",
  latestVersion: "19",
  get history() {
    const buildHierarchy = <D>(z: TZod, dimensionSchema: ZodType<D>) =>
      AutoIdentifiedArrayItemSchema.forVersion("17")(z).extend({
        name: z.string(),
        // Для иерархии является дискриминатором, для него нельзя задавать дефолтное значение.
        hierarchyDimensions: z.array(dimensionSchema),
        displayCondition: DisplayConditionSchema.forVersion("17")(z),
      });

    const forVersionedBuilder = <const V extends "17" | "19">(version: V) =>
      <D extends TSchemaTypeForVersion<typeof WidgetDimensionInHierarchySchema, V>>(
        z: TZod,
        dimensionSchema: ZodType<D>
      ) => buildHierarchy(z, dimensionSchema);

    return {
      "17": forVersionedBuilder("17"),
      "19": forVersionedBuilder("19"),
    };
  },
});

export const WidgetIndicatorConversionValueSchema = SchemaRegistry.define({
  key: "WidgetIndicatorConversionValue",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        mode: z.literal(EWidgetIndicatorValueModes.CONVERSION),

        startEventNameFormula: FormulaNullableSchema.forVersion("17")(z),
        startEventProcessKey: KeyNullableSchema.forVersion("17")(z),
        startEventName: NameNullableSchema.forVersion("17")(z),
        startEventFilters: z
          .array(ExtendedFormulaFilterValueSchema.forVersion("17")(z))
          .default([]),
        startEventTimeFormula: FormulaNullableSchema.forVersion("17")(z),

        endEventNameFormula: FormulaNullableSchema.forVersion("17")(z),
        endEventProcessKey: KeyNullableSchema.forVersion("17")(z),
        endEventName: NameNullableSchema.forVersion("17")(z),
        endEventFilters: z.array(ExtendedFormulaFilterValueSchema.forVersion("17")(z)).default([]),
        endCaseCaseIdFormula: FormulaNullableSchema.forVersion("17")(z),
        endEventTimeFormula: FormulaNullableSchema.forVersion("17")(z),
      }),
  },
});

export const WidgetIndicatorDurationValueSchema = SchemaRegistry.define({
  key: "WidgetIndicatorDurationValue",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      WidgetIndicatorConversionValueSchema.forVersion("17")(z).extend({
        mode: z.literal(EWidgetIndicatorValueModes.DURATION),
        templateName: z.string(),
        startEventAppearances: z.enum(EEventAppearances),
        endEventAppearances: z.enum(EEventAppearances),
      }),
  },
});

export const WidgetMeasureSchema = SchemaRegistry.define({
  key: "WidgetMeasure",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      WidgetColumnIndicatorSchema.forVersion("17")(z).extend({
        value: z
          .discriminatedUnion("mode", [
            MeasureValueSchema.forVersion("17")(z),
            WidgetMeasureAggregationValueSchema.forVersion("17")(z),
            WidgetIndicatorConversionValueSchema.forVersion("17")(z),
            WidgetIndicatorDurationValueSchema.forVersion("17")(z),
          ])
          .optional(),
      }),
  },
});

export const MarkdownMeasureSchema = SchemaRegistry.define({
  key: "MarkdownMeasure",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      WidgetMeasureSchema.forVersion("17")(z).extend({
        displaySign: z.enum(EMarkdownDisplayMode).default(EMarkdownDisplayMode.NONE),
      }),
  },
});

export const WidgetSortingIndicatorSchema = SchemaRegistry.define({
  key: "WidgetSortingIndicator",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      WidgetIndicatorSchema.forVersion("17")(z).extend({
        direction: SortDirectionSchema.forVersion("17")(z),
        value: WidgetSortingValueSchema.forVersion("17")(z),
      }),
  },
});

export const ProcessIndicatorValueSchema = SchemaRegistry.define({
  key: "ProcessIndicatorValue",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.discriminatedUnion("mode", [
        z.object({
          mode: z.literal(EWidgetIndicatorValueModes.FORMULA),
          formula: FormulaSchema.forVersion("17")(z),
        }),
        z.object({
          mode: z.literal(EWidgetIndicatorValueModes.TEMPLATE),
          /** Имя шаблонной формулы, использующей колонку таблицы */
          templateName: z.string(),
        }),
      ]),
  },
});

export const ProcessIndicatorSchema = SchemaRegistry.define({
  key: "ProcessIndicator",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      WidgetIndicatorSchema.forVersion("17")(z).extend({
        value: ProcessIndicatorValueSchema.forVersion("17")(z).optional(),
        dbDataType: z.string().optional(),
        format: FormatSchema.forVersion("17")(z).optional(),
        formatting: FormattingSchema.forVersion("17")(z).optional(),
        displayCondition: DisplayConditionSchema.forVersion("17")(z),
      }),
  },
});
