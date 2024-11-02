import type { ESimpleDataType } from "./data";
import type { TNullable } from "./utilityTypes";

export interface IViewInputValue {
  value: TNullable<string> | TNullable<string>[];
  dataType: ESimpleDataType;
}

export interface IViewContext {
  /** Пользовательские переменные уровня образа */
  variables: Map<string, IViewInputValue>;
}
