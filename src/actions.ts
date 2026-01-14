import type { ParameterFromDataModelSchema, TSchemaType } from ".";
import type {
  ActionButtonSchema,
  ActionGoToURLSchema,
  ActionOnClickParameterSchema,
  ActionOpenViewSchema,
  ActionRunScriptSchema,
  ActionSchema,
  ActionsOnClickSchema,
  ActionUpdateVariableSchema,
  ParameterFromAggregationSchema,
  ParameterFromColumnSchema,
  ParameterFromDynamicListSchema,
  ParameterFromEndEventSchema,
  ParameterFromEventSchema,
  ParameterFromFormulaSchema,
  ParameterFromManualInputSchema,
  ParameterFromStartEventSchema,
  ParameterFromStaticListSchema,
  ParameterFromVariableSchema,
  ViewActionParameterSchema,
  ViewActionSchema,
  WidgetActionParameterSchema,
  WidgetActionSchema,
} from "./actions.schema";

export enum EWidgetActionInputMethod {
  COLUMN = "COLUMN",
  VARIABLE = "VARIABLE",
  STATIC_LIST = "STATIC_LIST",
  DYNAMIC_LIST = "DYNAMIC_LIST",
  FORMULA = "FORMULA",
  MANUALLY = "MANUALLY",
  EVENT = "EVENT",
  START_EVENT = "START_EVENT",
  FINISH_EVENT = "FINISH_EVENT",
  AGGREGATION = "AGGREGATION",
  DATA_MODEL = "DATA_MODEL",
}

export enum EActionTypes {
  OPEN_URL = "OPEN_URL",
  UPDATE_VARIABLE = "UPDATE_VARIABLE",
  EXECUTE_SCRIPT = "EXECUTE_SCRIPT",
  OPEN_VIEW = "OPEN_VIEW",
  DRILL_DOWN = "DRILL_DOWN",
}

export enum EViewMode {
  EXISTED_VIEW = "EXISTED_VIEW",
  GENERATED_BY_SCRIPT = "GENERATED_BY_SCRIPT",
  EMPTY = "EMPTY",
}

export enum EViewOpenIn {
  WINDOW = "WINDOW",
  PLACEHOLDER = "PLACEHOLDER",
  MODAL_WINDOW = "MODAL_WINDOW",
  DRAWER_WINDOW = "DRAWER_WINDOW",
}

export enum EDrawerPlacement {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export enum EAutoUpdateMode {
  NONE = "NONE",
  THIS_WIDGET = "THIS_WIDGET",
  ALL_VIEWS = "ALL_VIEWS",
}

export enum EDataModelOption {
  TABLE_LIST = "TABLE_LIST",
  COLUMN_LIST = "COLUMN_LIST",
}

export interface IParameterFromColumn extends TSchemaType<typeof ParameterFromColumnSchema> {}

export interface IParameterFromVariable extends TSchemaType<typeof ParameterFromVariableSchema> {}

export interface IParameterFromFormula extends TSchemaType<typeof ParameterFromFormulaSchema> {}

export interface IParameterFromAggregation
  extends TSchemaType<typeof ParameterFromAggregationSchema> {}

export interface IParameterFromEvent extends TSchemaType<typeof ParameterFromEventSchema> {}

export interface IParameterFromStartEvent
  extends TSchemaType<typeof ParameterFromStartEventSchema> {}

export interface IParameterFromEndEvent extends TSchemaType<typeof ParameterFromEndEventSchema> {}

export interface IParameterFromManualInput
  extends TSchemaType<typeof ParameterFromManualInputSchema> {}

export interface IParameterFromStaticList
  extends TSchemaType<typeof ParameterFromStaticListSchema> {}

export interface IParameterFromDynamicList
  extends TSchemaType<typeof ParameterFromDynamicListSchema> {}

export type TParameterFromDataModel = TSchemaType<typeof ParameterFromDataModelSchema>;

export type TWidgetActionParameter = TSchemaType<typeof WidgetActionParameterSchema>;

export type TActionOnClickParameter = TSchemaType<typeof ActionOnClickParameterSchema>;

export interface IActionGoToUrl extends TSchemaType<typeof ActionGoToURLSchema> {}

export interface IActionRunScript extends TSchemaType<typeof ActionRunScriptSchema> {}

export interface IActionUpdateVariable extends TSchemaType<typeof ActionUpdateVariableSchema> {}

export type TActionOpenView = TSchemaType<typeof ActionOpenViewSchema>;

export type TActionsOnClick = TSchemaType<typeof ActionsOnClickSchema>;

export enum EActivateConditionMode {
  FORMULA = "FORMULA",
  VARIABLE = "VARIABLE",
}

export interface IWidgetAction extends TSchemaType<typeof WidgetActionSchema> {}

export interface IActionButton extends TSchemaType<typeof ActionButtonSchema> {}

export type TViewActionParameter = TSchemaType<typeof ViewActionParameterSchema>;

export interface IViewAction extends TSchemaType<typeof ViewActionSchema> {}

export type TAction = TSchemaType<typeof ActionSchema>;

export type TActionValidator = (action: TAction) => boolean;

export enum EActionButtonsTypes {
  LINK = "link",
  BASE = "primary",
  SECONDARY = "primary-outlined",
}
