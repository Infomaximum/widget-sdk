import type { ESimpleDataType } from "./data";
import type { IFormulaFilterValue } from "./filtration";
import type { IWidgetsContext } from "./widgetContext";

export enum EWidgetActionInputMethod {
  COLUMN = "COLUMN",
  VARIABLE = "VARIABLE",
  STATIC_LIST = "STATIC_LIST",
  DYNAMIC_LIST = "DYNAMIC_LIST",
  FORMULA = "FORMULA",
  MANUALLY = "MANUALLY",
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
}

export enum EViewOpenIn {
  NEW_WINDOW = "NEW_WINDOW",
  CURRENT_WINDOW = "CURRENT_WINDOW",
  PLACEHOLDER = "PLACEHOLDER",
  MODAL = "MODAL",
  DRAWER = "DRAWER",
}

export enum EDrawerPlacement {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

interface IActionCommon {
  /**  @deprecated - удалится в ближайшее время [BI-13546] */
  id: number;
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

export type TActionOnClickParameter = (
  | IParameterInputColumn
  | IParameterInputVariable
  | IParameterInputFormula
) & {
  name: string;
  /**  @deprecated - удалится в ближайшее время [BI-13546] */
  id: number;
};

interface IParameterInputColumn {
  inputMethod: EWidgetActionInputMethod.COLUMN;
  tableName: string;
  columnName: string;
}

interface IParameterInputVariable {
  inputMethod: EWidgetActionInputMethod.VARIABLE;
  sourceVariable: string;
}

interface IParameterInputFormula {
  inputMethod: EWidgetActionInputMethod.FORMULA;
  formula: string;
}

type TActionOpenViewMode =
  | {
      mode: EViewMode.GENERATED_BY_SCRIPT;
      scriptKey: string;
      parameters: TActionOnClickParameter[];
    }
  | {
      mode: EViewMode.EXISTED_VIEW;
      viewKey: string;
      parameters: TActionOnClickParameter[];
    };

type TActionOpenIn =
  | {
      openIn: EViewOpenIn.DRAWER;
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
      openIn: EViewOpenIn.MODAL;
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

export interface IWidgetAction {
  /**  @deprecated - удалится в ближайшее время [BI-13546] */
  id: number;
  name: string;
  filters: (IFormulaFilterValue | string)[];
  parameters: TWidgetActionParameter[];
  type: EActionTypes.EXECUTE_SCRIPT;
  scriptKey: string;
  updateDashboard: boolean;
  description: string;
}

export type TWidgetActionParameter = IWidgetActionCommonInputParameter &
  (
    | IParameterInputColumn
    | IParameterInputVariable
    | IParameterInputFormula
    | IWidgetActionParameterInputManually
    | IWidgetActionParameterInputStaticList
    | IWidgetActionParameterInputDynamicList
  );

interface IWidgetActionCommonInputParameter {
  name: string;
  displayName: string;
  isHidden: boolean;
}

interface IWidgetActionParameterInputManually {
  inputMethod: EWidgetActionInputMethod.MANUALLY;
  description: string;
}

interface IWidgetActionParameterInputStaticList {
  inputMethod: EWidgetActionInputMethod.STATIC_LIST;
  options: string[];
  defaultOptionIndex: number;
}

interface IWidgetActionParameterInputDynamicList {
  inputMethod: EWidgetActionInputMethod.DYNAMIC_LIST;
  formula: string;
  dataType: ESimpleDataType;
  defaultValue: string;
  filters: (IFormulaFilterValue | string)[];
}

export type TAction = TActionsOnClick | IWidgetAction;

export const isActionValid = (action: TAction, { scripts, tables, variables }: IWidgetsContext) => {
  if (action.type !== EActionTypes.EXECUTE_SCRIPT) {
    return false;
  }

  const currentScript = scripts.get(action.scriptKey ?? "");

  if (!currentScript) {
    return false;
  }

  const actionInputsMap = new Map(
    action.parameters.map((parameter) => [parameter.name, parameter])
  );

  if (actionInputsMap.size < currentScript.fieldsNames.size) {
    return false;
  }

  return [...currentScript.fieldsNames].every((name) => {
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
