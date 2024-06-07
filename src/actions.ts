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

export type TWidgetActionCommonInputValue = {
  name: string
  isHidden: boolean
}

export type TWidgetActionInputValue = TWidgetActionCommonInputValue & ({
      mode: EWidgetActionInputMode.FROM_COLUMN;
      tableName: string;
      columnName: string;
    }
  | {
      mode: EWidgetActionInputMode.FROM_VARIABLE;
      guid: string;
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
      filters: (IFormulaFilterValue | string)[]
    });

export interface IWidgetActionInput {
  guid: string;
  value: TWidgetActionInputValue;
}

export interface IWidgetAction {
  id: number;
  name: string;
  description: string;
  filters: (IFormulaFilterValue | string)[];
  scriptGuid?: string;
  /**  Поле name необходимо, чтобы показать название скрипта, который был удален */
  scriptName?: string;
  inputs: IWidgetActionInput[];
  shouldRefreshWidgetsAfterExecution: boolean;
}

export const isActionValid = (
  action: IWidgetAction,
  { scripts, tables, variables }: IWidgetsContext
) => {
  const currentScript = scripts.get(action.scriptGuid ?? "");

  if (!currentScript) {
    return false;
  }

  const actionInputsMap = new Map(action.inputs.map((input) => [input.guid, input]));

  if (actionInputsMap.size < currentScript.fieldsGuids.size) {
    return false;
  }

  return [...currentScript.fieldsGuids].every((guid) => {
    const actionInput = actionInputsMap.get(guid ?? "");

    if (!actionInput) {
      return false;
    }

    const { value } = actionInput;

    if (value.mode === EWidgetActionInputMode.FROM_VARIABLE && !variables.has(value.guid)) {
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
