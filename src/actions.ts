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

export interface IWidgetAction {
  id: number;
  name: string;
  description: string;
  filters: (IFormulaFilterValue | string)[];
  /**  Поле name необходимо, чтобы показать название скрипта, который был удален */
  scriptName?: string;
  inputs: IWidgetActionInput[];
  shouldRefreshWidgetsAfterExecution: boolean;
}

export const isActionValid = (
  action: IWidgetAction,
  { scripts, tables, variables }: IWidgetsContext
) => {
  const currentScript = scripts.get(action.scriptName ?? "");

  if (!currentScript) {
    return false;
  }

  const actionInputsMap = new Map(
    action.inputs.map((input) => [input.name, input])
  );

  if (actionInputsMap.size < currentScript.fieldsNames.size) {
    return false;
  }

  return [...currentScript.fieldsNames].every((name) => {
    const actionInput = actionInputsMap.get(name ?? "");

    if (!actionInput) {
      return false;
    }

    const { value } = actionInput;

    if (
      value.mode === EWidgetActionInputMode.FROM_VARIABLE &&
      !variables.has(value.name)
    ) {
      return false;
    }

    if (value.mode === EWidgetActionInputMode.FORMULA && !value.formula) {
      return false;
    }

    if (value.mode === EWidgetActionInputMode.DYNAMIC_LIST && !value.formula) {
      return false;
    }

    if (
      value.mode === EWidgetActionInputMode.FROM_COLUMN &&
      !tables.has(value.tableName)
    ) {
      return false;
    }

    return true;
  });
};
