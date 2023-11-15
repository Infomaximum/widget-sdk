import type { ELanguages } from "@infomaximum/localization";
import type { IWidgetProcess } from "./metaDescription";
import type { TNullable } from "./utilityTypes";
import type { ICommonColumnIndicator, TWidgetVariable } from "./indicators";
import type { ESimpleDataType } from "./data";

export interface IWidgetTableColumn {
  /** Имя колонки */
  name: string;
  /** Тип данных колонки */
  dataType: ESimpleDataType;
}

export interface IActionScript {
  guid: string | undefined;
  fieldsGuids: Set<string>;
}

export interface IWidgetTable {
  /** Имя таблицы */
  name: string;
  /** Колонки таблицы */
  columns: Map<string, IWidgetTableColumn>;
}

export interface IWidgetsContext {
  language: ELanguages;
  processes: Map<string, IWidgetProcess>;
  reportMeasures: TNullable<ICommonColumnIndicator[]>;
  workspaceMeasures: TNullable<ICommonColumnIndicator[]>;
  /** Переменные отчета */
  variables: Map<string, TWidgetVariable>;
  /** Метод установки значения переменной отчета */
  setVariableValue(guid: string, value: TNullable<string> | string[]): void;
  statesGuids: Set<string>;
  reportName: string;
  isViewMode: boolean;
  userLogin: string;
  scripts: Map<string, IActionScript>;
  tables: Map<string, IWidgetTable>;
}
