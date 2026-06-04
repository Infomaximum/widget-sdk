import type { ActionDrillDownSchema, ParameterFromDataModelSchema, TSchemaType } from ".";
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
  ParameterFromEditableTextValueSchema,
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
import { VersionedEnum, type TVersionedEnumValues } from "./versionedEnum";

export const EWidgetActionInputMethod = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      COLUMN: "COLUMN",
      VARIABLE: "VARIABLE",
      STATIC_LIST: "STATIC_LIST",
      DYNAMIC_LIST: "DYNAMIC_LIST",
      FORMULA: "FORMULA",
      MANUALLY: "MANUALLY",
      EVENT: "EVENT",
      START_EVENT: "START_EVENT",
      FINISH_EVENT: "FINISH_EVENT",
      AGGREGATION: "AGGREGATION",
      DATA_MODEL: "DATA_MODEL",
      /** Значение берётся из редактируемого текста виджета в момент сохранения */
      EDITABLE_TEXT_VALUE: "EDITABLE_TEXT_VALUE",
    } as const,
  },
});

export type TWidgetActionInputMethod = TVersionedEnumValues<typeof EWidgetActionInputMethod>;

export const EActionTypes = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      OPEN_URL: "OPEN_URL",
      UPDATE_VARIABLE: "UPDATE_VARIABLE",
      EXECUTE_SCRIPT: "EXECUTE_SCRIPT",
      OPEN_VIEW: "OPEN_VIEW",
      DRILL_DOWN: "DRILL_DOWN",
    } as const,
  },
});

export type TActionTypes = TVersionedEnumValues<typeof EActionTypes>;

export const EViewMode = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      EXISTED_VIEW: "EXISTED_VIEW",
      GENERATED_BY_SCRIPT: "GENERATED_BY_SCRIPT",
      EMPTY: "EMPTY",
    } as const,
  },
});

export type TViewMode = TVersionedEnumValues<typeof EViewMode>;

export const EViewOpenIn = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      WINDOW: "WINDOW",
      PLACEHOLDER: "PLACEHOLDER",
      MODAL_WINDOW: "MODAL_WINDOW",
      DRAWER_WINDOW: "DRAWER_WINDOW",
    } as const,
  },
});

export type TViewOpenIn = TVersionedEnumValues<typeof EViewOpenIn>;

export const EDrawerPlacement = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      LEFT: "LEFT",
      RIGHT: "RIGHT",
    } as const,
  },
});

export type TDrawerPlacement = TVersionedEnumValues<typeof EDrawerPlacement>;

export const EAutoUpdateMode = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      NONE: "NONE",
      THIS_WIDGET: "THIS_WIDGET",
      ALL_VIEWS: "ALL_VIEWS",
    } as const,
  },
});

export type TAutoUpdateMode = TVersionedEnumValues<typeof EAutoUpdateMode>;

export const EDataModelOption = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      TABLE_LIST: "TABLE_LIST",
      COLUMN_LIST: "COLUMN_LIST",
    } as const,
  },
});

export type TDataModelOption = TVersionedEnumValues<typeof EDataModelOption>;

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

export interface IParameterFromEditableTextValue
  extends TSchemaType<typeof ParameterFromEditableTextValueSchema> {}

export type TParameterFromDataModel = TSchemaType<typeof ParameterFromDataModelSchema>;

export type TWidgetActionParameter = TSchemaType<typeof WidgetActionParameterSchema>;

export type TActionOnClickParameter = TSchemaType<typeof ActionOnClickParameterSchema>;

export interface IActionGoToUrl extends TSchemaType<typeof ActionGoToURLSchema> {}

export interface IActionDrillDown extends TSchemaType<typeof ActionDrillDownSchema> {}

export interface IActionRunScript extends TSchemaType<typeof ActionRunScriptSchema> {}

export interface IActionUpdateVariable extends TSchemaType<typeof ActionUpdateVariableSchema> {}

export type TActionOpenView = TSchemaType<typeof ActionOpenViewSchema>;

export type TActionsOnClick = TSchemaType<typeof ActionsOnClickSchema>;

export const EActivateConditionMode = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      FORMULA: "FORMULA",
      VARIABLE: "VARIABLE",
    } as const,
  },
});

export type TActivateConditionMode = TVersionedEnumValues<typeof EActivateConditionMode>;

export interface IWidgetAction extends TSchemaType<typeof WidgetActionSchema> {}

export interface IActionButton extends TSchemaType<typeof ActionButtonSchema> {}

export type TViewActionParameter = TSchemaType<typeof ViewActionParameterSchema>;

export interface IViewAction extends TSchemaType<typeof ViewActionSchema> {}

export type TAction = TSchemaType<typeof ActionSchema>;

export type TActionValidator = (action: TAction) => boolean;

export const EActionButtonsTypes = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      LINK: "link",
      BASE: "primary",
      SECONDARY: "primary-outlined",
    } as const,
  },
});

export type TActionButtonsTypes = TVersionedEnumValues<typeof EActionButtonsTypes>;

export enum EExpectedFieldTypes {
  TEXT = "text",
  DOUBLE = "number",
  BOOLEAN = "boolean",
  INTEGER = "integer",
  DATE = "date",
  DATE_TIME = "date_time",
  BIGINTEGER = "big_integer",
  BIGDECIMAL = "big_decimal",
  FILE = "file",
}
