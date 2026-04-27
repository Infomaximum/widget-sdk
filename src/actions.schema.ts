import {
  ColorSchema,
  EActionButtonsTypes,
  EActionTypes,
  EActivateConditionMode,
  EAutoUpdateMode,
  EDataModelOption,
  EDrawerPlacement,
  ESortDirection,
  ESortingMode,
  EViewMode,
  EViewOpenIn,
  EWidgetActionInputMethod,
  FormulaSchema,
  KeyNullableSchema,
  NameNullableSchema,
  SortingValueSchema,
  type TZod,
} from ".";
import { ExtendedFormulaFilterValueSchema } from "./filtration.schema";
import { SchemaRegistry } from "./schemaRegistry";
import { AutoIdentifiedArrayItemSchema } from "./settings/baseWidget.schema";
import { extendWithMeta } from "./utils/schemaMeta";

const ActionOnClickParameterCommonSchema = SchemaRegistry.define({
  key: "ActionOnClickParameterCommon",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      extendWithMeta(AutoIdentifiedArrayItemSchema.forVersion("17")(z), {
        name: z.string(),
      }),
  },
});

export const ParameterFromColumnSchema = SchemaRegistry.define({
  key: "ParameterFromColumn",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        inputMethod: z.literal(EWidgetActionInputMethod.COLUMN),
        tableName: z.string().nullable().default(null),
        columnName: z.string().nullable().default(null),
        dbDataType: z.string().optional(),
      }),
  },
});

export const ParameterFromVariableSchema = SchemaRegistry.define({
  key: "ParameterFromVariable",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        inputMethod: z.literal(EWidgetActionInputMethod.VARIABLE),
        sourceVariable: z.string().nullable().default(null),
      }),
  },
});

export const ParameterFromFormulaSchema = SchemaRegistry.define({
  key: "ParameterFromFormula",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        inputMethod: z.literal(EWidgetActionInputMethod.FORMULA),
        formula: FormulaSchema.forVersion("17")(z),
        considerFilters: z.boolean().default(false),
        dbDataType: z.string().optional(),
      }),
  },
});

export const ParameterFromEventSchema = SchemaRegistry.define({
  key: "ParameterFromEvent",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        inputMethod: z.literal(EWidgetActionInputMethod.EVENT),
      }),
  },
});

export const ParameterFromStartEventSchema = SchemaRegistry.define({
  key: "ParameterFromStartEvent",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        inputMethod: z.literal(EWidgetActionInputMethod.START_EVENT),
      }),
  },
});

export const ParameterFromEndEventSchema = SchemaRegistry.define({
  key: "ParameterFromEndEvent",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        inputMethod: z.literal(EWidgetActionInputMethod.FINISH_EVENT),
      }),
  },
});

export const ParameterFromAggregationSchema = SchemaRegistry.define({
  key: "ParameterFromAggregation",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        inputMethod: z.literal(EWidgetActionInputMethod.AGGREGATION),
        formula: FormulaSchema.forVersion("17")(z),
        considerFilters: z.boolean().default(false),
        dbDataType: z.string().optional(),
      }),
  },
});

export const ParameterFromManualInputSchema = SchemaRegistry.define({
  key: "ParameterFromManualInput",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        inputMethod: z.literal(EWidgetActionInputMethod.MANUALLY),
        description: z.string().default(""),
        defaultValue: FormulaSchema.forVersion("17")(z),
        dbDataType: z.string().optional(),
        filterByRows: z.boolean().default(false),
        validation: FormulaSchema.forVersion("17")(z),
        acceptEmptyValue: z.boolean().default(false),
      }),
  },
});

export const ParameterFromStaticListSchema = SchemaRegistry.define({
  key: "ParameterFromStaticList",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        inputMethod: z.literal(EWidgetActionInputMethod.STATIC_LIST),
        options: z.string().default(""),
        defaultValue: z
          .union([z.string(), z.array(z.string())])
          .nullable()
          .default(null),
        acceptEmptyValue: z.boolean().default(false),
      }),
  },
});

export const ParameterFromDynamicListSchema = SchemaRegistry.define({
  key: "ParameterFromDynamicList",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        inputMethod: z.literal(EWidgetActionInputMethod.DYNAMIC_LIST),
        options: FormulaSchema.forVersion("17")(z),
        defaultValue: FormulaSchema.forVersion("17")(z),
        dbDataType: z.string().optional(),
        displayOptions: FormulaSchema.forVersion("17")(z),
        filters: z.array(ExtendedFormulaFilterValueSchema.forVersion("17")(z)).default([]),
        filterByRows: z.boolean().default(false),
        considerFilters: z.boolean().default(false),
        insertAnyValues: z.boolean().default(false),
        validation: FormulaSchema.forVersion("17")(z),
        acceptEmptyValue: z.boolean().default(false),
        sorting: SortingValueSchema.forVersion("19")(z)
          .default({
            direction: ESortDirection.ascend,
            mode: ESortingMode.BY_VALUES,
          })
          .optional(),
      }),
  },
});

export const ParameterFromDataModelSchema = SchemaRegistry.define({
  key: "ParameterFromDataModel",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.object({
        inputMethod: z.literal(EWidgetActionInputMethod.DATA_MODEL),
        option: z.enum(EDataModelOption).default(EDataModelOption.TABLE_LIST),
        /**
         * Используется только при COLUMN_LIST. Не делаем union по option, чтобы сохранить
         * одновременно default для option и работоспособность внешнего discriminated union.
         */
        parent: NameNullableSchema.forVersion("17")(z),
      }),
  },
});

export const ActionOnClickParameterSchema = SchemaRegistry.define({
  key: "ActionOnClickParameter",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.intersection(
        ActionOnClickParameterCommonSchema.forVersion("17")(z),
        z.discriminatedUnion("inputMethod", [
          ParameterFromColumnSchema.forVersion("17")(z),
          ParameterFromVariableSchema.forVersion("17")(z),
          ParameterFromFormulaSchema.forVersion("17")(z),
          ParameterFromEventSchema.forVersion("17")(z),
          ParameterFromStartEventSchema.forVersion("17")(z),
          ParameterFromEndEventSchema.forVersion("17")(z),
          ParameterFromAggregationSchema.forVersion("17")(z),
          ParameterFromManualInputSchema.forVersion("17")(z),
          ParameterFromStaticListSchema.forVersion("17")(z),
          ParameterFromDynamicListSchema.forVersion("17")(z),
          ParameterFromDataModelSchema.forVersion("17")(z),
        ])
      ),
  },
});

const ActionCommonSchema = SchemaRegistry.define({
  key: "ActionCommon",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      extendWithMeta(AutoIdentifiedArrayItemSchema.forVersion("17")(z), {
        name: z.string(),
      }),
  },
});

export const ActionDrillDownSchema = SchemaRegistry.define({
  key: "ActionDrillDown",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      extendWithMeta(ActionCommonSchema.forVersion("17")(z), {
        type: z.literal(EActionTypes.DRILL_DOWN),
        variables: z.array(ActionOnClickParameterSchema.forVersion("17")(z)).default([]),
      }),
  },
});

export const ActionGoToURLSchema = SchemaRegistry.define({
  key: "ActionGoToURL",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      extendWithMeta(ActionCommonSchema.forVersion("17")(z), {
        type: z.literal(EActionTypes.OPEN_URL),
        url: z.string(),
        newWindow: z.boolean().default(true),
        variables: z.array(ActionOnClickParameterSchema.forVersion("17")(z)).default([]),
      }),
  },
});

const ActivateConditionSchema = SchemaRegistry.define({
  key: "ActivateCondition",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z
        .discriminatedUnion("mode", [
          z.object({
            mode: z.literal(EActivateConditionMode.FORMULA),
            formula: FormulaSchema.forVersion("17")(z),
          }),
          z.object({
            mode: z.literal(EActivateConditionMode.VARIABLE),
            variableName: z.string().nullable().default(null),
            variableValue: z.string().nullable().default(null),
          }),
        ])
        .default({ mode: EActivateConditionMode.FORMULA, formula: "" }),
  },
});

export const ActionRunScriptSchema = SchemaRegistry.define({
  key: "ActionRunScript",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      extendWithMeta(ActionCommonSchema.forVersion("17")(z), {
        type: z.literal(EActionTypes.EXECUTE_SCRIPT),
        parameters: z.array(ActionOnClickParameterSchema.forVersion("17")(z)).default([]),
        scriptKey: z.string(),
        autoUpdate: z.enum(EAutoUpdateMode).default(EAutoUpdateMode.THIS_WIDGET),
        hideInactiveButton: z.boolean().default(false),
        activateCondition: ActivateConditionSchema.forVersion("17")(z),
        hint: z.string().default(""),
        variables: z.array(ActionOnClickParameterSchema.forVersion("17")(z)).default([]),
        runButtonText: z.string().default(""),
      }),
  },
});

export const ActionUpdateVariableSchema = SchemaRegistry.define({
  key: "ActionUpdateVariable",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      extendWithMeta(ActionCommonSchema.forVersion("17")(z), {
        type: z.literal(EActionTypes.UPDATE_VARIABLE),
        variables: z.array(ActionOnClickParameterSchema.forVersion("17")(z)).default([]),
      }),
  },
});

export const ActionOpenInSchema = SchemaRegistry.define({
  key: "ActionOpenIn",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.discriminatedUnion("openIn", [
        z.object({
          openIn: z.literal(EViewOpenIn.DRAWER_WINDOW),
          alignment: z.enum(EDrawerPlacement).default(EDrawerPlacement.RIGHT),
          inheritFilter: z.boolean().default(true),
        }),
        z.object({
          openIn: z.literal(EViewOpenIn.PLACEHOLDER),
          placeholderName: z.string().optional(),
        }),
        z.object({
          openIn: z.literal(EViewOpenIn.MODAL_WINDOW),
          positionByClick: z.boolean().default(false),
          inheritFilter: z.boolean().default(true),
        }),
        z.object({
          openIn: z.literal(EViewOpenIn.WINDOW),
          newWindow: z.boolean().default(true),
          inheritFilter: z.boolean().default(true),
        }),
      ]),
  },
});

const ActionOpenViewCommonSchema = SchemaRegistry.define({
  key: "ActionOpenViewCommon",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      extendWithMeta(ActionCommonSchema.forVersion("17")(z), {
        type: z.literal(EActionTypes.OPEN_VIEW),
        variables: z.array(ActionOnClickParameterSchema.forVersion("17")(z)).default([]),
      }),
  },
});

export const ActionOpenViewSchema = SchemaRegistry.define({
  key: "ActionOpenView",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.intersection(
        z.discriminatedUnion("mode", [
          extendWithMeta(ActionOpenViewCommonSchema.forVersion("17")(z), {
            mode: z.literal(EViewMode.GENERATED_BY_SCRIPT),
            scriptKey: z.string().optional(),
            parameters: z.array(ActionOnClickParameterSchema.forVersion("17")(z)).default([]),
            displayName: z.string().default(""),
          }),
          extendWithMeta(ActionOpenViewCommonSchema.forVersion("17")(z), {
            mode: z.literal(EViewMode.EXISTED_VIEW),
            viewKey: z.string().optional(),
            parameters: z.array(ActionOnClickParameterSchema.forVersion("17")(z)).default([]),
          }),
          extendWithMeta(ActionOpenViewCommonSchema.forVersion("17")(z), {
            mode: z.literal(EViewMode.EMPTY),
            placeholderName: z.string().optional(),
            openIn: z.literal(EViewOpenIn.PLACEHOLDER),
          }),
        ]),
        ActionOpenInSchema.forVersion("17")(z)
      ),
  },
});

export const ActionsOnClickSchema = SchemaRegistry.define({
  key: "ActionsOnClick",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.union([
        ActionGoToURLSchema.forVersion("17")(z),
        ActionRunScriptSchema.forVersion("17")(z),
        ActionUpdateVariableSchema.forVersion("17")(z),
        ActionOpenViewSchema.forVersion("17")(z),
        ActionDrillDownSchema.forVersion("17")(z),
      ]),
  },
});

const WidgetActionParameterCommonSchema = SchemaRegistry.define({
  key: "WidgetActionParameterCommon",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      extendWithMeta(AutoIdentifiedArrayItemSchema.forVersion("17")(z), {
        name: z.string(),
        displayName: z.string().default(""),
        isHidden: z.boolean().default(false),
      }),
  },
});

export const WidgetActionParameterSchema = SchemaRegistry.define({
  key: "WidgetActionParameter",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.intersection(
        WidgetActionParameterCommonSchema.forVersion("17")(z),
        z.discriminatedUnion("inputMethod", [
          ParameterFromColumnSchema.forVersion("17")(z),
          ParameterFromVariableSchema.forVersion("17")(z),
          ParameterFromFormulaSchema.forVersion("17")(z),
          ParameterFromManualInputSchema.forVersion("17")(z),
          ParameterFromStaticListSchema.forVersion("17")(z),
          ParameterFromDynamicListSchema.forVersion("17")(z),
          ParameterFromAggregationSchema.forVersion("17")(z),
          ParameterFromDataModelSchema.forVersion("17")(z),
        ])
      ),
  },
});

export const WidgetActionSchema = SchemaRegistry.define({
  key: "WidgetAction",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      extendWithMeta(ActionCommonSchema.forVersion("17")(z), {
        parameters: z.array(WidgetActionParameterSchema.forVersion("17")(z)).default([]),
        type: z.literal(EActionTypes.EXECUTE_SCRIPT),
        scriptKey: z.string(),
        autoUpdate: z.enum(EAutoUpdateMode).default(EAutoUpdateMode.THIS_WIDGET),
        description: z.string().default(""),
        hideInactiveButton: z.boolean().default(false),
        hint: z.string().default(""),
        activateCondition: ActivateConditionSchema.forVersion("17")(z),
        variables: z.array(WidgetActionParameterSchema.forVersion("17")(z)).default([]),
        runButtonText: z.string().default(""),
      }),
  },
});

export const ViewActionParameterSchema = SchemaRegistry.define({
  key: "ViewActionParameter",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.intersection(
        extendWithMeta(AutoIdentifiedArrayItemSchema.forVersion("17")(z), { name: z.string() }),
        z.discriminatedUnion("inputMethod", [
          ParameterFromAggregationSchema.forVersion("17")(z),
          ParameterFromVariableSchema.forVersion("17")(z),
        ])
      ),
  },
});

export const ViewActionSchema = SchemaRegistry.define({
  key: "ViewAction",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      extendWithMeta(AutoIdentifiedArrayItemSchema.forVersion("17")(z), {
        name: z.string(),
        buttonType: z.enum(EActionButtonsTypes).default(EActionButtonsTypes.BASE),
        type: z.literal(EActionTypes.EXECUTE_SCRIPT).default(EActionTypes.EXECUTE_SCRIPT),
        parameters: z.array(ViewActionParameterSchema.forVersion("17")(z)).default([]),
        scriptKey: KeyNullableSchema.forVersion("17")(z),
        autoUpdate: z
          .union([z.literal(EAutoUpdateMode.NONE), z.literal(EAutoUpdateMode.ALL_VIEWS)])
          .default(EAutoUpdateMode.NONE),
      }),
  },
});

export const ActionSchema = SchemaRegistry.define({
  key: "Action",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      z.union([
        ActionsOnClickSchema.forVersion("17")(z),
        WidgetActionSchema.forVersion("17")(z),
        ViewActionSchema.forVersion("17")(z),
      ]),
  },
});

export const ActionButtonSchema = SchemaRegistry.define({
  key: "ActionButton",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      extendWithMeta(AutoIdentifiedArrayItemSchema.forVersion("17")(z), {
        name: z.string(),
        onClick: z.array(WidgetActionSchema.forVersion("17")(z)).default([]),
        buttonType: z.enum(EActionButtonsTypes).default(EActionButtonsTypes.BASE),
        backgroundColor: ColorSchema.forVersion("17")(z),
        borderColor: ColorSchema.forVersion("17")(z),
        color: ColorSchema.forVersion("17")(z),
        hint: z.string().default(""),
      }),
  },
});
