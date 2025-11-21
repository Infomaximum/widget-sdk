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
    tableName: z.string(),
    columnName: z.string(),
    dbDataType: z.string().optional(),
  });

export const ParameterFromVariableSchema = (z: TZod) =>
  z.object({
    inputMethod: z.literal(EWidgetActionInputMethod.VARIABLE),
    sourceVariable: z.string(),
  });

export const ParameterFromFormulaSchema = (z: TZod) =>
  z.object({
    inputMethod: z.literal(EWidgetActionInputMethod.FORMULA),
    formula: z.string(),
    considerFilters: z.boolean(),
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
    formula: z.string(),
    considerFilters: z.boolean(),
    dbDataType: z.string().optional(),
  });

export const ParameterFromManualInputSchema = (z: TZod) =>
  z.object({
    inputMethod: z.literal(EWidgetActionInputMethod.MANUALLY),
    description: z.string(),
    defaultValue: z.string().optional(),
    dbDataType: z.string().optional(),
    filterByRows: z.boolean().optional(),
    validation: z.string().optional(),
    acceptEmptyValue: z.boolean().optional(),
  });

export const ParameterFromStaticListSchema = (z: TZod) =>
  z.object({
    inputMethod: z.literal(EWidgetActionInputMethod.STATIC_LIST),
    options: z.string().default(""),
    defaultValue: z.union([z.string(), z.array(z.string())]).default(""),
    acceptEmptyValue: z.boolean().optional(),
  });

export const ParameterFromDynamicListSchema = (z: TZod) =>
  z.object({
    inputMethod: z.literal(EWidgetActionInputMethod.DYNAMIC_LIST),
    options: z.string(),
    defaultValue: z.string(),
    dbDataType: z.string().optional(),
    displayOptions: z.string(),
    filters: z.array(ExtendedFormulaFilterValueSchema(z)),
    filterByRows: z.boolean().optional(),
    considerFilters: z.boolean(),
    insertAnyValues: z.boolean().optional(),
    validation: z.string().optional(),
    acceptEmptyValue: z.boolean().optional(),
  });

const ParameterFromDataModelBaseSchema = (z: TZod) =>
  z.object({
    inputMethod: z.literal(EWidgetActionInputMethod.DATA_MODEL),
    option: z.enum(EDataModelOption),
  });

export const ParameterColumnListSchema = (z: TZod) =>
  ParameterFromDataModelBaseSchema(z).extend({
    option: z.literal(EDataModelOption.COLUMN_LIST),
    /* Название параметра, содержащего имя таблицы, от которой зависит текущий параметр   */
    parent: z.string(),
  });

export const ParameterTableListSchema = (z: TZod) =>
  ParameterFromDataModelBaseSchema(z).extend({
    option: z.literal(EDataModelOption.TABLE_LIST),
  });

const ParameterFromDataModelSchema = (z: TZod) =>
  z.discriminatedUnion("option", [ParameterColumnListSchema(z), ParameterTableListSchema(z)]);

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

export const ActionGoToURLSchema = (z: TZod) =>
  ActionCommonSchema(z).extend({
    type: z.literal(EActionTypes.OPEN_URL),
    url: z.string(),
    newWindow: z.boolean(),
  });

const ActivateConditionSchema = (z: TZod) =>
  z.discriminatedUnion("mode", [
    z.object({
      mode: z.literal(EActivateConditionMode.FORMULA),
      formula: z.string(),
    }),
    z.object({
      mode: z.literal(EActivateConditionMode.VARIABLE),
      variableName: z.string(),
      variableValue: z.string(),
    }),
  ]);

export const ActionRunScriptSchema = (z: TZod) =>
  ActionCommonSchema(z).extend({
    type: z.literal(EActionTypes.EXECUTE_SCRIPT),
    parameters: z.array(ActionOnClickParameterSchema(z)).default([]),
    scriptKey: z.string(),
    autoUpdate: z.enum(EAutoUpdateMode),
    hideInactiveButton: z.boolean().optional(),
    activateCondition: ActivateConditionSchema(z).optional(),
    hint: z.string().optional(),
  });

export const ActionUpdateVariableSchema = (z: TZod) =>
  ActionCommonSchema(z).extend({
    type: z.literal(EActionTypes.UPDATE_VARIABLE),
    variables: z.array(ActionOnClickParameterSchema(z)),
  });

export const ActionOpenInSchema = (z: TZod) =>
  z.discriminatedUnion("openIn", [
    z.object({
      openIn: z.literal(EViewOpenIn.DRAWER_WINDOW),
      alignment: z.enum(EDrawerPlacement),
      inheritFilter: z.boolean().optional(),
    }),
    z.object({
      openIn: z.literal(EViewOpenIn.PLACEHOLDER),
      placeholderName: z.string(),
    }),
    z.object({
      openIn: z.literal(EViewOpenIn.MODAL_WINDOW),
      positionByClick: z.boolean().optional(),
      inheritFilter: z.boolean().optional(),
    }),
    z.object({
      openIn: z.literal(EViewOpenIn.WINDOW),
      newWindow: z.boolean(),
      inheritFilter: z.boolean().optional(),
    }),
  ]);

const ActionOpenViewCommonSchema = (z: TZod) =>
  ActionCommonSchema(z).extend({ type: z.literal(EActionTypes.OPEN_VIEW) });

export const ActionOpenViewSchema = (z: TZod) =>
  z.intersection(
    z.discriminatedUnion("mode", [
      ActionOpenViewCommonSchema(z).extend({
        mode: z.literal(EViewMode.GENERATED_BY_SCRIPT),
        scriptKey: z.string(),
        parameters: z.array(ActionOnClickParameterSchema(z)).default([]),
        displayName: z.string(),
      }),
      ActionOpenViewCommonSchema(z).extend({
        mode: z.literal(EViewMode.EXISTED_VIEW),
        viewKey: z.string(),
        parameters: z.array(ActionOnClickParameterSchema(z)).default([]),
      }),
      ActionOpenViewCommonSchema(z).extend({
        mode: z.literal(EViewMode.EMPTY),
        placeholderName: z.string(),
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
  ]);

const WidgetActionParameterCommonSchema = (z: TZod) =>
  z.object({
    name: z.string(),
    displayName: z.string(),
    isHidden: z.boolean(),
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
    autoUpdate: z.enum(EAutoUpdateMode),
    description: z.string(),
    hideInactiveButton: z.boolean().optional(),
    hint: z.string().optional(),
    activateCondition: ActivateConditionSchema(z),
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
    scriptKey: z.string().nullable(),
    autoUpdate: z
      .union([z.literal(EAutoUpdateMode.NONE), z.literal(EAutoUpdateMode.ALL_VIEWS)])
      .default(EAutoUpdateMode.NONE)
      .optional(),
  });

export const ActionSchema = (z: TZod) =>
  z.union([ActionsOnClickSchema(z), WidgetActionSchema(z), ViewActionSchema(z)]);

export const ActionButtonSchema = (z: TZod) =>
  AutoIdentifiedArrayItemSchema(z).extend({
    name: z.string(),
    onClick: z.array(WidgetActionSchema(z)),
    buttonType: z.enum(EActionButtonsTypes),
    backgroundColor: ColorSchema(z).optional(),
    borderColor: ColorSchema(z).optional(),
    color: ColorSchema(z),
    hint: z.string().optional(),
  });
