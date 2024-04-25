import type { IFormulaFilterValue } from "./filtration";
import type { IWidgetsContext } from "./widgetContext";

export enum EWidgetActionInputMode {
  FROM_COLUMN = "FROM_COLUMN",
  FROM_VARIABLE = "FROM_VARIABLE",
  STATIC_LIST = "STATIC_LIST",
  DYNAMIC_LIST = "DYNAMIC_LIST",
  FORMULA = "FORMULA",
  MANUALLY = "MANUALLY",
}

export interface IActionCommon {
  id: number;
  name: string;
}

export enum EActionTypes {
  URL = "URL",
  UPDATE_VARIABLE = "UPDATE_VARIABLE",
  RUN_SCRIPT = "RUN_SCRIPT",
  OPEN_VIEW = "OPEN_VIEW",
}

export interface IActionGoToUrl extends IActionCommon {
  type: EActionTypes.URL;
  url: string;
  targetBlank: boolean;
}

export interface IActionScriptField {
  name: string;
  id: number;
  value: TWidgetActionInputValue;
}

export interface IActionRunScript extends IActionCommon {
  description: string;
  type: EActionTypes.RUN_SCRIPT;
  filters: (IFormulaFilterValue | string)[];
  inputs: IActionScriptField[];
  scriptName: string;
  shouldRefreshWidgetsAfterExecution: boolean;
}

export interface IActionUpdateVariable extends IActionCommon {
  type: EActionTypes.UPDATE_VARIABLE;
  variables: Array<string>;
}

export enum EViewType {
  CREATED_VIEW = "CREATED_VIEW",
  GENERATED_BY_SCRIPT = "GENERATED_BY_SCRIPT",
}

export enum EOpenViewMode {
  NEW_WINDOW = "NEW_WINDOW",
  PLACEHOLDER = "PLACEHOLDER",
  MODAL = "MODAL",
  DRAWER = "DRAWER",
}

export enum EDrawerPlacement {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export interface IActionOpenView extends IActionCommon {
  type: EActionTypes.OPEN_VIEW;
  viewName: string;
  viewKey: string;
  openMode: EOpenViewMode;
  viewType: EViewType;
  drawerPlacement: EDrawerPlacement;
  placeholderName: string;
  isOpenInCurrentWindow?: boolean;
}

export type TActionsOnClick =
  | IActionGoToUrl
  | IActionRunScript
  | IActionUpdateVariable
  | IActionOpenView;

export type TWidgetActionInputValue =
  | {
      mode: EWidgetActionInputMode.FROM_COLUMN;
      tableName: string;
      columnName: string;
    }
  | {
      mode: EWidgetActionInputMode.FROM_VARIABLE;
      name: string;
    }
  | {
      mode: EWidgetActionInputMode.FORMULA;
      formula: string;
    }
  | {
      mode: EWidgetActionInputMode.MANUALLY;
      description: string;
    }
  | {
      mode: EWidgetActionInputMode.STATIC_LIST;
      options: string[];
      defaultOptionIndex: number;
    }
  | {
      mode: EWidgetActionInputMode.DYNAMIC_LIST;
      formula: string;
      defaultValue: string;
    };

export interface IWidgetActionInput {
  name: string;
  value: TWidgetActionInputValue;
}

export const isActionValid = (
  action: TActionsOnClick,
  { scripts, tables, variables }: IWidgetsContext
) => {
  if (action.type !== EActionTypes.RUN_SCRIPT) {
    return false;
  }

  const currentScript = scripts.get(action.scriptName ?? "");

  if (!currentScript) {
    return false;
  }

  const actionInputsMap = new Map(action.inputs.map((input) => [input.name, input]));

  if (actionInputsMap.size < currentScript.fieldsNames.size) {
    return false;
  }

  return [...currentScript.fieldsNames].every((name) => {
    const actionInput = actionInputsMap.get(name ?? "");

    if (!actionInput) {
      return false;
    }

    const { value } = actionInput;

    if (value.mode === EWidgetActionInputMode.FROM_VARIABLE && !variables.has(value.name)) {
      return false;
    }

    if (value.mode === EWidgetActionInputMode.FORMULA && !value.formula) {
      return false;
    }

    if (value.mode === EWidgetActionInputMode.DYNAMIC_LIST && !value.formula) {
      return false;
    }

    if (value.mode === EWidgetActionInputMode.FROM_COLUMN && !tables.has(value.tableName)) {
      return false;
    }

    return true;
  });
};
