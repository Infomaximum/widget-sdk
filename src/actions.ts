import type { TExtendedFormulaFilterValue } from "./filtration";
import type { IAutoIdentifiedArrayItem } from "./settings/baseWidget";
import type { TColor } from "./color";

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
  // TODO: удалить при выполении BI-14979
  /** @deprecated необходимо использовать EViewOpenIn.WINDOW с флагом newWindow - true */
  NEW_WINDOW = "NEW_WINDOW",
  // TODO: удалить при выполении BI-14979
  /** @deprecated необходимо использовать EViewOpenIn.WINDOW с флагом newWindow - false */
  CURRENT_WINDOW = "CURRENT_WINDOW",
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

export interface IParameterFromColumn {
  inputMethod: EWidgetActionInputMethod.COLUMN;
  tableName: string;
  columnName: string;
  dbDataType?: string;
}

export interface IParameterFromVariable {
  inputMethod: EWidgetActionInputMethod.VARIABLE;
  sourceVariable: string;
}

export interface IParameterFromFormula {
  inputMethod: EWidgetActionInputMethod.FORMULA;
  formula: string;
  considerFilters: boolean;
  dbDataType?: string;
}

export interface IParameterFromAggregation {
  inputMethod: EWidgetActionInputMethod.AGGREGATION;
  formula: string;
  considerFilters: boolean;
  dbDataType?: string;
}

export interface IParameterFromEvent {
  inputMethod: EWidgetActionInputMethod.EVENT;
}

export interface IParameterFromStartEvent {
  inputMethod: EWidgetActionInputMethod.START_EVENT;
}

export interface IParameterFromEndEvent {
  inputMethod: EWidgetActionInputMethod.FINISH_EVENT;
}

export interface IParameterFromManualInput {
  inputMethod: EWidgetActionInputMethod.MANUALLY;
  description: string;
  defaultValue?: string;
  dbDataType?: string;
  filterByRows?: boolean;
  validation?: string;
  acceptEmptyValue?: boolean;
}

export interface IParameterFromStaticList {
  inputMethod: EWidgetActionInputMethod.STATIC_LIST;
  options: string;
  defaultValue: string | string[];
  acceptEmptyValue?: boolean;
}

export interface IParameterFromDynamicList {
  inputMethod: EWidgetActionInputMethod.DYNAMIC_LIST;
  options: string;
  defaultValue: string;
  dbDataType?: string;
  displayOptions: string;
  filters: TExtendedFormulaFilterValue[];
  filterByRows?: boolean;
  considerFilters: boolean;
  insertAnyValues?: boolean;
  validation?: string;
  acceptEmptyValue?: boolean;
}

interface IParameterFromDataModelBase {
  inputMethod: EWidgetActionInputMethod.DATA_MODEL;
  option: EDataModelOption;
}

export interface IParameterColumnList extends IParameterFromDataModelBase {
  option: EDataModelOption.COLUMN_LIST;
  /* Название параметра, содержащего имя таблицы, от которой зависит текущий параметр   */
  parent: string;
}

export interface IParameterTableList extends IParameterFromDataModelBase {
  option: EDataModelOption.TABLE_LIST;
}

export type TParameterFromDataModel = IParameterColumnList | IParameterTableList;

interface IWidgetActionParameterCommon {
  name: string;
  displayName: string;
  isHidden: boolean;
}

export type TWidgetActionParameter = IWidgetActionParameterCommon &
  (
    | IParameterFromColumn
    | IParameterFromVariable
    | IParameterFromFormula
    | IParameterFromManualInput
    | IParameterFromStaticList
    | IParameterFromDynamicList
    | IParameterFromAggregation
    | TParameterFromDataModel
  );

interface IActionOnClickParameterCommon extends IAutoIdentifiedArrayItem {
  name: string;
}

export type TActionOnClickParameter = IActionOnClickParameterCommon &
  (
    | IParameterFromColumn
    | IParameterFromVariable
    | IParameterFromFormula
    | IParameterFromEvent
    | IParameterFromStartEvent
    | IParameterFromEndEvent
    | IParameterFromAggregation
    | IParameterFromManualInput
    | IParameterFromStaticList
    | IParameterFromDynamicList
    | TParameterFromDataModel
  );

interface IActionCommon extends IAutoIdentifiedArrayItem {
  name: string;
}

export interface IActionGoToUrl extends IActionCommon {
  type: EActionTypes.OPEN_URL;
  url: string;
  newWindow: boolean;
}

export interface IActionRunScript extends IActionCommon {
  type: EActionTypes.EXECUTE_SCRIPT;
  parameters: TActionOnClickParameter[];
  scriptKey: string;
  autoUpdate: EAutoUpdateMode;
  hideInactiveButton?: boolean;
  activateCondition?:
    | {
        mode: EActivateConditionMode.FORMULA;
        formula: string;
      }
    | {
        mode: EActivateConditionMode.VARIABLE;
        variableName: string;
        variableValue: string;
      };
  hint?: string;
}

export interface IActionUpdateVariable extends IActionCommon {
  type: EActionTypes.UPDATE_VARIABLE;
  variables: TActionOnClickParameter[];
}

type TActionOpenIn =
  | {
      openIn: EViewOpenIn.DRAWER_WINDOW;
      alignment: EDrawerPlacement;
    }
  | {
      openIn: EViewOpenIn.PLACEHOLDER;
      placeholderName: string;
    }
  // TODO: удалить  при выполении BI-14979
  /** @deprecated необходимо использовать EViewOpenIn.WINDOW с флагом newWindow - true */
  | {
      openIn: EViewOpenIn.NEW_WINDOW;
    }
  | {
      openIn: EViewOpenIn.MODAL_WINDOW;
      positionByClick?: boolean;
    }
  // TODO: удалить  при выполении BI-14979
  /** @deprecated необходимо использовать EViewOpenIn.WINDOW с флагом newWindow - false */
  | {
      openIn: EViewOpenIn.CURRENT_WINDOW;
    }
  | {
      openIn: EViewOpenIn.WINDOW;
      newWindow: boolean;
    };

export type TActionOpenView = IActionCommon & {
  type: EActionTypes.OPEN_VIEW;
} & (
    | ({
        mode: EViewMode.GENERATED_BY_SCRIPT;
        scriptKey: string;
        parameters: TActionOnClickParameter[];
        displayName: string;
      } & TActionOpenIn)
    | ({
        mode: EViewMode.EXISTED_VIEW;
        viewKey: string;
        parameters: TActionOnClickParameter[];
      } & TActionOpenIn)
    | ({
        mode: EViewMode.EMPTY;
        placeholderName: string;
      } & Extract<TActionOpenIn, { openIn: EViewOpenIn.PLACEHOLDER }>)
  );

export type TActionsOnClick =
  | IActionGoToUrl
  | IActionRunScript
  | IActionUpdateVariable
  | TActionOpenView;

export enum EActivateConditionMode {
  FORMULA = "FORMULA",
  VARIABLE = "VARIABLE",
}

export interface IWidgetAction extends IActionCommon {
  parameters: TWidgetActionParameter[];
  type: EActionTypes.EXECUTE_SCRIPT;
  scriptKey: string;
  autoUpdate: EAutoUpdateMode;
  description: string;
  hideInactiveButton?: boolean;
  hint?: string;
  activateCondition:
    | {
        mode: EActivateConditionMode.FORMULA;
        formula: string;
      }
    | {
        mode: EActivateConditionMode.VARIABLE;
        variableName: string;
        variableValue: string;
      };
}

export interface IActionButton extends IAutoIdentifiedArrayItem {
  name: string;
  onClick: IWidgetAction[];
  buttonType: EActionButtonsTypes;
  backgroundColor?: TColor;
  borderColor?: TColor;
  color: TColor;
  hint?: string;
}

export type TViewActionParameter = (IParameterFromAggregation | IParameterFromVariable) & {
  name: string;
};

export interface IViewAction {
  name: string;
  buttonType: EActionButtonsTypes;
  type: EActionTypes.EXECUTE_SCRIPT;
  parameters: TViewActionParameter[];
  scriptKey: string;
  id?: number;
  autoUpdate?: EAutoUpdateMode.NONE | EAutoUpdateMode.ALL_VIEWS;
}

export type TAction = TActionsOnClick | IWidgetAction | IViewAction;

export type TActionValidator = (action: TAction) => boolean;

export enum EActionButtonsTypes {
  LINK = "link",
  BASE = "primary",
  SECONDARY = "primary-outlined",
}
