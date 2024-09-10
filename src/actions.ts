import type { TExtendedFormulaFilterValue } from "./filtration";
import type { IAutoIdentifiedArrayItem } from "./settings/baseWidget";
import type { IGlobalContext } from "./widgetContext";

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
  NEW_WINDOW = "NEW_WINDOW",
  CURRENT_WINDOW = "CURRENT_WINDOW",
  PLACEHOLDER = "PLACEHOLDER",
  MODAL_WINDOW = "MODAL_WINDOW",
  DRAWER_WINDOW = "DRAWER_WINDOW",
}

export enum EDrawerPlacement {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

interface IParameterFromColumn {
  inputMethod: EWidgetActionInputMethod.COLUMN;
  tableName: string;
  columnName: string;
}

interface IParameterFromVariable {
  inputMethod: EWidgetActionInputMethod.VARIABLE;
  sourceVariable: string;
}

interface IParameterFromFormula {
  inputMethod: EWidgetActionInputMethod.FORMULA;
  formula: string;
}

interface IParameterFromEvent {
  inputMethod: EWidgetActionInputMethod.EVENT;
}

interface IParameterFromStartEvent {
  inputMethod: EWidgetActionInputMethod.START_EVENT;
}

interface IParameterFromEndEvent {
  inputMethod: EWidgetActionInputMethod.FINISH_EVENT;
}

interface IParameterFromManualInput {
  inputMethod: EWidgetActionInputMethod.MANUALLY;
  description: string;
}

interface IParameterFromStaticList {
  inputMethod: EWidgetActionInputMethod.STATIC_LIST;
  options: string[];
  defaultOptionIndex: number;
}

interface IParameterFromDynamicList {
  inputMethod: EWidgetActionInputMethod.DYNAMIC_LIST;
  formula: string;
  defaultValue: string;
  filters: TExtendedFormulaFilterValue[];
}

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
  updateDashboard: boolean;
}

export interface IActionUpdateVariable extends IActionCommon {
  type: EActionTypes.UPDATE_VARIABLE;
  variables: TActionOnClickParameter[];
}

type TActionOpenViewMode =
  | {
      mode: EViewMode.GENERATED_BY_SCRIPT;
      scriptKey: string;
      parameters: TActionOnClickParameter[];
      displayName: string;
    }
  | {
      mode: EViewMode.EXISTED_VIEW;
      viewKey: string;
      parameters: TActionOnClickParameter[];
    };

type TActionOpenIn =
  | {
      openIn: EViewOpenIn.DRAWER_WINDOW;
      alignment: EDrawerPlacement;
    }
  | {
      openIn: EViewOpenIn.PLACEHOLDER;
      placeholderName: string;
    }
  | {
      openIn: EViewOpenIn.NEW_WINDOW;
    }
  | {
      openIn: EViewOpenIn.MODAL_WINDOW;
    }
  | {
      openIn: EViewOpenIn.CURRENT_WINDOW;
    };

export type TActionOpenView = {
  type: EActionTypes.OPEN_VIEW;
} & TActionOpenViewMode &
  TActionOpenIn &
  IActionCommon;

export type TActionsOnClick =
  | IActionGoToUrl
  | IActionRunScript
  | IActionUpdateVariable
  | TActionOpenView;

export interface IWidgetAction extends IActionCommon {
  filters: TExtendedFormulaFilterValue[];
  parameters: TWidgetActionParameter[];
  type: EActionTypes.EXECUTE_SCRIPT;
  scriptKey: string;
  updateDashboard: boolean;
  description: string;
}

export type TAction = TActionsOnClick | IWidgetAction;

export const isExecuteScriptActionValid = (
  action: Extract<TAction, { type: EActionTypes.EXECUTE_SCRIPT }>,
  { scripts, tables, variables }: Pick<IGlobalContext, "scripts" | "tables" | "variables">
) => {
  const currentScript = scripts.get(action.scriptKey ?? "");

  if (!currentScript) {
    return false;
  }

  const actionInputsMap = new Map(
    action.parameters.map((parameter) => [parameter.name, parameter])
  );

  if (actionInputsMap.size < currentScript.fields.length) {
    return false;
  }

  return currentScript.fields.every(({ name }) => {
    const actionInput = actionInputsMap.get(name ?? "");

    if (!actionInput) {
      return false;
    }

    if (
      actionInput.inputMethod === EWidgetActionInputMethod.VARIABLE &&
      !variables.has(actionInput.sourceVariable)
    ) {
      return false;
    }

    if (actionInput.inputMethod === EWidgetActionInputMethod.FORMULA && !actionInput.formula) {
      return false;
    }

    if (actionInput.inputMethod === EWidgetActionInputMethod.DYNAMIC_LIST && !actionInput.formula) {
      return false;
    }

    if (
      actionInput.inputMethod === EWidgetActionInputMethod.COLUMN &&
      !tables.has(actionInput.tableName)
    ) {
      return false;
    }

    return true;
  });
};
