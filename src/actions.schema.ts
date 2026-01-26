import {
  ColorSchema,
  EActionButtonsTypes,
  EActionTypes,
  EActivateConditionMode,
  EAutoUpdateMode,
  EDataModelOption,
  EDrawerPlacement,
  EViewMode,
  EViewOpenIn,
  EWidgetActionInputMethod,
  FormulaSchema,
  KeyNullableSchema,
  NameNullableSchema,
  type TZod,
} from ".";
import { ExtendedFormulaFilterValueSchema } from "./filtration.schema";
import { AutoIdentifiedArrayItemSchema } from "./settings/baseWidget.schema";

const ActionOnClickParameterCommonSchema = (z: TZod) =>
  AutoIdentifiedArrayItemSchema(z).extend({
    name: z.string(),
  });

export const ParameterFromColumnSchema = (z: TZod) =>
  z.object({
    inputMethod: z.literal(EWidgetActionInputMethod.COLUMN),
    tableName: z.string().nullable().default(null),
    columnName: z.string().nullable().default(null),
    dbDataType: z.string().optional(),
  });

export const ParameterFromVariableSchema = (z: TZod) =>
  z.object({
    inputMethod: z.literal(EWidgetActionInputMethod.VARIABLE),
    sourceVariable: z.string().nullable().default(null),
  });

export const ParameterFromFormulaSchema = (z: TZod) =>
  z.object({
    inputMethod: z.literal(EWidgetActionInputMethod.FORMULA),
    formula: FormulaSchema(z),
    considerFilters: z.boolean().default(false),
    dbDataType: z.string().optional(),
  });

export const ParameterFromEventSchema = (z: TZod) =>
  z.object({
    inputMethod: z.literal(EWidgetActionInputMethod.EVENT),
  });

export const ParameterFromStartEventSchema = (z: TZod) =>
  z.object({
    inputMethod: z.literal(EWidgetActionInputMethod.START_EVENT),
  });

export const ParameterFromEndEventSchema = (z: TZod) =>
  z.object({
    inputMethod: z.literal(EWidgetActionInputMethod.FINISH_EVENT),
  });

export const ParameterFromAggregationSchema = (z: TZod) =>
  z.object({
    inputMethod: z.literal(EWidgetActionInputMethod.AGGREGATION),
    formula: FormulaSchema(z),
    considerFilters: z.boolean().default(false),
    dbDataType: z.string().optional(),
  });

export const ParameterFromManualInputSchema = (z: TZod) =>
  z.object({
    inputMethod: z.literal(EWidgetActionInputMethod.MANUALLY),
    description: z.string().default(""),
    defaultValue: FormulaSchema(z),
    dbDataType: z.string().optional(),
    filterByRows: z.boolean().default(false),
    validation: FormulaSchema(z),
    acceptEmptyValue: z.boolean().default(false),
  });

export const ParameterFromStaticListSchema = (z: TZod) =>
  z.object({
    inputMethod: z.literal(EWidgetActionInputMethod.STATIC_LIST),
    options: z.string().default(""),
    defaultValue: z
      .union([z.string(), z.array(z.string())])
      .nullable()
      .default(null),
    acceptEmptyValue: z.boolean().default(false),
  });

export const ParameterFromDynamicListSchema = (z: TZod) =>
  z.object({
    inputMethod: z.literal(EWidgetActionInputMethod.DYNAMIC_LIST),
    options: FormulaSchema(z),
    defaultValue: FormulaSchema(z),
    dbDataType: z.string().optional(),
    displayOptions: FormulaSchema(z),
    filters: z.array(ExtendedFormulaFilterValueSchema(z)).default([]),
    filterByRows: z.boolean().default(false),
    considerFilters: z.boolean().default(false),
    insertAnyValues: z.boolean().default(false),
    validation: FormulaSchema(z),
    acceptEmptyValue: z.boolean().default(false),
  });

export const ParameterFromDataModelSchema = (z: TZod) =>
  z.object({
    inputMethod: z.literal(EWidgetActionInputMethod.DATA_MODEL),
    option: z.enum(EDataModelOption).default(EDataModelOption.TABLE_LIST),
    /**
     * Используется только при COLUMN_LIST. Не делаем union по option, чтобы сохранить
     * одновременно default для option и работоспособность внешнего discriminated union.
     */
    parent: NameNullableSchema(z),
  });

export const ActionOnClickParameterSchema = (z: TZod) =>
  z.intersection(
    ActionOnClickParameterCommonSchema(z),
    z.discriminatedUnion("inputMethod", [
      ParameterFromColumnSchema(z),
      ParameterFromVariableSchema(z),
      ParameterFromFormulaSchema(z),
      ParameterFromEventSchema(z),
      ParameterFromStartEventSchema(z),
      ParameterFromEndEventSchema(z),
      ParameterFromAggregationSchema(z),
      ParameterFromManualInputSchema(z),
      ParameterFromStaticListSchema(z),
      ParameterFromDynamicListSchema(z),
      ParameterFromDataModelSchema(z),
    ])
  );

const ActionCommonSchema = (z: TZod) =>
  AutoIdentifiedArrayItemSchema(z).extend({
    name: z.string(),
  });

export const ActionDrillDownSchema = (z: TZod) =>
  ActionCommonSchema(z).extend({
    type: z.literal(EActionTypes.DRILL_DOWN),
    variables: z.array(ActionOnClickParameterSchema(z)).default([]),
  });

export const ActionGoToURLSchema = (z: TZod) =>
  ActionCommonSchema(z).extend({
    type: z.literal(EActionTypes.OPEN_URL),
    url: z.string(),
    newWindow: z.boolean().default(true),
    variables: z.array(ActionOnClickParameterSchema(z)).default([]),
  });

const ActivateConditionSchema = (z: TZod) =>
  z
    .discriminatedUnion("mode", [
      z.object({
        mode: z.literal(EActivateConditionMode.FORMULA),
        formula: FormulaSchema(z),
      }),
      z.object({
        mode: z.literal(EActivateConditionMode.VARIABLE),
        variableName: z.string().nullable().default(null),
        variableValue: z.string().nullable().default(null),
      }),
    ])
    .default({ mode: EActivateConditionMode.FORMULA, formula: "" });

export const ActionRunScriptSchema = (z: TZod) =>
  ActionCommonSchema(z).extend({
    type: z.literal(EActionTypes.EXECUTE_SCRIPT),
    parameters: z.array(ActionOnClickParameterSchema(z)).default([]),
    scriptKey: z.string(),
    autoUpdate: z.enum(EAutoUpdateMode).default(EAutoUpdateMode.THIS_WIDGET),
    hideInactiveButton: z.boolean().default(false),
    activateCondition: ActivateConditionSchema(z),
    hint: z.string().default(""),
    variables: z.array(ActionOnClickParameterSchema(z)).default([]),
  });

export const ActionUpdateVariableSchema = (z: TZod) =>
  ActionCommonSchema(z).extend({
    type: z.literal(EActionTypes.UPDATE_VARIABLE),
    variables: z.array(ActionOnClickParameterSchema(z)).default([]),
  });

export const ActionOpenInSchema = (z: TZod) =>
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
  ]);

const ActionOpenViewCommonSchema = (z: TZod) =>
  ActionCommonSchema(z).extend({
    type: z.literal(EActionTypes.OPEN_VIEW),
    variables: z.array(ActionOnClickParameterSchema(z)).default([]),
  });

export const ActionOpenViewSchema = (z: TZod) =>
  z.intersection(
    z.discriminatedUnion("mode", [
      ActionOpenViewCommonSchema(z).extend({
        mode: z.literal(EViewMode.GENERATED_BY_SCRIPT),
        scriptKey: z.string().optional(),
        parameters: z.array(ActionOnClickParameterSchema(z)).default([]),
        displayName: z.string().default(""),
      }),
      ActionOpenViewCommonSchema(z).extend({
        mode: z.literal(EViewMode.EXISTED_VIEW),
        viewKey: z.string().optional(),
        parameters: z.array(ActionOnClickParameterSchema(z)).default([]),
      }),
      ActionOpenViewCommonSchema(z).extend({
        mode: z.literal(EViewMode.EMPTY),
        placeholderName: z.string().optional(),
        openIn: z.literal(EViewOpenIn.PLACEHOLDER),
      }),
    ]),
    ActionOpenInSchema(z)
  );

export const ActionsOnClickSchema = (z: TZod) =>
  z.union([
    ActionGoToURLSchema(z),
    ActionRunScriptSchema(z),
    ActionUpdateVariableSchema(z),
    ActionOpenViewSchema(z),
    ActionDrillDownSchema(z),
  ]);

const WidgetActionParameterCommonSchema = (z: TZod) =>
  AutoIdentifiedArrayItemSchema(z).extend({
    name: z.string(),
    displayName: z.string().default(""),
    isHidden: z.boolean().default(false),
  });

export const WidgetActionParameterSchema = (z: TZod) =>
  z.intersection(
    WidgetActionParameterCommonSchema(z),
    z.discriminatedUnion("inputMethod", [
      ParameterFromColumnSchema(z),
      ParameterFromVariableSchema(z),
      ParameterFromFormulaSchema(z),
      ParameterFromManualInputSchema(z),
      ParameterFromStaticListSchema(z),
      ParameterFromDynamicListSchema(z),
      ParameterFromAggregationSchema(z),
      ParameterFromDataModelSchema(z),
    ])
  );

export const WidgetActionSchema = (z: TZod) =>
  ActionCommonSchema(z).extend({
    parameters: z.array(WidgetActionParameterSchema(z)).default([]),
    type: z.literal(EActionTypes.EXECUTE_SCRIPT),
    scriptKey: z.string(),
    autoUpdate: z.enum(EAutoUpdateMode).default(EAutoUpdateMode.THIS_WIDGET),
    description: z.string().default(""),
    hideInactiveButton: z.boolean().default(false),
    hint: z.string().default(""),
    activateCondition: ActivateConditionSchema(z),
    variables: z.array(WidgetActionParameterSchema(z)).default([]),
  });

export const ViewActionParameterSchema = (z: TZod) =>
  z.intersection(
    AutoIdentifiedArrayItemSchema(z).extend({ name: z.string() }),
    z.discriminatedUnion("inputMethod", [
      ParameterFromAggregationSchema(z),
      ParameterFromVariableSchema(z),
    ])
  );

export const ViewActionSchema = (z: TZod) =>
  AutoIdentifiedArrayItemSchema(z).extend({
    name: z.string(),
    buttonType: z.enum(EActionButtonsTypes).default(EActionButtonsTypes.BASE),
    type: z.literal(EActionTypes.EXECUTE_SCRIPT).default(EActionTypes.EXECUTE_SCRIPT),
    parameters: z.array(ViewActionParameterSchema(z)).default([]),
    scriptKey: KeyNullableSchema(z),
    autoUpdate: z
      .union([z.literal(EAutoUpdateMode.NONE), z.literal(EAutoUpdateMode.ALL_VIEWS)])
      .default(EAutoUpdateMode.NONE),
  });

export const ActionSchema = (z: TZod) =>
  z.union([ActionsOnClickSchema(z), WidgetActionSchema(z), ViewActionSchema(z)]);

export const ActionButtonSchema = (z: TZod) =>
  AutoIdentifiedArrayItemSchema(z).extend({
    name: z.string(),
    onClick: z.array(WidgetActionSchema(z)).default([]),
    buttonType: z.enum(EActionButtonsTypes).default(EActionButtonsTypes.BASE),
    backgroundColor: ColorSchema(z),
    borderColor: ColorSchema(z),
    color: ColorSchema(z),
    hint: z.string().default(""),
  });
